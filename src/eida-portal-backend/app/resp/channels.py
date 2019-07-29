from flask import jsonify

from app import db, cache
from sqlalchemy import extract
from sqlalchemy.orm.exc import NoResultFound
from marshmallow import pprint

from .schemas import FdsnStationChannelSchema
from ..models import FdsnNode, FdsnNetwork, FdsnStation, FdsnStationChannel


class ChannelsResp(object):

    def __init__(self, query_parameters):
        self.query = query_parameters
        if (query_parameters):
            self.query_hash = hash(str(query_parameters))
        else:
            self.query_hash = hash("channels")

    def channels_post_resp(self, post_data):
        # If data has been requested before,
        # try to provide it directly from the cache
        post_data_hash = hash(str(post_data))
        cached = cache.get(post_data_hash)
        if (cached):
            return cached

        response = []
        for p in post_data:
            response.extend(
                FdsnStationChannel.query.join(FdsnStation).join(FdsnNetwork).filter(
                    FdsnNetwork.network_code == p['station_network_code'],
                    FdsnNetwork.network_start_year == p['station_network_start_year'],
                    FdsnStation.station_code == p['station_code']).all())

        data = self._aggregate(response)
        cache.set(post_data_hash, data)
        return data

    def channels_get_resp(self):
        cached = cache.get(self.query_hash)
        if (cached):
            return cached

        result = []
        query = db.session.query(FdsnStationChannel).join(FdsnStation)
        for qp in self.query:
            if hasattr(FdsnStationChannel, qp):
                query = query.filter(
                    getattr(FdsnStationChannel, qp) == self.query[qp])
            elif hasattr(FdsnStation, qp):
                query = query.filter(
                    getattr(FdsnStation, qp) == self.query[qp])
        data = query.all()

        if 'aggregate' in self.query:
            result = self._aggregate(data)
        else:
            result = self._dump(data)

        cache.set(self.query_hash, result)
        return result

    def _aggregate(self, data):
        result = {}
        for d in data:
            if not d.channel_code[:2] in result:
                result[d.channel_code[:2]] = 1
            else:
                result[d.channel_code[:2]] += 1
        return result

    def _dump(self, data):
        schema = FdsnStationChannelSchema(many=True)
        result = schema.dump(data)
        return result.data

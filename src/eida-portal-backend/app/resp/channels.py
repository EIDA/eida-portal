from flask import jsonify

from app import db
from sqlalchemy import extract
from sqlalchemy.orm.exc import NoResultFound
from marshmallow import pprint

from .schemas import FdsnStationChannelSchema
from ..models import FdsnNode, FdsnNetwork, FdsnStation, FdsnStationChannel


class ChannelsResp(object):

    def __init__(self, query_parameters):
        self.query = query_parameters

    def channels_post_resp(self, post_data):
        response = []
        for p in post_data:
            response.extend(
                FdsnStationChannel.query.join(FdsnStation).join(FdsnNetwork).filter(
                    FdsnNetwork.network_code == p['network_code'],
                    FdsnNetwork.network_start_year == p['network_start_year'],
                    FdsnStation.station_code == p['code']).all())

        data = self._aggregate(response)
        return data

    def channels_get_resp(self):
        query = db.session.query(FdsnStationChannel).join(FdsnStation)
        for qp in self.query:
            if hasattr(FdsnStationChannel, qp):
                query = query.filter(
                    getattr(FdsnStationChannel, qp) == self.query[qp])
            elif hasattr(FdsnStation, qp):
                query = query.filter(
                    getattr(FdsnStation, qp) == self.query[qp])
        result = query.all()
        return self._dump(result)

    def _aggregate(self, data):
        result = {}
        for d in data:
            if not d.code[:2] in result:
                result[d.code[:2]] = 1
            else:
                result[d.code[:2]] += 1
        return result

    def _dump(self, data):
        schema = FdsnStationChannelSchema(many=True)
        result = schema.dump(data)
        return result.data

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
                FdsnStationChannel.query.join(FdsnStation).filter(
                FdsnStation.network_code == p['network_code'],
                FdsnStation.network_start_year == p['network_start_year'],
                FdsnStation.code == p['code']).all())

        data = self._aggregate(response)
        return data

    def channels_get_resp(self):
        if not self.query:
            data = FdsnStationChannel.query.all()
        elif self.query.get('netcode') \
        and self.query.get('netstartyear') \
        and self.query.get('statcode'):
            data = FdsnStationChannel.query.join(FdsnStation).filter(
                FdsnStation.network_code == self.query.get('netcode'),
                FdsnStation.network_start_year == self.query.get('netstartyear'),
                FdsnStation.code == self.query.get('statcode')
            ).all()
        elif self.query.get('netcode') \
        and self.query.get('netstartyear'):
            data = FdsnStationChannel.query.join(FdsnStation).filter(
                FdsnStation.network_code == self.query.get('netcode'),
                FdsnStation.network_start_year == self.query.get('netstartyear')
            ).all()
        elif self.query.get('aggregate'):
            data = FdsnStationChannel.query.all()

        # Aggregated data requested
        if self.query.get('aggregate') and data:
            data = self._aggregate(data)
            return data

        return self._dump(data)

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

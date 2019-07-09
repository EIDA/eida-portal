from flask import jsonify

from app import db
from sqlalchemy import extract
from sqlalchemy.orm.exc import NoResultFound
from marshmallow import pprint

from .schemas import FdsnStationChannelSchema, StationChannelAggregationSchema
from ..models import FdsnNode, FdsnNetwork, FdsnStation, FdsnStationChannel


class ChannelsResp(object):

    def __init__(self, query_parameters):
        self.query = query_parameters

    def channels_resp(self):
        if not self.query:
            data = FdsnStationChannel.query.all()
        elif self.query.get('netcode') \
        and self.query.get('netstartyear') \
        and self.query.get('statcode'):
            data = FdsnStationChannel.query.join(FdsnStation).join(FdsnNetwork).filter(
                FdsnNetwork.code == self.query.get('netcode'),
                FdsnNetwork.start_year == self.query.get('netstartyear'),
                FdsnStation.code == self.query.get('statcode')
            ).all()

            if self.query.get('aggregate'):
                data = self._aggregate(data)
                return data

        elif self.query.get('netcode') \
        and self.query.get('netstartyear'):
            data = FdsnStationChannel.query.join(FdsnStation).join(FdsnNetwork).filter(
                FdsnNetwork.code == self.query.get('netcode'),
                FdsnNetwork.start_year == self.query.get('netstartyear')
            ).all()

            if self.query.get('aggregate'):
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

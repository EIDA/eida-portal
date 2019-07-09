from flask import jsonify

from app import db
from sqlalchemy import extract
from sqlalchemy.orm.exc import NoResultFound
from marshmallow import pprint

from .schemas import FdsnStationSchema
from ..models import FdsnNode, FdsnNetwork, FdsnStation, FdsnStationChannel


class StationsResp(object):

    def __init__(self, query_parameters):
        self.query = query_parameters

    def stations_resp(self):
        if not self.query:
            data = FdsnStation.query.all()
        elif self.query.get('code') \
                and self.query.get('netcode') \
                and self.query.get('netstartyear'):
            data = FdsnStation.query.join(FdsnNetwork).filter(
                FdsnNetwork.code == self.query.get('netcode'),
                FdsnNetwork.start_year == self.query.get('netstartyear')).all()
        elif self.query.get('netcode') \
                and self.query.get('netstartyear'):
            data = FdsnStation.query.join(FdsnNetwork).filter(
                FdsnNetwork.code == self.query.get('netcode'),
                FdsnNetwork.start_year == self.query.get('netstartyear')).all()
        elif self.query.get('code'):
            data = FdsnStation.query.filter(
                FdsnStation.code == self.query.get('code')).all()
        return self._dump(data)

    def _dump(self, data):
        schema = FdsnStationSchema(many=True)
        result = schema.dump(data)
        return result.data

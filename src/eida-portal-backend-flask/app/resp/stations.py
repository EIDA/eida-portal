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

    def simple_response(self):
        qp1 = self.query.get('stat')
        data = FdsnStation.query.filter(FdsnStation.code == qp1).all()
        return self._dump(data)

    def _dump(self, data):
        schema = FdsnStationSchema(many=True)
        result = schema.dump(data)
        return result.data

from flask import jsonify

from app import db
from sqlalchemy import extract
from sqlalchemy.orm.exc import NoResultFound
from marshmallow import pprint

from .schemas import FdsnNetworkSchema
from ..models import FdsnNode, FdsnNetwork, FdsnStation, FdsnStationChannel


class NetworksResp(object):

    def __init__(self, query_parameters):
        self.query = query_parameters

    def simple_response(self):
        qp1 = self.query.get('net')
        data = FdsnNetwork.query.join(
            FdsnStation).filter(FdsnNetwork.code == qp1).all()
        return self._dump(data)

    def queried_response(self):
        data = FdsnNetwork.query.join(FdsnStation).filter(code == 'NL').all()
        return self._dump(data)

    def _dump(self, data):
        schema = FdsnNetworkSchema(many=True)
        result = schema.dump(data)
        return result.data

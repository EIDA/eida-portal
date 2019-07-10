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

    def networks_resp(self):
        if not self.query:
            data = FdsnNetwork.query.order_by(FdsnNetwork.code).all()
        elif self.query.get('code'):
            data = FdsnNetwork.query.filter(
                FdsnNetwork.code ==
                self.query.get('code')).order_by(FdsnNetwork.code).all()
        elif self.query.get('temporary'):
            data = FdsnNetwork.query.filter(
                FdsnNetwork.temporary ==
                self.query.get('temporary')).order_by(FdsnNetwork.code).all()
        return self._dump(data)

    def _dump(self, data):
        schema = FdsnNetworkSchema(many=True)
        result = schema.dump(data)
        return result.data

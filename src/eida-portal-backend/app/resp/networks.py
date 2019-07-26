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
        query = db.session.query(FdsnNetwork)
        for qp in self.query:
            query = query.filter(getattr(FdsnNetwork, qp) == self.query[qp])
        result = query.order_by("network_code").all()
        return self._dump(result)

    def _dump(self, data):
        schema = FdsnNetworkSchema(many=True)
        result = schema.dump(data)
        return result.data

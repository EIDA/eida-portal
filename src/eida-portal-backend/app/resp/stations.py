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
        query = db.session.query(FdsnStation).join(FdsnNetwork)
        for qp in self.query:
            if hasattr(FdsnStation, qp):
                query = query.filter(
                    getattr(FdsnStation, qp) == self.query[qp])
            elif hasattr(FdsnNetwork, qp):
                query = query.filter(
                    getattr(FdsnNetwork, qp) == self.query[qp])
        result = query.all()
        return self._dump(result)

    def _dump(self, data):
        schema = FdsnStationSchema(many=True)
        result = schema.dump(data)
        return result.data

from flask import jsonify

from app import db, cache
from sqlalchemy import extract
from sqlalchemy.orm.exc import NoResultFound
from marshmallow import pprint

from .schemas import FdsnStationSchema
from ..models import FdsnNode, FdsnNetwork, FdsnStation, FdsnStationChannel


class StationsResp(object):

    def __init__(self, query_parameters):
        self.query = query_parameters
        if (query_parameters):
            self.query_hash = hash(str(query_parameters))
        else:
            self.query_hash = hash("stations")

    def stations_resp(self):
        cached = cache.get(self.query_hash)
        if (cached):
            return cached

        query = db.session.query(FdsnStation).join(FdsnNetwork)
        for qp in self.query:
            if hasattr(FdsnStation, qp):
                query = query.filter(
                    getattr(FdsnStation, qp) == self.query[qp])
            elif hasattr(FdsnNetwork, qp):
                query = query.filter(
                    getattr(FdsnNetwork, qp) == self.query[qp])

        data = query.order_by("network_code", "station_code").all()
        result = self._dump(data)
        cache.set(self.query_hash, result)
        return result

    def _dump(self, data):
        schema = FdsnStationSchema(many=True)
        result = schema.dump(data)
        return result.data

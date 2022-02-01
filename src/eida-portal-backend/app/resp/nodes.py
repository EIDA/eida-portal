from app import db, cache

from .schemas import FdsnNodeSchema
from ..models import FdsnNode


class NodesResp(object):

    def __init__(self, query_parameters):
        self.query = query_parameters
        if (query_parameters):
            self.query_hash = hash(str(query_parameters))
        else:
            self.query_hash = hash("nodes")

    def nodes_resp(self):
        cached = cache.get(self.query_hash)
        if (cached):
            return cached

        query = db.session.query(FdsnNode)
        for qp in self.query:
            query = query.filter(getattr(FdsnNode, qp) == self.query[qp])

        data = query.order_by("node_code").all()
        result = self._dump(data)
        cache.set(self.query_hash, result)
        return result

    def _dump(self, data):
        schema = FdsnNodeSchema(many=True)
        result = schema.dump(data)
        return result

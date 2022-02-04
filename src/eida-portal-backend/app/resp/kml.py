import simplekml
from app import db, cache
from ..models import FdsnNetwork, FdsnStation


class KmlResp(object):
    def __init__(self, query_parameters):
        self.query = query_parameters
        if query_parameters:
            self.query_hash = hash(str(query_parameters))
        else:
            self.query_hash = hash("kml")

    def kml_resp(self):
        cached = cache.get(self.query_hash)
        if cached:
            return cached

        query = db.session.query(FdsnStation).join(FdsnNetwork)
        for qp in self.query:
            if hasattr(FdsnStation, qp):
                query = query.filter(getattr(FdsnStation, qp) == self.query[qp])
            elif hasattr(FdsnNetwork, qp):
                query = query.filter(getattr(FdsnNetwork, qp) == self.query[qp])

        stations = query.order_by("network_code", "station_code").all()

        kml = simplekml.Kml()
        for s in stations:
            kml.newpoint(
                name=f"{s.station_network_code}.{s.station_code}",
                description=s.station_site_name,
                coords=[(s.station_longitude, s.station_latitude)],
            )

        cache.set(self.query_hash, kml.kml())
        return kml.kml()

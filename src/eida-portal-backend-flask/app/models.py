from dateutil import parser

from app import db

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime,
    Sequence,
    Float
)

import datetime


STRING_LENGTH_SHORT = 256
STRING_LENGTH_MEDIUM = 1024
STRING_LENGTH_LONG = 16384
COORD_INTEGERS = 3
COORD_DECIMALS = 6
ELEV_INTEGERS = 4
ELEV_DECIMALS = 2
VS30_INTEGERS = 6
VS30_DECIMALS = 6
F0_INTEGERS = 6
F0_DECIMALS = 6


Base = declarative_base()


class FdsnNode(db.Model):
    __tablename__ = "nodes"

    id = Column(Integer, Sequence('node_seq'), primary_key=True)

    # FdsnNode -> FdsnNetwork relation
    # networks = relationship("FdsnNetwork", backref="node")
    networks = relationship("FdsnNetwork")

    code = Column(String(STRING_LENGTH_SHORT))

    description = Column(String(STRING_LENGTH_SHORT))

    url_base = Column(String(STRING_LENGTH_SHORT))

    url_dataselect = Column(String(STRING_LENGTH_SHORT))

    url_station = Column(String(STRING_LENGTH_SHORT))

    url_routing = Column(String(STRING_LENGTH_SHORT))

    url_wfcatalog = Column(String(STRING_LENGTH_SHORT))

    def __str__(self):
        return self.code


class FdsnNetwork(db.Model):
    __tablename__ = "networks"

    id = Column(Integer,
                Sequence('network_seq'),
                primary_key=True)

    # FdsnNetwork -> FdsnNode relation
    node_id = Column(Integer, ForeignKey("nodes.id"))
    node = relationship("FdsnNode", back_populates="networks")

    # FdsnNetwork -> FdsnStation relation
    stations = relationship("FdsnStation")
    # station_id = Column(Integer, ForeignKey("nodes.id"))
    # stations = relationship("FdsnStation", backref="network")

    code = Column(String(STRING_LENGTH_SHORT))

    description = Column(String(STRING_LENGTH_SHORT))

    start_date = Column(DateTime)

    start_year = Column(String(STRING_LENGTH_SHORT))

    end_date = Column(DateTime)

    end_year = Column(String(STRING_LENGTH_SHORT))

    restricted_status = Column(String(STRING_LENGTH_SHORT))

    def __str__(self):
        return self.code

    def get_start_year(self):
        return self.start_date.year


class FdsnStation(db.Model):
    __tablename__ = "stations"

    id = Column(Integer,
                Sequence('station_seq'),
                primary_key=True)

    # FdsnStation -> FdsnNetwork relation
    network_id = Column(Integer, ForeignKey("networks.id"))
    network = relationship("FdsnNetwork", back_populates="stations")

    # FdsnStation -> FdsnStationChannel relation
    # channels = relationship("FdsnStationChannel", backref="station")
    channels = relationship("FdsnStationChannel")

    network_code = Column(String(STRING_LENGTH_SHORT))

    network_start_year = Column(String(STRING_LENGTH_SHORT))

    code = Column(String(STRING_LENGTH_SHORT))

    latitude = Column(String(STRING_LENGTH_SHORT))

    longitude = Column(String(STRING_LENGTH_SHORT))

    elevation = Column(String(STRING_LENGTH_SHORT))

    restricted_status = Column(String(STRING_LENGTH_SHORT))

    start_date = Column(DateTime)

    start_year = Column(String(STRING_LENGTH_SHORT))

    end_date = Column(DateTime)

    end_year = Column(String(STRING_LENGTH_SHORT))

    site_name = Column(String(STRING_LENGTH_SHORT))

    def get_start_year(self):
        return self.start_date.year


class FdsnStationChannel(db.Model):
    __tablename__ = "channels"

    id = Column(Integer,
                Sequence('channel_seq'),
                primary_key=True)

    # FdsnStationChannel -> FdsnStation relation
    station_id = Column(Integer, ForeignKey("stations.id"))
    station = relationship("FdsnStation", back_populates="channels")

    code = Column(String(STRING_LENGTH_SHORT))

    sample_rate = Column(String(STRING_LENGTH_SHORT))

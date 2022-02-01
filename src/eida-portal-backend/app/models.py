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

    node_id = Column(Integer, Sequence('node_seq'), primary_key=True)

    # FdsnNode -> FdsnNetwork relation
    node_networks = relationship("FdsnNetwork")

    node_code = Column(String(STRING_LENGTH_SHORT))

    node_description = Column(String(STRING_LENGTH_SHORT))

    node_url_base = Column(String(STRING_LENGTH_SHORT))

    node_url_dataselect = Column(String(STRING_LENGTH_SHORT))

    node_url_station = Column(String(STRING_LENGTH_SHORT))

    node_url_routing = Column(String(STRING_LENGTH_SHORT))

    node_url_wfcatalog = Column(String(STRING_LENGTH_SHORT))

    def __str__(self):
        return self.node_code


class FdsnNetwork(db.Model):
    __tablename__ = "networks"

    network_id = Column(Integer,
                        Sequence('network_seq'),
                        primary_key=True)

    # FdsnNetwork -> FdsnNode relation
    network_node_id = Column(Integer, ForeignKey("nodes.node_id"))
    network_node = relationship("FdsnNode", back_populates="node_networks")

    # FdsnNetwork -> FdsnStation relation
    network_stations = relationship("FdsnStation")
    # station_id = Column(Integer, ForeignKey("nodes.id"))
    # stations = relationship("FdsnStation", backref="network")

    network_code = Column(String(STRING_LENGTH_SHORT))

    network_description = Column(String(STRING_LENGTH_SHORT))

    network_start_date = Column(DateTime)

    network_start_year = Column(String(STRING_LENGTH_SHORT))

    network_end_date = Column(DateTime)

    network_end_year = Column(String(STRING_LENGTH_SHORT))

    network_restricted_status = Column(String(STRING_LENGTH_SHORT))

    network_temporary = Column(Boolean)

    def __str__(self):
        return self.network_code

    def get_start_year(self):
        return self.network_start_date.year


class FdsnStation(db.Model):
    __tablename__ = "stations"

    station_id = Column(Integer,
                        Sequence('station_seq'),
                        primary_key=True)

    # FdsnStation -> FdsnNetwork relation
    station_network_id = Column(Integer, ForeignKey("networks.network_id"))
    station_network = \
        relationship("FdsnNetwork", back_populates="network_stations")

    # FdsnStation -> FdsnStationChannel relation
    # channels = relationship("FdsnStationChannel", backref="station")
    station_channels = relationship("FdsnStationChannel")

    station_node_code = Column(String(STRING_LENGTH_SHORT))

    station_network_code = Column(String(STRING_LENGTH_SHORT))

    station_network_start_year = Column(String(STRING_LENGTH_SHORT))

    station_network_temporary = Column(Boolean)

    station_code = Column(String(STRING_LENGTH_SHORT))

    station_latitude = Column(String(STRING_LENGTH_SHORT))

    station_longitude = Column(String(STRING_LENGTH_SHORT))

    station_elevation = Column(String(STRING_LENGTH_SHORT))

    station_restricted_status = Column(String(STRING_LENGTH_SHORT))

    station_start_date = Column(DateTime)

    station_start_year = Column(String(STRING_LENGTH_SHORT))

    station_end_date = Column(DateTime)

    station_end_year = Column(String(STRING_LENGTH_SHORT))

    station_site_name = Column(String(STRING_LENGTH_SHORT))

    def get_start_year(self):
        return self.station_start_date.year


class FdsnStationChannel(db.Model):
    __tablename__ = "channels"

    channel_id = Column(Integer,
                        Sequence('channel_seq'),
                        primary_key=True)

    # FdsnStationChannel -> FdsnStation relation
    channel_station_id = Column(Integer, ForeignKey("stations.station_id"))

    channel_station = \
        relationship("FdsnStation", back_populates="station_channels")

    channel_station_network_code = Column(String(STRING_LENGTH_SHORT))

    channel_station_station_code = Column(String(STRING_LENGTH_SHORT))

    channel_location = Column(String(STRING_LENGTH_SHORT))

    channel_code = Column(String(STRING_LENGTH_SHORT))

    channel_start_date = Column(DateTime)

    channel_end_date = Column(DateTime)

    channel_sample_rate = Column(String(STRING_LENGTH_SHORT))

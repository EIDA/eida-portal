# -*- coding: utf-8 -*-
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import ParseError
from urllib.request import Request, urlopen
import gzip
from dateutil import parser

from app import db
from sqlalchemy import extract
from sqlalchemy.orm.exc import NoResultFound

from .base_classes import (
    NO_FDSNWS_DATA,
    NSMAP,
    RouteWrapper,
    RouteDatacenterWrapper,
    RouteParamWrapper,
    NodeWrapper,
    NetworkWrapper,
    StationWrapper,
    StationChannel,
)

from ..models import FdsnNode, FdsnNetwork, FdsnStation, FdsnStationChannel


class FdsnHttpBase:
    def __init__(self):
        super(FdsnHttpBase, self).__init__()

    def fdsn_request(self, url):
        try:
            req = Request(url)
            req.add_header("Accept-Encoding", "gzip")
            response = urlopen(req)

            if response.info().get("Content-Encoding") == "gzip":
                return gzip.decompress(response.read())
            else:
                return response.read()
        except Exception:
            # self.log_exception(url)
            return None

    def _get_fdsn_nodes(self):
        try:
            for n in FdsnNode.query.all():
                yield NodeWrapper(n)
        except Exception:
            raise

    def get_node_entity_based_on_url(self, url):
        try:
            # >>> x = 'http://geofon.gfz-potsdam.de/fdsnws/dataselect/1/query'
            # >>> x.split('/')[2]
            # 'geofon.gfz-potsdam.de'
            u = url.split("/")[2]
            x = (
                db.session.query(FdsnNode)
                .filter(FdsnNode.node_url_base.contains(u))
                .first()
            )
            return x
        except Exception:
            raise

    def get_network_if_known(self, node_wrapper, network_wrapper):
        try:
            x = (
                db.session.query(FdsnNetwork)
                .join(FdsnNode)
                .filter(
                    FdsnNode.node_code == node_wrapper.code,
                    FdsnNetwork.network_code == network_wrapper.code,
                    extract("year", FdsnNetwork.network_start_date)
                    == network_wrapper.parse_start_date_year(),
                )
                .first()
            )

            return x
        except Exception:
            # self.log_exception()
            raise

    def get_station_if_known(self, node_wrapper, network_wrapper, station_wrapper):
        try:
            s = (
                FdsnStation.query.join(FdsnNetwork)
                .join(FdsnNode)
                .filter(
                    FdsnNode.node_code == node_wrapper.code,
                    FdsnNetwork.network_code == network_wrapper.code,
                    extract("year", FdsnNetwork.network_start_date)
                    == network_wrapper.parse_start_date_year(),
                    FdsnStation.station_code == station_wrapper.code,
                    extract("year", FdsnStation.station_start_date)
                    == station_wrapper.parse_start_date_year(),
                )
                .first()
            )

            return s
            # return FdsnStation.query.get(
            #     fdsn_network__fdsn_node__code=node_wrapper.code,
            #     fdsn_network__code=network_wrapper.code,
            #     fdsn_network__start_date__year=network_wrapper.parse_start_date_year(),
            #     code=station_wrapper.code,
            #     start_date__year=station_wrapper.parse_start_date_year())

        except Exception:
            # self.log_exception()
            raise

    def validate_string(self, string):
        if not string or len(string) <= 0:
            return NO_FDSNWS_DATA
        else:
            return string


class FdsnNetworkManager(FdsnHttpBase):
    def __init__(self):
        super(FdsnNetworkManager, self).__init__()

    def _discover_node_networks(self, node_wrapper):
        try:
            response = self.fdsn_request(node_wrapper.build_url_station_network_level())

            if not response:
                return

            root = ET.fromstring(response)

            for network in root.findall(".//mw:Network", namespaces=NSMAP):
                net_wrapper = NetworkWrapper()

                tmp = network.get("code")
                if tmp is not None:
                    net_wrapper.code = self.validate_string(tmp)
                else:
                    # self.log_warning(
                    #     'Network with no code received \
                    #     when discovering node networks!'
                    # )
                    continue

                tmp = network.get("startDate")
                if tmp is not None:
                    net_wrapper.start_date = self.validate_string(tmp)
                else:
                    # self.log_warning(
                    #     'Network with no startDate received \
                    #     when discovering node networks!'
                    # )
                    continue

                tmp = network.get("endDate")
                if tmp is not None:
                    net_wrapper.end_date = self.validate_string(tmp)

                tmp = network.get("restrictedStatus")
                if tmp is not None:
                    net_wrapper.restricted_status = self.validate_string(tmp)

                tmp = network.find(".//mw:Description", namespaces=NSMAP)
                if tmp is not None:
                    net_wrapper.description = self.validate_string(tmp.text)

                yield net_wrapper
        except ParseError:
            # self.log_exception()
            raise
        except Exception:
            # self.log_exception()
            raise

    def _save_node_network(self, node_wrapper, network_wrapper):
        try:
            net = self.get_network_if_known(node_wrapper, network_wrapper)

            if net:
                net.network_description = network_wrapper.description
                # net.network_start_date = network_wrapper.start_date
                net.network_end_date = network_wrapper.parse_end_date()
                net.network_end_year = network_wrapper.parse_end_date_year()
                net.network_restricted_status = network_wrapper.restricted_status
                net.network_temporary = network_wrapper.is_temporary()
            else:
                print(
                    "Adding: node {0} Network {1} Year {2}".format(
                        node_wrapper.code,
                        network_wrapper.code,
                        network_wrapper.parse_start_date_year(),
                    )
                )

                net = FdsnNetwork()
                net.network_code = network_wrapper.code
                net.network_description = network_wrapper.description
                net.network_start_date = network_wrapper.parse_start_date()
                net.network_start_year = network_wrapper.parse_start_date_year()
                net.network_end_date = network_wrapper.parse_end_date()
                net.network_end_year = network_wrapper.parse_end_date_year()
                net.network_restricted_status = network_wrapper.restricted_status
                net.network_temporary = network_wrapper.is_temporary()
                net.network_node = FdsnNode.query.filter(
                    FdsnNode.node_code == node_wrapper.code
                ).first()
                db.session.add(net)

            # Commit the db session changes
            db.session.commit()

        except Exception:
            # self.log_exception(
            #     'Node: {0} Network: {1}'.format(
            #         vars(node_wrapper),
            #         vars(network_wrapper)))
            raise

    def _sync_fdsn_networks(self):
        try:
            for node_wrapper in self._get_fdsn_nodes():
                for network_wrapper in self._discover_node_networks(node_wrapper):
                    self._save_node_network(node_wrapper, network_wrapper)
        except Exception:
            # self.log_exception()
            raise


class FdsnRoutingManager(FdsnHttpBase):
    def __init__(self):
        super(FdsnRoutingManager, self).__init__()
        self.netman = FdsnNetworkManager()

        # Try to get the Routing Web Service from ODC
        n = db.session.query(FdsnNode).filter(FdsnNode.node_code == "ODC").first()

        # If ODC does not exist, take first one from top
        if not n:
            n = (
                db.session.query(FdsnNode)
                .filter(FdsnNode.node_url_routing != "")
                .first()
            )

        self.routing_node_wrapper = NodeWrapper(n)

    def build_fdsn_station_url(self, url, param_wrapper):
        return url + "?network={0}&station={1}".format(
            param_wrapper.net.upper(), param_wrapper.sta.upper()
        )

    def _get_fdsn_networks(self):
        try:
            for n in db.session.query(FdsnNetwork).distinct("network_code"):
                yield n.network_code
        except Exception:
            # self.log_exception()
            raise

    def _discover_network_routes(self, network_code):
        try:
            # self.log_information('Discovering network routes: {0}'.format(
            #     self.routing_node_wrapper.build_url_routing_network_level(
            #         network_code)))

            response = self.fdsn_request(
                self.routing_node_wrapper.build_url_routing_network_level(network_code)
            )

            if not response:
                return

            root = ET.fromstring(response)

            route_wrapper = RouteWrapper()
            for dc in root.findall(".//datacenter"):
                datacenter_wrapper = RouteDatacenterWrapper()
                datacenter_wrapper.url = dc.find("url").text

                for param in dc.findall(".//params"):
                    param_wrapper = RouteParamWrapper()

                    tmp = param.find("loc").text
                    if tmp is not None:
                        param_wrapper.loc = tmp

                    tmp = param.find("end").text
                    if tmp is not None:
                        param_wrapper.end = tmp

                    tmp = param.find("sta").text
                    if tmp is not None:
                        param_wrapper.sta = tmp

                    tmp = param.find("cha").text
                    if tmp is not None:
                        param_wrapper.cha = tmp

                    tmp = param.find("priority").text
                    if tmp is not None:
                        param_wrapper.priority = tmp

                    tmp = param.find("start").text
                    if tmp is not None:
                        param_wrapper.start = tmp

                    tmp = param.find("net").text
                    if tmp is not None:
                        param_wrapper.net = tmp

                    yield datacenter_wrapper.url, param_wrapper

            return route_wrapper
        except ParseError:
            # self.log_exception()
            raise
        except Exception:
            # self.log_exception()
            raise

    def _discover_network_stations(self, url, param_wrapper):
        try:
            node_entity = self.get_node_entity_based_on_url(url)

            if not node_entity:
                # self.log_warning('Node not configured for: {0}'.format(url))
                return

            node_wrapper = NodeWrapper(node_entity)

            response = self.fdsn_request(
                node_wrapper.build_url_station_channel_level(
                    param_wrapper.net, param_wrapper.sta
                )
            )

            if not response:
                return

            root = ET.fromstring(response)

            for network in root.findall(".//mw:Network", namespaces=NSMAP):
                network_wrapper = NetworkWrapper()

                tmp = network.get("code")
                if tmp is not None:
                    network_wrapper.code = self.validate_string(tmp)

                tmp = network.get("startDate")
                if tmp is not None:
                    network_wrapper.start_date = self.validate_string(tmp)

                tmp = network.get("endDate")
                if tmp is not None:
                    network_wrapper.end_date = self.validate_string(tmp)

                for station in network.findall(".mw:Station", namespaces=NSMAP):
                    stat_wrapper = StationWrapper()

                    tmp = station.get("code")
                    if tmp is not None:
                        stat_wrapper.code = self.validate_string(tmp)
                    else:
                        # self.log_warning(
                        #     'Station with no code received \
                        #     when discovering network stations! Network: {0}'
                        #     .format(vars(network_wrapper))
                        # )
                        continue

                    tmp = station.find(".//mw:Latitude", namespaces=NSMAP)
                    if tmp is not None:
                        stat_wrapper.latitude = self.validate_string(tmp.text)

                    tmp = station.find(".//mw:Longitude", namespaces=NSMAP)
                    if tmp is not None:
                        stat_wrapper.longitude = self.validate_string(tmp.text)

                    tmp = station.find(".//mw:Elevation", namespaces=NSMAP)
                    if tmp is not None:
                        stat_wrapper.elevation = self.validate_string(tmp.text)

                    tmp = station.get("restrictedStatus")
                    if tmp is not None:
                        stat_wrapper.restricted_status = self.validate_string(tmp)

                    tmp = station.get("startDate")
                    if tmp is not None:
                        stat_wrapper.start_date = self.validate_string(tmp)

                    tmp = station.get("endDate")
                    if tmp is not None:
                        stat_wrapper.end_date = self.validate_string(tmp)

                    tmp = station.find(".//mw:CreationDate", namespaces=NSMAP)
                    if tmp is not None:
                        stat_wrapper.creation_date = self.validate_string(tmp.text)

                    tmp = station.find(".//mw:Site//mw:Name", namespaces=NSMAP)
                    if tmp is not None:
                        stat_wrapper.site_name = self.validate_string(tmp.text)

                    for channel in station.findall(".//mw:Channel", namespaces=NSMAP):
                        channel_wrapper = StationChannel()

                        tmp = channel.get("code")
                        if tmp is not None:
                            channel_wrapper.code = self.validate_string(tmp)

                        tmp = channel.get("startDate")
                        if tmp is not None:
                            channel_wrapper.start_date = self.validate_string(tmp)

                        tmp = channel.get("endDate")
                        if tmp is not None:
                            channel_wrapper.end_date = self.validate_string(tmp)

                        tmp = channel.get("locationCode")
                        if tmp is not None:
                            channel_wrapper.location = self.validate_string(tmp)

                        tmp = channel.find(".//mw:SampleRate", namespaces=NSMAP)
                        if tmp is not None:
                            channel_wrapper.sample_rate = self.validate_string(tmp.text)

                        stat_wrapper.channels.append(channel_wrapper)

                    yield node_wrapper, network_wrapper, stat_wrapper
        except ParseError:
            # self.log_exception()
            raise
        except:
            # self.log_exception()
            raise

    def _save_network_station(self, node_wrapper, network_wrapper, station_wrapper):
        try:
            stat = self.get_station_if_known(
                node_wrapper, network_wrapper, station_wrapper
            )

            # If station is known in the database, just update it with the
            # latest FDSN data, otherwise add it to the database
            if stat:
                stat.station_network_code = network_wrapper.code
                stat.station_network_start_year = (
                    network_wrapper.parse_start_date_year()
                )
                stat.station_network_temporary = network_wrapper.is_temporary()
                # stat.code = station_wrapper.code
                stat.station_latitude = station_wrapper.latitude
                stat.station_longitude = station_wrapper.longitude
                stat.station_elevation = station_wrapper.elevation
                stat.station_restricted_status = station_wrapper.restricted_status
                # stat.station_start_date = station_wrapper.start_date
                stat.station_end_date = station_wrapper.parse_end_date()
                stat.station_end_year = station_wrapper.parse_end_date_year()
                stat.station_creation_date = station_wrapper.parse_creation_date()
                stat.station_site_name = station_wrapper.site_name

                FdsnStationChannel.query.filter_by(
                    channel_station_id=stat.station_id
                ).delete()

                for channel in station_wrapper.channels:
                    cha = FdsnStationChannel()
                    cha.station = stat
                    cha.code = channel.code
                    cha.sample_rate = channel.sample_rate

            else:
                print(
                    "Adding: node {0} Network {1} Year {2} Station {3} Year {4}".format(
                        node_wrapper.code,
                        network_wrapper.code,
                        network_wrapper.parse_start_date_year(),
                        station_wrapper.code,
                        station_wrapper.parse_start_date_year(),
                    )
                )

                # Create station entity
                stat = FdsnStation()
                # Assign station to network

                stat.station_network = (
                    FdsnNetwork.query.join(FdsnNode)
                    .filter(
                        FdsnNode.node_code == node_wrapper.code,
                        FdsnNetwork.network_code == network_wrapper.code,
                        extract("year", FdsnNetwork.network_start_date)
                        == network_wrapper.parse_start_date_year(),
                    )
                    .first()
                )

                # Fill data obtained from the Web Service
                stat.station_node_code = node_wrapper.code
                stat.station_network_code = network_wrapper.code
                stat.station_network_start_year = (
                    network_wrapper.parse_start_date_year()
                )
                stat.station_network_temporary = network_wrapper.is_temporary()
                stat.station_code = station_wrapper.code
                stat.station_latitude = station_wrapper.latitude
                stat.station_longitude = station_wrapper.longitude
                stat.station_elevation = station_wrapper.elevation
                stat.station_restricted_status = station_wrapper.restricted_status
                stat.station_start_date = station_wrapper.parse_start_date()
                stat.station_start_year = station_wrapper.parse_start_date_year()
                stat.station_end_date = station_wrapper.parse_end_date()
                stat.station_end_year = station_wrapper.parse_end_date_year()
                stat.station_creation_date = station_wrapper.parse_creation_date()
                stat.station_site_name = station_wrapper.site_name

                for channel in station_wrapper.channels:
                    cha = FdsnStationChannel()
                    cha.channel_station = stat
                    cha.channel_station_network_code = network_wrapper.code
                    cha.channel_station_code = station_wrapper.code
                    cha.channel_location = channel.location
                    cha.channel_code = channel.code
                    cha.channel_start_date = channel.parse_start_date()
                    cha.channel_end_date = channel.parse_end_date()
                    cha.channel_sample_rate = channel.sample_rate

                # Commit the db session changes
                db.session.add(stat)
                db.session.commit()
        except Exception:
            # self.log_exception(
            #     'Node: {0} Network: {1} Station: {2}'.format(
            #         vars(node_wrapper),
            #         vars(network_wrapper),
            #         vars(station_wrapper)))
            raise

    def _sync_fdsn_stations(self):
        try:
            for network_code in self._get_fdsn_networks():
                for url, param_wrapper in self._discover_network_routes(network_code):
                    for (
                        node_wrapper,
                        network_wrapper,
                        stat_wrapper,
                    ) in self._discover_network_stations(url, param_wrapper):
                        self._save_network_station(
                            node_wrapper, network_wrapper, stat_wrapper
                        )
        except Exception:
            # self.log_exception()
            raise


class FdsnManager:
    def __init__(self):
        self.fdsn_netman = FdsnNetworkManager()
        self.fdsn_routman = FdsnRoutingManager()

    def _prune_db(self):
        FdsnStationChannel.query.delete()
        FdsnStation.query.delete()
        FdsnNetwork.query.delete()

    def process_fdsn(self):
        try:
            print("FDSN sync started!")
            self._prune_db()
            self.fdsn_netman._sync_fdsn_networks()
            self.fdsn_routman._sync_fdsn_stations()
            print("FDSN sync completed!")
        except KeyboardInterrupt:
            print("FDSN sync interrupted manually!")

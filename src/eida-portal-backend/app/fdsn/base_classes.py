from dateutil import parser

NO_FDSNWS_DATA = 'n/a'
NSMAP = {'mw': 'http://www.fdsn.org/xml/station/1'}


class RouteWrapper(object):

    def __init__(self):
        self.datacenters = []


class RouteDatacenterWrapper(object):

    def __init__(self):
        self.url = NO_FDSNWS_DATA
        self.params = []


class RouteParamWrapper(object):

    def __init__(self):
        self.loc = NO_FDSNWS_DATA
        self.end = NO_FDSNWS_DATA
        self.sta = NO_FDSNWS_DATA
        self.cha = NO_FDSNWS_DATA
        self.priority = NO_FDSNWS_DATA
        self.start = NO_FDSNWS_DATA
        self.net = NO_FDSNWS_DATA


# Single node instance wrapper
class NodeWrapper(object):

    def __init__(self, node):
        self.code = node.node_code
        self.description = node.node_description
        self.url_dataselect = node.node_url_dataselect
        self.url_station = node.node_url_station
        self.url_routing = node.node_url_routing
        self.url_wfcatalog = node.node_url_wfcatalog
        self.networks = []

    def build_url_station_station_level(self):
        return self.url_station + 'network={0}&level=station'

    def build_url_station_network_station_level(
            self, network_code, station_code):
        return self.url_station + 'network={0}&station={1}'.format(
            network_code, station_code)

    def build_url_station_network_level(self):
        return self.url_station + 'network=*&level=network'

    def build_url_station_channel_level(self, network_code, station_code):
        return self.url_station + \
            'network={0}&station={1}&level=channel'.format(
                network_code, station_code)

    def build_url_routing_network_level(self, network_code):
        return self.url_routing + 'network={0}'.format(network_code)


# Single network instance  wrapper and collection of stations
class NetworkWrapper(object):

    def __init__(self):
        self.id = 0
        self.code = NO_FDSNWS_DATA
        self.description = NO_FDSNWS_DATA
        self.start_date = None
        self.start_year = None
        self.end_date = None
        self.end_year = None
        self.restricted_status = NO_FDSNWS_DATA
        self.temporary = False
        self.stations = []

    def _buildWrapper(self, network):
        self.id = network.network_id
        self.code = network.network_code
        self.description = network.network_description
        self.start_date = str(network.network_start_date)
        self.end_date = str(network.network_end_date)
        self.restricted_status = network.restricted_status
        self.stations = []

    def parse_start_date(self):
        return parser.parse(self.start_date) if self.start_date else None

    def parse_start_date_year(self):
        return parser.parse(self.start_date).year if self.start_date else None

    def parse_end_date(self):
        return parser.parse(self.end_date) if self.end_date else None

    def parse_end_date_year(self):
        return parser.parse(self.end_date).year if self.end_date else None

    # We assume network is temporary if it has end_date defined
    def is_temporary(self):
        return True if self.end_date else False


# Single station instance wrapper
class StationWrapper(object):

    def __init__(self):
        self.code = NO_FDSNWS_DATA
        self.network_code = NO_FDSNWS_DATA
        self.network_start_year = NO_FDSNWS_DATA
        self.latitude = NO_FDSNWS_DATA
        self.longitude = NO_FDSNWS_DATA
        self.elevation = NO_FDSNWS_DATA
        self.restricted_status = NO_FDSNWS_DATA
        self.start_date = None
        self.end_date = None
        self.creation_date = NO_FDSNWS_DATA
        self.site_name = NO_FDSNWS_DATA
        self.channels = []

    def parse_start_date(self):
        return parser.parse(self.start_date) \
            if self.start_date else None

    def parse_start_date_year(self):
        return parser.parse(self.start_date).year \
            if self.start_date else None

    def parse_end_date(self):
        return parser.parse(self.end_date) \
            if self.end_date else None

    def parse_end_date_year(self):
        return parser.parse(self.end_date).year \
            if self.end_date else None

    def parse_creation_date(self):
        return parser.parse(self.creation_date) \
            if self.creation_date else None


class StationChannel(object):

    def __init__(self):
        self.code = NO_FDSNWS_DATA
        self.sample_rate = NO_FDSNWS_DATA

from marshmallow import Schema, fields


class FdsnNodeSchema(Schema):
    node_code = fields.Str()

class FdsnStationChannelSchema(Schema):
    channel_station_network_code = fields.Str()
    channel_station_station_code = fields.Str()
    channel_location = fields.Str()
    channel_code = fields.Str()
    channel_start_date = fields.Str()
    channel_end_date = fields.Str()
    channel_sample_rate = fields.Str()

class FdsnStationSchema(Schema):
    station_code = fields.Str()
    station_network_code = fields.Str()
    station_network_start_year = fields.Str()
    station_node_code = fields.Str()
    station_network_temporary = fields.Boolean()
    station_latitude = fields.Str()
    station_longitude = fields.Str()
    station_elevation = fields.Str()
    station_restricted_status = fields.Str()
    station_start_date = fields.Str()
    station_start_year = fields.Str()
    station_end_date = fields.Str()
    station_end_year = fields.Str()
    station_site_name = fields.Str()
    # station_channels = fields.Nested(FdsnStationChannelSchema, many=True)


class FdsnNetworkSchema(Schema):
    network_code = fields.Str()
    network_node = fields.Nested(FdsnNodeSchema, many=False)
    network_description = fields.Str()
    network_start_date = fields.Str()
    network_start_year = fields.Str()
    network_end_date = fields.Str()
    network_end_year = fields.Str()
    network_restricted_status = fields.Str()
    network_temporary = fields.Boolean()
    # network_stations = fields.Nested(FdsnStationSchema, many=True)

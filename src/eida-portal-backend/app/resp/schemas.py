from marshmallow import Schema, fields


class FdsnStationChannelSchema(Schema):
    code = fields.Str()
    sample_rate = fields.Str()


class FdsnStationSchema(Schema):
    code = fields.Str()
    network_code = fields.Str()
    network_start_year = fields.Str()
    latitude = fields.Str()
    longitude = fields.Str()
    elevation = fields.Str()
    restricted_status = fields.Str()
    start_date = fields.Str()
    start_year = fields.Str()
    end_date = fields.Str()
    end_year = fields.Str()
    site_name = fields.Str()
    channels = fields.Nested(FdsnStationChannelSchema, many=True)


class FdsnNetworkSchema(Schema):
    code = fields.Str()
    description = fields.Str()
    start_date = fields.Str()
    start_year = fields.Str()
    end_date = fields.Str()
    end_year = fields.Str()
    restricted_status = fields.Str()
    temporary = fields.Boolean()
    # stations = fields.Nested(FdsnStationSchema, many=True)

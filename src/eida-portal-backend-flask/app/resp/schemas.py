from marshmallow import Schema, fields


class FdsnStationChannelSchema(Schema):
    code = fields.Str()
    sample_rate = fields.Str()


class FdsnStationSchema(Schema):
    code = fields.Str()
    latitude = fields.Str()
    longitude = fields.Str()
    elevation = fields.Str()
    restricted_status = fields.Str()
    start_date = fields.Str()
    end_date = fields.Str()
    site_name = fields.Str()
    channels = fields.Nested(FdsnStationChannelSchema, many=True)


class FdsnNetworkSchema(Schema):
    code = fields.Str()
    description = fields.Str()
    start_date = fields.Str()
    end_date = fields.Str()
    restricted_status = fields.Str()
    stations = fields.Nested(FdsnStationSchema, many=True)

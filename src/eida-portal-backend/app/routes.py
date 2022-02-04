from flask import request, jsonify, Response

from app import app

from .resp.nodes import NodesResp
from .resp.networks import NetworksResp
from .resp.stations import StationsResp
from .resp.channels import ChannelsResp
from .resp.kml import KmlResp


@app.route("/nodes", methods=["GET"])
def nodes():
    m = NodesResp(request.args)
    x = m.nodes_resp()
    return jsonify(x)


@app.route("/networks", methods=["GET"])
def networks():
    m = NetworksResp(request.args)
    x = m.networks_resp()
    return jsonify(x)


@app.route("/stations", methods=["GET"])
def stations():
    s = StationsResp(request.args)
    x = s.stations_resp()
    return jsonify(x)


@app.route("/channels", methods=["GET", "POST"])
def channels():
    s = ChannelsResp(request.args)

    if request.method == "POST":
        x = s.channels_post_resp(request.json)
    else:
        x = s.channels_get_resp()

    return jsonify(x)

@app.route("/kml", methods=["GET"])
def kml():
    s = KmlResp(request.args)
    x = s.kml_resp()
    return Response(x, mimetype='text/xml')
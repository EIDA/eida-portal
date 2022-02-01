from flask import request, jsonify

from app import app

from .resp.nodes import NodesResp
from .resp.networks import NetworksResp
from .resp.stations import StationsResp
from .resp.channels import ChannelsResp


@app.route('/nodes', methods=['GET'])
def nodes():
    m = NodesResp(request.args)
    x = m.nodes_resp()
    return jsonify(x)

@app.route('/networks', methods=['GET'])
def networks():
    m = NetworksResp(request.args)
    x = m.networks_resp()
    return jsonify(x)


@app.route('/stations', methods=['GET'])
def stations():
    s = StationsResp(request.args)
    x = s.stations_resp()
    return jsonify(x)


@app.route('/channels', methods=['GET', 'POST'])
def channels():
    s = ChannelsResp(request.args)

    if request.method == 'POST':
        x = s.channels_post_resp(request.json)
    else:
        x = s.channels_get_resp()

    return jsonify(x)


from flask import request, Response, jsonify

from app import app

from .fdsn.fdsn_manager import FdsnManager
from .resp.networks import NetworksResp
from .resp.stations import StationsResp
from .resp.channels import ChannelsResp


@app.route('/n', methods=['GET'])
def networks():
    m = NetworksResp(request.args)
    x = m.networks_resp()
    return jsonify(x)


@app.route('/s', methods=['GET'])
def stations():
    s = StationsResp(request.args)
    x = s.stations_resp()
    return jsonify(x)


@app.route('/c', methods=['GET'])
def channels():
    s = ChannelsResp(request.args)
    x = s.channels_resp()
    return jsonify(x)


@app.route('/harvest')
def harvest():
    fm = FdsnManager()
    fm.process_fdsn()
    return "Done!"

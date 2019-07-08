from flask import request, Response, jsonify

from app import app

from .fdsn.fdsn_manager import FdsnManager
from .resp.networks import NetworksResp
from .resp.stations import StationsResp


@app.route('/n', methods=['GET'])
def networks():
    m = NetworksResp(request.args)
    x = m.simple_response()
    return jsonify(x)


@app.route('/s', methods=['GET'])
def stations():
    s = StationsResp(request.args)
    x = s.simple_response()
    return jsonify(x)


@app.route('/harvest')
def harvest():
    fm = FdsnManager()
    fm.process_fdsn()
    return "Done!"

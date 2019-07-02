from flask import request, Response, jsonify

from app import app
from .resp.networks import NetworksResp

from .fdsn.fdsn_manager import FdsnManager


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/n', methods=['GET'])
def networks():
    m = NetworksResp(request.args)
    x = m.simple_response()
    return jsonify(x)


@app.route('/harvest')
def stations():
    fm = FdsnManager()
    fm.process_fdsn()
    return "Done!"

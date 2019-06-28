from app import app

from .fdsn.fdsn_manager import FdsnManager


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/n')
def networks():
    return "Networks"


@app.route('/s')
def stations():
    fm = FdsnManager()
    fm.process_fdsn()

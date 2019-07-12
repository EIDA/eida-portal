import flask

from app.fdsn.fdsn_manager import FdsnManager

if __name__ == '__main__':
    FdsnManager().process_fdsn()

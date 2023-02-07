from app import app

from app.fdsn.fdsn_manager import FdsnManager

if __name__ == '__main__':
    with app.app_context():
        FdsnManager().process_fdsn()

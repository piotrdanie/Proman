from functools import wraps
from flask import jsonify
from datetime import datetime
import bcrypt


def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        return jsonify(func(*args, **kwargs))

    return decorated_function

def get_current_time():
    return datetime.now().strftime("%Y-%m-%d %H:%M")


def hash_password(password):
    hashed_bytes_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes_password.decode('utf-8')


def verify_password(password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password.encode('utf-8'), hashed_bytes_password)

from functools import wraps
from flask_jwt_extended import verify_jwt_in_request
from flask import jsonify


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except Exception:
            return jsonify({"message": "Missing or invalid token"}), 401

        return fn(*args, **kwargs)

    return wrapper
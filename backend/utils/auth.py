from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()

            claims = get_jwt()

            if not claims.get("is_admin"):
                return jsonify({
                    "error": "Admin access required"
                }), 403

        except Exception:
            return jsonify({
                "error": "Unauthorized or invalid token"
            }), 401

        return fn(*args, **kwargs)

    return wrapper
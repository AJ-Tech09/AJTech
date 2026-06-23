from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

from extensions import db
from models.admin import Admin

auth_bp = Blueprint("auth", __name__)


# REGISTER ADMIN (Run only once)
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    existing_admin = Admin.query.filter_by(email=email).first()

    if existing_admin:
        return jsonify({"error": "Admin already exists"}), 400

    hashed_password = generate_password_hash(password)

    admin = Admin(
        email=email,
        password=hashed_password
    )

    db.session.add(admin)
    db.session.commit()

    return jsonify({"message": "Admin registered successfully"}), 201


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    admin = Admin.query.filter_by(email=email).first()

    if not admin:
        return jsonify({"error": "Invalid credentials"}), 401

    if not check_password_hash(admin.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(
        identity=str(admin.id),
        additional_claims={"is_admin": True}
    )

    return jsonify({
        "token": token,
        "admin": {
            "id": admin.id,
            "email": admin.email
        }
    })


# ✅ VERIFY ADMIN TOKEN
# Frontend uses this to block /dashboard for invalid/non-admin tokens.
@auth_bp.route("/verify-admin", methods=["GET"])
def verify_admin():
    # We rely on the decorator used in projects routes.
    # If token is missing/invalid -> decorator returns 401.
    # If token belongs to non-admin -> decorator returns 403.
    from utils.decorators import admin_required  # local import to avoid circulars

    # just run the decorator-protected dummy handler
    @admin_required
    def _verify():
        return jsonify({"message": "Admin token is valid"}), 200

    return _verify()




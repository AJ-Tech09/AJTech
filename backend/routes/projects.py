from flask import Blueprint, request, jsonify, current_app
from models.project import Project
from extensions import db
from utils.auth import admin_required
import os

from werkzeug.utils import secure_filename

projects_bp = Blueprint("projects", __name__)

# 📦 GET ALL PROJECTS (public or admin — your choice)
@projects_bp.route("/", methods=["GET"],
                   strict_slashes=False)
def get_projects():
    projects = Project.query.all()

    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "price": p.price,
            "license": p.license,
            "live_demo": p.live_demo,
            "whatsapp": p.whatsapp,
            "image": p.image
        }
        for p in projects
    ])


# ➕ CREATE PROJECT (ADMIN ONLY)
@projects_bp.route("/", methods=["POST"],
                   strict_slashes=False)
@admin_required
def add_project():

    title = request.form.get("title")
    description = request.form.get("description")
    price_raw = request.form.get("price")
    try:
        price = float(price_raw) if price_raw is not None else None
    except ValueError:
        return jsonify({"message": "Invalid price"}), 400
    license = request.form.get("license")
    live_demo = request.form.get("live_demo")
    whatsapp = request.form.get("whatsapp")

    image = request.files.get("image")

    image_url = None

    if image:
        filename = secure_filename(image.filename)
        filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
        image.save(filepath)

        image_url = f"/static/uploads/{filename}"

    project = Project(
        title=title,
        description=description,
        price=price,
        license=license,
        live_demo=live_demo,
        whatsapp=whatsapp,
        image=image_url
    )

    db.session.add(project)
    db.session.commit()

    return jsonify({"message": "Project created"}), 201


# ✏️ UPDATE PROJECT (ADMIN ONLY)
@projects_bp.route("/<int:id>", methods=["PUT"],
                   strict_slashes=False)
@admin_required
def update_project(id):

    project = Project.query.get_or_404(id)

    project.title = request.form.get("title")
    project.description = request.form.get("description")

    price_raw = request.form.get("price")
    try:
        project.price = float(price_raw) if price_raw is not None else None
    except ValueError:
        return jsonify({"message": "Invalid price"}), 400

    project.license = request.form.get("license")
    project.live_demo = request.form.get("live_demo")
    project.whatsapp = request.form.get("whatsapp")

    image = request.files.get("image")

    if image:
        filename = secure_filename(image.filename)
        filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
        image.save(filepath)

        project.image = f"/static/uploads/{filename}"

    db.session.commit()

    return jsonify({"message": "Project updated"})


# 🗑 DELETE PROJECT (ADMIN ONLY)
@projects_bp.route("/<int:id>", methods=["DELETE"],
                   strict_slashes=False)
@admin_required
def delete_project(id):
    project = Project.query.get_or_404(id)

    db.session.delete(project)
    db.session.commit()

    return jsonify({"message": "Project deleted"})
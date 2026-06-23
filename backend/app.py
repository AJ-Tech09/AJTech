from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, jwt

from routes.auth import auth_bp
from routes.projects import projects_bp

from models.admin import Admin
from models.project import Project


app = Flask(__name__)

app.config.from_object(Config)

app.config["JWT_SECRET_KEY"] = "super-secret-change-this"
app.config["UPLOAD_FOLDER"] = "static/uploads"
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024  # 5 MB

db.init_app(app)
jwt.init_app(app)

CORS(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(projects_bp, url_prefix="/api/projects")


@app.route("/")
def home():
    return {
        "status": "success",
        "message": "Marketplace API is running"
    }


with app.app_context():
    db.create_all()
    print("✅ Tables created successfully!")


if __name__ == "__main__":
    app.run(debug=True)
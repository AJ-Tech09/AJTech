from app import app
from extensions import db

with app.app_context():
    try:
        db.engine.connect()
        print("✅ Database connected successfully!")
    except Exception as e:
        print("❌ Database connection failed:")
        print(e)
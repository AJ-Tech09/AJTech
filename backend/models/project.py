from extensions import db




class Project(db.Model):
    __tablename__ = "projects"
    
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)

    price = db.Column(db.Float, nullable=False)
    license = db.Column(db.String(100), nullable=False)

    live_demo = db.Column(db.String(255))
    whatsapp = db.Column(db.String(255))

    image = db.Column(db.String(255))
    gallery = db.Column(db.Text)  # we’ll store JSON later

    technologies = db.Column(db.String(255))
    featured = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"<Project {self.title}>"
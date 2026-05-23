"""Seed script: creates an admin user if none exists."""

from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.utils.auth import hash_password

Base.metadata.create_all(bind=engine)

db = SessionLocal()
admin = db.query(User).filter(User.is_admin == True).first()
if not admin:
    admin = User(
        email="admin@medpredict.ai",
        full_name="Admin User",
        hashed_password=hash_password("password123"),
        is_admin=True,
    )
    db.add(admin)
    db.commit()
    print("Admin user created: admin@medpredict.ai / password123")
else:
    print("Admin user already exists.")
db.close()

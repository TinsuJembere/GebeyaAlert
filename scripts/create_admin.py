# scripts/create_admin.py
import sys
from sqlmodel import Session, select
from database import engine
from models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)

BCRYPT_MAX_BYTES = 72


def hash_password(password: str) -> str:
    """
    Hash password safely for bcrypt.
    bcrypt only uses the first 72 bytes.
    """
    password_bytes = password.encode("utf-8")
    safe_password = password_bytes[:BCRYPT_MAX_BYTES]
    return pwd_context.hash(safe_password)


def create_admin(phone_number: str, password: str):
    with Session(engine) as db:
        try:
            existing_user = db.exec(
                select(User).where(User.phone_number == phone_number)
            ).first()

            if existing_user:
                print(f"User {phone_number} exists. Promoting to admin...")
                existing_user.is_admin = True
                existing_user.hashed_password = hash_password(password)
                db.commit()
                db.refresh(existing_user)
                print("Admin updated successfully")
                return

            admin = User(
                phone_number=phone_number,
                is_admin=True,
                language="en",
                hashed_password=hash_password(password),
            )

            db.add(admin)
            db.commit()
            db.refresh(admin)
            print(f"Admin user created: {phone_number}")

        except Exception as e:
            db.rollback()
            print(f"Error creating admin user: {e}")
            raise


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python -m scripts.create_admin <phone_number> [password]")
        sys.exit(1)

    phone_number = sys.argv[1]
    password = sys.argv[2] if len(sys.argv) > 2 else "admin123"

    create_admin(phone_number, password)

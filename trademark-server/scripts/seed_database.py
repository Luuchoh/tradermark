import sys
import os
from datetime import datetime, timezone, timedelta

# Add the parent directory to the path so we can import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from sqlmodel import create_engine, SQLModel

from app.domain.models.trademark import Trademark, TrademarkStatus
from app.infrastructure.database.connection import get_db_url

def create_tables(engine):
    """Create all tables in the database."""
    SQLModel.metadata.create_all(engine)

def seed_trademarks(session):
    """Seed the database with sample trademark data."""
    trademarks = [
        {"brand_name": "Apple", "title": "Think Different"},
        {"brand_name": "Microsoft", "title": "Be What's Next"},
        {"brand_name": "Samsung", "title": "Do What You Can't"},
        {"brand_name": "Intel", "title": "Intel Inside"},
        {"brand_name": "Coca-Cola", "title": "Destapa la felicidad"},
        {"brand_name": "Pepsi", "title": "That's What I Like"},
        {"brand_name": "McDonald's", "title": "I'm Lovin' It"},
        {"brand_name": "Burger King", "title": "Have It Your Way"},
        {"brand_name": "KFC", "title": "It's Finger Lickin' Good"},
        {"brand_name": "Nike", "title": "Just Do It"},
        {"brand_name": "Adidas", "title": "Impossible is Nothing"},
        {"brand_name": "Puma", "title": "Forever Faster"},
        {"brand_name": "Levi's", "title": "Quality Never Goes Out of Style"},
        {"brand_name": "BMW", "title": "The Ultimate Driving Machine"},
        {"brand_name": "Audi", "title": "Vorsprung durch Technik"},
        {"brand_name": "Toyota", "title": "Let's Go Places"},
        {"brand_name": "Volkswagen", "title": "Das Auto"},
    ]
    
    current_time = datetime.now(timezone(timedelta(hours=-5)))
    
    # Check if trademarks already exist to avoid duplicates
    existing_count = session.query(Trademark).count()
    if existing_count > 0:
        print(f"Database already contains {existing_count} trademarks. No new trademarks were added.")
        return
    
    # Add all trademarks
    for tm in trademarks:
        trademark = Trademark(
            brand_name=tm["brand_name"],
            title=tm["title"],
            status=TrademarkStatus.ENABLED,
            created_at=current_time,
            updated_at=current_time
        )
        session.add(trademark)
    
    session.commit()
    print(f"Successfully added {len(trademarks)} trademarks to the database.")

def main():
    # Get database URL from environment or use default
    database_url = get_db_url()
    engine = create_engine(database_url)
    
    # Create tables if they don't exist
    print("Creating database tables if they don't exist...")
    create_tables(engine)
    
    # Create a session and seed data
    with Session(engine) as session:
        print("Seeding database with sample trademarks...")
        seed_trademarks(session)
    
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    main()

from sqlmodel import Session

from app.infrastructure.database.connection import engine
from app.domain.models.trademark import Trademark

session = Session(engine)

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

for trademark in trademarks:
    session.add(Trademark(**trademark))
    session.commit()
    print(f"Added trademark: {trademark['brand_name']} - {trademark['title']}")

    
import sys
from os.path import dirname, abspath
from datetime import datetime, timedelta
import random

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Add the backend directory to sys.path so we can import 'app'
sys.path.insert(0, dirname(dirname(abspath(__file__))))

from app.core.config import settings
from app.models.category import Category
from app.models.shop import Shop
from app.models.sale import Sale
from app.models.employee import Employee
from app.models.rent import Rent

# Initialize the engine and session
engine = create_engine(settings.postgres_url)
SessionLocal = sessionmaker(bind=engine)

def clear_db(session):
    print("Clearing existing data...")
    session.query(Rent).delete()
    session.query(Employee).delete()
    session.query(Sale).delete()
    session.query(Shop).delete()
    session.query(Category).delete()
    session.commit()

def seed_data():
    session = SessionLocal()
    try:
        clear_db(session)

        print("Seeding categories...")
        categories = [
            Category(name="Fashion"),
            Category(name="Food & Beverage"),
            Category(name="Electronics"),
            Category(name="Services"),
            Category(name="Home & Decor"),
        ]
        session.add_all(categories)
        session.commit()

        print("Seeding shops...")
        shops_data = [
            {"name": "Zara", "category": "Fashion", "spot": "A-101"},
            {"name": "H&M", "category": "Fashion", "spot": "A-102"},
            {"name": "McDonalds", "category": "Food & Beverage", "spot": "F-201"},
            {"name": "Starbucks", "category": "Food & Beverage", "spot": "F-202"},
            {"name": "Apple Store", "category": "Electronics", "spot": "E-301"},
            {"name": "Samsung Experience", "category": "Electronics", "spot": "E-302"},
            {"name": "Cineplex", "category": "Services", "spot": "S-401"},
            {"name": "Nespresso", "category": "Home & Decor", "spot": "H-501"},
        ]
        
        shops = []
        for s in shops_data:
            cat = session.query(Category).filter_by(name=s["category"]).first()
            shop = Shop(name=s["name"], category_id=cat.id, spot_number=s["spot"])
            shops.append(shop)
        
        session.add_all(shops)
        session.commit()

        print("Seeding sales...")
        for shop in shops:
            for i in range(30): # Last 30 days
                date = datetime.utcnow() - timedelta(days=i)
                amount = random.uniform(500, 5000)
                sale = Sale(shop_id=shop.id, amount=round(amount, 2), date=date)
                session.add(sale)
        
        print("Seeding employees...")
        positions = ["Manager", "Sales Assistant", "Security", "Cashier"]
        for shop in shops:
            num_employees = random.randint(3, 8)
            for i in range(num_employees):
                employee = Employee(
                    shop_id=shop.id,
                    name=f"Employee {shop.id}-{i}",
                    position=random.choice(positions)
                )
                session.add(employee)

        print("Seeding rent records...")
        for shop in shops:
            for i in range(6): # Last 6 months
                due_date = datetime.utcnow().replace(day=1) - timedelta(days=i*30)
                amount = 2000 + (shop.id * 100) # Simple formula for variability
                rent = Rent(shop_id=shop.id, amount=amount, due_date=due_date)
                session.add(rent)

        session.commit()
        print("Seeding completed successfully!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    seed_data()

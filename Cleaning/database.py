from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DBRUL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class WeatherData(Base):
    __tablename__ = "weather"
    idweather = Column(Integer, primary_key=True, autoincrement=True)
    temp_maxc = Column(Float, nullable=False)
    temp_minc = Column(Float, nullable=False)
    tempc = Column(Float, nullable=False)
    humidity = Column(Integer, nullable=False)
    pressure = Column(Float, nullable=False)
    wind_speed = Column(Float, nullable=False)
    wind_direction = Column(String, nullable=False)
    clouds = Column(String, nullable=False)
    sunrise = Column(Integer, nullable=False)
    sunset = Column(Integer, nullable=False)
    weather = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    detail = Column(String, nullable=False)
    location = Column(String, nullable=None)
    time = Column(DateTime, nullable=None)

Base.metadata.create_all(engine)

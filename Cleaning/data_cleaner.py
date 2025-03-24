import requests
import pandas as pd
from io import StringIO
from database import engine, SessionLocal, WeatherData
from dotenv import load_dotenv
import os

load_dotenv()

INFLUX_URL = os.getenv("INFLUX_URL")
INFLUX_TOKEN = os.getenv("INFLUX_TOKEN")

HEADERS = {
    "Authorization": f"{INFLUX_TOKEN}",
    "Content-Type": "application/vnd.flux",
    "Accept": "application/csv"
}

QUERY = """
from(bucket: "CLIMA")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "CLIMA_GT")
"""

def fetch_influx_data():
    response = requests.post(INFLUX_URL, headers=HEADERS, data=QUERY)
    return pd.read_csv(StringIO(response.text)) if response.status_code == 200 else None

def clean():
    
    df = fetch_influx_data()
    if df is not None:
        df_firstFilter = df[['_value', 'LOCATION', '_time', '_field']]
        df_firstFilter = df_firstFilter[df_firstFilter['_value'] != '_value']
        df_firstFilter["_time"] = pd.to_datetime(df_firstFilter['_time']).dt.floor('s')
        df_pivot = df_firstFilter.pivot_table(index=["_time", "LOCATION"], columns="_field", values="_value", aggfunc="first").reset_index()
        
        session = SessionLocal() 
        for _, row in df_pivot.iterrows():
            exists = session.query(WeatherData).filter_by(
				time=row["_time"],
				location=row["LOCATION"]
			).first()
            
            if not exists:
                weather_entry = WeatherData(
					temp_maxc = row["TEMP_MAXC"],
					temp_minc = row["TEMP_MINC"],
					tempc = row["TEMPC"],
					humidity = row["HUMIDITY"],
					pressure = row["PRESSURE"],
					wind_speed = row["WINDSPEED"],
					wind_direction = row["WINDDIRECTION"],
					clouds = row["CLOUDS"],
					sunrise = row["SUNRISE"],
					sunset = row["SUNSET"],
					weather = row["WEATHER"],
					icon = row["ICON"],
					detail = row["DETAIL"],
					location = row["LOCATION"],
					time = row["_time"]
				)
                session.add(weather_entry)
                
        session.commit()
        session.close()
        print("Data cleaned & stored successfully!")

if __name__ == "__main__":
    clean()

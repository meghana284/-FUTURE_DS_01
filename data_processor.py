import pandas as pd
from datetime import datetime

def process_accident_data(file_path):
    """
    Reads accident data from a CSV, processes it to calculate KPIs,
    and prepares aggregated data for visualization.
    """
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return None, None

    # Convert 'Date' column to datetime objects
    df['Date'] = pd.to_datetime(df['Date'])
    df['Year'] = df['Date'].dt.year
    df['Month'] = df['Date'].dt.month_name().str.slice(0, 3) # Jan, Feb, etc.

    # Determine current and previous year based on the latest data
    current_year = df['Year'].max()
    previous_year = current_year - 1

    print(f"Processing data for Current Year: {current_year}, Previous Year: {previous_year}")

    # --- KPI Calculations ---
    kpis = {}

    # Casualties
    cy_casualties = df[df['Year'] == current_year]['Number_of_Casualties'].sum()
    py_casualties = df[df['Year'] == previous_year]['Number_of_Casualties'].sum()
    kpis['Total_CY_Casualties'] = cy_casualties
    kpis['Total_PY_Casualties'] = py_casualties
    kpis['Casualties_Change_Percent'] = ((cy_casualties - py_casualties) / py_casualties * 100) if py_casualties else 0

    # Accidents
    cy_accidents = df[df['Year'] == current_year]['Accident_ID'].nunique()
    py_accidents = df[df['Year'] == previous_year]['Accident_ID'].nunique()
    kpis['Total_CY_Accidents'] = cy_accidents
    kpis['Total_PY_Accidents'] = py_accidents
    kpis['Accidents_Change_Percent'] = ((cy_accidents - py_accidents) / py_accidents * 100) if py_accidents else 0

    # Severity-based Casualties
    for severity in ['Fatal', 'Serious', 'Slight']:
        cy_sev_cas = df[(df['Year'] == current_year) & (df['Severity_Casualty'] == severity)]['Number_of_Casualties'].sum()
        py_sev_cas = df[(df['Year'] == previous_year) & (df['Severity_Casualty'] == severity)]['Number_of_Casualties'].sum()
        kpis[f'CY_{severity}_Casualties'] = cy_sev_cas
        kpis[f'PY_{severity}_Casualties'] = py_sev_cas
        kpis[f'{severity}_Casualties_Change_Percent'] = ((cy_sev_cas - py_sev_cas) / py_sev_cas * 100) if py_sev_cas else 0

    # --- Aggregations for Charts ---

    # Casualties by Vehicle Type (Current Year)
    casualties_by_vehicle = df[df['Year'] == current_year].groupby('Vehicle_Type')['Number_of_Casualties'].sum().sort_values(ascending=False).to_dict()

    # Monthly Trend (CY vs PY)
    monthly_trend_cy = df[df['Year'] == current_year].groupby('Month')['Number_of_Casualties'].sum().reindex(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], fill_value=0).to_dict()
    monthly_trend_py = df[df['Year'] == previous_year].groupby('Month')['Number_of_Casualties'].sum().reindex(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], fill_value=0).to_dict()

    # Casualties by Urban/Rural (Current Year)
    casualties_by_urban_rural = df[df['Year'] == current_year].groupby('Urban_Rural')['Number_of_Casualties'].sum().to_dict()

    # Casualties by Road Type (Current Year)
    casualties_by_road_type = df[df['Year'] == current_year].groupby('Road_Type')['Number_of_Casualties'].sum().sort_values(ascending=False).to_dict()

    # Casualties by Light Condition (Current Year)
    casualties_by_light_condition = df[df['Year'] == current_year].groupby('Light_Condition')['Number_of_Casualties'].sum().to_dict()

    # Location data (Current Year)
    location_data = df[df['Year'] == current_year][['Location_Lat', 'Location_Long', 'Number_of_Casualties', 'Severity_Casualty', 'City']].to_dict(orient='records')


    processed_data = {
        'kpis': kpis,
        'charts_data': {
            'casualties_by_vehicle': casualties_by_vehicle,
            'monthly_trend_cy': monthly_trend_cy,
            'monthly_trend_py': monthly_trend_py,
            'casualties_by_urban_rural': casualties_by_urban_rural,
            'casualties_by_road_type': casualties_by_road_type,
            'casualties_by_light_condition': casualties_by_light_condition,
            'location_data': location_data
        }
    }

    return processed_data, current_year

if __name__ == "__main__":
    # To run this script, you need pandas: pip install pandas
    data_file = '../data/road_accidents.csv' # Adjust path if running from a different directory
    processed_data, current_year = process_accident_data(data_file)

    if processed_data:
        print("\n--- KPIs ---")
        print(f"Current Year: {current_year}")
        for k, v in processed_data['kpis'].items():
            print(f"{k}: {v:.1f}" if isinstance(v, (int, float)) else f"{k}: {v}")

        print("\n--- Casualties by Vehicle Type (CY) ---")
        print(processed_data['charts_data']['casualties_by_vehicle'])

        print("\n--- Monthly Trend (CY) ---")
        print(processed_data['charts_data']['monthly_trend_cy'])

        print("\n--- Monthly Trend (PY) ---")
        print(processed_data['charts_data']['monthly_trend_py'])

        print("\n--- Casualties by Urban/Rural (CY) ---")
        print(processed_data['charts_data']['casualties_by_urban_rural'])

        print("\n--- Casualties by Road Type (CY) ---")
        print(processed_data['charts_data']['casualties_by_road_type'])

        print("\n--- Casualties by Light Condition (CY) ---")
        print(processed_data['charts_data']['casualties_by_light_condition'])

        print("\n--- Location Data (CY) ---")
        # print(processed_data['charts_data']['location_data']) # Can be large, print first few
        print(f"First 5 location records: {processed_data['charts_data']['location_data'][:5]}")

    # You could save 'processed_data' as a JSON file here for the frontend to consume
    # import json
    # with open('../data/processed_data.json', 'w') as f:
    #     json.dump(processed_data, f, indent=4)
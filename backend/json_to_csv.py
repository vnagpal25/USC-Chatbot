import csv
import json

with open('all_parsed_2_40.json', 'r') as file:
    data = json.load(file)

csv_filename = "Chat.csv"

# Extract field names
field_names = data[0].keys()

# Writing to CSV file
with open(csv_filename, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=field_names)
    
    # Write header
    writer.writeheader()
    
    # Write data
    for item in data:
        writer.writerow(item)

print(f"CSV file '{csv_filename}' has been created successfully.")

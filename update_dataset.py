import pdfplumber
import pandas as pd
import os

CSV_FILE = "data/resumes.csv"

def extract_text(path):
    text = ""
    try:
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
    except:
        return ""
    return text.lower()

# Input new file
new_file = input("Enter new PDF filename (inside data/resumes): ")

path = os.path.join("data/resumes", new_file)

if not os.path.exists(path):
    print("❌ File not found")
    exit()

text = extract_text(path)

new_row = pd.DataFrame([{
    "resume": new_file,
    "text": text
}])

# Append
if os.path.exists(CSV_FILE):
    df = pd.read_csv(CSV_FILE)
    df = pd.concat([df, new_row], ignore_index=True)
else:
    df = new_row

df.to_csv(CSV_FILE, index=False)

print("✅ Resume added to CSV")
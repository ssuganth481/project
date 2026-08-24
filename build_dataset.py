import pdfplumber
import os
import pandas as pd

INPUT_FOLDER = "data/"
OUTPUT_FILE = "data/resumes.csv"

def extract_text(path):
    text = ""
    try:
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
    except:
        return ""
    return text.lower()

data = []

for file in os.listdir(INPUT_FOLDER):
    if file.endswith(".pdf"):
        path = os.path.join(INPUT_FOLDER, file)
        text = extract_text(path)

        data.append({
            "resume": file,
            "text": text
        })

df = pd.DataFrame(data)
df.to_csv(OUTPUT_FILE, index=False)

print("✅ All resumes converted to CSV")
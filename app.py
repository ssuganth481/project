import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression

st.set_page_config(page_title="HR AI System", layout="wide")
st.title("🧑‍💼 HR AI Management System")

# -------------------------------
# ROLE SKILLS
# -------------------------------
ROLE_SKILLS = {
    "Data Scientist": ["python", "machine learning", "sql"],
    "Web Developer": ["html", "css", "javascript"],
    "Data Analyst": ["excel", "sql", "power bi"],
    "HR Executive": ["communication", "management"]
}

# -------------------------------
# LOAD RESUME CSV (FAST)
# -------------------------------
@st.cache_data
def load_resumes():
    return pd.read_csv("data/resumes.csv")

# -------------------------------
# ANALYZE FUNCTION
# -------------------------------
def analyze(text, role):
    skills = ROLE_SKILLS[role]

    found = [s for s in skills if s in text]
    missing = [s for s in skills if s not in text]

    score = len(found) * 10
    match = int((len(found)/len(skills))*100)

    return score, found, missing, match

# -------------------------------
# SIDEBAR
# -------------------------------
role = st.sidebar.selectbox("Role", list(ROLE_SKILLS.keys()))
num_hires = st.sidebar.slider("Hire Count", 1, 10, 3)

# -------------------------------
# TABS
# -------------------------------
tab1, tab2 = st.tabs(["📄 Hiring", "👨‍💼 Employees"])

# ===============================
# 📄 HIRING
# ===============================
with tab1:

    df_raw = load_resumes()

    data = []
    for _, row in df_raw.iterrows():
        text = str(row["text"]).lower()

        score, found, missing, match = analyze(text, role)

        data.append({
            "Resume": row["resume"],
            "Score": score,
            "Match %": match,
            "Strengths": ", ".join(found),
            "Weakness": ", ".join(missing)
        })

    df = pd.DataFrame(data).sort_values("Score", ascending=False)

    # Ranking badge
    def badge(i):
        return ["🥇","🥈","🥉"][i] if i < 3 else ""

    df["Rank"] = [badge(i) for i in range(len(df))]

    # TOP
    st.subheader("🏆 Top Candidates")
    st.dataframe(df.head(num_hires), use_container_width=True)

    # VISUAL
    st.subheader("📊 Top Candidate Comparison")
    st.bar_chart(df.head(num_hires).set_index("Resume")["Score"])

    # WEAKNESS
    st.subheader("⚠️ Candidate Weakness Analysis")
    st.dataframe(df[["Resume","Weakness"]], use_container_width=True)

    # FULL TABLE
    st.subheader("📋 All Candidates")
    st.dataframe(df, use_container_width=True)

# ===============================
# 👨‍💼 EMPLOYEE
# ===============================
with tab2:

    emp = pd.read_csv("data/data.csv")

    X = emp[["experience","projects_completed","performance_score","attendance"]]
    y = emp["promotion"]

    model = LogisticRegression()
    model.fit(X,y)

    emp["Predicted Promotion"] = model.predict(X)

    # TOP 10
    top10 = emp.sort_values("performance_score", ascending=False).head(10)

    st.subheader("🏆 Top 10 Employees")
    st.dataframe(top10, use_container_width=True)

    # VISUAL
    st.subheader("📊 Employee Ranking Chart")
    st.bar_chart(top10.set_index("name")["performance_score"])

    # COMPARISON
    st.subheader("⚖️ Employee Comparison")

    selected = st.multiselect("Select Employees", emp["name"])

    if len(selected) >= 2:
        st.dataframe(emp[emp["name"].isin(selected)], use_container_width=True)

    # BEST
    best = emp.iloc[emp["performance_score"].idxmax()]
    st.success(f"⭐ Best Employee: {best['name']} ({best['performance_score']})")
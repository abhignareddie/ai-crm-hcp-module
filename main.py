from fastapi import FastAPI
from langgraph_agent import app_graph
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load AI model
generator = pipeline("text-generation", model="gpt2")
@app.get("/agent")
def run_agent(query: str):
    result = app_graph.invoke({"input": query})
    return {"response": result["output"]}
# Simple in-memory database
customers = []

# Home route
@app.get("/")
def home():
    return {"message": "AI CRM Assistant Running"}

# ---------------------------------
# 1️⃣ AI CHAT ASSISTANT
# ---------------------------------

@app.get("/ai")
def ai(query: str):

    prompt = f"User: {query}\nAssistant:"

    result = generator(
        prompt,
        max_new_tokens=40,
        num_return_sequences=1,
        truncation=True
    )

    text = result[0]["generated_text"]
    answer = text.split("Assistant:")[-1].strip()

    return {"response": answer}


# ---------------------------------
# 2️⃣ ADD CUSTOMER
# ---------------------------------

@app.post("/add_customer")
def add_customer(name: str, email: str, company: str):

    customer = {
        "name": name,
        "email": email,
        "company": company
    }

    customers.append(customer)

    return {
        "message": "Customer added successfully",
        "data": customer
    }


# ---------------------------------
# 3️⃣ GET CUSTOMERS
# ---------------------------------

@app.get("/customers")
def get_customers():
    return customers


# ---------------------------------
# 4️⃣ AI EMAIL GENERATOR
# ---------------------------------

@app.get("/generate_email")
def generate_email(name: str, product: str):

    prompt = f"Write a professional sales email to {name} introducing {product}"

    result = generator(prompt, max_new_tokens=80)

    return {
        "email": result[0]["generated_text"]
    }


# ---------------------------------
# 5️⃣ MEETING SUMMARY AI
# ---------------------------------

@app.get("/summarize")
def summarize(notes: str):

    prompt = f"Summarize this customer meeting note:\n{notes}"

    result = generator(prompt, max_new_tokens=60)

    return {
        "summary": result[0]["generated_text"]
    }
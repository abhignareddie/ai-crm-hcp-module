# AI CRM HCP Module

## Project Overview
AI CRM HCP Module is an AI-powered Customer Relationship Management system specifically designed for Healthcare Professionals (HCPs).  
It helps HCPs manage their customers efficiently, automate tasks, and get AI-assisted insights to improve sales and client interactions.

This project is structured as a full-stack application with separate `frontend` and `backend` modules.

---

## Features
- **Customer Management:** Add, view, and manage customer information.
- **AI Sales Email Generator:** Automatically create sales emails for products or services.
- **Meeting Notes Summarization:** Paste meeting notes and get concise AI-generated summaries.
- **Dashboard Analytics:** View customer insights and sales performance in real-time.
- **Modular Architecture:** Clean separation of backend and frontend modules.

---

## Project Structure
ai-crm-hcp-module/
├─ backend/ # Backend server (Node.js/Express or Python)
│ ├─ routes/ # API routes
│ ├─ models/ # Database models
│ └─ server.js # Main backend server file
├─ frontend/ # React frontend code
│ ├─ components/ # React components
│ ├─ pages/ # Application pages
│ └─ App.js # Main React entry file
├─ README.md # Project description
└─ .gitignore # Files to ignore in Git

---

## Technologies Used
- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js / Express (or Python/Flask)
- **AI Tools:** GPT-based NLP models for email generation and meeting summaries
- **Database:** MongoDB (optional MySQL support)
- **Version Control:** Git & GitHub

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed or cloud database setup
- Optional: MySQL installed (if using relational DB support)

### Run Backend
```bash
cd backend
npm install
npm start   # or 'node server.js'

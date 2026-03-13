from langchain.tools import tool
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage
from typing import TypedDict

# Temporary storage
interactions = []

class AgentState(TypedDict):
    input: str
    output: str

# TOOL 1
@tool
def log_interaction(data: str):
    """Log interaction with HCP"""
    interactions.append(data)
    return f"Interaction logged: {data}"

# TOOL 2
@tool
def edit_interaction(data: str):
    """Edit last interaction"""
    if interactions:
        interactions[-1] = data
        return f"Interaction updated to: {data}"
    return "No interaction found"

# TOOL 3
@tool
def get_interactions(data: str):
    """Get all interactions"""
    return str(interactions)

# TOOL 4
@tool
def generate_email(data: str):
    """Generate follow-up email"""
    return f"""
    Dear Doctor,

    Thank you for the meeting regarding {data}.
    Please let me know if you need more information.

    Regards,
    Sales Representative
    """

# TOOL 5
@tool
def summarize_notes(data: str):
    """Summarize notes"""
    return f"Summary: {data[:100]}..."

tools = [log_interaction, edit_interaction, get_interactions, generate_email, summarize_notes]


def agent_node(state):
    user_input = state["input"]

    if "log" in user_input:
        result = log_interaction.invoke(user_input)
    elif "edit" in user_input:
        result = edit_interaction.invoke(user_input)
    elif "show" in user_input:
        result = get_interactions.invoke(user_input)
    elif "email" in user_input:
        result = generate_email.invoke(user_input)
    else:
        result = summarize_notes.invoke(user_input)

    return {"output": result}


graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)

graph.set_entry_point("agent")
graph.add_edge("agent", END)

app_graph = graph.compile()
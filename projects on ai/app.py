from flask import Flask, render_template, request, jsonify, redirect, session
from chatbot import ask_ai
from database import users, conversations, messages

from bson import ObjectId
from datetime import datetime
import bcrypt

app = Flask(__name__)
app.secret_key = "crazypt123"

try:
    users.count_documents({})
    print("✅ MongoDB Connected Successfully!")
except Exception as e:
    print("❌ MongoDB Connection Failed")
    print(e)


@app.route("/")
def landing():
    return render_template("landing.html")


@app.route("/chatbot")
def chatbot_page():

    if "user_id" not in session:
        return redirect("/login")

    return render_template("index.html")

@app.route("/logout")
def logout():

    session.clear()

    return redirect("/")


@app.route("/about")
def about():
    return render_template("about.html")


from flask import session

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"]
        password = request.form["password"]

        user = users.find_one({"email": email})

        if user and bcrypt.checkpw(
            password.encode("utf-8"),
            user["password"]
        ):

            session["user_id"] = str(user["_id"])
            session["username"] = user["username"]

            return redirect("/chatbot")

        return "Invalid Email or Password"

    return render_template("login.html")

from flask import request, redirect
import bcrypt

@app.route("/signup", methods=["GET", "POST"])
def signup():

    if request.method == "POST":

        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]

        # Check if email already exists
        if users.find_one({"email": email}):
            return "Email already exists!"

        # Hash password
        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        )

        users.insert_one({
            "username": username,
            "email": email,
            "password": hashed_password
        })

        return redirect("/login")

    return render_template("signup.html")


from datetime import datetime

@app.route("/new_chat", methods=["POST"])
def new_chat():

    if "user_id" not in session:
        return jsonify({"error": "Please login"}), 401

    result = conversations.insert_one({
        "user_id": session["user_id"],
        "title": "New Chat",
        "created_at": datetime.utcnow()
    })

    return jsonify({
        "conversation_id": str(result.inserted_id)
    })

@app.route("/chat", methods=["POST"])
def chat():

    if "user_id" not in session:
        return jsonify({"reply": "Please login first."})

    data = request.get_json()

    message = data["message"]
    conversation_id = data["conversation_id"]

    reply = ask_ai(message)

    messages.insert_one({

        "conversation_id": ObjectId(conversation_id),

        "question": message,

        "answer": reply,

        "created_at": datetime.utcnow()

    })

    return jsonify({
        "reply": reply
    })

@app.route("/history")
def history():

    if "user_id" not in session:
        return jsonify([])

    chats = list(

        conversations.find({

            "user_id": session["user_id"]

        }).sort("created_at",-1)

    )

    for chat in chats:

        chat["_id"] = str(chat["_id"])

    return jsonify(chats)

@app.route("/conversation/<conversation_id>")
def conversation(conversation_id):

    data = list(messages.find({

        "conversation_id": ObjectId(conversation_id)

    }))

    for msg in data:

        msg["_id"] = str(msg["_id"])
        msg["conversation_id"] = str(msg["conversation_id"])

    return jsonify(data)

@app.route("/conversation/<conversation_id>", methods=["DELETE"])
def delete_conversation(conversation_id):

    conversations.delete_one({
        "_id": ObjectId(conversation_id)
    })

    messages.delete_many({
        "conversation_id": ObjectId(conversation_id)
    })

    return jsonify({
        "success": True
    })

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, render_template, request, jsonify

from chatbot import ask_ai

app = Flask(__name__)


@app.route("/")
def landing():
    return render_template("landing.html")


@app.route("/chatbot")
def chatbot_page():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/signup")
def signup():
    return render_template("signup.html")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data["message"]

    reply = ask_ai(user_message)

    return jsonify({
        "reply": reply
    })


if __name__ == "__main__":
    app.run(debug=True)
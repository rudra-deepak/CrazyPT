from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["CrazyPT"]

users = db["users"]
conversations = db["conversations"]
messages = db["messages"]


import os
from dotenv import load_dotenv

load_dotenv()

print(os.getenv("MONGO_URI"))
    
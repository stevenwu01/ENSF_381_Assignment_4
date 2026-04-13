'''
Group members:
    Steven Wu - 30250197
    Paolo Abad- 30243706
'''

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
import re
import bcrypt
from datetime import datetime

app = Flask(__name__)
CORS(app)

def load_json_file(filename):
    with open(filename, "r", encoding="utf-8") as file:
        return json.load(file)

flavors_data = load_json_file("flavors.json")
reviews_data = load_json_file("reviews.json")

users = [
    {
        "id": 1,
        "username": "sweet_alice",
        "email": "alice@example.com",
        "password_hash": bcrypt.hashpw("IceCream!23".encode("utf-8"), bcrypt.gensalt()).decode("utf-8"),
        "cart": [],
        "orders": []
    }
]

def is_valid_name(username):
    if len(username) < 3 or len(username) > 20:
        return False

    if not username[0].isalpha():
        return False

    for ch in username:
        if not (ch.isalnum() or ch == "_" or ch == "-"):
            return False

    return True

def is_valid_email(email):
    if "@" not in email or "." not in email:
        return False

    parts = email.split("@")
    if len(parts) != 2:
        return False

    local_part = parts[0]
    domain_part = parts[1]

    if local_part == "" or domain_part == "":
        return False

    if "." not in domain_part:
        return False

    return True

def is_valid_password(password):
    if len(password) < 8:
        return False

    has_upper = False
    has_lower = False
    has_digit = False
    has_special = False

    for ch in password:
        if ch.isupper():
            has_upper = True
        elif ch.islower():
            has_lower = True
        elif ch.isdigit():
            has_digit = True
        else:
            has_special = True

    if not has_upper:
        return False
    if not has_lower:
        return False
    if not has_digit:
        return False
    if not has_special:
        return False

    return True

def find_user_by_username(username):
    for user in users:
        if user["username"] == username:
            return user
    return None

def find_user_by_id(user_id):
    for user in users:
        if user["id"] == user_id:
            return user
    return None

@app.route("/flavors", methods=["GET"])
def get_flavors():
    return jsonify({
        "success": True,
        "message": "Flavors loaded.",
        "flavors": flavors_data
    })

@app.route("/reviews", methods=["GET"])
def get_reviews():
    selected_reviews = random.sample(reviews_data, min(2, len(reviews_data)))
    return jsonify({
        "success": True,
        "message": "Reviews loaded.",
        "reviews": selected_reviews
    })

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not is_valid_name(username):
        return jsonify({
            "success": False,
            "message": "Invalid username."
        }), 400

    if not is_valid_email(email):
        return jsonify({
            "success": False,
            "message": "Invalid email format."
        }), 400

    if not is_valid_password(password):
        return jsonify({
            "success": False,
            "message": "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        }), 400

    for user in users:
        if user["username"] == username:
            return jsonify({
                "success": False,
                "message": "Username is already taken."
            }), 400

    for user in users:
        if user["email"] == email:
            return jsonify({
                "success": False,
                "message": "Email is already taken."
            }), 400

    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    new_user = {
        "id": len(users) + 1,
        "username": username,
        "email": email,
        "password_hash": password_hash,
        "cart": [],
        "orders": []
    }

    users.append(new_user)

    return jsonify({
        "success": True,
        "message": "Registration successful."
    }), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username", "").strip()
    password = data.get("password", "")

    user = find_user_by_username(username)

    if user is None:
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 401

    if not bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 401

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "userId": user["id"],
        "username": user["username"]
    })

@app.route("/cart", methods=["GET"])
def get_cart():
    user_id = request.args.get("userId", type=int)
    user = find_user_by_id(user_id)

    if user is None:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    return jsonify({
        "success": True,
        "message": "Cart loaded.",
        "cart": user["cart"]
    })

@app.route("/cart", methods=["POST"])
def add_to_cart():
    data = request.get_json()

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")

    user = find_user_by_id(user_id)
    if user is None:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    flavor = None
    for item in flavors_data:
        if item["id"] == flavor_id:
            flavor = item

    if flavor is None:
        return jsonify({
            "success": False,
            "message": "Flavor not found."
        }), 404

    for item in user["cart"]:
        if item["flavorId"] == flavor_id:
            return jsonify({
                "success": False,
                "message": "Flavor already in cart."
            }), 400

    price = float(flavor["price"].replace("$", ""))

    cart_item = {
        "flavorId": flavor["id"],
        "name": flavor["name"],
        "price": price,
        "quantity": 1
    }

    user["cart"].append(cart_item)

    return jsonify({
        "success": True,
        "message": "Flavor added to cart.",
        "cart": user["cart"]
    })

@app.route("/cart", methods=["PUT"])
def update_cart():
    data = request.get_json()

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")
    quantity = data.get("quantity")

    user = find_user_by_id(user_id)
    if user is None:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    if quantity < 1:
        return jsonify({
            "success": False,
            "message": "Quantity must be at least 1."
        }), 400

    found = False
    for item in user["cart"]:
        if item["flavorId"] == flavor_id:
            item["quantity"] = quantity
            found = True

    if not found:
        return jsonify({
            "success": False,
            "message": "Flavor not found in cart."
        }), 404

    return jsonify({
        "success": True,
        "message": "Cart updated successfully.",
        "cart": user["cart"]
    })

@app.route("/cart", methods=["DELETE"])
def delete_cart_item():
    data = request.get_json()

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")

    user = find_user_by_id(user_id)
    if user is None:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    new_cart = []
    removed = False

    for item in user["cart"]:
        if item["flavorId"] == flavor_id:
            removed = True
        else:
            new_cart.append(item)

    if not removed:
        return jsonify({
            "success": False,
            "message": "Flavor not found in cart."
        }), 404

    user["cart"] = new_cart

    return jsonify({
        "success": True,
        "message": "Flavor removed from cart.",
        "cart": user["cart"]
    })

@app.route("/orders", methods=["POST"])
def place_order():
    data = request.get_json()

    user_id = data.get("userId")
    user = find_user_by_id(user_id)

    if user is None:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    if len(user["cart"]) == 0:
        return jsonify({
            "success": False,
            "message": "Cart is empty."
        }), 400

    total = 0
    items = []

    for item in user["cart"]:
        items.append({
            "flavorId": item["flavorId"],
            "name": item["name"],
            "price": item["price"],
            "quantity": item["quantity"]
        })
        total += item["price"] * item["quantity"]

    new_order = {
        "orderId": len(user["orders"]) + 1,
        "items": items,
        "total": round(total, 2),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    user["orders"].append(new_order)
    user["cart"] = []

    return jsonify({
        "success": True,
        "message": "Order placed successfully.",
        "orderId": new_order["orderId"]
    })

@app.route("/orders", methods=["GET"])
def get_orders():
    user_id = request.args.get("userId", type=int)
    user = find_user_by_id(user_id)

    if user is None:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    return jsonify({
        "success": True,
        "message": "Order history loaded.",
        "orders": user["orders"]
    })

if __name__ == "__main__":
    app.run(debug=True)
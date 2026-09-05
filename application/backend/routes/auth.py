from flask import Blueprint, jsonify, request
from database import get_db_connection
from werkzeug.security import generate_password_hash, check_password_hash


auth_bp = Blueprint("auth", __name__)


# ==========================================
# REGISTER
# ==========================================

@auth_bp.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")


    # Validate input
    if not name or not email or not password:

        return jsonify({
            "message": "Name, email and password are required"
        }), 400


    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)


    # Check if email already exists
    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    existing_user = cursor.fetchone()


    if existing_user:

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Email already registered"
        }), 409


    # Hash password
    password_hash = generate_password_hash(password)


    # Insert user
    cursor.execute("""
        INSERT INTO users (name, email, password)
        VALUES (%s, %s, %s)
    """, (
        name,
        email,
        password_hash
    ))


    connection.commit()

    user_id = cursor.lastrowid

    cursor.close()
    connection.close()


    return jsonify({
        "message": "Registration successful",
        "user_id": user_id
    }), 201


# ==========================================
# LOGIN
# ==========================================

@auth_bp.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")


    # Validate input
    if not email or not password:

        return jsonify({
            "message": "Email and password are required"
        }), 400


    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)


    # Find user
    cursor.execute("""
        SELECT id, name, email, password
        FROM users
        WHERE email = %s
    """, (email,))


    user = cursor.fetchone()

    cursor.close()
    connection.close()


    # User not found
    if user is None:

        return jsonify({
            "message": "Invalid email or password"
        }), 401


    # Check password
    if not check_password_hash(
        user["password"],
        password
    ):

        return jsonify({
            "message": "Invalid email or password"
        }), 401


    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    })
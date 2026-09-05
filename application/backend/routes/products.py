from flask import Blueprint, jsonify, request
from database import get_db_connection


products_bp = Blueprint("products", __name__)


# ==========================================
# GET ALL PRODUCTS
# ==========================================

@products_bp.route("/api/products", methods=["GET"])
def get_products():

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, name, description, price, image, created_at
        FROM products
        ORDER BY id
    """)

    products = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(products)


# ==========================================
# GET SINGLE PRODUCT
# ==========================================

@products_bp.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, name, description, price, image, created_at
        FROM products
        WHERE id = %s
    """, (product_id,))

    product = cursor.fetchone()

    cursor.close()
    connection.close()

    if product is None:

        return jsonify({
            "message": "Product not found"
        }), 404

    return jsonify(product)


# ==========================================
# CREATE PRODUCT
# ==========================================

@products_bp.route("/api/products", methods=["POST"])
def create_product():

    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    image = data.get("image")


    if not name or price is None:

        return jsonify({
            "message": "Name and price are required"
        }), 400


    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO products
        (name, description, price, image)
        VALUES (%s, %s, %s, %s)
    """, (
        name,
        description,
        price,
        image
    ))

    connection.commit()

    product_id = cursor.lastrowid

    cursor.close()
    connection.close()


    return jsonify({
        "message": "Product created successfully",
        "product_id": product_id
    }), 201


# ==========================================
# UPDATE PRODUCT
# ==========================================

@products_bp.route("/api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):

    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    image = data.get("image")


    connection = get_db_connection()
    cursor = connection.cursor()


    # Check product exists
    cursor.execute(
        "SELECT id FROM products WHERE id = %s",
        (product_id,)
    )

    product = cursor.fetchone()


    if product is None:

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Product not found"
        }), 404


    cursor.execute("""
        UPDATE products
        SET name = %s,
            description = %s,
            price = %s,
            image = %s
        WHERE id = %s
    """, (
        name,
        description,
        price,
        image,
        product_id
    ))


    connection.commit()

    cursor.close()
    connection.close()


    return jsonify({
        "message": "Product updated successfully"
    })


# ==========================================
# DELETE PRODUCT
# ==========================================

@products_bp.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):

    connection = get_db_connection()
    cursor = connection.cursor()


    # Check product exists
    cursor.execute(
        "SELECT id FROM products WHERE id = %s",
        (product_id,)
    )

    product = cursor.fetchone()


    if product is None:

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Product not found"
        }), 404


    cursor.execute(
        "DELETE FROM products WHERE id = %s",
        (product_id,)
    )

    connection.commit()

    cursor.close()
    connection.close()


    return jsonify({
        "message": "Product deleted successfully"
    })
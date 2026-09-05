from flask import Blueprint, jsonify, request
from database import get_db_connection


orders_bp = Blueprint("orders", __name__)


# ==========================================
# CREATE ORDER
# ==========================================

@orders_bp.route("/api/orders", methods=["POST"])
def create_order():

    data = request.get_json()

    user_id = data.get("user_id")
    items = data.get("items")


    # Validate request
    if not user_id or not items:

        return jsonify({
            "message": "user_id and items are required"
        }), 400


    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)


    try:

        total_amount = 0


        # --------------------------------------
        # Check products and calculate total
        # --------------------------------------

        for item in items:

            product_id = item.get("product_id")
            quantity = item.get("quantity")


            if not product_id or not quantity or quantity <= 0:

                connection.rollback()

                return jsonify({
                    "message": "Invalid product or quantity"
                }), 400


            cursor.execute("""
                SELECT id, price
                FROM products
                WHERE id = %s
            """, (product_id,))


            product = cursor.fetchone()


            if product is None:

                connection.rollback()

                return jsonify({
                    "message": f"Product {product_id} not found"
                }), 404


            total_amount += (
                float(product["price"]) * quantity
            )


        # --------------------------------------
        # Create order
        # --------------------------------------

        cursor.execute("""
            INSERT INTO orders
            (user_id, total_amount, status)
            VALUES (%s, %s, %s)
        """, (
            user_id,
            total_amount,
            "Processing"
        ))


        order_id = cursor.lastrowid


        # --------------------------------------
        # Create order items
        # --------------------------------------

        for item in items:

            product_id = item.get("product_id")
            quantity = item.get("quantity")


            cursor.execute("""
                SELECT price
                FROM products
                WHERE id = %s
            """, (product_id,))


            product = cursor.fetchone()


            cursor.execute("""
                INSERT INTO order_items
                (order_id, product_id, quantity, price)
                VALUES (%s, %s, %s, %s)
            """, (
                order_id,
                product_id,
                quantity,
                product["price"]
            ))


        # Save transaction
        connection.commit()


        return jsonify({
            "message": "Order created successfully",
            "order_id": order_id,
            "total_amount": total_amount
        }), 201


    except Exception as error:

        connection.rollback()

        return jsonify({
            "message": "Failed to create order",
            "error": str(error)
        }), 500


    finally:

        cursor.close()
        connection.close()


# ==========================================
# GET USER ORDERS
# ==========================================

@orders_bp.route("/api/orders/<int:user_id>", methods=["GET"])
def get_user_orders(user_id):

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)


    cursor.execute("""
        SELECT
            id,
            user_id,
            total_amount,
            status,
            created_at
        FROM orders
        WHERE user_id = %s
        ORDER BY created_at DESC
    """, (user_id,))


    orders = cursor.fetchall()


    for order in orders:

        cursor.execute("""
            SELECT
                oi.product_id,
                p.name,
                oi.quantity,
                oi.price
            FROM order_items oi
            JOIN products p
                ON oi.product_id = p.id
            WHERE oi.order_id = %s
        """, (order["id"],))


        order["items"] = cursor.fetchall()


    cursor.close()
    connection.close()


    return jsonify(orders)
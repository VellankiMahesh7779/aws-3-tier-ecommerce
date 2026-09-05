from flask import Flask, jsonify
from flask_cors import CORS

from database import get_db_connection
from routes.products import products_bp
from routes.auth import auth_bp
from routes.orders import orders_bp


app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:8000",
                "http://127.0.0.1:8000"
            ]
        }
    }
)


app.register_blueprint(products_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(orders_bp)


@app.route("/")
def home():

    return jsonify({
        "message": "Tutu Store Backend is running"
    })


@app.route("/api/health")
def health():

    try:

        connection = get_db_connection()

        if connection.is_connected():

            connection.close()

            return jsonify({
                "status": "healthy",
                "database": "connected"
            })

    except Exception as error:

        return jsonify({
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(error)
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
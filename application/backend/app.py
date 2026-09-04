from flask import Flask, jsonify


app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "message": "AWS 3-Tier E-Commerce Backend is running"
    })


@app.route("/api/health")
def health():
    return jsonify({
        "status": "healthy"
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
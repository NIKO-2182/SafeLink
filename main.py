from flask import Flask
from app import model

# Initialize Flask app
app = Flask(__name__)

# Register blueprint for API routes
app.register_blueprint(model)


if __name__ == '__main__':
    print("🚀 Starting Phishing Detection API...")
    print("📍 Server running on http://localhost:6007/api/predict")
    app.run(host='0.0.0.0', port=6007, debug=True)

from flask import Blueprint, jsonify, request
from Prediction_model import classify_url
from URL_extractor import extract_features

model = Blueprint("PhiModel", __name__, url_prefix="/api")

@model.route("/predict", methods=["POST"])
def phishing_detector():
    try:
        # Validate input
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({
                'error': 'URL is required',
                'status': 400
            }), 400

        url = data['url'].strip()
        if not url:
            return jsonify({
                'error': 'URL cannot be empty',
                'status': 400
            }), 400

        # Process URL and get prediction
        features = extract_features(url)
        result = classify_url(features)

        return jsonify({
            'url': url,
            'prediction': result['status'],
            'confidence': result['confidence'],
            'detected_features': result['active_features'],
            'status': 200
        })

    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 500
        }), 500


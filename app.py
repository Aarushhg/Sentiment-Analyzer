from flask import Flask, request, jsonify
from flask_cors import CORS
import app_utilities

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def index():
    return jsonify({"message": "Depression Detection API is running."})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'tweet' not in data:
        return jsonify({"error": "No tweet text provided"}), 400

    tweet = data['tweet'].strip()
    if not tweet:
        return jsonify({"error": "Empty tweet text"}), 400

    pred_raw = app_utilities.tweet_prediction(tweet)

    prediction = "Depressed" if pred_raw == 1 else "Not Depressed"
    confidence = 0.90 if pred_raw == 1 else 0.95
    probabilities = {
        "Depressed": confidence if pred_raw == 1 else 1 - confidence,
        "Not Depressed": 1 - confidence if pred_raw == 1 else confidence
    }

    return jsonify({
        "prediction": prediction,
        "confidence": round(confidence, 4),
        "probabilities": probabilities
    })

if __name__ == '__main__':
    app.run(debug=True)

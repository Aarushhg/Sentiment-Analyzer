from flask import Flask, request, jsonify
from flask_cors import CORS
import app_utilities

app = Flask(__name__)
CORS(app)  # Enable CORS so React frontend can call this API

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        tweet = data.get("tweet", "")
        if not tweet.strip():
            return jsonify({"error": "Empty input"}), 400

        pred_raw = app_utilities.tweet_prediction(tweet)

        prediction = "Depressed" if pred_raw == 1 else "Not Depressed"

        # Dummy confidence scores
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

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

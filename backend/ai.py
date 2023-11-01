from flask import Blueprint, request, jsonify
from AIAnalyzer.predict import getPrediction
import traceback

aiBlueprint = Blueprint(__name__, "ai")

@aiBlueprint.route("/")
def ai():
    req = request.get_json()
    try:
        prediction = getPrediction(req["url"])
        result = jsonify({
            "statusCode": 200,
            "body": {
                "prediction": prediction
            },
            "error": {}
        })
    except Exception as err:
        result = jsonify({
            "statusCode": 400,
            "body": {},
            "error": {
                "message": str(err)
            }
        })

    return result
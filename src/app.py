from flask import Flask, render_template, request
import json
import calculations

app = Flask(__name__)

default_headers = [
    ("Access-Control-Allow-Origin", "*"),
    ("Access-Control-Allow-Headers", "Content-Type,Authorization"),
    ("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
]

@app.after_request
def after_request(response):
    for (name, value) in default_headers:
        response.headers.add(name, value)
    return response

@app.route('/')
def home():
    return render_template("index.html")


@app.route("/api/calculate", methods=["POST"])
def caulculateSNR():
    data: dict[str, dict[str, int|float]] = json.loads(request.data)
    try:
        snr = calculations.calculateSNR(data)
        stackingEffect, imgs = calculations.calculateStackingEffect(snr, int(data["Camera"]["Frames"]))
        skyglowEffect, percs = calculations.calculateSkyglowEffect(data)
    except Exception as ex:
        return f"{type(ex).__name__}: {ex}", 400
    return {"snr": snr, "stacking effect": [stackingEffect, imgs], "skyglow effect": [skyglowEffect, percs]}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

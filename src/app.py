import logging.handlers
from flask import Flask, render_template, request
import json
import calculations
import logging
import os

def setupLogger() -> logging.Logger:
    ll = os.environ["LOG_LEVEL"]
    if ll not in ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]:
        raise Exception(f"'{ll}' is not a valid logging level. Choose one of \"DEBUG\", \"INFO\", \"WARNING\", \"ERROR\", \"CRITICAL\"")
    
    cl = logging.getLogger("appLogger")
    cl.setLevel(ll)
    lformat = logging.Formatter("%(asctime)s [%(levelname)s] -- %(message)s", datefmt="%y-%m-%d %H:%M:%S")

    sh = logging.StreamHandler()
    sh.setLevel(ll)
    sh.setFormatter(lformat)

    for hndl in cl.handlers:
        cl.removeHandler(hndl)
    
    cl.addHandler(sh)

    return cl

logger = setupLogger()
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
    logger.info(f"<<{request.remote_addr}>> requested index.html")
    return render_template("index.html")


@app.route("/api/calculate", methods=["POST"])
def caulculateSNR():
    data: dict[str, dict[str, int|float]] = json.loads(request.data)
    try:
        snr = calculations.calculateSNR(data)
        stackingEffect, imgs = calculations.calculateStackingEffect(snr, int(data["Camera"]["Frames"]))
        skyglowEffect, percs = calculations.calculateSkyglowEffect(data)
        logger.debug(f"<<{request.remote_addr}>> calculated their SNR.")
    except Exception as ex:
        logger.error(f"<<{request.remote_addr}>> {type(ex).__name__}: {ex}")
        return f"{type(ex).__name__}: {ex}", 400
    return {"snr": round(snr, 2), "stacking effect": [stackingEffect, imgs], "skyglow effect": [skyglowEffect, percs]}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

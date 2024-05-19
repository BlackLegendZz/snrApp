from flask import Flask, render_template, request
import calculations

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("index.html")


@app.route("/calculate", methods=["POST"])
def caulculateSNR():
    return request.form 


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

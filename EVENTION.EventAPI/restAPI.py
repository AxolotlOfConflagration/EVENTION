from EventAPI import EventAPI
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Event API"

@app.route("/events", methods = ['GET'])
def events():
    eapi = EventAPI()
    return eapi.parse_xml()

@app.route("/category", methods = ['GET'])
def category():
    eapi = EventAPI()
    eapi.parse_xml()
    return eapi.get_category()
if __name__ == "__main__":
    app.run(debug=True)
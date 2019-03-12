from EventAPI import EventAPI
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Event API"

@app.route("/events", methods = ['GET'])
def events():
    eapi = EventAPI()
    return eapi.get_event_today()

@app.route("/events/7days", methods = ['GET'])
def events_7days():
    eapi = EventAPI()
    return eapi.get_event_7days()

@app.route("/events/givenday/<date>", methods = ['GET'])
def events_given_date(date):
    pass

@app.route("/events/togivenday/<date>", methods = ['GET'])
def events_to_given_date(date):
    pass

@app.route("/events/toFrom/<dateTo>/<dateFrom>", methods = ['GET'])
def events_to_from_date():
    pass


@app.route("/category", methods = ['GET'])
def category():
    eapi = EventAPI()
    eapi.parse_xml()
    return eapi.get_category()

if __name__ == "__main__":
    app.run(debug=True)
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

@app.route("/events/givenday/<date>", methods = ['GET'])
def events_given_date(date):
    eapi = EventAPI()

    return eapi.get_event_given_day(date)

@app.route("/events/togivenday/<date>", methods = ['GET'])
def events_to_given_date(date):
    eapi = EventAPI()
    return eapi.get_event_to_given_day(date)

@app.route("/events/toFrom/<dateTo>/<dateFrom>", methods = ['GET'])
def events_to_from_date(dateTo, dateFrom):
    eapi = EventAPI()
    return eapi.get_event_to_from_day(dateTo, dateFrom)


@app.route("/category", methods = ['GET'])
def category():
    eapi = EventAPI()
    eapi.parse_xml()
    return eapi.get_category()
if __name__ == "__main__":
    app.run(debug=True)
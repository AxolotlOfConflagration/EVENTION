from EventAPI_Poznan import EventAPI_Poznan
from EventAPI_Gdansk import EventAPI_Gdansk
from EventAPI_Wroclaw import EventAPI_Wroclaw
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Event API"

@app.route("/events/Poznan", methods = ['GET'])
def events():
    eapi = EventAPI_Poznan()
    return eapi.get_event_today()

@app.route("/events/Poznan/7days", methods = ['GET'])
def events_7days():
    eapi = EventAPI_Poznan()
    return eapi.get_event_7days()

@app.route("/events/Gdansk", methods = ['GET'])
def events_Gdans():
    eapi = EventAPI_Gdansk()
    return eapi.get_event_today()

@app.route("/events/Gdansk/7days", methods = ['GET'])
def events_7days_Gdansk():
    eapi = EventAPI_Gdansk()
    return eapi.get_event_7days()

@app.route("/events/Wroclaw/7days", methods = ['GET'])
def events_7days_Wroclaw():
    eapi = EventAPI_Wroclaw()
    return eapi.get_event_7days()
@app.route("/events/Wroclaw", methods = ['GET'])
def events_Wroclaw():
    eapi = EventAPI_Wroclaw()
    return eapi.get_event_today()


@app.route("/events/givenday/<date>", methods = ['GET'])
def events_given_date(date):
    pass

@app.route("/events/togivenday/<date>", methods = ['GET'])
def events_to_given_date(date):
    pass

@app.route("/events/toFrom/<dateTo>/<dateFrom>", methods = ['GET'])
def events_to_from_date():
    pass


if __name__ == "__main__":
    app.run(debug=True)
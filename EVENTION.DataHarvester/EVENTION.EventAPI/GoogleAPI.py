import json
import googlemaps

# GET LON AND LAT from Google API


def get_Location(address):
    """
    Get lon and lng from Google API
    :param address: event address
    :return: json with address and location - lon and lng
    """
    gmaps = googlemaps.Client(key="")
    geocode_result = gmaps.geocode(address)

    try:
        lat = geocode_result[0]["geometry"]["location"]["lat"]
        lng = geocode_result[0]["geometry"]["location"]["lng"]

    except:
        lat = None
        lng = None

    data = {}
    data["address"] = address
    data["lat"] = lat
    data["lng"] = lng
    #{'address': 'example', 'lat': None, 'lng': None}
    result = json.dumps(data)

    return result


print(get_Location("1600 Amphitheatre Parkway,Mountain, View,CA"))

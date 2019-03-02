import requests
def save_xml():
    """
    Save xml from url http://www.poznan.pl/mim/public/ws-information/?co=getCurrentDayEvents
    :return:
    """
    request = requests.get("http://www.poznan.pl/mim/public/ws-information/?co=getCurrentDayEvents")
    xml = request.text
    with open("event.xml", "w", encoding="UTF-8") as f:
        f.write(xml)
save_xml()
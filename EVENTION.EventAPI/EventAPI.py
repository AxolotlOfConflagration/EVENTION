import xml.etree.ElementTree as ET
class EventAPI:


    def get_xml(self):
        """
        Read xml from file
        :return:
        """
        with open("event.xml", "r", encoding="UTF-8") as f:
            xml = f.read()

        tree = ET.ElementTree(ET.fromstring(xml))
        root = tree.getroot()

        return root

    def parse_xml(self):
        root = self.get_xml()

        for elem in root:
            EVENT = {
            "event_id" : elem[0].text,
            "event_created" : elem[1].text,
            "event_url" : elem[2].text,
            "evet_name" : elem[3][0][0].text,
            "event_desc" : elem[3][0][2].text,
            "enevt_lag" : elem[3][0][3].text,
            "event_address" : {
                "city": "Poznan",
                "state": elem[5][1].text,
                "street": elem[5][2].text,
                "number": elem[5][3].text,
                "postalcode": elem[5][4].text,
                "phone": elem[5][5].text,
                "lat": elem[5][6].text,
                "lon": elem[5][7].text,

            },
            "event_author": elem[6].text,
            "event_start" : elem[7].text,
            "event_end" : elem[8].text,
            "event_modified" : elem[9].text,
            "event_category" : elem[10].text,
            }

            print(EVENT)



eapi = EventAPI()
eapi.parse_xml()



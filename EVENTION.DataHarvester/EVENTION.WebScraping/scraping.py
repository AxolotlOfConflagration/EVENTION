import bs4 as bs
from geojson import Point
from pyjsparser import PyJsParser
from opencage.geocoder import OpenCageGeocode
import urllib.request, sys, json, datetime, re, pprint

API_KEY = '908e5c8c9d9a42ad9d67ef77cf199358'

class Scrap:
    def __init__(self):
        with open('../config.json') as file:
            config = json.load(file)
        self.event_labels = config["event_labels"]
        self.event_address_labels = config["event_address_labels"]
        self.geocoder = OpenCageGeocode(API_KEY)
        self.p = PyJsParser()

    def parse_date(self, date):
        try:
            day, month, year = date[0]['value'].split('.')
            hour, minute = date[2]['value'].split(':')
        except AttributeError:
            return False
        return datetime.datetime(int(year), int(month), int(day), int(hour), int(minute), 0)

    def create_geojson(self, query):
        results = self.geocoder.geocode(query)
        return Point((results[0]['geometry']['lng'], results[0]['geometry']['lat']))

    def event_parser(self, event):
        proper_event = {}

        source = urllib.request.urlopen(event)
        soup = bs.BeautifulSoup(source, 'lxml')
        info = soup.find_all('script')[8].getText()
        info_dict = self.p.parse(info)

        name = info_dict['body'][4]['declarations'][0]['init']['properties'][2]['value']['value']
        url = info_dict['body'][4]['declarations'][0]['init']['properties'][5]['value']['value']
        longDescription = info_dict['body'][4]['declarations'][0]['init']['properties'][6]['value']['value']
        longDescription = bs.BeautifulSoup(longDescription, 'lxml')
        longDescription = ''.join(longDescription.find_all(text=True))
        shortDescription = ' '.join(re.split(r'(?<=[.:;])\s', longDescription)[:2]) + ' [...] '
        creationDate = datetime.datetime.now()
        eventStart = self.parse_date(info_dict['body'][4]['declarations'][0]['init']['properties'][16]['value']['elements'])
        if self.parse_date(info_dict['body'][4]['declarations'][0]['init']['properties'][17]['value']['elements']):
            eventEnd = self.parse_date(info_dict['body'][4]['declarations'][0]['init']['properties'][17]['value']['elements'])
        else:
            eventEnd = eventStart
        owner = "EVENTION"
        categories_elements = info_dict['body'][4]['declarations'][0]['init']['properties'][18]['value']['elements']
        categories = []
        for category in categories_elements:
            categories.append(category['value'].lower())
        # address = 
        # geoJSON = self.create_geojson()
        # imageSource = 
        # # --------------------------------------------------------------------
        # country = 
        # city = 
        # postalAddress = 
        # street = 
        # houseNumber = 


        # for label in self.event_labels:
        #     if label != "address":
        #         proper_event[label] = 
        #     else:
        #         for address_label in self.event_address_labels:

        # return json.dumps(proper_event)

    def scrap_kiwiportal(self, url):
        try:
            source = urllib.request.urlopen(url)
        except:
            print('Website ERROR')
        soup = bs.BeautifulSoup(source, 'lxml')
        event_list = soup.find_all('a', {'href': re.compile(r'https:\/\/www\.kiwiportal\.pl\/wydarzenia/[0-9]+.*')})
        event_list = list(set([event['href'] for event in event_list]))
        self.event_parser(event_list[0])
        # for event in event_list:
        #     try:
        #         self.event_parser(event)
        #     except AttributeError:
        #         pass
        # print(len(event_list))

s = Scrap()
s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/warszawa')
# s.create_geojson('Polska, Poznań, ulica Stróżyńskiego 17c/10')

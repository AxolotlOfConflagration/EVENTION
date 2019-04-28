#!/usr/bin/python
import bs4 as bs
from geojson import Point
from pyjsparser import PyJsParser
from opencage.geocoder import OpenCageGeocode
import urllib.request, sys, json, datetime, re, pprint

API_KEY = '908e5c8c9d9a42ad9d67ef77cf199358'

class Scrap:
    def __init__(self):
        with open('config.json') as file:
            config = json.load(file)
        self.event_labels = config["event_labels"]
        self.geocoder = OpenCageGeocode(API_KEY)
        self.p = PyJsParser()

    def parse_date(self, date):
        try:
            day, month, year = date[0]['value'].split('.')
            hour, minute = date[2]['value'].split(':')
        except (AttributeError, ValueError) as e:
            return False
        return datetime.datetime(int(year), int(month), int(day), int(hour), int(minute), 0)

    def create_geojson(self, query=None, latlng=None):
        results = []
        if query != None:
            geo = self.geocoder.geocode(query)
            results.append(geo[0]['geometry']['lng'])
            results.append(geo[0]['geometry']['lat'])
        else:
            results.append(latlng[1]) 
            results.append(latlng[0])
        return Point((results[0], results[1]))
    
    def get_address(self, latlng):
        return self.geocoder.reverse_geocode(latlng[0], latlng[1])[0]['formatted']

    def event_parser(self, event):
        source = urllib.request.urlopen(event)
        soup = bs.BeautifulSoup(source, 'lxml')
        info = soup.find_all('script')[8].getText()
        info_dict = self.p.parse(info)

        name = info_dict['body'][4]['declarations'][0]['init']['properties'][2]['value']['value']
        url = info_dict['body'][4]['declarations'][0]['init']['properties'][5]['value']['value']
        longDescription = info_dict['body'][4]['declarations'][0]['init']['properties'][6]['value']['value']
        # longDescription = bs.BeautifulSoup(longDescription, 'lxml')
        longDescription = str(longDescription)
        # longDescription = ''.join(longDescription.find_all(text=True))
        shortDescription = ' '.join(re.split(r'(?<=[.:;])\s', longDescription)[:2]) + ' [...] '
        tags = info_dict['body'][4]['declarations'][0]['init']['properties'][37]['value']['value']
        creationDate = datetime.datetime.now()
        eventStart = self.parse_date(info_dict['body'][4]['declarations'][0]['init']['properties'][16]['value']['elements'])
        if self.parse_date(info_dict['body'][4]['declarations'][0]['init']['properties'][17]['value']['elements']):
            eventEnd = self.parse_date(info_dict['body'][4]['declarations'][0]['init']['properties'][17]['value']['elements'])
        else:
            eventEnd = eventStart
        owner = 1
        categories_elements = info_dict['body'][4]['declarations'][0]['init']['properties'][18]['value']['elements']
        categories = []
        for category in categories_elements:
            # categories.append(category['value'].lower())
            if 'sport' in category['value'].lower():
                categories.append(1)
            elif 'kultura' in category['value'].lower():
                categories.append(2)
            elif 'koncert' in category['value'].lower():
                categories.append(3)
            elif 'targi' in category['value'].lower():
                categories.append(4)
            elif 'hackathon' in category['value'].lower():
                categories.append(6)
            else:
                categories.append(5)
        categories = list(set(categories))
        imageSource = info_dict['body'][4]['declarations'][0]['init']['properties'][20]['value']['value']
        latlng = (float(info_dict['body'][4]['declarations'][0]['init']['properties'][31]['value']['elements'][0]['value']), float(info_dict['body'][4]['declarations'][0]['init']['properties'][31]['value']['elements'][1]['value']))
        #----------- ODZNACZYĆ !!! - ograniczenie 2500 requestów/dzień
        geoJSON = str(self.create_geojson(latlng=latlng))
        address = self.get_address(latlng)

        def date_converter(o):
            if isinstance(o, datetime.datetime):
                return o.isoformat()

        used_var_list = [name, shortDescription, longDescription, creationDate, eventStart, eventEnd, owner, geoJSON, imageSource, address, self.addressCity]
        dic = {}
        dic["event"] = dict(zip(self.event_labels, used_var_list))
        dic["categories"] = categories
        return  json.dumps(dic, default=date_converter)

    def scrap_kiwiportal(self, url):
        self.addressCity = url.rsplit('/', 1)[-1].capitalize()
        try:
            source = urllib.request.urlopen(url)
        except:
            print('Website ERROR')
        soup = bs.BeautifulSoup(source, 'lxml')
        event_list = soup.find_all('a', {'href': re.compile(r'https:\/\/www\.kiwiportal\.pl\/wydarzenia/[0-9]+.*')})
        event_list = list(set([event['href'] for event in event_list]))
        json_list = []
        for event in event_list:
            try:
                json_list.append(self.event_parser(event))
            except AttributeError:
                print('AttributeError occured inside event_parser')
        return json_list

# test--------------------------------------------------------------------------------------------------------
# s = Scrap()
# s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/warszawa')
# s.create_geojson(query='Polska, Poznań, ulica Stróżyńskiego 17c/10')
# print(s.get_address((21.0246, 52.2791)))
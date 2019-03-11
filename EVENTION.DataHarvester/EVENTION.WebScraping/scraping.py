import bs4 as bs
import urllib.request, sys, json, datetime

class Scrap:
    def __init__(self):
        with open('../config.json') as file:
            config = json.load(file)
        self.event_labels = config["event_labels"]
        self.event_address_labels = config["event_address_labels"]

        self.month_code = {
            'STY': 1,
            'LUT': 2,
            'MAR': 3,
            'KWI': 4,
            'MAJ': 5,
            'CZE': 6,
            'LIP': 7,
            'SIE': 8,
            'WRZ': 9,
            'PAZ':10,
            'LIS': 11,
            'GRU': 12
        }

    def parse_date(self, event):
        day = int(event.find('span', attrs={'class': 'dateDay'}).getText())
        month = self.month_code[event.find('span', attrs={'class': 'dateMonth'}).getText()]
        year = datetime.datetime.now().year
        hour, minutes = event.find('span', attrs={'class': 'dateTimeOrYear'}).getText().split(':')
        seconds = 0
        return datetime.datetime(year,month,day,int(hour),int(minutes),seconds)

    def event_parser(self, event):
        proper_event = {}
        name = event.find('strong').getText()
        #TODO description
        shortDescription = event.find('script', attrs={'class': 'application/ld+json'})
        longDescription = ""
        creationDate = datetime.datetime.now()
        eventStart = self.parse_date(event)
        eventEnd = eventStart
        # owner = 
        # geoJSON = 
        # address = 
        # imageSource = 
        # category = 
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
        event_list = soup.find_all('li', attrs={'class': 'ui-datascroller-item'} )
        content_list = []
        for event in event_list:
            try:
                content_list.append(self.event_parser(event))
            except AttributeError:
                pass
        print(len(content_list))

s = Scrap()
s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/warszawa')

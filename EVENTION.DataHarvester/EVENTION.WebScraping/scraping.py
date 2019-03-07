import bs4 as bs
import urllib.request, sys, json

class Scrap:
    def __init__(self):
        with open('../config.json') as file:
            config = json.load(file)
        self.event_labels = config["event_labels"]
        self.event_address_labels = config["event_address_labels"]

    def event_parser(self, short_version):
        proper_event = 

    def scrap_kiwiportal(self, url):
        try:
            source = urllib.request.urlopen(url)
        except:
            print('Website ERROR')
        soup = bs.BeautifulSoup(source, 'lxml')
        event_list = soup.find_all('li', attrs={'class': 'ui-datascroller-item'} )
        content_list = []
        for event in event_list:
            content_json = event.find('script', attrs={'type':'application/ld+json'})
            try:
                content_list.append(self.event_parser(json.loads(content_json.getText())))
            except AttributeError:
                pass
        print(content_list[0])

s = Scrap()
s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/warszawa')

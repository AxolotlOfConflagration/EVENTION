import urllib.request
from bs4 import BeautifulSoup

def get_response(url):
    request = urllib.request.Request(url)
    response = urllib.request.urlopen(request)
    return response

def get_soup(response):
    soup = BeautifulSoup(response, 'html.parser')
    return soup

def get_src(soup):
    img_tag = soup.find_all('img', class_="event-img-item float-left")[0]
    src = img_tag["src"]
    return 'http://www.poznan.pl'+src

def get_image_src(url):
    #url = 'http://www.poznan.pl/mim/events/krasnonutki-zajecia-muzyczne-dla-niemowlat-i-malych-dzieci,104769.html'
    response = get_response(url)
    soup = get_soup(response)
    return get_src(soup)

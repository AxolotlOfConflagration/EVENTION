import bs4 as bs
import urllib.request, sys
from PyQt5.QtCore import QUrl
from PyQt5.QtWeb
from PyQt5.QtWidgets import QApplication


class Client(QWebPage):
    def __init__(self, url):
        self.app = QApplication(sys.argv)
        QWebPage.__init__(self)
        self.loadFinished.connect(selff.on_page_load)
        self.mainFrame().load(QUrl(url))
        self.app.exec_()
    def on_page_load(self):
        self.app.quit()

class Scrap:
    def __init__(self):
        pass

    def scrap_kiwiportal(self, url):
        client_response = Client(url)
        source = client_response.mainFrame().innerHtml()
        soup = bs.BeautifulSoup(source, 'lxml')
        simple_strong = soup.find('strong')
        print(simple_strong)

s = Scrap()
s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/warszawa')

# EVENTION
User friendly event aggregator with additional features.

# Project Structure
* **App** - main backend of this project that provides main API for clients (Bartek, Michał)
* **MobileClient** - mobile client application to comunicate with backend (?)
* **RecomendationAPI** - API for serving recomendations for client apps (Szymon)
* **WebClient** - web frontend client to comunicate with backend API and other APIs (Michał, Agnieszka, Bartek)
* **DataHarvester** - Wrapps WebScraping and EventAPI apps for communication with backend (Szymon)
  - **WebScrapping** - app for collecting and seeding data besed upon data fetch/scraped from websites (Szymon)
  - **EventAPI** - app for parsing fetched XML event files (Agnieszka)

./EVENTION.App> sbt start ***runs server***  
./EVENTION.DataHArvester> python fillDB.py ***fill database with sraped events***  
./EVENTION.RecommendationAPI> python updateEventForUser.py ***append events to users***  
./EVENTION.RecommendationAPI> python recEngine.py ***send users recommendations to database***  
./EVENTION.WebClient>npm start ***runs server-frontend***  

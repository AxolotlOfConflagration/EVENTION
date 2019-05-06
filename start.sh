#! /bin/bash

pwd=$(pwd)
# start server
sudo gnome-terminal --working-directory=$pwd/EVENTION.App/ -e 'bash -c "sbt clean && sbt start ; bash"' &
# start web-client
sudo gnome-terminal --working-directory=$pwd/EVENTION.WebClient/ -e 'bash -c "npm i ; npm i react-google-font-loader ; npm start ; bash"'
# run python scripts
if [ ! -d "venv" ]; then
  virtualenv --python=python3 venv
fi
source venv/bin/activate
pip install -r $pwd/EVENTION.DataHarvester/requirements.txt
cd $pwd/EVENTION.DataHarvester/
echo "-------------- fillDB running --------------"
python fillDB.py
echo "-------------- updateEventForUser running --------------"
cd $pwd/EVENTION.RecommendationAPI/
python updateEventForUser.py
python updateEventForUser.py
python recEngine.py
echo "-------------- ZROBIŁO SIĘ :-) --------------"
#! /bin/bash

# start server
sudo gnome-terminal --working-directory=/home/sleter/Documents/Github/EVENTION/EVENTION.App/ -e 'bash -c "sbt clean && sbt start ; bash"'
# start web-client
&
sudo gnome-terminal --working-directory=/home/sleter/Documents/Github/EVENTION/EVENTION.WebClient/ -e 'bash -c "npm start ; bash"'
if [ ! -d "venv" ]; then
  mkdir cos
fi
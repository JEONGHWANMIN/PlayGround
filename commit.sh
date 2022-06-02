#!/bin/bash
echo '##### auto push start #####'

cd ~/ml/PlayGround
git add .
git status
git commit -m "PlayGround ~ "
git push play master

echo '##### auto push end #####'
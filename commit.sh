#!/bin/bash
# echo '##### auto push start #####'
echo "ToDay Pusn Start : $(date +%Y)-$(date +%m)-$(date +%d) $(date +%H):$(date +%M):$(date +%S)"
cd ~/ml/PlayGround
git add .
git status
git commit -m "PlayGround ~ "
git push play master

echo '##### auto push end #####'
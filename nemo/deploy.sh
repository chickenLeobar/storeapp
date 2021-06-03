# !bin/bash
set -e
git add .
echo "name of commit"
read message
git commit -m "${message}" 
git push dokku main:master
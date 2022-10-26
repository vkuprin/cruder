createRepo() {
  git init
  git add .
  git commit -m "first commit"
  git remote add origin
  git push -u origin master
}

spamDailyCommits() {
  while true; do
    git add .
    git commit -m "daily commit"
    git push origin master
    sleep 86400
  done
}

case $1 in
  "hey")
    hey
    ;;
  "createRepo")
    createRepo
    ;;
  "spamDailyCommits")
    spamDailyCommits
    ;;
  *)
    echo "Usage: $0 {hey|createRepo|spamDailyCommits}"
    ;;
esac
#! /bin/sh
dir1='./source/_posts'
DR=$(ls)

for dir in $DR; do
  if [ -d "$dir1" ]; then
    cd "$dir1"
    fileNum=$(ls -l | wc -l)
    echo $fileNum
  fi
done

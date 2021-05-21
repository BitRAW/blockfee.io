#!/bin/bash

currentVersion=$(node -p -e "require('./package.json').version")

echo enter version number \(current is $currentVersion\): 

read versionNumber

echo setting version number to $versionNumber...

echo enter version changes \(type exit when complete\):

listIsComplete=false

featureList=()

while [ $listIsComplete == false ];
do
    echo 'enter feature description: '
    read -r feature
    if [ "$feature" == exit ];
    then
        listIsComplete=true
    else
        feature="$feature"
        featureList+=("- $feature")
    fi
done

echo updating in VERSIONS.md...

printf "\n## $versionNumber\n" >> VERSIONS.md
for i in "${featureList[@]}"
do
    echo "$i" >> VERSIONS.md
done

echo updating in version.js...

loc="const version = \'$versionNumber\';"

sed -i "1s/.*/$loc/" version.js

echo updating in package.json...

loc="\"version\": \"$versionNumber\","
loc1=$'\t'
loc="${loc1}${loc}"

sed -i "3s/.*/$loc/" package.json

echo done!!
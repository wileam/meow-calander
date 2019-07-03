#!/bin/bash

# This script replys on jq(https://stedolan.github.io/jq/download/).

CURRENT_JOBS=1
JSON_OUTPUT=./data/quotes.json
# Give a big number in case of duplication.
MAX_JOBS=380

rm -f $JSON_OUTPUT
echo "[" >> $JSON_OUTPUT

while [ $CURRENT_JOBS -le $MAX_JOBS ]
do
  echo "Fetching: $CURRENT_JOBS..."
  if [ $CURRENT_JOBS = $MAX_JOBS ] 
  then
    curl https://api.itswincer.com/hitokoto/v2/\?encode\=json\&length\=80 | jq -c '. | {quote: .hitokoto, from: .source}' >> $JSON_OUTPUT
  else
    curl https://api.itswincer.com/hitokoto/v2/\?encode\=json\&length\=80 | jq -c '. | {quote: .hitokoto, from: .source}' | { read data; echo $data","; }  >> $JSON_OUTPUT
  fi
  CURRENT_JOBS=$(($CURRENT_JOBS + 1))
done

echo "]" >> $JSON_OUTPUT

rm -f $JSON_OUTPUT.bak
# Change the 365 to a number you want to retian in the array.
jq '. |= unique_by({quote, from})' $JSON_OUTPUT | jq '.[0:365]' >> $JSON_OUTPUT.bak
mv $JSON_OUTPUT.bak $JSON_OUTPUT

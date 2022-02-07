#!/bin/zsh
if test -s $GOLF_DIR/token.txt; then
    expires=$(cat $GOLF_DIR/token.txt | head -c 14 | tail -c 10)
    if (($expires > $(date +%s))); then
        exit 0
    else 
    fi
fi

curl -s https://microservice.pgatour.com/js > $GOLF_DIR/token_script.js
size=$(stat -f\%z $GOLF_DIR/token_script.js)
# if (($size != 5581)); then
#     echo Bad File Size
#     exit 1
# fi

echo "var window = {}\nf =" > $GOLF_DIR/token_creator.js
cat $GOLF_DIR/token_script.js >> $GOLF_DIR/token_creator.js
echo "\nconsole.log(window.pgatour.setTrackingUserId(\"id8730931\"))" >> $GOLF_DIR/token_creator.js
node $GOLF_DIR/token_creator.js > $GOLF_DIR/token.txt

#!/bin/bash




echo "Testing bluetooth on RPI3. Make sure you have a bluetooth device enabled and visible."

echo "Attaching hci0..."
if ! /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow -; then
    echo "First try failed. Let's try another time."
    /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow -
fi

echo "Bring hci0 up..."
hciconfig hci0 up

echo "Starting ..."
node index.js 

#echo "Target device : " $METAWEAR_ADDRESS





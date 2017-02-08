#!/bin/bash


# Copying firmware
# if [ ! -f "/lib/firmware/ti-connectivity/TIInit_11.8.32.bts" ]; then
#  echo "Firware is not present, copying"
#  cp firmware/TIInit_11.8.32.bts /lib/firmware/ti-connectivity/
#  cp firmware/wl18xx-conf.bin /lib/firmware/ti-connectivity/
#  ln -s ti-connectivity/TIInit_11.8.32.bts /lib/firmware/TIInit_11.8.32.bts
# fi

# echo "Finding Bluetooth interface"
# while [ -z "$(hcitool dev |grep hci0)" ]; do echo "...nothing yet"; sleep 2; done

# if [ -n "$DEBUG" ]; then
#   systemctl status bb-wl18xx-bluetooth.service -l
# fi

# echo "Bluetooth interfaces"
# hcitool dev

# echo "Storage Configuration"

# echo "Checking /mnt/media status"

# x=0
# while [ "$x" -lt 10 -a -z "$(cat /proc/mounts |grep /mnt/media)" ]; do 
# 				x=$((x+1));
#         echo "...not active yet"; 
#         sleep 1; 
# done

# if grep -qs '/mnt/media ' /proc/mounts; then
#    STORAGE_PATH=/mnt/media
# else
#    STORAGE_PATH=/data
# fi

# echo "Storage path : " $STORAGE_PATH

echo "Starting ..."
#echo "Target device : " $METAWEAR_ADDRESS

node index.js 



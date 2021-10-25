FROM balenalib/raspberrypi3-node:12-latest-build as build

WORKDIR /usr/src/app

#install some dependencies for noble and balena-sdk
RUN install_packages make g++ bluetooth bluez libbluetooth-dev libudev-dev git

COPY . .

#install node dependencies
RUN npm install @abandonware/noble
RUN npm install express
RUN JOBS=MAX npm install --production --unsafe-perm && npm cache clean --force && rm -rf /tmp/*

FROM balenalib/raspberrypi3-node:12-latest-run

WORKDIR /usr/src/app


ENV INITSYSTEM on


# use apt-get if you need to install dependencies
#RUN apt-get update
#RUN apt-get install wget



# add the key for foundation repository
#RUN wget http://archive.raspberrypi.org/debian/raspberrypi.gpg.key -O - | sudo apt-key add -

# add apt source of the foundation repository
# we need this source because bluez needs to be patched in order to work with RPi3
# issue #1314: How to get BT working on Pi3B. by clivem in raspberrypi/linux on GitHub
#RUN sed -i '1s#^#deb http://archive.raspberrypi.org/debian jessie main\n#' /etc/apt/sources.list






# Install openSSH, remove the apt list to reduce the size of the image
#RUN apt-get update && apt-get install  \
#     bluetooth bluez  \
#     libbluetooth-dev libudev-dev python3 python3-pip make g++


# Copy Storage mount definition file for systemd
#COPY mounts/mnt-media.mount /lib/systemd/system

#COPY package.json /usr/src/app/

#RUN npm install


# Copy all files from root to the WORKDIR

#COPY . /usr/src/app


# Enable Bluetooth on application start
#RUN systemctl enable bb-wl18xx-bluetooth.service

# Mount storage on application start
#RUN systemctl enable mnt-media.mount


#CMD ["bash", "start.sh"]
COPY --from=build /app /app

CMD ["npm", "start"]



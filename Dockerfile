#FROM balenalib/raspberrypi3-node
FROM balenalib/raspberrypi3-node:8.11.4-jessie-build-20181025



ENV INITSYSTEM on


# use apt-get if you need to install dependencies
RUN apt-get update
RUN apt-get install wget

RUN cd /usr/src
RUN wget https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tgz
RUN sudo tar xzf Python-3.6.0.tgz

RUN cd Python-3.6.0
RUN sudo -s
RUN bash configure
RUN make altinstall
RUN exit

WORKDIR /usr/src/app

# add the key for foundation repository
RUN wget http://archive.raspberrypi.org/debian/raspberrypi.gpg.key -O - | sudo apt-key add -

# add apt source of the foundation repository
# we need this source because bluez needs to be patched in order to work with RPi3
# issue #1314: How to get BT working on Pi3B. by clivem in raspberrypi/linux on GitHub
RUN sed -i '1s#^#deb http://archive.raspberrypi.org/debian jessie main\n#' /etc/apt/sources.list




# Install openSSH, remove the apt list to reduce the size of the image
RUN apt-get update && apt-get install -yq --no-install-recommends \
     bluetooth bluez bluez-firmware \
     libbluetooth-dev libudev-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*



# Copy Storage mount definition file for systemd
#COPY mounts/mnt-media.mount /lib/systemd/system

COPY package.json /usr/src/app/

RUN npm install -g npm
RUN npm install node-gyp
RUN npm install


# Copy all files from root to the WORKDIR

COPY . /usr/src/app


# Enable Bluetooth on application start
#RUN systemctl enable bb-wl18xx-bluetooth.service

# Mount storage on application start
#RUN systemctl enable mnt-media.mount


CMD ["bash", "start.sh"]



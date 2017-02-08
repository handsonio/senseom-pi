FROM resin/raspberrypi3-node

WORKDIR /usr/src/app

#ENV INITSYSTEM on

#RUN sed '/ \[arch=armhf\]/ s/^#*/#/' -i /etc/apt/sources.list

# Install openSSH, remove the apt list to reduce the size of the image
RUN apt-get update && apt-get install -yq --no-install-recommends \
     bluetooth bluez \
     libbluetooth-dev libudev-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Storage mount definition file for systemd
#COPY mounts/mnt-media.mount /lib/systemd/system

COPY package.json /usr/src/app/

RUN npm install


# Copy all files from root to the WORKDIR

COPY . /usr/src/app


# Enable Bluetooth on application start
#RUN systemctl enable bb-wl18xx-bluetooth.service

# Mount storage on application start
#RUN systemctl enable mnt-media.mount


CMD ["bash", "start.sh"]



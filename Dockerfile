FROM balenalib/raspberrypi3-node:12-latest-build as build

WORKDIR /app

#install some dependencies for noble and balena-sdk
RUN install_packages make g++ bluetooth bluez libbluetooth-dev libudev-dev git

COPY . .

#install node dependencies
RUN npm install @abandonware/noble
RUN npm install node-beacon-scanner
RUN JOBS=MAX npm install --production --unsafe-perm && npm cache clean --force && rm -rf /tmp/*

FROM balenalib/raspberrypi3-node:12-latest-run

#Set permissions to allow BLE scanning
RUN sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

WORKDIR /app
COPY --from=build /app /app

CMD ["npm", "start"]
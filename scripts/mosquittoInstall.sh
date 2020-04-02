#!/bin/bash

logfile = .mosquittoLog

sudo apt-get update
sudo apt-get install -y mosquitto mosquitto-clients>>$logfile

sudo systemctl enable mosquitto.service>>$logfile
vers=$(mosquitto -v)

echo "Installation Script completed. Installed version is v$vers. See .mosquittoLog for logs"

exit(0)
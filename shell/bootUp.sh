#!/bin/bash

# ------------------------------------
# Filename:    bootUp.sh
# Date:        2020/12/23
# Author:      潘世文
# ------------------------------------

#  web
cd /home/bigscreen && ./start.sh

# java
cd /home/bigscreen && ./start.sh

# start and restart nginx
systemctl restart nginx && systemctl enable nginx 

# start and enable sql
sudo systemctl restart mysqld
sudo systemctl enable mysqld


---------
# restart and enable nginx
systemctl enable nginx && systemctl restart nginx

# restart and enable mysql
sudo systemctl restart mysqld && sudo systemctl enable mysqld

# restart and enable middleware.service
sudo systemctl enable middleware.service

# restart and enable clear_log.sh
sudo chmod +x /etc/cron.weekly/clear_log.sh

# restart and enable mysql
sudo bash /opt/dmeeting/operation-elves/start.sh



# sudo chmod +x start.sh

PW=/opt/dmeeting4.0

# pc-frontend
cd $PW/pc-frontend/running_dfocus-fe-meeting-next-zip-dist && start.sh

# mobile-frontend
cd $PW/mobile-frontend/running_dfocus-fe-meeting-mobile-zip-dist && start.sh

# mailCenter
cd $PW/mailCenter/running_mail-center && start.sh

# gatewayServer
cd $PW/gatewayServer/running_gateway-server && start.sh

# dmeetingProject
cd $PW/dmeetingProject/running_dmeeting && start.sh

# dep
cd $PW/dep && start.sh
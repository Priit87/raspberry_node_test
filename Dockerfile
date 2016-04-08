# docker-machine start default
# eval "$(docker-machine env default)"
# docker-compose up

FROM    debian:jessie

RUN apt-get update && \
    apt-get -y install curl sudo && \
    curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get -y install python build-essential nodejs && \
    apt-get -y install git && echo "Installed 2"

RUN npm install -g nodemon
RUN npm install -g forever

# add source files
ADD . /src

# set the working directory to run commands from
WORKDIR /src

# install the dependencies
RUN cd /src && npm install && echo "2"

# expose the port so host can have access

EXPOSE  80
CMD ["nodemon", "-L", "/src/app.js"]
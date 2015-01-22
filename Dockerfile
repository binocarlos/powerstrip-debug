FROM node:0.10
MAINTAINER Kai Davenport <kaiyadavenport@gmail.com>
RUN apt-get -y update
ADD . /srv/app
RUN cd /srv/app && npm install
WORKDIR /srv/app
EXPOSE 80
ENTRYPOINT ["node", "index.js"]
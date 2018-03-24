FROM node:alpine

MAINTAINER Clement Mondion
WORKDIR /opt/app

RUN mkdir -p /opt/app && cd /opt/app
ADD . /opt/app

RUN mkdir -p /tmp/

ADD package-lock.json package.json /tmp/

EXPOSE 3000

RUN cd /tmp && npm i

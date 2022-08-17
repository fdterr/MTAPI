FROM nikolaik/python-nodejs:python3.9-nodejs18

MAINTAINER Rick Terry

RUN mkdir -p /app/python
WORKDIR /app/python
COPY python .
RUN python3 -m venv .venv 
RUN .venv/bin/pip install -r requirements.txt


RUN mkdir -p /app/node
WORKDIR /app/node
COPY node .
RUN npm ci

WORKDIR /app
COPY autostart.sh .

RUN apt-get clean \ && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* 


CMD ["/bin/bash", "autostart.sh"]

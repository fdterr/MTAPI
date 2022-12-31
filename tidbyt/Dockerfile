FROM alpine:3.17

RUN apk add bash curl tar sudo gcompat

RUN curl -LO https://github.com/tidbyt/pixlet/releases/download/v0.22.4/pixlet_0.22.4_linux_amd64.tar.gz
RUN tar -xvf pixlet_0.22.4_linux_amd64.tar.gz
RUN chmod +x ./pixlet
RUN sudo mv pixlet /usr/local/bin/pixlet

RUN mkdir -p /app
WORKDIR /app
COPY . .


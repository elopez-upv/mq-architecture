FROM node:14-alpine
WORKDIR /usr/src/app/front-end
RUN apk add --update \
    python3 \
    python3-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/* \
  && apk upgrade \
  && apk add --no-cache bash git openssh
COPY ./front-end/package*.json ./
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
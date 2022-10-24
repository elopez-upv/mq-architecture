# node 16.13.2 alpine
FROM node@sha256:f21f35732964a96306a84a8c4b5a829f6d3a0c5163237ff4b6b8b34f8d70064b
RUN mkdir -p /home/node/api/node_modules \
  && chown -R node:node /home/node/api 

WORKDIR /home/node/api

ENV NODE_ENV development

COPY ./api/package*.json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
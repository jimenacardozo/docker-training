FROM node:20-alpine
WORKDIR /app
EXPOSE 3000
COPY ./index.js package.json .
RUN npm install
ENTRYPOINT [ "node", "index.js" ]
FROM node:20
WORKDIR /app
EXPOSE 3000
COPY . .
RUN npm install
ENTRYPOINT [ "node", "index.js" ]
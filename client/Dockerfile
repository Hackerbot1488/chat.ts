FROM node:current-alpine3.10
WORKDIR /app
EXPOSE 5000
COPY . /app
RUN npm i -g serve
CMD ["serve","-s", "build"]
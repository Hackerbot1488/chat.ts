FROM node:current-alpine3.10
WORKDIR /app
EXPOSE 1488
COPY . /app
RUN cd build && npm i --prod
CMD ["node","build/server.js"]
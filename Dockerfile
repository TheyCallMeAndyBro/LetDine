FROM node:18-alpine

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . .

RUN npm install
# 暴露端口
EXPOSE 3000

RUN npx sequelize db:migrate
RUN npx sequelize db:seed:all

CMD [ "node", "app.js" ]
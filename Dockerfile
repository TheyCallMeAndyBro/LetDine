FROM node:18-alpine

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . .

RUN npm install
# 暴露端口
EXPOSE 3000


CMD ["npx", "sequelize", "db:migrate", "&&", "npx", "sequelize", "db:seed:all", "&&", "node", "app.js"]

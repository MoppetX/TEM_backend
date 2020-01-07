FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock*.json ./

RUN npm install --only=production

COPY ./ /app/

EXPOSE 3000

# CMD [ "npm", "start"]
CMD [ "npm", "start", "--", "--host", "0.0.0.0", "--port", "$PORT" ]

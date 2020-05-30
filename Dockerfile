FROM node:14-alpine
WORKDIR /app
COPY . /app
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000
CMD ["npm", "start"]
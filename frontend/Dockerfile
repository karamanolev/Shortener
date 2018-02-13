FROM node:9
RUN mkdir /code
WORKDIR /code
ADD package.json /code/
RUN npm install --loglevel=error

CMD node_modules/.bin/webpack-dev-server --host 0.0.0.0

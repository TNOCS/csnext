FROM node:10
RUN npm install yarn --global
COPY . .
RUN yarn
RUN yarn build
# WORKDIR /packages/cs-client
# CMD http-server -p 9001


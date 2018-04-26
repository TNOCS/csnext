FROM node:8
EXPOSE 9001
RUN npm install yarn --global
COPY . .
RUN yarn
RUN yarn build
# WORKDIR /packages/cs-client
# CMD http-server -p 9001


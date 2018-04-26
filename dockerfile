FROM node:8
RUN npm install yarn
COPY . .
RUN yarn
RUN yarn build
# WORKDIR /packages/cs-client
# CMD http-server -p 9001


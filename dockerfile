FROM node:8
RUN npm install yarn --global
COPY . .
RUN ["/bin/bash", "yarn"]
# RUN yarn build
# WORKDIR /packages/cs-client
# CMD http-server -p 9001


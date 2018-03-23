FROM node:8
EXPOSE 9001
RUN npm install yarn --global
RUN npm install http-server --global
COPY . .
RUN sudo yarn
WORKDIR /packages/cs-client
CMD http-server -p 9001


FROM node:8
RUN npm install yarn
RUN npm install -g @vue/cli
RUN git config --global user.email "you@example.com"
RUN git config --global user.name "Your Name"
COPY . .
RUN yarn
RUN yarn build
RUN yarn link @csnext/vue-cli-plugin-cs;vue create --preset tnocs/csnext cli-test-project;cd cli-test-project;yarn link @csnext/cs-core;yarn link @csnext/cs-client;yarn build
# WORKDIR /packages/cs-client
# CMD http-server -p 9001


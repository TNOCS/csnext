FROM node:10
# RUN npm install yarn
RUN npm install -g @vue/cli
RUN git config --global user.email "you@example.com"
RUN git config --global user.name "Your Name"
COPY . .
RUN yarn
RUN yarn build
# RUN yarn link @csnext/vue-cli-plugin-cs;yarn link @csnext/cs-core;yarn link @csnext/cs-client;yarn link @csnext/cs-split-panel;yarn link @csnext/cs-billboard;vue create --preset preset.json cli-test-project;cd cli-test-project;vue build
# WORKDIR /packages/cs-client
# RUN ["vue","serve"]


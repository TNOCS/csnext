FROM node:10
RUN npm install -g @vue/cli npx typescript del-cli yarn
RUN git config --global user.email "you@example.com"
RUN git config --global user.name "Your Name"
COPY . .
# WORKDIR /packages/cs-layer-server
# RUN npm i
# RUN npm run build
# WORKDIR /packages/cs-core
# RUN npm i
# RUN npm run build
WORKDIR /
RUN yarn
RUN yarn build
# RUN lerna publish --yes --skip-git --exact --cd-version=prerelease --preid=alpha.${COMMIT_SHA:0:6}

# RUN npm link @csnext/vue-cli-plugin-cs;npm link @csnext/cs-core;npm link @csnext/cs-client;npm link @csnext/cs-split-panel;npm link @csnext/cs-billboard;vue create --preset preset.json cli-test-project;cd cli-test-project;vue build
# WORKDIR /packages/cs-client
# RUN ["vue","serve"]


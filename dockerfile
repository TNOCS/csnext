FROM node:12
RUN npm install -g @vue/cli typescript del-cli lerna
RUN git config --global user.email "you@example.com"
RUN git config --global user.name "Your Name"
COPY . .
# WORKDIR /packages/cs-layer-server
# RUN npm i
# RUN npm run build
# WORKDIR /packages/cs-core
RUN yarn
RUN yarn run build
# RUN npm install
# RUN pnpm recursive install
# RUN pnpm recursive run build --no-bail
# RUN lerna publish --yes --skip-git --exact --cd-version=prerelease --preid=alpha.${COMMIT_SHA:0:6}

# RUN yarn link @csnext/vue-cli-plugin-cs;yarn link @csnext/cs-core;yarn link @csnext/cs-client;yarn link @csnext/cs-split-panel;yarn link @csnext/cs-billboard;vue create --preset preset.json cli-test-project;cd cli-test-project;vue build
# WORKDIR /packages/cs-client
# RUN ["vue","serve"]


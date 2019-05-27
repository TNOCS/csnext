FROM node:12
RUN npm install -g yarn @vue/cli npx typescript del-cli lerna
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

# RUN pnpm link @csnext/vue-cli-plugin-cs;pnpm link @csnext/cs-core;pnpm link @csnext/cs-client;pnpm link @csnext/cs-split-panel;pnpm link @csnext/cs-billboard;vue create --preset preset.json cli-test-project;cd cli-test-project;vue build
# WORKDIR /packages/cs-client
# RUN ["vue","serve"]


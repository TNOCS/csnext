FROM node:8
RUN npm install yarn
COPY . .
RUN yarn
RUN yarn build
RUN vue create --preset tnocs/csnext cli-test-project
RUN cd cli-test-project
RUN yarn build
# WORKDIR /packages/cs-client
# CMD http-server -p 9001


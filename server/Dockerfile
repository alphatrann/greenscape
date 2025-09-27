FROM node:20-alpine3.16
WORKDIR /user/src/app
RUN chown -R node:node /user/src/app
COPY package.json yarn.lock ./
USER node
RUN yarn
COPY --chown=node:node . .
ENV NODE_ENV=production
RUN yarn gen
RUN yarn build
EXPOSE 5000
CMD [ "yarn", "start:prod" ]

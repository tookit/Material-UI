FROM node:11-stretch

ARG TARGET=/app/gui

RUN mkdir -p $TARGET
WORKDIR $TARGET

COPY . .
RUN npm install

CMD ["npm", "run", "serve"]

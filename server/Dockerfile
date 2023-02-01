FROM harbor.fhzny.com:60002/public/node:16.17.0
WORKDIR /home/app
COPY ./ /home/app
RUN npm install
ENTRYPOINT ["npm","start"]

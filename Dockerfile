FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN apt-get update 
RUN apt-get install python3 -y
RUN apt-get install -y python3-pip
#RUN npm install pg
#RUN npx sequelize-cli db:migrate
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 80
CMD ["npm", "run", "start"]
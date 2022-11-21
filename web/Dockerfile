FROM node:latest

#Creates directories
RUN mkdir -p /usr/app

#Sets an environment variable
# ENV PORT 3000

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/app

#Copy new files or directories into the filesystem of the container
COPY package.json .
COPY package-lock.json .

#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . .

#Execute commands in a new layer on top of the current image and commit the results
# RUN npm run build

#Informs container runtime that the container listens on the specified network ports at runtime
# EXPOSE 3000

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "start"]

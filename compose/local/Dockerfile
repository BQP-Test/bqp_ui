# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:16.6.2-buster AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# RUN npm config set timeout 300000  # Set timeout to 5 minutes (300000 milliseconds)

# RUN npm config set registry https://registry.npmjs.org/

# RUN npm install -g npm@10.5.0

# install node modules and build assets
RUN npm rebuild node-sass
RUN npm install && npm run build

# nginx state for serving content
FROM nginx
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
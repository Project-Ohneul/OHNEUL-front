FROM node:latest AS build
# 작업할 디렉토리!
RUN mkdir -p /var/app
# 작업할 디렉토리!
WORKDIR /var/app
# 모듈 설치~
# COPY package.json package-lock.json ./

COPY . .

RUN npm install

RUN npm run build

RUN npm install -g serve

EXPOSE 3000
 
# nginx 이미지
# FROM nginx:latest
# RUN chmod -R 777 /var/cache/nginx/client_temp
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /var/app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# CMD ["npm start", "build/index.html"]
CMD ["serve", "-s", "build"]

# 빌드
FROM node:latest AS build

# 작업 디렉토리 생성
WORKDIR /var/app

# 패키지 파일을 먼저 복사하고 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사 및 애플리케이션 빌드
COPY . .
RUN npm run build

# 최종 이미지 단계
FROM nginx:alpine

# Nginx의 기본 설정 파일을 사용하여 빌드된 애플리케이션을 제공
COPY --from=build /var/app/build /usr/share/nginx/html

# Nginx 포트 열기
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]

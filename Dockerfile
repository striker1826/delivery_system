FROM node:16.14

# 앱 디렉토리 생성 및 설정
WORKDIR /app

# 앱 종속성 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 앱 빌드
RUN yarn run build

EXPOSE 3000
# 앱 실행
CMD [ "yarn", "run", "start:prod" ]
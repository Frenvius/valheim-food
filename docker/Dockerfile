FROM oven/bun:latest

ENV TZ=America/Sao_Paulo

ARG NODE_VERSION=18
RUN apt-get update && apt-get install -y tzdata unzip curl
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

CMD ["bun", "start"]
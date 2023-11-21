FROM node:20.9.0-alpine3.18 AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
# Legacy Support
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
# Legacy Support
RUN apk add build-base

WORKDIR /app

# Legacy Support
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Legacy Support

RUN npm ci 

FROM base AS dev

WORKDIR /app
COPY  --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000 
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1 
ENV HOSTNAME "0.0.0.0" 
ENV NODE_ENV development
ENV ENV DEV

CMD npm run dev:watch

FROM base AS build 

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV development

RUN npm run build

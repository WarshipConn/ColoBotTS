FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY src ./src
EXPOSE 3000
CMD ["node", "src/index.ts"]

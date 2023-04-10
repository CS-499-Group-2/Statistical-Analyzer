FROM node as build
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm ci
COPY ./backend .
RUN npm run build

FROM node:19-alpine as prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
ENV NODE_ENV=production
RUN npm ci
EXPOSE 8080
CMD ["npm", "start"]
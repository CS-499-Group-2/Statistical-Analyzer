FROM node as build
WORKDIR /app
COPY . .
RUN cd frontend && npm install
WORKDIR /app/backend
RUN npm install
RUN npm run build

FROM node:19-alpine as prod
WORKDIR /app
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/package.json package.json
EXPOSE 8080
CMD ["npm", "start"]
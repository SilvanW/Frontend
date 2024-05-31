FROM node:20-alpine

RUN npm install -g pnpm --no-save

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY pnpm-lock.yaml package.json ./

# install project dependencies
RUN pnpm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

RUN pnpm run build
RUN pnpm prune

EXPOSE 3000

# CMD [ "pnpm", "run", "dev"]
CMD ["node", ".output/server/index.mjs"]
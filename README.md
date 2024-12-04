# Getting Started
Copy .env file and update secrets

```sh
cp .env.example .env
```

Run nvm use
```sh
nvm use
```

Run install
```sh
npm run install
```

Run build
```sh
npm run build
```

Run start
```sh
npm run start
```

Build docker image
```sh
docker build -t cloudflare-dynamic-dns .
```

Run docker image
```sh
docker run \
-e CLOUDFLARE_AUTH_EMAIL=foo@bar.com \
-e CLOUDFLARE_AUTH_KEY=123 \
-e DOMAIN_NAME=google.com \
cloudflare-dynamic-dns
```
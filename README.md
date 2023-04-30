<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

A prodution ready server built with [Nest](https://github.com/nestjs/nest)

- MongoDB configuration
- Default user model with username and password
- JWT based authentication
- Docker image
- Integration for Docker Secrets

## Installation

```bash
$ pnpm i

# exclude dev dependencies
$ pnpm i --prod
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Test

```bash
$ pnpm run test:e2e
```

## License

This template is [MIT licensed](LICENSE).

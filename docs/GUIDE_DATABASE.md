# Guide: Database

Follow this if want to run the database in a local container with Docker and
Docker Compose.

## Docker

Install and setup Docker on your system.

- On Mac, use [OrbStack](https://orbstack.dev) (recommended) or
  [Podman](https://podman.io)
- On Linux, install
  [Docker](https://docs.docker.com/desktop/install/linux-install)
- On Windows, use WSL then install [Podman](https://podman.io), alternative to
  [Docker Desktop](https://docs.docker.com/desktop/install/windows-install)

## Docker Compose

Setup `.env` to contain these and change them as needed:

```sh
MYSQL_ROOT_PASSWORD=the_root_password
MYSQL_USER=the_user
MYSQL_PASSWORD=the_password
MYSQL_DATABASE=bandungdev
MYSQL_HOST_PORT=3306
MYSQL_CONTAINER_PORT=3306
```

Start Docker service.

Run Docker Compose up.

```sh
docker-compose up
```

If everything is fine, exit and run it again in detached mode.

```sh
docker-compose up -d
```

Push the schema to it.

```sh
pnpm db:push
```

Seed initial data

```sh
pnpm db:seed
```

> Note: Only need to push the schema in development. No need for migration
> files.

## Database backup from PlanetScale

To backup using PlanetScale's `pscale` CLI:

```sh
pscale db dump database_name branch --output database_name.dump
```

For example:

```sh
pscale db dump rewinds main --output rewinds.dump
```

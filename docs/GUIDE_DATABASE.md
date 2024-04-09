# Guide: Database

Follow this if want to run the database in a local container with Docker and Docker Compose.

## Docker

Install and setup Docker on your system.

- On Mac, use [OrbStack](https://orbstack.dev) (recommended) or [Podman](https://podman.io)
- On Linux, install [Docker](https://docs.docker.com/desktop/install/linux-install)
- On Windows, use WSL then install [Podman](https://podman.io), alternative to
  [Docker Desktop](https://docs.docker.com/desktop/install/windows-install)

## Docker Compose

Setup `.env` to contain these and change them as needed:

```sh
MYSQL_ROOT_PASSWORD=the_root_password
MYSQL_USER=the_user
MYSQL_PASSWORD=the_password
MYSQL_DATABASE=dogokit
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

> Note: Only need to push the schema in development. No need for migration files.

## Database Backup and Restore with PlanetScale

Login with PlanetScale's `pscale` CLI:

```sh
pscale auth login
```

Dump to a backup:

```sh
# pscale db dump <database> <branch> --output <folder>
pscale db dump dogokit main --output dogokit-backup-mysql
```

Restore dump from the backup folder:

```sh
# pscale db restore-dump <database> <branch> --dir <folder>
pscale db restore-dump dogokit main --dir dogokit-backup-mysql
```

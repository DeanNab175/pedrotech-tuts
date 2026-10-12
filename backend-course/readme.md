## Run the server:

`npm run dev`

## Command to generate key:

`openssl rand -base64 32`

### RUN a docker PostgreSql db:

`docker run --name my-postgresql-db -e POSTGRES_PASSWORD=mysecrectpassword -p 5432:5432 -d postgres`

## Run the docker compose postgres:

`docker compose -f docker-compose.postgres.yml up -d`

## Stop the docker compose postgres:

`docker compose -f docker-compose.postgres.yml down` (add -v if you also want to wipe the postgres_data volume)

## Check logs/status of the docker compose postgres:

`docker compose -f docker-compose.postgres.yml logs -f`
OR
`docker compose -f docker-compose.postgres.yml ps`

## Generate the Prisma client (this creates generated/prisma/):

`npx prisma generate`

## Migrate the Prisma data:

`npx prisma migrate dev --name add_table_x`

## Generate secret key:

`openssl rand -base64 32`

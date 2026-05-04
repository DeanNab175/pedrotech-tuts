Command to generate key: openssl rand -base64 32

RUN a docker PostgreSql db:
docker run --name my-postgresql-db -e POSTGRES_PASSWORD=mysecrectpassword -p 5432:5432 -d postgres
# DATABASE

## Start database
```
cd ..
podman-compose up # ak podman
docker-compose up # ak docker
```
## End database
```
podman-compose down
docker-compose down
```
## Database migrate
```
npx prisma migrate dev --name init # vytvori migraciu s nazvom init
```
## Database seed
```
npm run seed
```
## Database restart
```
npx prisma migrate reset
```
## Database view
```
npx prisma studio
```
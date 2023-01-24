# GDC-DnD

docker-compose for production

```
sudo docker kill $(sudo docker ps -q)
sudo docker rm $(sudo docker ps -a -q)
sudo docker rmi $(sudo docker images -q)
sudo docker compose -f ./docker-compose.prod.yml up --build
```

docker: make -C server docker-compose
server: yarn wait-on http://localhost:8000/shell/ && yarn wait-for-redis && make -C server serve
client: yarn wait-on tcp:localhost:4000 && make -C client serve

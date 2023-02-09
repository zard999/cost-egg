# FROM mysql:5.7
# COPY ./sql  /tmp/sql
# RUN mv /tmp/sql/*.sql /docker-entrypoint-initdb.d
# # RUN rm -rf /tmp/sql

FROM mysql:8.0.31
# COPY conf /usr/local/docker/mysql/conf
# docker-entrypoint-initdb.d 不执行可能是由于有本地缓存
WORKDIR /docker-entrypoint-initdb.d
ENV LANG=C.UTF-8
ADD init.sql .

FROM consul:0.8.3

COPY entry-point.sh /usr/local/bin/entry-point.sh

RUN chmod +x /usr/local/bin/entry-point.sh

ENTRYPOINT ["docker-entrypoint.sh", "/usr/local/bin/entry-point.sh"]



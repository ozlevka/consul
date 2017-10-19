FROM consul:0.9.3

COPY entry-point.sh /usr/local/bin/entry-point.sh
COPY config.json /consul/config/server
RUN chmod +x /usr/local/bin/entry-point.sh

ENTRYPOINT ["/usr/local/bin/entry-point.sh"]



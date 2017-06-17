#!/bin/sh

set -x

if [ -z "$CONSUL_DATA_DIR" ]; then
    CONSUL_DATA_DIR=/consul/data
    echo "Data dir configured to $CONSUL_DATA_DIR"
fi

if [ -z "$CONSUL_CONFIG_DIR" ]; then
    CONSUL_CONFIG_DIR=/consul/config
    echo "Config dir configured to $CONSUL_CONFIG_DIR"
fi

if [ -n "$CONSUL_BIND_INTERFACE" ]; then
    CONSUL_BIND_ADDRESS=$(ip -o -4 addr list $CONSUL_BIND_INTERFACE | head -n1 | awk '{print $4}' | cut -d/ -f1)
    echo "Right now consul bind address is"

    CONSUL_BIND="-bind=$CONSUL_BIND_ADDRESS"
fi

if [ -z "$NUMBER_OF_EXPECTED" ]; then
    NUMBER_OF_EXPECTED=3
fi

consul agent \
       $CONSUL_BIND \
       -data-dir="$CONSUL_DATA_DIR" \
       -config-dir="$CONSUL_CONFIG_DIR" \
       -bootstrap-expect="$NUMBER_OF_EXPECTED"\
       -retry-join=consul \
       -retry-interval=7s \
       -server \
       -ui \
       -client=0.0.0.0 \
       -disable-host-node-id=true
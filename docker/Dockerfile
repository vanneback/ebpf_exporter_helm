FROM debian:sid-slim AS downloader

RUN apt-get update \
 && apt-get install -y --no-install-recommends --no-install-suggests \
      ca-certificates \
      jq \
      wget

COPY package.json package.json

RUN jq -r '.version' package.json > version

RUN wget https://github.com/cloudflare/ebpf_exporter/releases/download/v$(cat version)/ebpf_exporter-$(cat version).tar.gz \
 && tar -zvxf ebpf_exporter-$(cat version).tar.gz \
 && mv ebpf_exporter-$(cat version)/ebpf_exporter /usr/local/bin

FROM debian:sid-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends --no-install-suggests libbpfcc

COPY --from=downloader /usr/local/bin/ebpf_exporter /usr/local/bin/ebpf_exporter

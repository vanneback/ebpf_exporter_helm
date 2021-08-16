ebpf-exporter-deploy
====================

Helm chart and Dockerfile to support running
[ebpf\_exporter](https://github.com/cloudflare/ebpf_exporter) on Kubernetes.

## Project Status

This project is:

 * Maintained by Teachers Pay Teachers.
 * Used in production by Teachers Pay Teachers.

## Versioning

 * Docker image tags match [ebpf\_exporter
   releases](https://github.com/cloudflare/ebpf_exporter/releases).
 * The `apiVersion` of the Helm chart matches [ebpf\_exporter
   releases](https://github.com/cloudflare/ebpf_exporter/releases).
 * Helm `version` follows semantic versioning and increments when there are
   changes to `values.yaml`.

## Release Artifacts

 * GitHub releases are published with either a `ebpf-exporter-helm-` or `ebpf-exporter-docker-` prefix,
   depending on whhat was changed.
 * Docker images are published to [Dockerhub](https://hub.docker.com/r/teacherspayteachers/ebpf-exporter).
 * Helm charts are published to [teacherspayteachers.github.io/helm-charts/](teacherspayteachers.github.io/helm-charts/)..

## Requirements

 * Docker is required to build Docker images.
 * Helm is required to lint and template the Helm chart.
 * Helm releases require hosts to have Linux kernel source code or headers.
 * Helm releases require elevated security privileges.

## Why

Cloudflare's [ebpf\_exporter](https://github.com/cloudflare/ebpf_exporter)
makes it easy to extract Prometheus metrics from eBPF programs. However, it
does not contain production-ready Docker images.

[ebpf\_exporter\_helm](https://github.com/vanneback/ebpf_exporter_helm) is a
community Helm chart for ebpf\_exporter.  However, the author has told us over
email that it is not maintained.

This repository contains a production-ready Docker image based on
[ebpf\_exporter\_dockerfile](https://github.com/vanneback/ebpf_exporter_dockerfile),
and a maintained Helm chart based on
[ebpf\_exporter\_helm](https://github.com/vanneback/ebpf_exporter_helm).

## Usage

First, define a set of eBPF programs. See
[ebpf\_exporter](https://github.com/cloudflare/ebpf_exporter#configuration-file-format)
for the configuration format. Optionally, override any default values in
`values.yaml`. For example:

```
config:
- programs:
  - name: cachestat
    metrics:
      counters:
        - name: page_cache_ops_total
          help: Page cache operation counters by type
          table: counts
          labels:
            - name: op
              size: 8
              decoders:
                - name: ksym
            - name: command
              size: 128
              decoders:
                - name: string
                - name: regexp
                  regexps:
                    - ^systemd-journal$
                    - ^syslog-ng$
    kprobes:
      add_to_page_cache_lru: do_count
      mark_page_accessed: do_count
      account_page_dirtied: do_count
      mark_buffer_dirty: do_count
    code: |
      #include <uapi/linux/ptrace.h>
  
      struct key_t {
          u64 ip;
          char command[128];
      };
  
      BPF_HASH(counts, struct key_t);
  
      int do_count(struct pt_regs *ctx) {
          struct key_t key = { .ip = PT_REGS_IP(ctx) - 1 };
          bpf_get_current_comm(&key.command, sizeof(key.command));
  
          counts.increment(key);
  
          return 0;
      }
```

Next, supply the programs to the Helm install command.

```shell
$ helm repo helm repo add tpt https://teacherspayteachers.github.io/helm-charts
$ helm install ebpf-exporter tpt/ebpf-exporter -f values.yaml
```

## Metrics

See [ebpf\_exporter](https://github.com/cloudflare/ebpf_exporter) to understand
how exported Prometheus metrics work.

## Alternatives

 * Cloudflare deploys [ebpf\_exporter](https://github.com/cloudflare/ebpf_exporter/issues/82#issuecomment-731428957)
   directly on hosts in order to avoid having to bind-mount kernel sources and headers into Docker containers.
 * [Helm chart](https://github.com/vanneback/ebpf_exporter_helm) that this repository's Helm chart is based on.
 * Alternative [Dockerfile](https://github.com/vanneback/ebpf_exporter_dockerfile).

## Contributing

Contributions are very welcome! Please see [CONTRIBUTING.md](https://github.com/TeachersPayTeachers/linux-audit-exporter/blob/main/CONTRIBUTING.md).

## License

[MIT](https://github.com/TeachersPayTeachers/linux-audit-exporter/blob/main/LICENSE.md)

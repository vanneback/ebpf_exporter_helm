# ebpf-exporter

[ebpf-exporter](https://github.com/teacherspayteachers/ebpf-exporter-deploy) - Export your eBPF metrics in Prometheus format using ebpf_exporter.

Original credits for this Helm chart go to [Emil Vanneback](https://github.com/vanneback/ebpf_exporter_helm).
Note: there are breaking changes between the version 0.1.0 of that project and the first version (0.2.0) of this
project.


## TL;DR;

```console
$ helm repo add tpt https://teacherspayteachers.github.io/helm-charts
$ helm repo update
$ helm install ebpf-exporter tpt/ebpf-exporter -n kube-system
```

## Introduction

This chart deploys a Prometheus exporter for custom eBPF metrics on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- K8s host running Linux kernel with kernel sources

## Installing the Chart

To install the chart with the release name `ebpf-exporter`:

```console
$ helm install ebpf-exporter tpt/ebpf-exporter -n kube-system
```

The command deploys a Prometheus exporter for custom eBPF metrics on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `ebpf-exporter`:

```console
$ helm delete ebpf-exporter -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `ebpf-exporter` chart and their default values.

|         Parameter          |                                             Description                                             |               Default               |
|----------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------|
| affinity                   | Specify Pod affinity constraints.                                                                   | `{}`                                |
| config                     | See https://github.com/cloudflare/ebpf_exporter#configuration-file-format for configuration format. | `[]`                                |
| extraVolumeMounts          | Extra volumeMounts.                                                                                 | `[]`                                |
| extraVolumes               | Extra volumes.                                                                                      | `[]`                                |
| fullnameOverride           | Full name override.                                                                                 | `""`                                |
| image.pullPolicy           | Docker image pull policy.                                                                           | `IfNotPresent`                      |
| image.registry             | Docker image registry.                                                                              | `docker.io`                         |
| image.repository           | Docker image repository.                                                                            | `teacherspayteachers/ebpf-exporter` |
| image.tag                  | Docker image tag.                                                                                   | `1.2.3`                             |
| ingress.enabled            | Enable or disable Ingress.                                                                          | `false`                             |
| ingress.annotations        | Ingress annotations.                                                                                | `{}`                                |
| ingress.paths              |                                                                                                     | `[]`                                |
| ingress.hosts              |                                                                                                     | `[]`                                |
| ingress.tls                |                                                                                                     | `[]`                                |
| nameOverride               | Name override.                                                                                      | `""`                                |
| nodeSelector               | Node selector.                                                                                      | `{}`                                |
| podAnnotations             | Pod annotations.                                                                                    | `{}`                                |
| resources                  | Container resources.                                                                                | `{}`                                |
| securityContext.privileged | ebpf_exporter requires elevated privileges.                                                         | `true`                              |
| service.type               |                                                                                                     | `ClusterIP`                         |
| service.port               |                                                                                                     | `80`                                |
| service.annotations        | Add service annotations.                                                                            | `{}`                                |
| tolerations                | Specify taint tolerations.                                                                          | `[]`                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install ebpf-exporter tpt/ebpf-exporter -n kube-system --set image.pullPolicy=IfNotPresent
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install ebpf-exporter tpt/ebpf-exporter -n kube-system --values values.yaml
```

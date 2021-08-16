# SHELL := /bin/bash
TMPDIR := $(if $(TMPDIR),$(TMPDIR),"/tmp/")
GOPATH := $(shell go env GOPATH)

chart-doc-gen := $(GOPATH)/bin/chart-doc-gen
readme := ./README.md

.PHONY: docs
docs: docs.readme

.PHONY: docs.readme
docs.readme: $(chart-doc-gen)
	chart-doc-gen \
		-d=./doc.yaml \
	       	-v=./values.yaml \
	       	> $(readme)

$(bin): $(gofiles)
	GO111MODULE=on go install ./...

.PHONY: ci
ci: build lint test

.PHONY: clean
clean:
	git clean -x -f

.PHONY: lint 
lint: lint.readme

.PHONY: lint.docs
lint.docs: lint.readme

.PHONY: lint.readme
lint.readme: $(readme)
	git diff --exit-code -- $(readme) > /dev/null

.PHONY: release.dryrun
release.dryrun:
	npm ci
	npx semantic-release -d

.PHONY: release
release:
	npm ci
	npx semantic-release --ci=false

$(chart-doc-gen):
	cd $(TMPDIR) && GO111MODULE=on go get kubepack.dev/chart-doc-gen@v0.3.0

docs:

lint:

.PHONY: release
release:
	npm ci
	npx semantic-release --ci=false

.PHONY: release.dryrun
release.dryrun:
	npm ci
	npx semantic-release -d

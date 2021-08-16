default: all

SUBDIRS := docker helm

$(SUBDIRS)::
	$(MAKE) -C $@ $(MAKECMDGOALS)

all docs clean lint release release.dryrun : $(SUBDIRS)

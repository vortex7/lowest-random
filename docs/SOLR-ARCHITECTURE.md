# SOLR Architecture

- [Overview](#overview)
- [Index SOLR Documents](#index-solr-documents)
- [Search SOLR Documents](#search-solr-documents)

## Overview

This document describes an application architecture that leverages SOLR.

## Index SOLR documents

SOLR documents are created/updated by Kafka anytime a change is detected by the API.

![solr-architecture-create](../diagrams/solr-architecture/solr-architecture-create.svg)

## Search SOLR documents

SOLR documents are searched by the web application.

![solr-architecture-search](../diagrams/solr-architecture/solr-architecture-search.svg)

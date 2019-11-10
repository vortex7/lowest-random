# ELK Setup

This setup requires an Ubuntu or Debian operating system.

This setup follows this article:

https://www.elastic.co/guide/en/logstash/current/advanced-pipeline.html

Note: All commands are run as root (not sudo). To become root, I set up an alias and put it into my non-root user's .bashrc (in my case, developer):

```
alias root="sudo su -"
```

## Install java
```
apt install --yes openjdk-8-jdk
```

## Install elasticsearch, logstash, kibana and filebeat
```
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
apt-get install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-7.x.list
apt-get update && apt-get install elasticsearch
apt-get update && apt-get install logstash
apt-get update && apt-get install kibana
apt-get update && apt-get install filebeat
```

## Modify .bashrc for ELK stack

```
cd /root
vi .bashrc <<EOF
G
:set paste
:a
export ELASTICSEARCH_HOME="/usr/share/elasticsearch"
export LOGSTASH_HOME="/usr/share/logstash"
export KIBANA_HOME="/usr/share/kibana"
export FILEBEAT_HOME="/usr/share/filebeat"

export PATH="\$PATH:\$ELASTICSEARCH_HOME/bin:\$LOGSTASH_HOME/bin:\$KIBANA_HOME/bin:\$FILEBEAT_HOME/bin"
.
:wq
EOF
```


## Install sample log file

```
cd /root
mkdir wip
cd wip
wget https://download.elastic.co/demos/logstash/gettingstarted/logstash-tutorial.log.gz
gunzip logstash-tutorial.log.gz
```

## Create first logstash pipeline

This pipeline reads from an Apache web server log and writes to Elasticsearch

```
cd /etc/logstash/
vi first-pipeline.conf <<EOF
:set paste
:i
input {
  beats {
    port => "5044"
  }
}
filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}"}
  }
  geoip {
    source => "clientip"
  }
}
output {
  elasticsearch {
    hosts => [ "localhost:9200" ]
  }
}
.
:wq
EOF
```

In a terminal, start the logstash first-pipeline

```
cd /etc/logstash/
logstash -f first-pipeline.conf --config.reload.automatic
```

## Configure filebeat

```
cd /etc/filebeat/
vi filebeat.yml <<EOF
VGd
:set paste
:i
filebeat.inputs:
- type: log
  paths:
    - /root/wip/logstash-tutorial.log 
output.logstash:
  hosts: ["localhost:5044"]
.
:wq
EOF
```

In a terminal, start the filebeat

```
cd /etc/filebeat
filebeat -e -c filebeat.yml -d "publish"
```

## Start Elasticsearch

```
systemctl daemon-reload
systemctl enable elasticsearch.service
systemctl start elasticsearch.service
journalctl --unit elasticsearch --follow
```

## Start Kibana

```
kibana --allow-root
```

## Test elasticsearch

Replace `2019.11.09-000001` with the date of your log. Find your log name by `_cat/indicies?v`

```
curl 'localhost:9200/_cat/indices?v'
curl -XGET 'localhost:9200/logstash-2019.11.09-000001/_search?pretty&q=response=200'
```

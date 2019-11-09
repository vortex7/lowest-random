# ELK Setup

This tutorial requires an Ubuntu or Debian operating system.

All commands are run as root (not sudo).

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
o
export ELASTICSEARCH_HOME="/usr/share/elasticsearch"
export LOGSTASH_HOME="/usr/share/logstash"
export KIBANA_HOME="/usr/share/kibana"
export FILEBEAT_HOME="/usr/share/filebeat"

export PATH="$PATH:$ELASTICSEARCH_HOME/bin:$LOGSTASH_HOME/bin:$KIBANA_HOME/bin:$FILEBEAT_HOME/bin"
<Esc>
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
o
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
<Esc>
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
o
filebeat.inputs:
- type: log
  paths:
    - /root/wip/logstash-tutorial.log 
output.logstash:
  hosts: ["localhost:5044"]
<Esc>
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
```

## Start Kibana

```
kibana --allow-root
```

## Test elasticsearch

```
```
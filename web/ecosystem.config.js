module.exports = {
  apps : [{
    name: "lowest-random-web",
    script: "index.js",
    args: "",
    instances: 5,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G"
  }]
};

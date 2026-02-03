module.exports = {
  apps: [{
    name: 'mathfun',
    script: 'node_modules/.bin/next',
    args: 'start -p 5000',
    cwd: '/home/shirai91/projects/personal/mathfun',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
}

module.exports = {
  apps: [{
    name: 'sharedLocker-next-product',
    script: 'npm',
    args: 'run start',
    env: {
      NODE_ENV: 'production'
    },
    output: './logs/pm2/console.log',
    error: './logs/pm2/error.log',
  }, {
    name: 'sharedLocker-next-dev',
    script: 'npm',
    args: 'run dev',
    env: {
      NODE_ENV: 'development'
    },
    output: './logs/pm2/dev/console.log',
    error: './logs/pm2/dev/error.log'
  }],
};

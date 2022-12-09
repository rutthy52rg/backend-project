module.exports = {
  apps: [
    {
      name: "nodepop",
      script: "bin/www",
      watch: "./bin/wwww",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      script: "microservices/emailService.js",
      watch: ["./microservices/emailService.js"],
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};

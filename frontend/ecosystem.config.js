module.exports = {
  apps: [
    {
      name: "onway-cargo",
      script: "npm",
      args: "start",
      cwd: "/root/onway-cargo",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
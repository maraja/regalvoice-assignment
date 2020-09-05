module.exports = {
    apps: [
      {
        name: "regalvoice-backend",
        script: "dist/bundle.js",
        env: {
          PORT: 80,
          NODE_ENV: "production"
        }
      }
    ]
  };
  
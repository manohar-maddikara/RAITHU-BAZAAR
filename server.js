const cluster = require('cluster');
const os = require('os');
const app = require('./app');
require('dotenv').config();

const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 5000;

if (cluster.isMaster || cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit and restart immediately
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Workers share the TCP connection
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started and listening on port ${PORT}`);
  });
}

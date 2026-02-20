import { spawn } from 'child_process';
import fetch from 'node-fetch';

const server = spawn('npm', ['start'], { stdio: 'inherit' });

server.on('close', (code) => {
  console.log(`Local server exited with code ${code}`);
});

process.on('SIGINT', () => {
    server.kill('SIGINT');
    process.exit();
});

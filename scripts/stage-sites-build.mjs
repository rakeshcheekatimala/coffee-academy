import { copyFile, cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const openNext = resolve(root, '.open-next');
const dist = resolve(root, 'dist');
const server = resolve(dist, 'server');
const client = resolve(dist, 'client');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(openNext, server, { recursive: true });
await copyFile(resolve(server, 'worker.js'), resolve(server, 'index.js'));
await cp(resolve(openNext, 'assets'), client, { recursive: true });
await rm(resolve(server, 'assets'), { recursive: true, force: true });

await mkdir(resolve(dist, '.openai'), { recursive: true });
await copyFile(
  resolve(root, '.openai', 'hosting.json'),
  resolve(dist, '.openai', 'hosting.json'),
);

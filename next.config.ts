import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Silence workspace-root inference warning in this repo layout
  outputFileTracingRoot: path.resolve(__dirname, '..'),
};

export default nextConfig;

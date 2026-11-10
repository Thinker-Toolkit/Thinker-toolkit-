#!/usr/bin/env node

import("../dist/cli.js").then((cli) => {
  cli.run();
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

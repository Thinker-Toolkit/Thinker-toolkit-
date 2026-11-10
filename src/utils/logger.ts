import pc from "picocolors";

export const logger = {
  info: (msg: string) => console.log(pc.white(msg)),
  success: (msg: string) => console.log(pc.green(msg)),
  warn: (msg: string) => console.log(pc.yellow(msg)),
  error: (msg: string) => console.error(pc.red(msg)),
  dim: (msg: string) => console.log(pc.dim(msg)),
  bold: (msg: string) => pc.bold(msg),
};

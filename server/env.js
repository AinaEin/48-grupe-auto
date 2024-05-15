import dotenv from "dotenv";

console.clear();
const processArgs = {};

const currentArgs = process.argv.slice(2);

for (const arg of currentArgs) {
  if (arg.startsWith("--")) {
    const data = arg.slice(2).split("=");
    if (data.length === 1) {
      processArgs[data[0]] = true;
    }
    if (data.length === 2) {
      processArgs[data[0]] = data[1];
    }
  }
}

dotenv.config({
  path: processArgs.env ?? ".env",
});

export const CLIENT_PORT = process.env.CLIENT_PORT;
export const SERVER_PORT = process.env.SERVER_PORT;
export const LOGIN_TOKEN = process.env.LOGIN_TOKEN;

import { createHash } from "node:crypto";

const salt = "548th7b5fv26e5resg41f5af2gs4";

export function hash(str) {
  return createHash("sha256", { encoding: "utf8" })
    .update(salt + str)
    .digest("hex");
}

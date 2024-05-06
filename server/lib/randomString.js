export function randomString(size) {
  const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let str = "";

  for (let i = 0; i < size; i++) {
    str += abc[Math.floor(Math.random() * abc.length)];
  }

  return str;
}

// for (let i = 0; i <20; i++) {
//     console.log(randomString(5))
// }

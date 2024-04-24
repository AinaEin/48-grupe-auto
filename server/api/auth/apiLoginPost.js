export function apiLoginPost(req, res) {
  const { email, password } = req.body;

  // let userId = -1;

  // for (const user of users) {
  //     if (user.email === email &&
  //         user.password === password) {
  //         userId = user.id;
  //         break;
  //     }
  // }

  // if (userId > 0) {
  //     return res.send(JSON.stringify({
  //         message: 'User successfully logged in',
  //         loggedIn: true,
  //         userId,
  //     }));
  // }

  return res.send(
    JSON.stringify({
      message: "Such user does not exist",
      loggedIn: false,
    })
  );
}

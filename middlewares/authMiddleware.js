const { getUser } = require("../service/auth");

async function authMiddleware(req, res, next) {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.redirect("/signin");
    //return res.status(401).json({ message: "Unauthorized: No session ID" });
  }
  const user = getUser(sessionId);
  if (!user) {
    return res.redirect("/signin"); // Redirect to sign-in page if session is invalid
    // return res
    //   .status(401)
    //   .json({ message: "Unauthorized: Invalid session ID" });
  }
  req.user = user;
  next();
}

module.exports = { authMiddleware };

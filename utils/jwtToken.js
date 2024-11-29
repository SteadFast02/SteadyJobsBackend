export const sendToken = (user, statusCode, res, message) => {
  const token = user.getToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
    // secure:true // for HTTPS
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
export const deleteToken = (res, message) => {
  const options = {
    expires: new Date(Date.now() - 1000),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res
    .status(200)
    .cookie("token", "", options)
    .json({
      success: true,
      message: message || "Logged out successfully",
    });
};

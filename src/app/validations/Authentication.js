/* eslint-disable import/prefer-default-export */
const isInvalidEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !emailRegex.test(String(email).toLowerCase());
};

export const store = (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || email === null || email === undefined) {
    return res.status(400).json({
      status: 400,
      message: "Email é obrigatório",
    });
  }

  if (isInvalidEmail(email)) {
    return res.status(400).json({
      status: 400,
      message: "O Email informado não é válido",
    });
  }

  if (password === "" || password === null || password === undefined) {
    return res.status(400).json({
      status: 400,
      message: "Senha é obrigatória",
    });
  }

  return next();
};

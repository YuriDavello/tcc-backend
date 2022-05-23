/* eslint-disable import/prefer-default-export */
export const store = (req, res, next) => {
  const { name, password, email } = req.body;

  if (name === "" || name === null || name === undefined)
    return res.status(400).json({
      status: 400,
      message: "Nome não foi informado",
    });

  if (email === "" || email === null || email === undefined)
    return res.status(400).json({
      status: 400,
      message: "E-mail não foi informado",
    });

  if (password === "" || password === null || password === undefined)
    return res.status(400).json({
      status: 400,
      message: "Senha não foi informada",
    });

  return next();
};

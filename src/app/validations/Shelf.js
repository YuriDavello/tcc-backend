/* eslint-disable import/prefer-default-export */
export const store = (req, res, next) => {
  const { name, sections, type, code } = req.body;

  if (name === "" || name === null || name === undefined)
    return res.status(400).json({
      status: 400,
      message: "Nome da prateleira não informado",
    });

  if (code === "" || code === null || code === undefined)
    return res.status(400).json({
      status: 400,
      message: "Código da prateleira não informado",
    });

  if (sections === "" || sections === null || sections === undefined)
    return res.status(400).json({
      status: 400,
      message: "Seção(ões) da prateleira não informada(s)",
    });

  if (type === "" || type === null || type === undefined)
    return res.status(400).json({
      status: 400,
      message: "Tipo da prateleira não informado",
    });

  return next();
};

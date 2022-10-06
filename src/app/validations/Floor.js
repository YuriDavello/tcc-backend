/* eslint-disable import/prefer-default-export */
export const store = (req, res, next) => {
  const { floorName, shelfId } = req.body;

  if (floorName === "" || floorName === null || floorName === undefined)
    return res.status(400).json({
      status: 400,
      message: "Nome do(s) andar(es) não informado(s)",
    });

  if (shelfId === "" || shelfId === null || shelfId === undefined)
    return res.status(400).json({
      status: 400,
      message: "Prateleira do andar não encontrada",
    });

  return next();
};

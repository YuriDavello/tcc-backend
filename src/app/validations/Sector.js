/* eslint-disable import/prefer-default-export */
export const store = (req, res, next) => {
  const { floorId, productId } = req.body.sector;

  if (floorId === "" || floorId === null || floorId === undefined)
    return res.status(400).json({
      status: 400,
      message: "Andar do setor não informado",
    });

  if (productId === "" || productId === null || productId === undefined)
    return res.status(400).json({
      status: 400,
      message: "Produto do setor não informado",
    });

  return next();
};

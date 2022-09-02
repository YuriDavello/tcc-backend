/* eslint-disable import/prefer-default-export */
export const store = (req, res, next) => {
  const { batch, quantity, validTill, productId } = req.body;

  if (batch === "" || batch === null || batch === undefined)
    return res.status(400).json({
      status: 400,
      message: "Lote não informado",
    });

  if (quantity === "" || quantity === null || quantity === undefined)
    return res.status(400).json({
      status: 400,
      message: "Quantidade não informada",
    });

  if (validTill === "" || validTill === null || validTill === undefined)
    return res.status(400).json({
      status: 400,
      message: "Validade não informada",
    });

  if (productId === "" || productId === null || productId === undefined)
    return res.status(400).json({
      status: 400,
      message: "Produto não informado",
    });

  return next();
};

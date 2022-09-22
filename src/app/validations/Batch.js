/* eslint-disable import/prefer-default-export */
export const store = (req, res, next) => {
  const {
    code,
    product_quantity: productQuantity,
    valid_till: validTill,
    product_id: productId,
  } = req.body.batch;

  if (code === "" || code === null || code === undefined)
    return res.status(400).json({
      status: 400,
      message: "Lote não informado",
    });

  if (
    productQuantity === "" ||
    productQuantity === null ||
    productQuantity === undefined
  )
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

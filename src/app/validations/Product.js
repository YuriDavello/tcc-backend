/* eslint-disable import/prefer-default-export */
export const store = (req, res, next) => {
  const { name, category, weight, price } = req.body.product;

  if (name === "" || name === null || name === undefined)
    return res.status(400).json({
      status: 400,
      message: "Nome do produto não informado",
    });

  if (category === "" || category === null || category === undefined)
    return res.status(400).json({
      status: 400,
      message: "Categoria do produto não informada",
    });

  if (price === "" || price === null || price === undefined)
    return res.status(400).json({
      status: 400,
      message: "Preço do produto não informado",
    });

  if (weight === "" || weight === null || weight === undefined)
    return res.status(400).json({
      status: 400,
      message: "Peso do produto não informado",
    });

  return next();
};

/* eslint-disable import/prefer-default-export */
export const store = (req, res, next) => {
  const { quantityLines, quantityColumns, floorId } = req.body;

  if (
    quantityLines === "" ||
    quantityLines === null ||
    quantityLines === undefined
  )
    return res.status(400).json({
      status: 400,
      message: "Número de linhas não informado",
    });

  if (
    quantityColumns === "" ||
    quantityColumns === null ||
    quantityColumns === undefined
  )
    return res.status(400).json({
      status: 400,
      message: "Número de colunas não informado",
    });

  if (floorId === "" || floorId === null || floorId === undefined)
    return res.status(400).json({
      status: 400,
      message: "Andar do setor não encontrado",
    });

  return next();
};

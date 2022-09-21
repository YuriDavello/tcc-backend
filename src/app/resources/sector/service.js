import Sequelize from "sequelize";

import Sector from "../../models/Sector";
import Product from "../../models/Product";
import Floor from "../../models/Floor";
// import Database from "../../../database/index";
class SectorService {
  async findByPk(id) {
    //TODO: INCLUDE DO PRODUTO NO SETOR E A QUANTIDADE
    const sector = await Sector.findByPk(id, {
      attributes: ["id", "quantityLines", "quantityColumns"],
      include: [
        {
          model: Product,
          as: "products",
        },
        {
          model: Floor,
          as: "floors",
        },
      ],
    });
    if (!sector) return false;

    return sector;
  }

  async list(floorId) {
    const sectors = await Sector.findAll({
      order: [["id", "ASC"]],
      where: {
        floorId,
      },
      attributes: ["id", "quantityLines", "quantityColumns"],
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["name"],
        },
      ],
    });
    return sectors;
  }

  async create(
    {
      floorId,
      quantityLines,
      quantityColumns,
      productId,
      availableQuantity,
      fitsProducts,
    },
    transaction
  ) {
    const newSector = await Sector.create(
      {
        floorId,
        quantityLines,
        quantityColumns,
        productId,
        availableQuantity,
        fitsProducts,
      },
      {
        transaction,
      }
    );
    return newSector;
  }

  async delete(id, transaction) {
    const sector = await Sector.findByPk(id);
    if (!sector) return false;

    await Sector.destroy({ where: { id }, transaction });

    return true;
  }
}

export default SectorService;

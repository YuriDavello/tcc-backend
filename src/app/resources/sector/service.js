import Sector from "../../models/Sector";
import Product from "../../models/Product";
import Floor from "../../models/Floor";

const props = {
  attributes: ["id"],
};

const props2 = {
  attributes: ["id", "name", "category", "price", "weight"],
};

const props3 = {
  attributes: ["id", "floorName", "shelfId"],
};
class SectorService {
  async findByProductId({ productId }) {
    const sector = await Sector.findAll({
      where: {
        productId,
      },
    });

    if (!sector) return sector;

    return null;
  }
  async findByPk(id) {
    const sector = await Sector.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
          ...props2,
        },
        {
          model: Floor,
          as: "floor",
          ...props3,
        },
      ],
      ...props,
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
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["name"],
        },
      ],
      ...props,
    });
    return sectors;
  }

  async create({ sector }, transaction) {
    const newSector = await Sector.create(sector, {
      transaction,
    });
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

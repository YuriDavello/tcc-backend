import Product from "../models/Product";
import Sector from "../models/Sector";
import Floor from "../models/Floor";
import Shelf from "../models/Shelf";

const { Op } = require("sequelize");

class MappedService {
  async fullMap(productId) {
    const product = await Product.findByPk(productId);
    if (!product) return false;

    const sectors = await Sector.findAll({
      where: {
        product_id: parseInt(productId),
      },
    });
    if (!sectors) return false;

    const floors = await Floor.findAll({
      where: {
        id: {[Op.in]: sectors.map(s => s.floorId)},
      },
    });
    if (!floors) return false;

    const shelf = await Shelf.findAll({
      where: {
        id: {[Op.in]: floors.map(f => f.shelfId)},
      },
    });
    if (!shelf) return false;

    return {
      product,
      sectors,
      floors,
      shelf,
    };
  }
}

export default new MappedService();

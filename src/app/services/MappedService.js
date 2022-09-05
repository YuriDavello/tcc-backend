import Product from "../models/Product";
import Sector from "../models/Sector";
import Floor from "../models/Floor";
import Shelf from "../models/Shelf";

class MappedService {
  async fullMap(productId) {
    const product = await Product.findByPk(productId);
    if (!product) return false;

    const sector = await Sector.findAll({
      where: {
        productId,
      },
    });
    if (!sector) return false;

    const floor = await Floor.findAll({
      where: {
        id: sector.floorId,
      },
    });
    if (!floor) return false;

    const shelf = await Shelf.findAll({
      where: {
        id: floor.shelfId,
      },
    });
    if (!shelf) return false;

    return {
      product,
      sector,
      floor,
      shelf,
    };
  }
}

export default new MappedService();

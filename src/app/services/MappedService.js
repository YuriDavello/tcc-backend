import Product from "../models/Product";
import Sector from "../models/Sector";
import Floor from "../models/Floor";
import Shelf from "../models/Shelf";

class MappedService {
  async fullMap(productId) {
    const product = await Product.findByPk(productId);
    if (!product) return false;

    const sectors = await Sector.findAll({
      where: {
        productId,
      },
    });
    if (!sectors) return false;

    const floors = await Floor.findAll({
      where: {
        id: sectors[0].floorId,
      },
    });
    if (!floors) return false;

    const shelf = await Shelf.findAll({
      where: {
        id: floors[0].shelfId,
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

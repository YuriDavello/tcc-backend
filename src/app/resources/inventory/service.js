import Inventory from "../../models/Inventory";
import Product from "../../models/Product";

class InventoryService {
  // async findByPk(id) {
  //   //TODO: INCLUDE DO PRODUTO NO SETOR E A QUANTIDADE
  //   const sector = await Sector.findByPk(id, {
  //     attributes: ["id", "quantityLines", "quantityColumns"],
  //     include: [
  //       {
  //         model: Product,
  //         as: "products",
  //       },
  //     ],
  //   });
  //   if (!sector) return false;

  //   return sector;
  // }

  // async list(floorId) {
  //   const sectors = await Sector.findAll({
  //     order: [["id", "ASC"]],
  //     where: {
  //       floorId,
  //     },
  //     attributes: ["id", "quantityLines", "quantityColumns"],
  //     include: [
  //       {
  //         model: Product,
  //         as: "product",
  //         attributes: ["name"],
  //       },
  //     ],
  //   });
  //   return sectors;
  // }

  async create({ batch, quantity, validTill, productId }, transaction) {
    const newInventory = await Inventory.create(
      {
        batch,
        quantity,
        validTill,
        productId,
      },
      {
        transaction,
      }
    );
    return newInventory;
  }

  // async delete(id, transaction) {
  //   const sector = await Sector.findByPk(id);
  //   if (!sector) return false;

  //   await Sector.destroy({ where: { id }, transaction });

  //   return true;
  // }

  // async update({ id, quantityLines, quantityColumns }, transaction) {
  //   const sectorUpdated = await Sector.update(
  //     {
  //       quantityLines,
  //       quantityColumns,
  //     },
  //     {
  //       where: {
  //         id,
  //       },
  //       transaction,
  //     }
  //   );

  //   return sectorUpdated;
  // }
}

export default InventoryService;

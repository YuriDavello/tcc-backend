import Inventory from "../../models/Inventory";
import Product from "../../models/Product";

class InventoryService {
  async findByPk(id) {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) return false;

    return inventory;
  }

  async list() {
    const inventories = await Inventory.findAll({
      order: [["id", "ASC"]],
      include: {
        model: Product,
        as: "products",
        required: true
      }
    });
    return inventories;
  }

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

  async delete(id, transaction) {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) return false;

    await Inventory.destroy({ where: { id }, transaction });

    return true;
  }
}

export default InventoryService;

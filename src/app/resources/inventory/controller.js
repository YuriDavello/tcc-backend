import InventoryService from "./service";
// import ProductService from "../product/service";

class InventoryController {
  async list(req, res) {
    const inventoryService = new InventoryService();
    const inventory = await inventoryService.list();
    res.json(inventory);
  }

  async create(req, res) {
    const { batch, quantity, validTill, productId } = req.body;

    const inventoryService = new InventoryService();

    const newInventory = await inventoryService.create({
      batch,
      quantity,
      validTill,
      productId,
    });

    return res.json(newInventory);
  }

  async get(req, res) {
    const { id } = req.params;

    const inventoryService = new InventoryService();

    const inventory = await inventoryService.findByPk(id);

    if (!inventory)
      return res
        .status(400)
        .json({ status: 400, message: "Estoque não encontrado" });

    return res.json(inventory);
  }

  async delete(req, res) {
    const { id } = req.params;

    const inventoryService = new InventoryService();

    const inventory = await inventoryService.delete(id);
    if (!inventory)
      return res.status(400).json({ message: "Estoque não existe" });

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;

    const inventoryService = new InventoryService();

    const inventory = await inventoryService.findByPk(id);

    if (!inventory)
      return res.status(400).json({ message: "Estoque inexistente" });

    await inventory.update({
      ...req.body,
    });

    const response = await inventoryService.findByPk(id);

    return res.json(response);
  }
}

export default new InventoryController();

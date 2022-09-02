import InventoryService from "./service";
// import ProductService from "../product/service";

class InventoryController {
  // async list(req, res) {
  //   const { floorId } = req.query;
  //   const sectorService = new SectorService();
  //   const sectors = await sectorService.list(floorId);
  //   res.json(sectors);
  // }

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

  // async get(req, res) {
  //   const { id } = req.params;

  //   const sectorService = new SectorService();

  //   const sector = await sectorService.findByPk(id);

  //   if (!sector)
  //     return res
  //       .status(400)
  //       .json({ status: 400, message: "Setor não encontrado" });

  //   return res.json(sector);
  // }

  // async delete(req, res) {
  //   const { id } = req.params;

  //   const sectorService = new SectorService();

  //   const sector = await sectorService.delete(id);
  //   if (!sector) return res.status(400).json({ message: "Setor não existe" });

  //   return res.sendStatus(204);
  // }

  // async update(req, res) {
  //   const { id } = req.params;

  //   const { productId, productQuantity, ...rest } = req.body;

  //   //TODO: VALIDAR QUANTOS PRODUTOS TÊM NO ESTOQUE E RETIRAR DE LÁ, SE O PRODUTO EXISTE NO ESTOQUE
  //   // E SE A QUANTIDADE FOR MENOR QUE A ANTERIOR, DEVOLVER O EXCEDENTE PARA O ESTOQUE

  //   const sectorService = new SectorService();

  //   const sector = await sectorService.findByPk(id);

  //   if (!sector) return res.status(400).json({ message: "Setor inexistente" });

  //   await sector.update({
  //     ...rest,
  //   });

  //   const response = await sectorService.findByPk(id);

  //   return res.json(response);
  // }
}

export default new InventoryController();

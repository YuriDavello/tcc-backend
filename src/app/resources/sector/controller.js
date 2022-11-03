import SectorService from "./service";
import ProductService from "../product/service";

class SectorController {
  async list(req, res) {
    const { floorId } = req.query;
    const sectorService = new SectorService();
    const sectors = await sectorService.list({ floorId });
    res.json(sectors);
  }

  async create(req, res) {
    const { sector } = req.body;
    const { productId } = sector;

    let sectorToSave = null;

    const sectorService = new SectorService();
    const productService = new ProductService();

    if (productId) {
      const product = await productService.findByPk(productId);

      if (!product)
        return res
          .status(400)
          .json({ status: 400, message: "Produto não encontrado" });
    }

    const newSector = await sectorService.create({
      sector,
    });

    return res.json(newSector);
  }

  async get(req, res) {
    const { id } = req.params;

    const sectorService = new SectorService();

    const sector = await sectorService.findByPk(id);

    if (!sector)
      return res
        .status(400)
        .json({ status: 400, message: "Setor não encontrado" });

    return res.json(sector);
  }

  async delete(req, res) {
    const { id } = req.params;

    const sectorService = new SectorService();

    const { availableQuantity } = await sectorService.findByPk(id);

    if (availableQuantity)
      return res
        .status(400)
        .json({ message: "Não é possível excluir setor com lote disponível" });

    const sector = await sectorService.delete(id);

    if (!sector) return res.status(400).json({ message: "Setor não existe" });

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;

    const sectorService = new SectorService();

    const sector = await sectorService.findByPk(id);

    if (!sector) return res.status(400).json({ message: "Setor inexistente" });

    await sector.update({
      ...req.body,
    });

    const response = await sectorService.findByPk(id);

    return res.json(response);
  }
}

export default new SectorController();

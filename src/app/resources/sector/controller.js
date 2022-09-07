import SectorService from "./service";
// import ProductService from "../product/service";

class SectorController {
  async list(req, res) {
    const { floorId } = req.params;
    const sectorService = new SectorService();
    const sectors = await sectorService.list(floorId);
    res.json(sectors);
  }

  async create(req, res) {
    const {
      productId,
      availableQuantity,
      quantityLines,
      fitsProducts,
      quantityColumns,
      floorId,
    } = req.body;

    const sectorService = new SectorService();

    //TODO: VER SE O PRODUTO EXISTE, SE EXISTE QUANTIDADE NO ESTOQUE E
    //DAR BAIXA NA QUANTIDADE NO ESTOQUE
    // const productService = new ProductService();

    // const product = await productService.findByPk(productId);

    // if (!product)
    //   return res
    //     .status(400)
    //     .json({ status: 400, message: "Produto não encontrado" });

    const newSector = await sectorService.create({
      quantityLines,
      quantityColumns,
      floorId,
      productId,
      availableQuantity,
      fitsProducts,
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

    const sector = await sectorService.delete(id);
    if (!sector) return res.status(400).json({ message: "Setor não existe" });

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;

    const { productId, productQuantity, ...rest } = req.body;

    //TODO: VALIDAR QUANTOS PRODUTOS TÊM NO ESTOQUE E RETIRAR DE LÁ, SE O PRODUTO EXISTE NO ESTOQUE
    // E SE A QUANTIDADE FOR MENOR QUE A ANTERIOR, DEVOLVER O EXCEDENTE PARA O ESTOQUE

    const sectorService = new SectorService();

    const sector = await sectorService.findByPk(id);

    if (!sector) return res.status(400).json({ message: "Setor inexistente" });

    await sector.update({
      ...rest,
    });

    const response = await sectorService.findByPk(id);

    return res.json(response);
  }
}

export default new SectorController();

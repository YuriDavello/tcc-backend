import ProductService from "./service";
// import ProductService from "../product/service";

class ProductController {
  async list(req, res) {
    const productService = new ProductService();
    const products = await productService.list();
    res.json(products);
  }

  async create(req, res) {
    const { name, category, price, weight } = req.body;

    const productService = new ProductService();

    const product = await productService.get({ name });
    if (product)
      return res
        .status(400)
        .json({ message: "Nome já pertence à outro produto" });

    const newProduct = await productService.create({
      name,
      category,
      price,
      weight,
    });

    return res.json(newProduct);
  }

  // async get(req, res) {
  //   const { id } = req.params;

  //   const sectorService = new SectorService();

  //   const sector = await sectorService.findByPk(id, {
  //     attributes: ["id", "quantityLines", "quantityColumns"],
  //   });

  //   if (!sector)
  //     return res
  //       .status(400)
  //       .json({ status: 400, message: "Setor não encontrado" });

  //   return res.json(sector);
  // }

  async delete(req, res) {
    const { id } = req.params;

    const productService = new ProductService();

    const product = await productService.delete(id);
    if (!product)
      return res.status(400).json({ message: "Produto não existe" });

    return res.sendStatus(204);
  }

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

export default new ProductController();

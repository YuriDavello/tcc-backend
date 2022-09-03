import ProductService from "./service";
// import ProductService from "../product/service";

class ProductController {
  async list(req, res) {
    const { $filter } = req.query;
    const productService = new ProductService();
    const products = await productService.list({ filter: $filter });
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

  async get(req, res) {
    const { id } = req.params;

    const productService = new ProductService();

    const product = await productService.findByPk(id);

    if (!product)
      return res
        .status(400)
        .json({ status: 400, message: "Produto não encontrado" });

    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    const productService = new ProductService();

    const product = await productService.delete(id);
    if (!product)
      return res.status(400).json({ message: "Produto não existe" });

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;

    const productService = new ProductService();

    const product = await productService.findByPk(id);

    if (!product)
      return res.status(400).json({ message: "Produto inexistente" });

    await product.update({
      ...req.body,
    });

    const response = await productService.findByPk(id);

    return res.json(response);
  }
}

export default new ProductController();

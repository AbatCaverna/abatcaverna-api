import ProdutosRepository from '../repository/produtosRepository'

type Product = {
  id: string
  stripe_id: string
  image: string | null
  name: string
  tax: string
  price: number
  stripe_price_id: string
}

const ProdutosService = {
  async getAllProducts(email?: string): Promise<Product[]> {
    const response = await ProdutosRepository.getAll(email)

    return response.map(data => {
      return {
        id: data.product.id,
        stripe_id: data.product.id,
        image: data.product.images[0],
        name: data.product.name,
        tax: data.product.metadata.taxas,
        price: data.price.unit_amount ?? 0,
        stripe_price_id: data.price.id,
      }
    })
  },

  async upload(file: Express.Multer.File) {
    return ProdutosRepository.uploadFile(file)
  },

  async create(name: string, value: number, description?: string, images?: string[]): Promise<Product> {
    const response = await ProdutosRepository.createProduct(name, value, description, images)

    return {
      id: response.product.id,
      stripe_id: response.product.id,
      image: response.product.images[0],
      name: response.product.name,
      tax: response.product.metadata.taxas,
      price: response.price.unit_amount ?? 0,
      stripe_price_id: response.price.id,
    }
  }
} 

export default ProdutosService

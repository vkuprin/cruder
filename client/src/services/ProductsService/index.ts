import {
  getApiData, postApiData, putApiData, deleteApiData,
} from '../../utils/api';
import { productsURI } from '../../constants/endpoints';
import { ProductsI } from '../../types/products.interface';

const ProductsService = {
  async getProducts() {
    return getApiData(
      productsURI,
      '',
    );
  },
  async getSpecificProduct(id: string | undefined) {
    return getApiData(
      `${productsURI}/${id}`,
      '',
    );
  },
  async createProduct(body: ProductsI) {
    return postApiData(
      `${productsURI}/`,
      body,
      '',
    );
  },
  async updateProduct(id: string, body: ProductsI) {
    return putApiData(
      `${productsURI}/${id}`,
      body,
      '',
    );
  },
  async deleteProduct(id: string) {
    return deleteApiData(
      `${productsURI}/${id}`,
      '',
    );
  },
};

export default ProductsService;

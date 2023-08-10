import { createContext, useState } from "react";

import type { Product } from "../app.types";
import PRODUCTS from "./../shop-data.json";

type ProductsProviderProps = {
  children: React.ReactNode;
}

export const ProductsContext = createContext({
  products: [] as Array<Product>,
});


export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState(PRODUCTS as Array<Product>);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
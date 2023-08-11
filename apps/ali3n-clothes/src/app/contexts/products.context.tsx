import { createContext, useState } from "react";

import { IProduct } from "../app.types";
import PRODUCTS from "./../shop-data.json";

type ProductsProviderProps = {
  children: React.ReactNode;
}

export const ProductsContext = createContext({
  products: [] as IProduct[]
});


export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState(PRODUCTS as IProduct[]);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
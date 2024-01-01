export interface ProductAPIPayloadProps {
    pagination: PaginationProps
    products: ProductProps[]
  }
  
  export interface PaginationProps {
    count: number
    currentPage: number
    totalPages: number
  }
  
  export interface ProductProps {
    _id: string
    sku: string
    name: string
    imageUrl: string
    description: string
    price: number
    category: CategoryProps
    brand: BrandProps
    slug: string
    quantity:number
  }
  
  export interface CategoryProps {
    _id: string
    name: string
    description: string
  }
  
  export interface BrandProps {
    _id: string
    name: string
    description: string
  }
  

  export interface ProductsInterface {
    message: string;
    product: ProductProps;
  }
  
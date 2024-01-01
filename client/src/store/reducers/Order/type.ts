
export interface OrderProps {
    orders: OrderItemProps[]
    totalPages: number
    currentPage: number
    count: number
  }
  
  export interface OrderItemProps {
    _id: string
    products: ProductPops[]
    user: string
    total: number
    created: string
    __v: number
  }
  
  export interface ProductPops {
    product: ProductDetailsProps
    quantity: number
    purchasePrice: number
    totalPrice: number
    status: string
    _id: string
  }
  
  export interface ProductDetailsProps {
    created: string
    _id: string
    sku: string
    name: string
    imageUrl: string
    description: string
    category: CategoryProps
    brand: BrandProps
    slug: string
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
  
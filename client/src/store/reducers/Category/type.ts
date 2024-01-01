export interface CategoryProps {
    name: string;
    description: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  
}

export interface CategoryInterface {
    message: string;
    category: CategoryProps;
  }
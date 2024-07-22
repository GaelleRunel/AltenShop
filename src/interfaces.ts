interface ProductType {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    inventoryStatus: string;
    category: string;
    image?: string;
    rating?: number;
}

export default ProductType;
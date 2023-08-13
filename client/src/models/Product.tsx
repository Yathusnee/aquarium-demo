class Product {
    _id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    category: string | undefined;
    subcategory: string | undefined;
    code: string | undefined;
    sciencetific: string | undefined;
    ph: string | undefined;
    temperature: string | undefined;
    behaviour: string | undefined;
    price: number | undefined;
    images: string[] | undefined;
    icon: string | undefined;
    compatibility: boolean = false;
    iconWidth: number = 1;
    iconHeight: number = 1;
}

export default Product;
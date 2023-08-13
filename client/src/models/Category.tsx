import SubCategory from "./SubCategory";

class Category {
    _id: string | undefined;
    name: string;
    description: string ;
    subcategories: SubCategory[];
   
    constructor(name: string, description: string, subcategories: SubCategory[]) {
        this.name = name;
        this.description = description;
        this.subcategories = subcategories;
    }
}

export default Category;
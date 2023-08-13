class SubCategory {
    _id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    image: string | undefined;
   
    constructor(name: string, description: string, image: string) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
}

export default SubCategory;
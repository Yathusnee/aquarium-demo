import Category from "./Category";

class Categories {
    salt: Category | undefined;
    fresh: Category | undefined;
    brackish: Category | undefined;

    constructor (salt: Category | undefined, fresh: Category | undefined, brackish: Category | undefined) {
        this.salt = salt;
        this.fresh = fresh;
        this.brackish = brackish;
    }
}

export default Categories;
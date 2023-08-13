import { useEffect, useState } from "react";
import { CategoryService } from "../../services/category_service";
import CategoryModel from "../../models/Category";
import Category from "./category";
import Categories from "../../models/Categories";

function Products() {

    const [categories, setCategories] = useState(new Categories(undefined, undefined, undefined));

    useEffect(() => {

        CategoryService.getAllCategories().then(res => {
            if (res.status == 200) {
                let salt: CategoryModel;
                let fresh: CategoryModel;
                let brackish: CategoryModel;

                for (let i in res.data) {
                    if (res.data[i].name === 'salt') {
                        salt = res.data[i];
                    }
                    else if (res.data[i].name === 'fresh') {
                        fresh = res.data[i];
                    }
                    else if (res.data[i].name === 'brackish') {
                        brackish = res.data[i];
                    }
                }

                setCategories(new Categories(salt!, fresh!, brackish!));
            } else {

            }
        })
        .catch(err => {
            console.log(err);
        });

    }, []);

    return (
        <div className="body-container">
            { categories.fresh && <Category name="Fresh Water" category={categories.fresh!} /> }
            { categories.salt &&  <Category name="Salt Water" category={categories.salt!} /> }
            { categories.brackish && <Category name="Brackish Water" category={categories.brackish!} /> }
        </div>
    )
}

export default Products;
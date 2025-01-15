import { getAllProducts, postNewProduct } from "./productAxios";
import { setProducts } from "./productSlice";

export const createNewProductAction = async (productData) => {
    const response = await postNewProduct(productData);

    if (response.status === "success") {
        dispatch(getAllProducts());
        return true;
    }
};

export const updateProductAction = async (productData) => {
    const response = await updateNewProduct(productData);
    if (response.status === "success") {
        dispatch(getAllProducts());
        return true;
    }
};

export const getProductAction = () => async (dispatch) => {
    const response = await getAllProducts();

    if (response.status === "success") {
        dispatch(setProducts(response.products));
    }
};

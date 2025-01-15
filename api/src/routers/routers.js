import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import productRouter from "./productRouter.js";
import { auth } from "../middlewares/auth.js";

export default [
    {
        path: "/api/v1/users",
        middlewawers: [userRouter],
    },
    {
        path: "/api/v1/categories",
        middlewawers: [auth, categoryRouter],
    },
    {
        path: "/api/v1/products",
        middlewawers: [auth, productRouter],
    },
];

import express from "express";
const router = express.Router();
import slugify from "slugify";

import {
    getAllProducts,
    insertProduct,
} from "../models/product/ProductModel.js";
import multerUpload from "../utils/uploadMulter.js";
import {
    newProductValidation,
    updateProductValidation,
} from "../middlewares/validation.js";

router.post(
    "/",
    multerUpload.array("images", 5),
    newProductValidation,
    async (req, res, next) => {
        try {
            const { name } = req.body;

            const slug = slugify(name, {
                lower: true,
            });

            // generate thumbnail path
            // generate images paths
            if (req.files?.length > 0) {
                const newImgs = req.files.map((item) => {
                    return item.path.replace("public", "");
                });

                req.body.images = newImgs;
                req.body.thumbnail = newImgs[0];
            }

            const prod = await insertProduct({
                ...req.body,
                slug,
            });

            if (prod?._id) {
                return res.json({
                    status: "success",
                    message: "New product has been added",
                });
            }

            res.json({
                status: "error",
                message: "Unable to add product, try again later",
            });
        } catch (error) {
            if (error.message.includes("E11000 duplicate")) {
                error.message =
                    "This product slug or sku already exist, please change the name of the Product or sku and try agian.";
                error.statusCode = 400;
            }
            next(error);
        }
    }
);

router.put(
    "/",
    multerUpload.array("images", 5),
    updateProductValidation,
    async (req, res, nex) => {
        try {
            const { name } = req.body;

            const slug = slugify(name, {
                lower: true,
                trime: true,
            });

            // // get the file path where it was uploaded and store inthe db
            // if (req.files?.length) {
            //     const newImgs = req.files.map((item) =>
            //         item.path.replace("public", "")
            //     );
            //     req.body.images = newImgs;
            //     req.body.thumbnail = newImgs[0];
            // }

            const prod = await updateProductById({
                ...req.body,
                slug,
            });

            if (prod?._id) {
                return res.json({
                    status: "success",
                    message: "Product has been updated",
                });
            }

            res.json({
                status: "error",
                message: "Unable to update product, try again later",
            });
        } catch (error) {
            if (error.message.includes("E11000 duplicate")) {
                error.message =
                    "This product slug or sku already exist, please change the name of the Product or sku and try agian.";
                error.statusCode = 400;
            }
            next(error);
        }
    }
);

router.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.json({
            status: "success",
            message: "",
            products,
        });
    } catch (error) {
        next(error);
    }
});

export default router;

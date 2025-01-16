import Joi from "joi";

const SHORT_STR = Joi.string().max(100).allow("", null);
const SHORT_STR_REQ = Joi.string().max(100).required();

const LONG_STR = Joi.string().max(5000).allow("", null);
const LONG_STR_REQ = Joi.string().max(5000).required();

const PHONE = Joi.number().allow("", null);
const PHONE_REQ = Joi.number().required();

const EMAIL = Joi.string().email({ minDomainSegments: 2 }).allow("", null);
const EMAIL_REQ = Joi.string().email({ minDomainSegments: 2 }).required();

const NUM = Joi.number().allow("", null);
const NUM_REQ = Joi.number().required();

const validator = (req, res, next, schema) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.json({
                status: "error",
                message: error.message,
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const newUserValidation = (req, res, next) => {
    const schema = Joi.object({
        fName: SHORT_STR_REQ,
        lName: SHORT_STR_REQ,
        phone: PHONE,
        email: EMAIL_REQ,
        password: SHORT_STR_REQ,
    });

    return validator(req, res, next, schema);
};

export const newProductValidation = (req, res, next) => {
    const schema = Joi.object({
        name: SHORT_STR_REQ,
        parentCatId: SHORT_STR_REQ,
        sku: SHORT_STR_REQ,
        price: NUM_REQ,
        qty: NUM_REQ,
        salesPrice: NUM,
        description: LONG_STR_REQ,
        salesStartDate: SHORT_STR,
        salesEndDate: SHORT_STR,
    });

    return validator(req, res, next, schema);
};

export const updateProductValidation = (req, res, next) => {
    req.body.salesPrice =
        req.body.salesPrice === "null" ? 0 : req.body.salesPrice;

    const schema = Joi.object({
        _id: SHORTSTRREQ,
        name: SHORT_STR_REQ,
        parentCatId: SHORT_STR_REQ,
        sku: SHORT_STR_REQ,
        price: NUM_REQ,
        qty: NUM_REQ,
        salesPrice: NUM,
        description: LONG_STR_REQ,
        salesStartDate: SHORT_STR,
        salesEndDate: SHORT_STR,
    });

    return validator(req, res, next, schema);
};


//more validation working
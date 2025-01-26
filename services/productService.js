const productData = require("../data/productData");

async function getAllProducts()
{
    return await productData.getAllProducts();
};

async function getProductById(id)
{
    const result = await productData.getProductById(id);

    if(!result) throw new Error (`Product not found!`)
        else return result;
}

module.exports = {
    getAllProducts,getProductById
}
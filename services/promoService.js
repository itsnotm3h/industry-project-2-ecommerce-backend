const promoData = require("../data/promoData");

async function getPromo(code)
{
    return await promoData.getPromo(code);
}

module.exports = {
    getPromo
}
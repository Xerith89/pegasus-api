const calculatePremium = require('../services/calcprem')

function process (req, res) {
    
    const val = JSON.parse(req.body.declaredValue);

    let price = calculatePremium.calculatePremium(val)

   
    res.json({
        scheme: req.body.scheme,
        declaredValue: req.body.declaredValue,
        calculatedPremium: price
    });
}

module.exports = {
    process:process
}
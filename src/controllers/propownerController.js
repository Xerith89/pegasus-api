const {calculatePremium} = require('../services/calcprem')

function process (req, res) {
    const rate = 0.13;

    const obj = JSON.parse(req.body.declaredValue);

   function calculatePremium(declaredValue) {
        return declaredValue * rate;
    }

   let value = calculatePremium(obj)


    res.json({
        scheme: req.body.scheme,
        declaredValue: req.body.declaredValue,
        calculatedPremium: value
    });
}

module.exports = {
    process:process
}
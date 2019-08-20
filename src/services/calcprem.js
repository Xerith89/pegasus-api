const rate = 0.13;

function calculatePremium(declaredValue) {
    return declaredValue * rate;
}

module.exports = {
    calculatePremium:calculatePremium
}
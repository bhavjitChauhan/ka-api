const FKeyChars = "0123456789abcdefghijklmnopqrstuvwxyz";

/**
 * Generates a FKey for a khan session
 *
 * @returns {string} FKey
 */
function generateFKey() {
    var chars = "";

    for (var i = 0; i < 68; i++) {
        chars += FKeyChars[Math.floor(Math.random() * FKeyChars.length)];
    }

    return `1.0_${chars}_${Date.now()}`;
}

module.exports = generateFKey;

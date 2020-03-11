// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  var cardLength = cardNumber.length;
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  var isDinersPrefix = /^3[89]/.test(cardNumber);
  var isDinersCard = (cardLength === 14);

  // The American Express network always starts with a 34 or 37 and is 15 digits long
  var americanExpressPrefix = new RegExp("^3[47]");
  var isAmericanExpressPrefix = americanExpressPrefix.test(cardNumber);
  var isAmericanExpressCard = (cardLength === 15);

  // The Visa network always starts with 4 and is 16 digits long
  var isVisaPrefix = /^4/.test(cardNumber);
  var isVisaCard = (cardLength === 13 || cardLength === 16 || cardLength === 19);

  // The Master Card network always starts with 5 and is 16 digits long
  var isMasterPrefix =  /^5/.test(cardNumber);
  var isMasterCard = (cardLength === 16);

  // Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
  var isDiscoverPrefix = /^(6011|65|64[4-9])/.test(cardNumber);
  var isDiscoverCard = (cardLength === 16 || cardLength === 19)

  // Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  var isMaestroPrefix = /^(5018|5020|5038|6304)/.test(cardNumber);
  var isMaestroCard = false;

  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  var chinaPrefix6Digits = Number(cardNumber.slice(0,6));
  var chinaPrefix4Digits = Number(cardNumber.slice(0,4));
  var chinaPrefix3Digits = Number(cardNumber.slice(0,3));
  var isChinaPrefix = false;
  var isChinaCard = false;

  // Switch has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759
  var isSwitchPrefix = /^(4903|4905|4911|4936|564182|633110|6333|6759)/.test(cardNumber);
  var isSwitchCard = (cardLength === 16 || cardLength === 18 || cardLength === 19);

  // MasterCard and Maestro conflict check
  var masterMaestroConflict = /.(018|020|038)/.test(cardNumber);
  var doesMasterMaestroConflict = (masterMaestroConflict === false)

  // Visa Switch conflict check
  var visaSwitchConflict = /.(903|905|911|936)/.test(cardNumber);
  var doesVisaSwitchConflict = (visaSwitchConflict === false);

  // Switch MasterCard conflict check
  var masterSwitchConflict = /.(64182)/.test(cardNumber);
  var doesMasterSwitchConflict = (masterSwitchConflict === false);

  // Diner's Club
  if (isDinersPrefix && isDinersCard) {
    return `Diner's Club`;
  }

  // American Express
  if (isAmericanExpressPrefix && isAmericanExpressCard) {
    return `American Express`;
  }

  // Visa
  if (isVisaPrefix && doesVisaSwitchConflict && isVisaCard) {
    return `Visa`;
  }

  // MasterCard
  if (isMasterPrefix && doesMasterMaestroConflict && doesMasterSwitchConflict && isMasterCard) {
    return `MasterCard`;
  }

  // Discover
  if (isDiscoverPrefix && isDiscoverCard) {
    return `Discover`;
  }

  // Maestro
  for (var i = 12; i < 20; i++) {
    if (cardLength === i) {
      isMaestroCard = true;
      break;
    }
  }
  if (isMaestroPrefix && isMaestroCard) {
    return `Maestro`;
  }

  // China UnionPay
  for (var j = 16; j < 20; j++) {
    if (cardLength === j) {
      isChinaCard = true;
      break;
    }
  }
  if (((chinaPrefix6Digits >= 622126) && (chinaPrefix6Digits <= 622925))) {
    isChinaPrefix = true;
  }
  if (((chinaPrefix4Digits >= 6282) && (chinaPrefix4Digits <= 6288))) {
    isChinaPrefix = true;
  }
  if (((chinaPrefix3Digits >= 624) && (chinaPrefix3Digits <= 626))) {
    isChinaPrefix = true;
  }

  if (isChinaPrefix && isChinaCard) {
    return `China UnionPay`;
  }

  // Switch
  if (isSwitchPrefix && isSwitchCard) {
    return `Switch`;
  }

  return `Please Enter valid card number`;
};

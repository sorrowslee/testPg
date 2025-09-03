if (!cc._RF.push(module, "c02b1kjr6ZFdoe/uKYjE3Bb", "GamePreference")) {
  exports.__esModule = true;
  exports.globalPreference = exports.gamePreference = undefined;
  var K = require("Preference");
  var g = require("RtConfig");
  var T = (0, K.getPreference)(g.cs_Config.bundleId);
  exports.gamePreference = T;
  var x = (0, K.getPreference)(g.cs_Config.globalDomain);
  exports.globalPreference = x;
  cc._RF.pop();
}
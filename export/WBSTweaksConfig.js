if (!cc._RF.push(module, "5ddf3OMGrtDFqA/tV2X5qtp", "WBSTweaksConfig")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.testRegionConfigModes = exports.configStore = exports.testApisModes = undefined;
  require("TweaksConfig");
  require("CreatorTweaks");
  var x = require("TweaksData");
  var L = {
    enumerable: true,
    get: function () {
      return x.testApisModes;
    }
  };
  Object.defineProperty(exports, "testApisModes", L);
  Object.defineProperty(exports, "configStore", {
    enumerable: true,
    get: function () {
      return x.configStore;
    }
  });
  Object.defineProperty(exports, "testRegionConfigModes", {
    enumerable: true,
    get: function () {
      return x.testRegionConfigModes;
    }
  });
  require("GameConstant");
  cc._RF.pop();
}
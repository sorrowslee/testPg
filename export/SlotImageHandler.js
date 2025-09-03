if (!cc._RF.push(module, "2abfb9MRm5DnqFq+neQMuuE", "SlotImageHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.slotImageHandler = exports.SlotImageHandler = undefined;
  var T = require("GameConstant");
  var x = function () {
    function D() {
      this._symbolImages = Object.create(null);
      this._blurredSymbolImages = Object.create(null);
      this._backgroundImages = Object.create(null);
      this._blurredBackgroundImages = Object.create(null);
      this._frameImages = Object.create(null);
      this._blurredFrameImages = Object.create(null);
      this._spines = Object.create(null);
    }
    var k = {
      get: function () {
        return this._symbolImages;
      },
      enumerable: false,
      configurable: true
    };
    Object.defineProperty(D.prototype, "symbolImages", k);
    Object.defineProperty(D.prototype, "blurredSymbolImages", {
      get: function () {
        return this._blurredSymbolImages;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "backgroundImages", {
      get: function () {
        return this._backgroundImages;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "blurredBackgroundImages", {
      get: function () {
        return this._blurredBackgroundImages;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "frameImages", {
      get: function () {
        return this._frameImages;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "blurredFrameImages", {
      get: function () {
        return this._blurredFrameImages;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "spines", {
      get: function () {
        return this._spines;
      },
      enumerable: false,
      configurable: true
    });
    D.prototype.setup = function (C) {
      var u = C.symbolAtlas;
      var c = C.featureSymbolAtlas;
      var p = C.spines;
      this._symbolImages = L(T.slotSymbolImageNameMaps, u, c);
      this._blurredSymbolImages = L(T.blurredSlotSymbolNameMaps, u, c);
      this._frameImages = L(T.frameMaps, u, c);
      this._blurredFrameImages = L(T.blurredFrameMaps, u, c);
      this._backgroundImages = L(T.symbolBgNameMaps, u, c);
      this._blurredBackgroundImages = L(T.blurredSymbolBgNameMaps, u, c);
      this._spines = p;
    };
    return D;
  }();
  exports.SlotImageHandler = x;
  exports.slotImageHandler = new x();
  cc._RF.pop();
}
function L(D, k, C) {
  var u = Object.create(null);
  Object.keys(D).forEach(function (c) {
    var p = D[c];
    var j = k.getSpriteFrame(p);
    j ||= C.getSpriteFrame(p);
    u[c] = j;
  });
  return u;
}
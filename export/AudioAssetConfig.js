if (!cc._RF.push(module, "a2c0633AVRPK7FGJDEUOXcO", "AudioAssetConfig")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getAudioAssetConfig = undefined;
  var T = require("ResourceLoader");
  var x = require("AudioManager");
  var L = [];
  // 取得所有需載入的音效資源設定
  exports.getAudioAssetConfig = function () {
    if (L.length > 0) {
      return L;
    } else {
      Object.keys(x.GeneralAudioPool).forEach(function (D) {
        L.push({
          name: D,
          type: T.LoaderType.CUSTOM,
          // 載入一般音效資源
          loadFunc: function (k, C) {
            x.loadAudio(x.GeneralAudioPool[D], function (u) {
              if (u) {
                C(u);
              }
              k(undefined);
            });
          }
        });
      });
      L.push({
        name: "general_audio",
        type: T.LoaderType.CUSTOM,
        // 載入通用音效集合
        loadFunc: function (D, k) {
          x.loadAudio(x.generalGameAudio, function (C) {
            if (C) {
              k(C);
            }
            D(undefined);
          });
        }
      });
      return L;
    }
  };
  cc._RF.pop();
}
if (!cc._RF.push(module, "f5549ONPJVHILXw7rcdqGtw", "BGMHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.bgmHandler = undefined;
  var T = require("AudioManager");
  var x = require("SettingMenuHelper");
  var L = require("GameConstant");
  cc._decorator.ccclass;
  var D = function () {
    function u() {
      this._bgmState = undefined;
      this._previousBgmVolume = 0;
    }
    // 根據傳入狀態播放對應的背景音樂
    u.prototype.playBgm = function (c) {
      var p = this._getAudioByState(this._bgmState);
      var j = this._getAudioByState(c);
      if (p === undefined) {
        this._previousBgmVolume = 1;
        j.setVolume(1);
        j.play();
      } else if (this._bgmState !== c) {
        if (j.isPlaying()) {
          if (c === L.TransitionState.FREE_SPIN) {
            C();
            j.play();
            p.stop();
            j.setVolume(1);
          }
        } else {
          j.play();
          if (c === L.TransitionState.FREE_SPIN) {
            p.stop();
            j.setVolume(1);
          } else {
            j.setVolume(0);
            j.fade(0, 1, 0.7);
            p.fade(p.getVolume(), 0, 0.7);
            p.on("fade", C);
          }
        }
      }
      this._bgmState = c;
    };
    // 將目前播放的背景音樂淡出
    u.prototype.fadeOutBgm = function (c) {
      var p = this._getAudioByState(this._bgmState);
      if (p) {
        this._previousBgmVolume = p.getVolume();
        this.fadeBgmTo(0, c);
      }
    };
    // 以先前音量淡入背景音樂
    u.prototype.fadeInBgm = function (c) {
      this.fadeBgmTo(this._previousBgmVolume, c);
    };
    // 將背景音樂音量淡入淡出至指定值
    u.prototype.fadeBgmTo = function (c, p) {
      var j = this._getAudioByState(this._bgmState);
      if (j && x.settingMenuHelper.soundEnable && j.getVolume() !== c) {
        j.fade(j.getVolume(), c, p);
      }
    };
    // 直接設定背景音樂音量
    u.prototype.setBgmVolume = function (c) {
      var p = this._getAudioByState(this._bgmState);
      if (p) {
        p.setVolume(c);
      }
    };
    // 依據遊戲狀態取得對應的音訊物件
    u.prototype._getAudioByState = function (c) {
      var p;
      switch (c) {
        case L.TransitionState.NORMAL:
        case L.TransitionState.RESPIN:
          p = T.GeneralAudioPool.bgm_mg;
          break;
        case L.TransitionState.FREE_SPIN:
        case L.TransitionState.FREE_SPIN_RESPIN:
          p = T.GeneralAudioPool.bgm_fs;
          break;
        default:
          p = undefined;
      }
      return p;
    };
    return u;
  }();
  exports.default = D;
  var k = new D();
  exports.bgmHandler = k;
  cc._RF.pop();
}
// 當免遊背景音樂淡出完成時停止播放
function C() {
  T.GeneralAudioPool.bgm_fs.off("fade", C);
  T.GeneralAudioPool.bgm_fs.stop();
}
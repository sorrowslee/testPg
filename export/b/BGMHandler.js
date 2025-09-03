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
    u.prototype.fadeOutBgm = function (c) {
      var p = this._getAudioByState(this._bgmState);
      if (p) {
        this._previousBgmVolume = p.getVolume();
        this.fadeBgmTo(0, c);
      }
    };
    u.prototype.fadeInBgm = function (c) {
      this.fadeBgmTo(this._previousBgmVolume, c);
    };
    u.prototype.fadeBgmTo = function (c, p) {
      var j = this._getAudioByState(this._bgmState);
      if (j && x.settingMenuHelper.soundEnable && j.getVolume() !== c) {
        j.fade(j.getVolume(), c, p);
      }
    };
    u.prototype.setBgmVolume = function (c) {
      var p = this._getAudioByState(this._bgmState);
      if (p) {
        p.setVolume(c);
      }
    };
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
function C() {
  T.GeneralAudioPool.bgm_fs.off("fade", C);
  T.GeneralAudioPool.bgm_fs.stop();
}
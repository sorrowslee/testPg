if (!cc._RF.push(module, "9fcddj5MjVCo4eqgr0JYxNU", "AudioManager")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setWinCount = exports.getWinCount = exports.fadeAudio = exports.setAudioVolume = exports.stopAudio = exports.playAudio = exports.audioId = exports.isAudioPlaying = exports.generalGameAudio = exports.updatePlayRate = exports.crossFadeAudio = exports.toggleEffectMuted = exports.toggleMusicMuted = exports.GeneralAudioPool = exports.releaseAudioPool = exports.releaseAudio = exports.loadAudio = exports.toggleAudioGameStarted = exports.unregisterAudio = exports.registerAudio = exports.init = exports.AUDIO_TYPE = undefined;
  var j = require("SettingMenuHelper");
  var G = require("NoSoundAdapter");
  var V = require("GameAudioAdapter");
  var Q = require("AudioConstant");
  var N = require("RtConfig");
  var Y = Object.create(null);
  exports.GeneralAudioPool = Y;
  var W = Object.create(null);
  var q = Object.create(null);
  exports.audioId = q;
  var F = [];
  var H = {
    SOUND: 0,
    MUSIC: 1
  };
  exports.AUDIO_TYPE = H;
  var w = false;
  var U = false;
  var X = 0;
  var J = "audio/";
  Y.bgm_mg = undefined;
  Y.bgm_fs = undefined;
  Y.bgm_bigwin_end = undefined;
  Y.bgm_bigwin_main = undefined;
  Y.bgm_totalwin_end = undefined;
  Y.bgm_totalwin_main = undefined;
  Y.bgm_intro = undefined;
  var Z0;
  var Z1 = ["bgm_mg", "bgm_fs"];
  exports.generalGameAudio = Z0;
  exports.init = function () {
    var ZR;
    Object.keys(ZR = Y).forEach(function (ZK) {
      var Zg = Z1.includes(ZK) ? H.MUSIC : H.SOUND;
      ZR[ZK] = Z2(ZK, Zg);
    });
    Y.bgm_mg.setLoop(true);
    Y.bgm_fs.setLoop(true);
    cc.game.on(cc.game.EVENT_HIDE, Zd);
    cc.game.on(cc.game.EVENT_SHOW, ZO);
    exports.generalGameAudio = Z0 = Z3("general_audio", H.SOUND, Q.GENERAL_AUDIO);
    Z9(true);
    ZZ(true);
  };
  exports.registerAudio = function (ZR, ZK) {
    var Zg = ZK ? H.MUSIC : H.SOUND;
    if (w) {
      var ZT = j.settingMenuHelper.soundEnable;
      ZR.setMute(ZT);
    }
    W[Zg] ||= [];
    W[Zg].push(ZR);
    return Zg;
  };
  exports.unregisterAudio = function (ZR, ZK) {
    var Zg = W[ZK];
    var ZT = Zg.indexOf(ZR);
    if (ZT === -1) {
      throw Error("Audio Manager :: unRegisterAudio : audio not found");
    }
    Zg.splice(ZT, 1);
  };
  exports.setAudioVolume = function (ZR, ZK) {
    if (!q[ZR] || !!Z0.isPlaying(q[ZR])) {
      if (Z0) {
        Z0.setVolume(ZK, q[ZR]);
      }
    }
  };
  exports.fadeAudio = function (ZR, ZK, Zg, ZT) {
    if (!q[ZR] || !!Z0.isPlaying(q[ZR])) {
      if (Z0) {
        Z0.fade(ZK, Zg, ZT, q[ZR]);
      }
    }
  };
  exports.isAudioPlaying = Z6;
  exports.playAudio = Z7;
  exports.stopAudio = function (ZR, ZK = Z0) {
    if (Z6(ZR, ZK) && ZK) {
      ZK.stop(q[ZR]);
    }
  };
  exports.toggleAudioGameStarted = function () {
    w = true;
    Z9(!j.settingMenuHelper.soundEnable);
    ZZ(!j.settingMenuHelper.soundEnable);
  };
  exports.toggleMusicMuted = Z9;
  exports.toggleEffectMuted = ZZ;
  exports.crossFadeAudio = function (ZR, ZK, Zg = 1) {
    ZK.setVolume(0);
    ZK.play();
    ZK.fade(0, Zg, 1000);
    if (ZR.getVolume() === 0) {
      ZR.stop();
    } else {
      ZR.fade(ZR.getVolume(), 0, 1000);
      ZR.once("fade", function () {
        ZR.stop();
      });
    }
  };
  exports.updatePlayRate = function (ZR) {
    for (var ZK in W) {
      if (W[ZK]) {
        var Zg = W[ZK];
        for (var ZT = 0, Zx = Zg.length; ZT < Zx; ZT++) {
          Zg[ZT].setRate(ZR);
        }
      }
    }
  };
  exports.loadAudio = function (ZR, ZK) {
    function Zg() {
      ZR.off("loaderror", ZT);
      if (ZK) {
        ZK();
      }
    }
    function ZT(Zx, ZL) {
      ZR.off("load", Zg);
      if (ZK) {
        ZK(ZL, Zx);
      }
    }
    ZR.once("load", Zg);
    ZR.once("loaderror", ZT);
    return ZR.load();
  };
  exports.releaseAudioPool = function (ZR) {
    Object.keys(ZR).forEach(function (ZK) {
      ZI(ZR[ZK]);
    });
  };
  exports.releaseAudio = ZI;
  exports.setWinCount = function (ZR) {
    X = ZR;
  };
  exports.getWinCount = function () {
    return X;
  };
  cc._RF.pop();
}
function Z2(ZR, ZK = H.SOUND) {
  var Zg = {
    preload: false,
    src: Z4("mp3/" + ZR),
    mute: true
  };
  if (N.cs_Launch.noAudio === "1") {
    return new G.default(Zg);
  } else {
    return new V.default(Zg, ZK);
  }
}
function Z3(ZR, ZK = H.SOUND, Zg) {
  var ZT = {
    preload: false,
    src: Z4("mp3/" + ZR),
    mute: true,
    sprite: Zg
  };
  if (N.cs_Launch.noAudio === "1") {
    return new G.default(ZT);
  } else {
    return new V.default(ZT, ZK);
  }
}
function Z4(ZR) {
  return J + ZR;
}
function Z5(ZR, ZK, Zg, ZT, Zx) {
  if (ZR.hasOwnProperty(Zg)) {
    if (Zx) {
      if (ZK) {
        ZK.play(q[Zg]);
      }
    } else {
      q[Zg] = ZK && ZK.play(Zg);
      if (ZT && ZK) {
        ZK.setLoop(true, q[Zg]);
      }
    }
  }
}
function Z6(ZR, ZK = Z0) {
  return q[ZR] && ZK.isPlaying(q[ZR]);
}
function Z7(ZR, ZK, Zg) {
  Z5(Q.GENERAL_AUDIO, Z0, ZR, ZK, Zg);
}
function Z8(ZR, ZK = Z0) {
  if (Z6(ZR, ZK) && ZK) {
    ZK.pause(q[ZR]);
  }
}
function Z9(ZR = false) {
  if (W[H.MUSIC]) {
    W[H.MUSIC].map(function (ZK) {
      ZK.setMute(ZR);
    });
  }
}
function ZZ(ZR = false) {
  if (W[H.SOUND]) {
    W[H.SOUND].map(function (ZK) {
      ZK.setMute(ZR);
    });
  }
}
function ZI(ZR) {
  return ZR.unload();
}
function Zd() {
  if (!U) {
    U = true;
    Object.keys(Y).forEach(function (ZR) {
      var ZK = Y[ZR];
      if (ZK.isPlaying()) {
        ZK.pause();
        F.push(ZK);
      }
    });
    Object.keys(Q.GENERAL_AUDIO).forEach(function (ZR) {
      if (Z6(ZR, Z0)) {
        Z8(ZR, Z0);
        F.push(ZR);
      }
    });
  }
}
function ZO() {
  if (U) {
    U = false;
    for (var ZR = 0, ZK = F.length; ZR < ZK; ZR++) {
      var Zg = F[ZR];
      if (Q.GENERAL_AUDIO.hasOwnProperty(Zg)) {
        Z7(Zg, false, true);
      } else if (Zg.play) {
        Zg.play();
      }
    }
    F.length = 0;
  }
}
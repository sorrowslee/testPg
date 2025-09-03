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
  // 初始化音效系統並建立預設音效
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
  // 註冊音效物件並依類型保存
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
  // 移除已註冊的音效
  exports.unregisterAudio = function (ZR, ZK) {
    var Zg = W[ZK];
    var ZT = Zg.indexOf(ZR);
    if (ZT === -1) {
      throw Error("Audio Manager :: unRegisterAudio : audio not found");
    }
    Zg.splice(ZT, 1);
  };
  // 設定指定音效的音量
  exports.setAudioVolume = function (ZR, ZK) {
    if (!q[ZR] || !!Z0.isPlaying(q[ZR])) {
      if (Z0) {
        Z0.setVolume(ZK, q[ZR]);
      }
    }
  };
  // 對指定音效進行淡入淡出
  exports.fadeAudio = function (ZR, ZK, Zg, ZT) {
    if (!q[ZR] || !!Z0.isPlaying(q[ZR])) {
      if (Z0) {
        Z0.fade(ZK, Zg, ZT, q[ZR]);
      }
    }
  };
  exports.isAudioPlaying = Z6;
  exports.playAudio = Z7;
  // 停止指定音效
  exports.stopAudio = function (ZR, ZK = Z0) {
    if (Z6(ZR, ZK) && ZK) {
      ZK.stop(q[ZR]);
    }
  };
  // 遊戲開始後開啟音效控制
  exports.toggleAudioGameStarted = function () {
    w = true;
    Z9(!j.settingMenuHelper.soundEnable);
    ZZ(!j.settingMenuHelper.soundEnable);
  };
  exports.toggleMusicMuted = Z9;
  exports.toggleEffectMuted = ZZ;
  // 交叉淡入淡出兩段音樂
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
  // 更新所有音效的播放速率
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
  // 載入指定音效資源
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
  // 釋放音效池中的所有資源
  exports.releaseAudioPool = function (ZR) {
    Object.keys(ZR).forEach(function (ZK) {
      ZI(ZR[ZK]);
    });
  };
  exports.releaseAudio = ZI;
  // 設定贏得次數
  exports.setWinCount = function (ZR) {
    X = ZR;
  };
  // 取得目前贏得次數
  exports.getWinCount = function () {
    return X;
  };
  cc._RF.pop();
}
// 建立一般音效物件
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
// 建立具音效片段資訊的音效物件
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
// 取得音效實際資源路徑
function Z4(ZR) {
  return J + ZR;
}
// 播放或暫停指定音效並管理 ID
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
// 檢查音效是否正在播放
function Z6(ZR, ZK = Z0) {
  return q[ZR] && ZK.isPlaying(q[ZR]);
}
// 播放通用音效
function Z7(ZR, ZK, Zg) {
  Z5(Q.GENERAL_AUDIO, Z0, ZR, ZK, Zg);
}
// 暫停通用音效
function Z8(ZR, ZK = Z0) {
  if (Z6(ZR, ZK) && ZK) {
    ZK.pause(q[ZR]);
  }
}
// 切換音樂靜音
function Z9(ZR = false) {
  if (W[H.MUSIC]) {
    W[H.MUSIC].map(function (ZK) {
      ZK.setMute(ZR);
    });
  }
}
// 切換音效靜音
function ZZ(ZR = false) {
  if (W[H.SOUND]) {
    W[H.SOUND].map(function (ZK) {
      ZK.setMute(ZR);
    });
  }
}
// 卸載指定音效資源
function ZI(ZR) {
  return ZR.unload();
}
// 進入背景時暫停所有音效
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
// 回到前景時恢復被暫停的音效
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
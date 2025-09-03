if (!cc._RF.push(module, "5c3d2SrYLxJYqXl2p30apID", "AudioAdapter")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var x;
  var L;
  var D = require("ResRC");
  var k = require("AudioAdapterConstant");
  var C = require("AdapterEventEmitter");
  var j = require("AudioFactory");
  x = 0;
  function G() {
    return ++x;
  }
  (function (Y) {
    Y._audio = "_audio";
  })(L ||= {});
  var V = {
    load: D.load,
    unload: D.release
  };
  var Q = V;
  var N = function () {
    function _Y(W) {
      var q = this;
      this._paused = false;
      this._sounds = Object.create(null);
      this._numberOfInstance = 0;
      this._state = k.AUDIO_ADAPTER_STATE.UNLOADED;
      this._pendingUnload = false;
      this.maxInstance = k.MAX_INSTANCE_NUMBER;
      this._src = W.src;
      this._volume = typeof W.volume == "number" ? W.volume : 1;
      this._rate = typeof W.rate == "number" ? W.rate : 1;
      this._mute = !!W.mute;
      this._loop = !!W.loop;
      this._sprite = W.sprite;
      this._loader = W.loader || Q;
      this.factory = W.soundFactory || new j.default();
      var S = W.eventEmitter || new C.default();
      this.on = function (z, f, A, M) {
        if (A == null || A in q._sounds != 0) {
          S.on(z, f, A, M);
        }
      };
      this.off = S.off.bind(S);
      this.once = function (z, f, A) {
        if (A == null || A in q._sounds != 0) {
          S.once(z, f, A);
        }
      };
      this._emit = S.emit.bind(S);
      if (W.preload) {
        setTimeout(this.load.bind(this), 0);
      }
    }
    // 載入音訊資源
    _Y.prototype.load = function () {
      if (this._state !== k.AUDIO_ADAPTER_STATE.LOADED && this._state !== k.AUDIO_ADAPTER_STATE.LODING) {
        this._loader.load(this._src, this._onLoadComplete.bind(this));
        this._state = k.AUDIO_ADAPTER_STATE.LODING;
      }
    };
    // 音訊載入完成時的處理
    _Y.prototype._onLoadComplete = function (W, q) {
      if (W) {
        this._emit(k.AUDIO_ADAPTER_EVENT.LOAD_ERROR, undefined, W.message || W);
        this._pendingUnload = false;
        this._state = k.AUDIO_ADAPTER_STATE.UNLOADED;
      } else {
        this._state = k.AUDIO_ADAPTER_STATE.LOADED;
        if (q) {
          this._clip = q[L._audio];
        }
        this._emit(k.AUDIO_ADAPTER_EVENT.LOADED);
        if (this._pendingUnload) {
          this.unload();
        }
      }
    };
    // 釋放音訊資源
    _Y.prototype.unload = function () {
      if (this._state !== k.AUDIO_ADAPTER_STATE.UNLOADED) {
        if (this._state !== k.AUDIO_ADAPTER_STATE.LODING) {
          if (this._numberOfInstance !== 0) {
            this.stop();
          }
          this._clip = undefined;
          this._loader.unload(this._src);
          this._pendingUnload = false;
          this._state = k.AUDIO_ADAPTER_STATE.UNLOADED;
        } else {
          this._pendingUnload = true;
        }
      }
    };
    // 播放音效，回傳實例 ID
    _Y.prototype.play = function (W) {
      var q = this;
      if (this._state !== k.AUDIO_ADAPTER_STATE.LOADED) {
        throw Error("Audio Adapter:: play : audio not yet loaded!");
      }
      var S = typeof W == "number";
      var z = !S && typeof W == "string";
      if (this._paused || S) {
        this.resume(W);
        if (S) {
          return W;
        } else {
          return -1;
        }
      }
      var A = this._sounds;
      if (this._numberOfInstance >= this.maxInstance) {
        var M = undefined;
        for (var E in A) {
          M = E;
          break;
        }
        var F = this._sounds[M];
        F.stop();
        delete this._sounds[M];
        this._numberOfInstance--;
        this.off(M);
        this.addAudioToPool(F);
      }
      var b = this.getAudioFromPool();
      var H = {
        loop: this._loop,
        muted: this._mute,
        volume: this._volume,
        rate: this._rate
      };
      b.reset(H);
      var w = z && this._sprite ? this._sprite[W] : undefined;
      var U = 0;
      var B = 0;
      if (w) {
        U = w.from;
        B = w.to - U;
      }
      var P = G();
      b.play(U, B);
      b.once(shell.WebAudioEvent.ENDED, function () {
        if (!q._sounds[P]) {
          throw Error("AudioAdapter :: play : audio doesn't exist on this adapter anymore");
        }
        delete q._sounds[P];
        q._numberOfInstance--;
        q._emit(k.AUDIO_ADAPTER_EVENT.END, P, undefined, true);
        q.addAudioToPool(b);
      });
      A[P] = b;
      this._numberOfInstance++;
      this._emit(k.AUDIO_ADAPTER_EVENT.PLAY, P);
      return P;
    };
    // 停止音效，可指定實例或全部停止
    _Y.prototype.stop = function (W) {
      if (this._state !== k.AUDIO_ADAPTER_STATE.LOADED) {
        throw Error("Audio Adapter :: stop : Attemp to stop not loaded audio!");
      }
      if (this._numberOfInstance !== 0) {
        if (typeof W == "number") {
          if (S = this._sounds[W]) {
            delete this._sounds[W];
            this._numberOfInstance--;
            S.stop();
            this._emit(k.AUDIO_ADAPTER_EVENT.STOP, W, undefined, true);
            this.addAudioToPool(S);
          }
        } else {
          for (var q in this._sounds) {
            var S;
            (S = this._sounds[q]).stop();
            this._emit(k.AUDIO_ADAPTER_EVENT.STOP, +q, undefined, true);
            this.addAudioToPool(S);
          }
          this._sounds = Object.create(null);
          this._numberOfInstance = 0;
        }
      }
    };
    // 暫停音效播放
    _Y.prototype.pause = function (W) {
      if (typeof W == "number") {
        if ((S = this._sounds[W]) && S.playing) {
          S.pause();
          this._emit(k.AUDIO_ADAPTER_EVENT.PAUSE, W);
        }
      } else {
        this._paused = true;
        if (this._numberOfInstance === 0) {
          return;
        }
        for (var q in this._sounds) {
          var S;
          if ((S = this._sounds[q]).playing) {
            S.pause();
            this._emit(k.AUDIO_ADAPTER_EVENT.PAUSE, +q);
          }
        }
      }
    };
    // 恢復音效播放
    _Y.prototype.resume = function (W) {
      if (typeof W == "number") {
        if ((S = this._sounds[W]) && S.paused) {
          S.resume();
          this._emit(k.AUDIO_ADAPTER_EVENT.RESUME, W);
        }
      } else {
        this._paused = false;
        if (this._numberOfInstance === 0) {
          return;
        }
        for (var q in this._sounds) {
          var S;
          if ((S = this._sounds[q]).paused) {
            S.resume();
            this._emit(k.AUDIO_ADAPTER_EVENT.RESUME, +q);
          }
        }
      }
    };
    _Y.prototype.setMute = function (W, q) {
      // 設定靜音狀態
      if (typeof q == "number") {
        if ((z = this._sounds[q]) && z.muted !== W) {
          z.muted = W;
          this._emit(k.AUDIO_ADAPTER_EVENT.MUTE, q);
        }
      } else {
        this._mute = W;
        if (this._numberOfInstance === 0) {
          return;
        }
        for (var S in this._sounds) {
          var z;
          if ((z = this._sounds[S]).muted !== W) {
            z.muted = W;
            this._emit(k.AUDIO_ADAPTER_EVENT.MUTE, +S);
          }
        }
      }
    };
    _Y.prototype.isMute = function (W) {
      if (typeof W == "number") {
        var q = this._sounds[W];
        return !!q && q.muted;
      }
      return this._mute;
    };
    // 設定音量
    _Y.prototype.setVolume = function (W, q) {
      if (typeof q == "number") {
        if ((z = this._sounds[q]) && z.volume !== W) {
          z.volume = W;
          this._emit(k.AUDIO_ADAPTER_EVENT.VOLUME, q);
        }
      } else {
        this._volume = W;
        if (this._numberOfInstance === 0) {
          return;
        }
        for (var S in this._sounds) {
          var z;
          if ((z = this._sounds[S]).volume !== W) {
            z.volume = W;
            this._emit(k.AUDIO_ADAPTER_EVENT.VOLUME, +S);
          }
        }
      }
    };
    // 取得音量
    _Y.prototype.getVolume = function (W) {
      if (typeof W == "number") {
        var q = this._sounds[W];
        if (q) {
          return q.volume;
        } else {
          return 0;
        }
      }
      return this._volume;
    };
    // 取得即時音量（淡入淡出使用）
    _Y.prototype.getInstantVolume = function (W) {
      var q = this._sounds[W];
      if (q) {
        return q.instantVolume;
      } else {
        return 0;
      }
    };
    // 對音效進行淡入淡出
    _Y.prototype.fade = function (W, q, S, z) {
      var f = this;
      if (this._state !== k.AUDIO_ADAPTER_STATE.LOADED) {
        throw Error("Audio Adpater :: fade : Audio not loaded!");
      }
      if (this._numberOfInstance !== 0) {
        if (typeof z == "number") {
          var A = this._sounds[z];
          if (A) {
            A.off(shell.WebAudioEvent.FADED);
            A.once(shell.WebAudioEvent.FADED, function () {
              f._emit(k.AUDIO_ADAPTER_EVENT.FADED, z);
            });
            A.fade(W, q, S);
          }
        } else {
          this._volume = q;
          function M(h) {
            var b = E._sounds[h];
            b.off(shell.WebAudioEvent.FADED);
            b.once(shell.WebAudioEvent.FADED, function () {
              f._emit(k.AUDIO_ADAPTER_EVENT.FADED, +h);
            });
            b.fade(W, q, S);
          }
          var E = this;
          for (var F in this._sounds) {
            M(F);
          }
        }
      }
    };
    // 設定是否循環播放
    _Y.prototype.setLoop = function (W, q) {
      if (typeof q == "number") {
        if (z = this._sounds[q]) {
          z.loop = W;
        }
      } else {
        this._loop = W;
        if (this._numberOfInstance === 0) {
          return;
        }
        for (var S in this._sounds) {
          var z;
          (z = this._sounds[S]).loop = W;
        }
      }
    };
    // 判斷是否循環播放
    _Y.prototype.isLoop = function (W) {
      if (typeof W == "number") {
        var q = this._sounds[W];
        return !!q && q.loop;
      }
      return this._loop;
    };
    // 設定播放速率
    _Y.prototype.setRate = function (W, q) {
      if (typeof q == "number") {
        if (z = this._sounds[q]) {
          z.rate = W;
        }
      } else {
        this._rate = W;
        if (this._numberOfInstance === 0) {
          return;
        }
        for (var S in this._sounds) {
          var z;
          (z = this._sounds[S]).rate = W;
        }
      }
    };
    // 取得播放速率
    _Y.prototype.getRate = function (W) {
      if (typeof W == "number") {
        var q = this._sounds[W];
        if (q) {
          return q.rate;
        }
      }
      return this._rate;
    };
    // 判斷音效是否正在播放
    _Y.prototype.isPlaying = function (W) {
      if (typeof W == "number") {
        var q = this._sounds[W];
        return q !== undefined && q.playing;
      }
      return this._numberOfInstance > 0 && this._paused === false;
    };
    // 取得音效總長度
    _Y.prototype.getDuration = function (W) {
      if (typeof W == "number") {
        var q = this._sounds[W];
        if (q) {
          return q.duration;
        }
      } else if (this._clip) {
        return this._clip.duration;
      }
      return 0;
    };
    // 取得當前適配器狀態
    _Y.prototype.getState = function () {
      return this._state;
    };
    // 取得指定實例的播放時間
    _Y.prototype.getCurrentTime = function (W) {
      var q = this._sounds[W];
      if (q) {
        return q.currentTime;
      } else {
        return 0;
      }
    };
    // 跳到指定播放時間
    _Y.prototype.seek = function (W, q) {
      var S = this;
      if (this._state !== k.AUDIO_ADAPTER_STATE.LOADED) {
        throw Error("Audio Adapter:: seek : audio not yet loaded!");
      }
      if (this._numberOfInstance !== 0) {
        if (typeof q == "number") {
          var z = this._sounds[q];
          if (z) {
            z.once(shell.WebAudioEvent.SEEK, function () {
              S._emit(k.AUDIO_ADAPTER_EVENT.SEEK, q);
            });
            z.seek(W);
            z.off(shell.WebAudioEvent.SEEK);
          }
        } else {
          if (this._numberOfInstance === 0) {
            return;
          }
          this._paused = false;
          var f = __assign({}, this._sounds);
          function A(E) {
            var F = f[E];
            F.once(shell.WebAudioEvent.SEEK, function () {
              S._emit(k.AUDIO_ADAPTER_EVENT.SEEK, +E);
            });
            F.seek(W);
            F.off(shell.WebAudioEvent.SEEK);
          }
          for (var M in f) {
            A(M);
          }
        }
      }
    };
    // 從池中取得可用的音效物件
    _Y.prototype.getAudioFromPool = function () {
      return this.factory.get() || new shell.WebAudio(this._clip);
    };
    // 將音效物件回收至池中
    _Y.prototype.addAudioToPool = function (W) {
      W.reset();
      W.removeAll();
      if (!this.factory.put(W)) {
        W.destroy();
      }
    };
    // 預留立體聲調整函式
    _Y.prototype.stereo = function () {};
    _Y.getNewId = G;
    return _Y;
  }();
  exports.default = N;
  cc._RF.pop();
}
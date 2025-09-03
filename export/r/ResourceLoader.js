if (!cc._RF.push(module, "517d1jsi4lLyboQPLjM/Od/", "ResourceLoader")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoaderType = undefined;
  var T;
  var x = require("RetryHandler");
  var L = require("ResRC");
  var D = require("ResourceQualifierHelper");
  (function (C) {
    C[C.CUSTOM = -1] = "CUSTOM";
  })(T = exports.LoaderType ||= {});
  var k = function () {
    function C() {
      this._retryHandler = new x.default();
    }
    C.prototype.loadAsset = function (u) {
      if (u.type === T.CUSTOM) {
        return this._loadCustomAsset(u);
      } else {
        return this._loadCocosAsset(u);
      }
    };
    C.prototype.releaseAsset = function (u) {
      if (u.type === T.CUSTOM) {
        return this._releaseCustomAsset(u);
      } else {
        return this._releaseCocosAsset(u);
      }
    };
    C.prototype.loadBundle = function (u) {
      var c = this;
      var p = this._retryHandler;
      var j = u.bundle;
      var l = u.retryMessage;
      var G = u.retryHandling;
      var V = u.retryingCallback;
      var Q = u.progressCallback;
      return new Promise(function (N) {
        var Y = 0;
        var W = j.length;
        var q = j.slice();
        var S = j.slice();
        var z = [];
        var A = Object.create(null);
        p.init(l, function () {
          q = z.slice();
          S = z.slice();
          z = [];
          E();
        });
        function M() {
          if (S.length === 0) {
            if (z.length === 0) {
              N(A);
              return;
            }
            if (z.length > 0) {
              if (p.canRetry()) {
                V(p.getRetryCount());
                p.execute();
              } else {
                G(p.execute.bind(p), A, z, p.getRetryCount());
              }
            }
          }
        }
        function E() {
          q.forEach(function (F) {
            c.loadAsset(F).then(function (b) {
              Y++;
              var H = b.config.name;
              A[H];
              A[H] = b;
              S.splice(S.indexOf(F), 1);
              Q(Y, W);
              M();
            }).catch(function () {
              z.push(F);
              S.splice(S.indexOf(F), 1);
              M();
            });
          });
        }
        E();
      });
    };
    C.prototype.releaseBundle = function (u) {
      var c = this;
      var p = [];
      u.forEach(function (j) {
        p.push(c.releaseAsset(j));
      });
      return new Promise(function (j) {
        Promise.all(p).then(function (l) {
          var G = Object.create(null);
          l.forEach(function (V) {
            G[V.config.name] = V;
          });
          j(G);
        });
      });
    };
    C.prototype._loadCocosAsset = function (u) {
      return new Promise(function (c, p) {
        var j = u.isLocalized ? D.getResourceURL(u.url) : u.url;
        L.load(j, u.type, function (l, G) {
          var V = {
            config: u,
            result: G
          };
          if (l) {
            p(l);
          } else {
            c(V);
          }
        });
      });
    };
    C.prototype._loadCustomAsset = function (u) {
      return new Promise(function (c, p) {
        u.loadFunc(function (j) {
          var l = {
            config: u,
            result: j
          };
          c(l);
        }, function (j) {
          p(j);
        });
      });
    };
    C.prototype._releaseCocosAsset = function (u) {
      return new Promise(function (c) {
        var p = u.isLocalized ? D.getResourceURL(u.url) : u.url;
        L.release(p, u.type);
        c({
          config: u
        });
      });
    };
    C.prototype._releaseCustomAsset = function (u) {
      return new Promise(function (c) {
        if (u.releaseFunc) {
          new Promise(u.releaseFunc).then(function () {
            var p = {
              config: u
            };
            c(p);
          });
        } else {
          c({
            config: u
          });
        }
      });
    };
    return C;
  }();
  exports.default = k;
  cc._RF.pop();
}
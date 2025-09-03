if (!cc._RF.push(module, "a3adfRiBcZJbqfI73O63apo", "NodePoolHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nodePoolHandler = exports.NodePoolHandler = undefined;
  var T = function () {
    function D() {
      this._nodePools = Object.create(null);
      this._registeredPrefabs = Object.create(null);
    }
    D.prototype.registerReusableItem = function (k, C, u, c = 0) {
      var p = this._registeredPrefabs;
      var j = this._nodePools;
      if (L(k) || L(C) || !L(j[k]) || !L(p[k])) {
        throw Error("registerReusableItem fail");
      }
      j[k] = new cc.NodePool(u);
      p[k] = C;
      if (c > 0) {
        for (var G = 0; G < c; G++) {
          var V = cc.instantiate(C);
          V._nodePoolPrefabId = C._uuid;
          this.enqueueReusableItem(V, k);
        }
      }
    };
    D.prototype.replaceReusableItem = function (k, C, u, c = 0) {
      this.unregisterReusableItem(k);
      this.registerReusableItem(k, C, u, c);
    };
    D.prototype.dequeueReusableItem = function (k) {
      var C = this._nodePools[k];
      if (C.size() > 0) {
        return C.get();
      }
      var u = this._registeredPrefabs[k];
      var c = cc.instantiate(u);
      c._nodePoolPrefabId = u._uuid;
      return c;
    };
    D.prototype.enqueueReusableItem = function (k, C) {
      var u = this._nodePools[C];
      var c = this._registeredPrefabs[C];
      if (k._nodePoolPrefabId === c._uuid) {
        k.removeFromParent();
        u.put(k);
      } else {
        k.destroy();
      }
    };
    D.prototype.unregisterReusableItem = function (k) {
      this.clear(k);
      delete this._nodePools[k];
      delete this._registeredPrefabs[k];
    };
    D.prototype.unregisterAllReusableItem = function () {
      var k;
      var C;
      var u = this._nodePools;
      var c = Object.keys(u);
      try {
        for (var p = __values(c), j = p.next(); !j.done; j = p.next()) {
          var l = j.value;
          this.unregisterReusableItem(l);
        }
      } catch (V) {
        var G = {
          error: V
        };
        k = G;
      } finally {
        try {
          if (j && !j.done && (C = p.return)) {
            C.call(p);
          }
        } finally {
          if (k) {
            throw k.error;
          }
        }
      }
    };
    D.prototype.clear = function (k) {
      var C = this._nodePools[k];
      if (C) {
        C.clear();
      }
    };
    D.prototype.clearAll = function () {
      var k;
      var C;
      var u = this._nodePools;
      var c = Object.keys(u);
      try {
        for (var p = __values(c), j = p.next(); !j.done; j = p.next()) {
          var l = j.value;
          this.clear(l);
        }
      } catch (V) {
        var G = {
          error: V
        };
        k = G;
      } finally {
        try {
          if (j && !j.done && (C = p.return)) {
            C.call(p);
          }
        } finally {
          if (k) {
            throw k.error;
          }
        }
      }
    };
    D.prototype.destroy = function () {
      this.unregisterAllReusableItem();
    };
    return D;
  }();
  exports.NodePoolHandler = T;
  var x = new T();
  exports.nodePoolHandler = x;
  cc._RF.pop();
}
function L(D) {
  return D == null;
}
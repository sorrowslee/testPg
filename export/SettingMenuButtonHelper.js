if (!cc._RF.push(module, "1ddf5VqGQ9OiqajxiLxeBVw", "SettingMenuButtonHelper")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator.ccclass;
  var x = function () {
    function L() {
      this._buttonList = [];
      this._buttonPrefabStore = Object.create(null);
      this._buttonInteractableStore = Object.create(null);
      this._buttonLockStore = Object.create(null);
      this._buttons = Object.create(null);
      this._otherButtons = Object.create(null);
      this._buttonListCannotBeDisable = Object.create(null);
    }
    L.prototype.setButtonPrefab = function (D, k, C) {
      this._buttonPrefabStore[D] = k;
      this._buttonListCannotBeDisable[D] = C;
    };
    L.prototype.totalButtonsOccupied = function () {
      return this._buttonList.length;
    };
    L.prototype.getButtonInList = function (D) {
      return cc.instantiate(this._buttonPrefabStore[D]).getComponent("GenericSettingButton");
    };
    L.prototype.setupSettingMenuButtonInList = function (D, k, C) {
      var u = cc.instantiate(this._buttonPrefabStore[D]);
      var c = u.getComponent("GenericSettingButton");
      this._buttonList.push(c.button);
      c.onClick = k;
      this._buttonLockStore[D] = false;
      this._buttons[D] = c;
      if (C) {
        u.getComponent("ButtonTheme").colorKey = C;
      }
      return c;
    };
    L.prototype.setupIndependentSettingMenuButton = function (D, k) {
      if (this._buttonPrefabStore[D]) {
        var C = cc.instantiate(this._buttonPrefabStore[D]).getComponent("GenericSettingButton");
        C.onClick = k;
        this._buttonLockStore[D] = false;
        this._buttons[D] = C;
        return C;
      }
    };
    L.prototype.setupOtherButtonInList = function (D, k) {
      var C = {
        isInteractable: k
      };
      this._buttonLockStore[D] = false;
      this._otherButtons[D] = C;
      this._buttonListCannotBeDisable[D] = false;
    };
    L.prototype.setButtonInteractableFlag = function (D, k = false) {
      this._buttonInteractableStore[D] = k;
    };
    L.prototype.setButtonInteractable = function (D) {
      if (!this._buttonListCannotBeDisable[D] && this._buttonLockStore[D] === false) {
        if (this._otherButtons[D]) {
          this._otherButtons[D].isInteractable(this._buttonInteractableStore[D]);
        } else {
          this._buttons[D].isInteractable = this._buttonInteractableStore[D];
        }
      }
    };
    L.prototype.setButtonLock = function (D, k = false) {
      this._buttonLockStore[D] = k;
    };
    L.prototype.isButtonLocked = function (D) {
      return this._buttonLockStore[D];
    };
    L.prototype.setAllButtonsInteractable = function (D) {
      var k = Object.keys(this._buttons);
      for (var C = 0, u = k.length; C < u; C++) {
        this.setButtonInteractableFlag(parseInt(k[C]), D);
        this.setButtonInteractable(parseInt(k[C]));
      }
      var c = Object.keys(this._otherButtons);
      C = 0;
      u = c.length;
      for (; C < u; C++) {
        this.setButtonInteractableFlag(parseInt(c[C]), D);
        this.setButtonInteractable(parseInt(c[C]));
      }
    };
    L.prototype.setButtonsLock = function (D) {
      for (var k = 0, C = Object.keys(this._buttons).length; k < C; k++) {
        this.setButtonLock(k + 1, D);
      }
      k = 0;
      C = Object.keys(this._otherButtons).length;
      for (; k < C; k++) {
        this.setButtonLock(k + 1, D);
      }
    };
    L.prototype.setLockAccess = function (D, k) {
      this.setButtonLock(D, k);
      if (k) {
        if (this._otherButtons[D]) {
          this._otherButtons[D].isInteractable(!k);
        } else {
          this._buttons[D].isInteractable = !k;
        }
      } else {
        this.setButtonInteractable(D);
      }
    };
    L.prototype.getButtonNode = function (D) {
      var k = this._buttons[D];
      if (k) {
        return k.node;
      } else {
        return undefined;
      }
    };
    return __decorate([T("SettingMenuButtonHelper")], L);
  }();
  exports.default = x;
  cc._RF.pop();
}
if (!cc._RF.push(module, "f5f30hTmFFOcLgg2elp0I0D", "LabelLocalized")) {
  exports.__esModule = true;
  exports.default = undefined;
  var K = cc.Class({
    extends: cc.Component,
    editor: false,
    properties: {
      key: {
        tooltip: false,
        default: "",
        notify: function () {
          this._updateString();
        }
      }
    },
    onLoad: function () {
      this._label = this.node.getComponent(cc.Label);
      this._label ||= this.node.getComponent(cc.RichText);
      this._updateString();
    },
    _updateString: function () {
      var g = this._label;
      if (g) {
        g.string = shell.I18n.t(this.key);
      }
    }
  });
  exports.default = K;
  module.exports = exports.default;
  cc._RF.pop();
}
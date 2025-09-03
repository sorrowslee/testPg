if (!cc._RF.push(module, "4d769Qc8epMlozoEYpeBTit", "SlotAnalyticsHelper")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sendFastStopGA = undefined;
  var T = require("AnalyticsHelper");
  exports.sendFastStopGA = function (x, L) {
    var D = {
      type: x,
      is_auto: L
    };
    T.sendEvent(shell.ga.CATEGORY_GAME, shell.ga.EVENT_SLOT_STOP_SPIN, D);
  };
  cc._RF.pop();
}
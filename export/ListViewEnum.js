if (!cc._RF.push(module, "1db1bgDOdFP2LjHMP1kDfIt", "ListViewEnum")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cellUpdateAction = exports.scrollPosition = undefined;
  (function (T) {
    T[T.scrollPositionTop = 0] = "scrollPositionTop";
    T[T.scrollPositionMiddle = 1] = "scrollPositionMiddle";
    T[T.scrollPositionBottom = 2] = "scrollPositionBottom";
  })(exports.scrollPosition ||= {});
  (function (T) {
    T[T.cellUpdateActionInsert = 0] = "cellUpdateActionInsert";
    T[T.cellUpdateActionRemove = 1] = "cellUpdateActionRemove";
    T[T.cellUpdateActionUpdate = 2] = "cellUpdateActionUpdate";
  })(exports.cellUpdateAction ||= {});
  cc._RF.pop();
}
if (!cc._RF.push(module, "95aac3PHb1J8pXlbPzijfq9", "ButtonHitTest")) {
  exports.__esModule = true;
  exports.buttonHitTest = function (x) {
    var L = cc.EventListener.ListenerID.TOUCH_ONE_BY_ONE;
    cc.internal.eventManager[T._sortListenersOfSceneGraphPriority](L, cc.director.getScene());
    var D = cc.internal.eventManager[T._getListeners](L);
    if (!D) {
      return false;
    }
    var k;
    for (var C = D[T._sceneGraphListeners], u = x.parent.convertToWorldSpaceAR(x.getPosition()), c = 0; c < C.length; ++c) {
      if (C[c].owner[T._hitTest](u, C[c])) {
        k = C[c].owner;
        break;
      }
    }
    return k && k === x;
  };
  var T = cc.Enum({
    _sortListenersOfSceneGraphPriority: "_sortListenersOfSceneGraphPriority",
    _getListeners: "_getListeners",
    _hitTest: "_hitTest",
    _sceneGraphListeners: "_sceneGraphListeners"
  });
  cc._RF.pop();
}
if (!cc._RF.push(module, "6da04mFMhpNcpdeGLQM+RKD", "GameEventHandler")) {
  var g = System.get("bvframework").GameEventHandler;
  var T = {
    subscribeGameInfoUpdateEvent: "subscribeUpdateGameInfoEvent",
    subscribeGameLayoutInfoRequestEvent: "subscribeGameLayoutInfoEvent",
    subscribeGameConfigRequestEvent: "subscribeGameConfigRequest",
    subscribeGameConfigUpdateEvent: "subscribeGameConfigUpdateRequest",
    subscribeAudioPlayRateUpdateEvent: "subscribeUpdateAudioPlayRateEvent",
    subscribeInUIIdleStateStatusUpdateEvent: "subscribeUIIdleStateEvent",
    subscribeOperatorCurrencyFormatUpdateEvent: "subscribeOperatorCurrencyFormatUpdate",
    subscribeStoredGamesNameRequestEvent: "subscribeGameNameRequestEvent",
    emitGameStateChangedEvent: "emitGameStateChange",
    emitAutoplayStartedEvent: "emitAutoplayStarted",
    emitAutoplayStoppedEvent: "emitAutoplayStopped",
    emitErrorLogEvent: "emitErrorLog",
    emitUIBlockEvent: "emitBlockUIEvent",
    addGamePausedEventCallback: "setGamePauseEventCallback",
    addGameResumedEventCallback: "setGameResumeEventCallback",
    addTransactionInfoChangedEventCallback: "setTransactionInfoChangedCallback",
    removeTransactionInfoChangedEventCallback: "removeTransactionInfoChangedCallback",
    addUIBlockEventCallback: "setGamePlayUIBlockEventCallback",
    addInUIIdleStateCallback: "setInUIIdleStateCallback",
    subscribeSessionSocketErrorEvent: "subscribeOperationSocketErrorEvent",
    subscribeSessionSocketConnectedEvent: "subscribeOperationSocketConnectedEvent",
    subscribeSessionSocketConnectionStatusRequestEvent: "subscribeOperationSocketConnectionStatusRequestEvent"
  };
  var x = __assign({}, g);
  Object.keys(T).forEach(function (D) {
    x[T[D]] = x[D];
  });
  x.emitGameWinAnnouncement = function () {};
  for (var L in x) {
    module.exports[L] = x[L];
  }
  module.exports.__esModule = true;
  cc._RF.pop();
}
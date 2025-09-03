if (!cc._RF.push(module, "9c6d2sdvbpNab7sycJbS7X0", "WinTemplateConstant")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BigWinRollState = exports.REPLAY_WIN_HOLD_DURATION = exports.NORMAL_WIN_HOLD_DURATION = exports.WinState = undefined;
  (function (T) {
    T[T.INITIAL = 1] = "INITIAL";
    T[T.PLAYING = 2] = "PLAYING";
    T[T.WAITING = 3] = "WAITING";
    T[T.DISMISING = 4] = "DISMISING";
  })(exports.WinState ||= {});
  exports.NORMAL_WIN_HOLD_DURATION = 6;
  exports.REPLAY_WIN_HOLD_DURATION = 1;
  (function (T) {
    T[T.BIG_WIN = 0] = "BIG_WIN";
    T[T.MEGA_WIN = 1] = "MEGA_WIN";
    T[T.SUPER_MEGA_WIN = 2] = "SUPER_MEGA_WIN";
  })(exports.BigWinRollState ||= {});
  cc._RF.pop();
}
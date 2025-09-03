var Y;
var W;
var q;
var S;
var z;
var f;
var A;
var M;
var E;
if (!cc._RF.push(module, "581d2Um5MZAj5QG9p5tjd/T", "GameConstant")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isRTL = exports.PayOutData = exports.NodePoolName = exports.NORMAL_HOLD_DURATION = exports.REPLAY_HOLD_DURATION = exports.DisplayState = exports.TransitionState = exports.spineSymbolNameMaps = exports.blurredSymbolBgNameMaps = exports.symbolBgNameMaps = exports.blurredFrameMaps = exports.frameMaps = exports.blurredSlotSymbolNameMaps = exports.slotSymbolImageNameMaps = exports.BLOCK_TYPE = exports.SlotSymbols = exports.FAST_SCROLL_MIN_REQUIRE_SCATTER = exports.SLOT_HEIGHT = exports.SLOT_WIDTH = exports.COLUMN_END_INDEX = exports.COLUMN_START_INDEX = exports.SLOT_ITEM_ROW_TOP_POS = exports.SLOT_ITEM_COLUMN_MAP = exports.SLOT_ITEM_MAP = exports.NUMBER_OF_ROW_LIST = exports.NUMBER_OF_ROW = exports.NUMBER_OF_COLUMN = undefined;
  exports.NUMBER_OF_COLUMN = 6;
  exports.NUMBER_OF_ROW = 5;
  exports.NUMBER_OF_ROW_LIST = [3, 4, 5, 5, 4, 3];
  exports.SLOT_ITEM_MAP = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10, 11], [12, 13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23]];
  exports.SLOT_ITEM_COLUMN_MAP = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 1,
    "4": 1,
    "5": 1,
    "6": 1,
    "7": 2,
    "8": 2,
    "9": 2,
    "10": 2,
    "11": 2,
    "12": 3,
    "13": 3,
    "14": 3,
    "15": 3,
    "16": 3,
    "17": 4,
    "18": 4,
    "19": 4,
    "20": 4,
    "21": 5,
    "22": 5,
    "23": 5
  };
  exports.SLOT_ITEM_ROW_TOP_POS = {
    "0": 177.2,
    "1": 265.8,
    "2": 354.4,
    "3": 354.4,
    "4": 265.8,
    "5": 177.2
  };
  exports.COLUMN_START_INDEX = [0, 3, 7, 12, 17, 21];
  exports.COLUMN_END_INDEX = [2, 6, 11, 16, 20, 23];
  exports.SLOT_WIDTH = 172;
  exports.SLOT_HEIGHT = 172;
  exports.FAST_SCROLL_MIN_REQUIRE_SCATTER = 2;
  (function (Z0) {
    Z0[Z0.Wild = 0] = "Wild";
    Z0[Z0.Scatter = 1] = "Scatter";
    Z0[Z0.Bandit = 2] = "Bandit";
    Z0[Z0.Gun = 3] = "Gun";
    Z0[Z0.Hat = 4] = "Hat";
    Z0[Z0.Whisky = 5] = "Whisky";
    Z0[Z0.A = 6] = "A";
    Z0[Z0.K = 7] = "K";
    Z0[Z0.Q = 8] = "Q";
    Z0[Z0.J = 9] = "J";
  })(M = exports.SlotSymbols ||= {});
  (function (Z0) {
    Z0[Z0.NORMAL = 100] = "NORMAL";
    Z0[Z0.GOLD = 200] = "GOLD";
  })(E = exports.BLOCK_TYPE ||= {});
  (Y = {})[M.Wild] = "s_wild";
  Y[M.Scatter] = "s_scatter";
  Y[M.Whisky] = "h_whisky";
  Y[M.Bandit] = "h_bandit";
  Y[M.Gun] = "h_gun";
  Y[M.Hat] = "h_hat";
  Y[M.A] = "l_a";
  Y[M.J] = "l_j";
  Y[M.K] = "l_k";
  Y[M.Q] = "l_q";
  exports.slotSymbolImageNameMaps = Y;
  (W = {})[M.Wild] = "s_wild_blur";
  W[M.Scatter] = "s_scatter_blur";
  W[M.Whisky] = "h_whisky_blur";
  W[M.Bandit] = "h_bandit_blur";
  W[M.Gun] = "h_gun_blur";
  W[M.Hat] = "h_hat_blur";
  W[M.A] = "l_a_blur";
  W[M.J] = "l_j_blur";
  W[M.K] = "l_k_blur";
  W[M.Q] = "l_q_blur";
  exports.blurredSlotSymbolNameMaps = W;
  (q = {})[E.NORMAL] = "";
  q[E.GOLD] = "s_wild_frame";
  exports.frameMaps = q;
  (S = {})[E.NORMAL] = "";
  S[E.GOLD] = "s_wild_frame_blur";
  exports.blurredFrameMaps = S;
  (z = {})[M.Bandit] = "h_bandit_bg";
  exports.symbolBgNameMaps = z;
  (f = {})[M.Bandit] = "h_bandit_bg_blur";
  exports.blurredSymbolBgNameMaps = f;
  (A = {})[M.Wild] = "s_wild_atlas_specials";
  A[M.Scatter] = "s_scatter_atlas_specials";
  A[M.Whisky] = "h_whisky_atlas_symbols";
  A[M.Bandit] = "h_bandit_atlas_symbols";
  A[M.Gun] = "h_gun_atlas_symbols";
  A[M.Hat] = "h_hat_atlas_symbols";
  A[M.A] = "l_a_atlas_symbols";
  A[M.J] = "l_j_atlas_symbols";
  A[M.K] = "l_k_atlas_symbols";
  A[M.Q] = "l_q_atlas_symbols";
  exports.spineSymbolNameMaps = A;
  (function (Z0) {
    Z0[Z0.NORMAL = 1] = "NORMAL";
    Z0[Z0.FREE_SPIN = 21] = "FREE_SPIN";
    Z0[Z0.FREE_SPIN_RESPIN = 22] = "FREE_SPIN_RESPIN";
    Z0[Z0.RESPIN = 4] = "RESPIN";
  })(exports.TransitionState ||= {});
  (function (Z0) {
    Z0[Z0.SHOWED = 1] = "SHOWED";
    Z0[Z0.HIDE = 2] = "HIDE";
    Z0[Z0.ANIMATING = 3] = "ANIMATING";
  })(exports.DisplayState ||= {});
  exports.REPLAY_HOLD_DURATION = 1;
  exports.NORMAL_HOLD_DURATION = 6;
  (function (Z0) {
    Z0.SlotItem = "SlotItem";
    Z0.SlotItemCustom = "SlotItemCustom";
    Z0.Symbol = "Symbol";
    Z0.Scatter = "Scatter";
    Z0.Multiplier = "Multiplier";
    Z0.RamainingFreeSpinUpgradeItem = "RamainingFreeSpinUpgradeItem";
    Z0.SlowDropEffectItem = "SlowDropEffectItem";
    Z0.PayoutEffectBackItem = "PayoutEffectBackItem";
    Z0.PayoutEffectFrontItem = "PayoutEffectFrontItem";
  })(exports.NodePoolName ||= {});
  exports.PayOutData = {
    0: {
      label: "Scatter Symbol"
    },
    1: {
      label: "Wild Symbol"
    },
    2: {
      "6": 50,
      "5": 30,
      "4": 20,
      "3": 10
    },
    3: {
      "6": 30,
      "5": 20,
      "4": 15,
      "3": 8
    },
    4: {
      "6": 20,
      "5": 15,
      "4": 10,
      "3": 5
    },
    5: {
      "6": 20,
      "5": 15,
      "4": 10,
      "3": 5
    },
    6: {
      "6": 10,
      "5": 6,
      "4": 4,
      "3": 2
    },
    7: {
      "6": 10,
      "5": 6,
      "4": 4,
      "3": 2
    },
    8: {
      "6": 5,
      "5": 3,
      "4": 2,
      "3": 1
    },
    9: {
      "6": 5,
      "5": 3,
      "4": 2,
      "3": 1
    }
  };
  exports.isRTL = shell.isRTLLanguage && shell.isRTLLanguage();
  cc._RF.pop();
}
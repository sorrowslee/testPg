if (!cc._RF.push(module, "932421Mfz5Ex6OqucWfhO+9", "SettingMenuAssetConfig")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getSettingMenuAssetConfig = undefined;
  var T = require("ResourceLoader");
  var x = require("SettingMenuHelper");
  var L = [];
  // 回傳設定選單需要載入的資源清單
  exports.getSettingMenuAssetConfig = function () {
    if (L.length > 0) {
      return L;
    }
    L.push({
      name: "setting_menu_audio",
      type: T.LoaderType.CUSTOM,
      loadFunc: function (C, u) {
        x.settingMenuHelper.loadAudio(function (c) {
          if (c) {
            u(c);
          } else {
            C(undefined);
          }
        });
      }
    });
    var D = {
      setting_menu: x.settingMenuHelper.path + "prefab/setting_menu/setting_menu",
      setting_menu_wallet_panel: x.settingMenuHelper.path + "prefab/info_footer/setting_info_footer_controller",
      setting_menu_auto_spin_button: x.settingMenuHelper.path + "prefab/others/spin_options_button",
      setting_menu_more_menu_button: x.settingMenuHelper.path + "prefab/others/more_menu_button",
      setting_menu_setting_button: x.settingMenuHelper.path + "prefab/others/sound_button",
      setting_menu_rules_button: x.settingMenuHelper.path + "prefab/others/rules_button",
      setting_menu_payout_button: x.settingMenuHelper.path + "prefab/others/payout_button",
      setting_menu_history_button: x.settingMenuHelper.path + "prefab/others/history_button",
      setting_menu_hide_more_button: x.settingMenuHelper.path + "prefab/others/hide_more_menu_button",
      setting_menu_smart_bot_button: x.settingMenuHelper.path + "prefab/others/smartbot_button",
      setting_menu_minus_bet_button: x.settingMenuHelper.path + "prefab/others/minus_bet_button",
      setting_menu_plus_bet_button: x.settingMenuHelper.path + "prefab/others/plus_bet_button",
      setting_menu_turbo_spin_button: x.settingMenuHelper.path + "prefab/others/turbo_spin_button",
      setting_menu_quit_button: x.settingMenuHelper.path + "prefab/others/quit_button"
    };
    var k = D;
    Object.keys(k).forEach(function (C) {
      var u = {
        name: C,
        url: k[C],
        type: cc.Prefab,
        isLocalized: false
      };
      L.push(u);
    });
    L.push({
      name: "setting_menu_sprite_atlas",
      url: x.settingMenuHelper.path + "texture/hd/setting_menu_locale",
      type: cc.SpriteAtlas,
      isLocalized: true
    });
    return L;
  };
  cc._RF.pop();
}
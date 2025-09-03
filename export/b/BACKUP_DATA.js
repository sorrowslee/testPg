if (!cc._RF.push(module, "4dc392lxVJArKflo+rU3j23", "BACKUP_DATA")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var L = new cc.Color(255, 200, 36, 255);
  var D = new cc.Color(255, 255, 255, 255);
  var k = Object.freeze({
    game: {
      theme_color: L,
      theme_font_family: "Arial",
      white_color: D
    },
    game_title: {
      default_font: "Arial"
    },
    setting: {
      theme_color: L,
      theme_font: "Arial",
      slider_switch_color: {
        false: new cc.Color(144, 144, 150, 255),
        true: L
      },
      slider_line_color: {
        false: new cc.Color(144, 144, 150, 20),
        true: L
      },
      label_switch_color_a: {
        false: D,
        true: L
      },
      label_switch_color_b: {
        false: new cc.Color(144, 144, 150, 82),
        true: L
      },
      label_switch_color_c: {
        false: new cc.Color(255, 255, 255, 30),
        true: L
      },
      button_switch_color_a: {
        false: new cc.Color(D.r, D.g, D.b, 79),
        true: L
      },
      color_button_transition_a: {
        normal: L,
        pressed: new cc.Color(L.r, L.g, L.b, 128),
        hover: L,
        disabled: new cc.Color(L.r, L.g, L.b, 66)
      },
      white_button_transition_a: {
        normal: D,
        pressed: new cc.Color(D.r, D.g, D.b, 128),
        hover: D,
        disabled: new cc.Color(D.r, D.g, D.b, 66)
      },
      grey_button_transition_a: {
        normal: new cc.Color(D.r, D.g, D.b, 153),
        pressed: new cc.Color(133, 133, 133, 153),
        hover: new cc.Color(D.r, D.g, D.b, 153),
        disabled: new cc.Color(133, 133, 133, 153)
      },
      spin_start_label: new cc.Color(255, 255, 255, 201)
    },
    login: {
      theme_color: L,
      default_font: "Arial"
    },
    history: {
      grey_button_transition_b: {
        normal: D,
        pressed: new cc.Color(133, 133, 133),
        hover: D,
        disabled: new cc.Color(133, 133, 133)
      },
      white_button_transition_a: {
        normal: D,
        pressed: new cc.Color(255, 255, 255, 128),
        hover: D,
        disabled: new cc.Color(255, 255, 255, 66)
      },
      calendar_title_select: {
        true: L,
        false: new cc.Color(255, 255, 255, 77)
      },
      calendar_selection_line: new cc.Color(40, 40, 52, 235),
      calendar_title_bg: new cc.Color(48, 48, 60, 255),
      calendar_content_bg: new cc.Color(40, 40, 52, 235),
      calendar_custom_bg: new cc.Color(48, 48, 60, 255),
      calendar_custom_line_bg: new cc.Color(48, 48, 60, 255),
      calendar_custom_title: new cc.Color(255, 255, 255, 153),
      calendar_custom_dot: new cc.Color(255, 255, 255, 255),
      calendar_custom_btn: {
        normal: L,
        pressed: new cc.Color(119, 119, 119, 255),
        hover: L,
        disabled: new cc.Color(87, 87, 87, 255)
      },
      calendar_datepicker_default_font: new cc.Color(255, 255, 255, 77),
      calendar_datepicker_highlight_font: L,
      calendar_datepicker_highlight_bg: new cc.Color(48, 48, 60, 255),
      calendar_datepicker_line: new cc.Color(40, 40, 52, 255),
      theme_color: L,
      theme_font: "Arial",
      color_theme_opacity_a: new cc.Color(L.r, L.g, L.b, 153),
      navigator_bg: new cc.Color(48, 48, 60),
      navigator_bar_bg: new cc.Color(40, 40, 52),
      history_bar_item_bg: {
        normal: new cc.Color(48, 48, 60),
        pressed: new cc.Color(57, 57, 75, 60),
        hover: new cc.Color(48, 48, 60),
        disabled: new cc.Color(40, 40, 52)
      },
      history_bar_item_font_bg: {
        false: D,
        true: L
      },
      history_main_title: new cc.Color(241, 186, 91, 255),
      history_list_item_arrow: new cc.Color(255, 255, 255, 64),
      history_list_item_bg_odd: new cc.Color(40, 40, 52),
      history_list_item_bg_even: new cc.Color(45, 45, 57),
      history_list_item_bg_pressed: new cc.Color(60, 60, 70),
      history_list_item_special_font: L,
      history_list_item_value_font: new cc.Color(255, 255, 255, 153),
      history_list_item_date_time_font: new cc.Color(255, 255, 255, 153),
      history_list_item_line: new cc.Color(255, 255, 255, 0),
      history_list_item_free_games_icon: L,
      history_list_header_bg: new cc.Color(40, 40, 52, 255),
      history_list_header_title_font: new cc.Color(255, 255, 255, 77),
      history_list_bg: new cc.Color(48, 48, 60, 255),
      history_list_bottom_circle_loading: D,
      history_list_middle_circle_loading: new cc.Color(255, 255, 255, 77),
      history_list_bottom_label_color: D,
      history_list_middle_label_color: new cc.Color(255, 255, 255, 77),
      history_list_retry: L,
      history_list_message_title: new cc.Color(220, 220, 220, 153),
      history_list_message_message: new cc.Color(220, 220, 220, 77),
      history_list_title_date: new cc.Color(255, 255, 255, 153),
      history_list_middle_loading_front: L,
      history_list_middle_loading_back: new cc.Color(L.r * 0.5, L.g * 0.5, L.b * 0.5),
      history_list_middle_loading_font_color: L,
      history_list_bottom_loading_front: L,
      history_list_bottom_loading_back: new cc.Color(L.r * 0.5, L.g * 0.5, L.b * 0.5),
      history_summary_bg: new cc.Color(40, 40, 52, 255),
      history_summary_title_font: L,
      history_summary_record_font: new cc.Color(255, 255, 255, 153),
      history_summary_amount_font: D,
      history_detail_header_title_font: L,
      history_detail_header_value_font: new cc.Color(120, 120, 120, 255),
      history_detail_header_bg: new cc.Color(40, 40, 52, 255),
      history_detail_down_arrow: L,
      history_detail_line: new cc.Color(40, 40, 52, 255),
      history_detail_payout_font: new cc.Color(255, 255, 255, 66),
      history_detail_win_line_value_font: D,
      history_detail_content_bg: new cc.Color(48, 48, 60),
      history_detail_no_win_combination_font: new cc.Color(255, 255, 255, 204),
      history_detail_title_font: D,
      history_detail_page_arrow: L,
      history_detail_page_arrow_bg: new cc.Color(0, 0, 0, 100),
      history_bar_close_font: new cc.Color(255, 255, 255, 204),
      history_bar_bg: new cc.Color(48, 48, 60, 255)
    },
    alert: {
      default_title_color: D,
      default_message_color: D,
      default_button_title_color: D,
      default_button_color: L,
      default_font: "Arial"
    },
    free_game: {
      theme_color: L,
      theme_font: "Arial"
    },
    bonus_wallet: {
      theme_color: L,
      theme_font: "Arial"
    },
    setting_rules: {
      title_color: new cc.Color(255, 255, 255),
      desc_color: new cc.Color(204, 204, 204),
      font_style: "Arial"
    },
    setting_payout: {
      title_color: new cc.Color(255, 255, 255),
      value_color: new cc.Color(255, 255, 255),
      value_color_red: new cc.Color(192, 38, 48),
      desc_color: new cc.Color(204, 204, 204),
      font_style: "Arial"
    },
    loading: {
      front_icon_color: L,
      back_icon_color: new cc.Color(L.r * 0.5, L.g * 0.5, L.b * 0.5),
      background_color: new cc.Color(0, 0, 0, 0),
      font_color: L,
      font_style: "Arial"
    }
  });
  exports.default = k;
  cc._RF.pop();
}
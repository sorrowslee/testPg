(function () {
  'use strict';

  ;
  var e = window;
  e.DEBUG = false;
  e.PREVIEW = false;
  e.EDITOR = false;
  e.GtmId = "GTM-MDDV6Q2";
  e._CCSettings = {
    platform: "web-mobile",
    groupList: ["default"],
    collisionMatrix: [[true]],
    hasResourcesBundle: true,
    hasStartSceneBundle: false,
    remoteBundles: [],
    subpackages: [],
    launchScene: "db://assets/default/scene/main.fire",
    orientation: "",
    jsList: [],
    bundleVers: {
      internal: {
        index: "2d662",
        config: "2a015"
      },
      resources: {
        index: "2d662",
        config: "0ff33"
      },
      main: {
        index: "b8ae1",
        config: "689d3"
      }
    }
  };
  var n = "a109c59f99.a4836.json";
  var t = "11.5.0-rc.1";
  var i = "/shared/";
  var a = n;
  var r = "984721902a/";
  var o = "c03a2652ad,e02b9bf0d2,a346494745,589a728c8d,2fd142260e,2c6e37b73c,b85c56d865";
  var l = "minMemory=1024&minDiskSpace=1024&whiteList=chrome-59%2Cchrome%20webview-59%2Cfirefox-58%2Csafari-11%2Cedge-79&minOSVersion=iOS-11%2CAndroid-5%2CMacOS-10.10%2CWindows-7";
  var s = "WildBountyShowdown.Name";
  var h = "en,en-social,en-stkus,zh,da,de,es,fr,tr,vi,it,nl,no,th,fi,id,ja,ko,pl,pt,pt-br,ro,ru,sv,my,uk,az,bg,bn,cs,el,et,hi,hu,hy,lo,lt,mn,sh,si,sk,sq,uz,ar,fa,ur";
  var c = "#cc0808";
  var u = false;
  var v = 2;
  var d = "";
  var f = 1;
  var m = "Wild Bounty Showdown";
  var p = "2.24.0.0/7.0.0/5.2.0-0";
  var g = 135;
  var Z = "com.pgsoft.slot.wildbountyshowdown";
  var y = 218103809;
  var b = {
    c03a2652ad: ">=7.2.0-rc.1",
    e02b9bf0d2: ">=11.5.0-rc.1",
    a346494745: ">=10.5.0-rc.1",
    "589a728c8d": ">=7.5.0-rc.1",
    "2fd142260e": ">=9.5.0-rc.1",
    "2c6e37b73c": ">=6.5.0-rc.1",
    b85c56d865: ">=5.4.0-rc.1"
  };
  console.log("Game/Boot/Engine", p);
  var _ = navigator.userAgent;
  var k = 0;
  function x(Z4) {
    var Z6 = Z4 + "";
    var Z7 = (Z4.stack || "") + "";
    var Z8 = Z6;
    if (Z7) {
      if (Z7.indexOf(Z6) === 0) {
        Z8 = Z7;
      } else {
        Z8 += "\n" + Z7;
      }
    }
    var Z9 = this.onFormat || e.onGAReceiveError;
    if (Z9) {
      try {
        Z8 = Z9(Z8);
      } catch (ZZ) {
        w(ZZ + "");
      }
    }
    return Z8.replace(/https?:\/\/[^/]+([0-9A-Za-z/._-]+)\S*(:[0-9]+:[0-9]+)/g, "$1$2").replace(/https?:\/\/[^/]+/g, "");
  }
  function w(Z5, Z6) {
    var Z8 = {
      description: Z5,
      fatal: !!Z6
    };
    gtag("event", "exception", Z8);
  }
  if (_.indexOf(" Chrome/") > 0) {
    k = 2;
  } else if (_.indexOf(" AppleWebKit/") > 0) {
    k = 1;
  } else if (_.indexOf(" Gecko/") > 0) {
    k = 3;
  } else if (_.indexOf(" Trident/") > 0) {
    k = 4;
  } else if (_.indexOf(" Presto/") > 0) {
    k = 5;
  }
  var H;
  var S;
  var M;
  var T;
  H = w;
  S = 0;
  M = "";
  T = 0;
  function P(Z4) {
    var Z6 = Date.now();
    if (M !== Z4 || Z6 - T > 1000) {
      T = Z6;
      M = Z4;
      S = 0;
    } else {
      S++;
    }
    if (S === 0) {
      H(Z4);
    } else if (S === 5) {
      H(Z4, 1);
      var Z7 = this.onFrequent || e.onGAFrequentError;
      try {
        if (Z7) {
          Z7();
        }
      } catch (Z8) {
        H(Z8 + "");
      }
    } else if (S > 5) {
      T = Z6;
    }
  }
  var E = "Uncaught ";
  function V(Z5, Z6, Z7, Z8, Z9) {
    if (k > 3) {
      return false;
    }
    if (!Z7 || !Z8 || !Z9) {
      return false;
    }
    var Zd = E + x.call(V, Z9);
    P.call(V, Zd);
    return false;
  }
  V.report = function (Z4, Z5) {
    w(E + x.call(this, Z4), Z5);
  };
  var R;
  var A;
  var D = "Unhandled ";
  function G(Z4) {
    if (!(k > 3)) {
      var Z6 = Z4.reason;
      if (Z6 != null) {
        var Z7 = D + x.call(G, Z6);
        P.call(G, Z7);
      }
    }
  }
  G.report = function (Z4, Z5) {
    w(D + x.call(this, Z4), Z5);
  };
  e.dataLayer = [];
  e.gtag = function () {
    dataLayer.push(arguments);
  };
  dataLayer.push({
    event: "gtm.js",
    "gtm.start": Date.now(),
    app_name: m,
    app_version: p
  });
  R = `https://www.googletagmanager.com/gtm.js?id=${GtmId}`;
  (A = document.createElement("script")).async = true;
  A.src = R;
  document.head.appendChild(A);
  e.onerror = V;
  e.onunhandledrejection = G;
  var I = location.search;
  if (I.length > 0) {
    I = I.substring(1);
  }
  var j = {};
  for (var N = I.split("&"), F = 0; F < N.length; ++F) {
    var $ = N[F];
    if ($) {
      var L = $.indexOf("=");
      if (L === -1) {
        j[$] = "";
      } else {
        var C = $.substring(0, L);
        var z = $.substring(L + 1);
        j[C] = decodeURIComponent(z);
      }
    }
  }
  var B = 60000;
  var K = 5;
  function q() {
    var Z5 = typeof arguments[0] == "string" ? function (Z6) {
      var Z8 = Z6[2];
      var Z9 = Z6[3];
      var ZZ = {
        S: Z6[0],
        T: Z6[1],
        P: ZI,
        R: ZI
      };
      return ZZ;
      function ZI() {
        if (this.A != null) {
          Z8(this.A);
        } else if (Z9 === undefined) {
          Z8(undefined, this.D);
        } else {
          Z9(this.D);
        }
      }
    }(arguments) : arguments[0];
    if (Z5.T === 2 && Z5.G === undefined) {
      (function (Z6) {
        Z6.I = false;
        var Z8 = {
          S: Z6.S,
          T: 2,
          P: function () {
            Z6.A = this.A;
            if (Z6.P) {
              Z6.P();
            }
          },
          R: function () {
            var Z9 = {
              rbNUx: function (ZO, ZR) {
                return ZO != ZR;
              },
              txDBc: function (ZO, ZR) {
                return ZO(ZR);
              },
              WwepB: function (ZO, ZR) {
                return ZO === ZR;
              },
              BrlGE: function (ZO, ZR, ZK) {
                return ZO(ZR, ZK);
              },
              zdpvE: function (ZO, ZR) {
                return ZO !== ZR;
              },
              MrkOx: function (ZO, ZR) {
                return ZO === ZR;
              },
              CDFHn: function (ZO) {
                return ZO();
              },
              SUDcq: "CJpKz",
              HBpiA: "hDmcL",
              kGGbo: "error",
              qvcNN: function (ZO, ZR) {
                return ZO(ZR);
              }
            };
            var ZZ = this.D;
            var ZI = URL.createObjectURL(ZZ);
            function ZO(ZR) {
              if (ZR.filename === ZI) {
                Z6.A = ZR.error;
                delete O[ZI];
              }
            }
            e.addEventListener("error", ZO);
            O[ZI] = Z6.S;
            var Zd = document.createElement("script");
            Zd.src = ZI;
            Zd.defer = true;
            Zd.onload = function () {
              if (Z9.MrkOx(Z9.SUDcq, Z9.HBpiA)) {
                var ZR;
                if (Z9.zdpvE(0, ZI)) {
                  Zd = 0;
                  if (ZO) {
                    if (!Z9.MrkOx(null, ZR = ZR.parentElement) && !Z9.MrkOx(undefined, ZR)) {
                      ZR.removeChild(ZK);
                    }
                  }
                  if (Zg) {
                    Z9.CDFHn(ZT);
                  }
                }
              } else {
                e.removeEventListener(Z9.kGGbo, ZO);
                document.head.removeChild(Zd);
                URL.revokeObjectURL(ZI);
                Z9.qvcNN(W, Z6);
              }
            };
            document.head.appendChild(Zd);
          },
          G: Z6
        };
        q(Z8);
      })(Z5);
    } else {
      (function (Z6) {
        var Z7 = {
          CdMdo: function (Z9, ZZ) {
            return Z9(ZZ);
          },
          OmxwD: function (Z9, ZZ, ZI, Zd) {
            return Z9(ZZ, ZI, Zd);
          },
          KoRIx: "event",
          UQvIB: "exception",
          KPdXB: function (Z9, ZZ) {
            return Z9 !== ZZ;
          },
          PliBH: "TTieU",
          BxCjT: function (Z9, ZZ) {
            return Z9 === ZZ;
          },
          xrcqY: function (Z9, ZZ) {
            return Z9 == ZZ;
          },
          UMTlI: "string",
          xUyiy: "JgnzF",
          XLDld: "Sjqox",
          HyOJW: function (Z9, ZZ) {
            return Z9 !== ZZ;
          },
          HGKvN: "hbCxY",
          KZNZc: function (Z9, ZZ) {
            return Z9 == ZZ;
          },
          YlSDx: function (Z9, ZZ) {
            return Z9 == ZZ;
          },
          tQmNh: "invaliddata",
          LxEbo: function (Z9, ZZ) {
            return Z9 === ZZ;
          },
          vjdSZ: "kNkGn",
          aUIww: "OONaI",
          GACHq: "onerror",
          dmCZH: function (Z9, ZZ) {
            return Z9(ZZ);
          },
          GJhaP: function (Z9, ZZ) {
            return Z9 / ZZ;
          },
          mumyY: function (Z9, ZZ) {
            return Z9 - ZZ;
          },
          UfGpo: function (Z9, ZZ) {
            return Z9 + ZZ;
          },
          dVQAm: function (Z9, ZZ) {
            return Z9 * ZZ;
          },
          CfQfp: function (Z9, ZZ) {
            return Z9 <= ZZ;
          },
          bTBrw: function (Z9, ZZ) {
            return Z9 * ZZ;
          },
          MHUiI: function (Z9, ZZ) {
            return Z9 + ZZ;
          },
          BuzJF: function (Z9, ZZ) {
            return Z9 * ZZ;
          },
          aoDED: function (Z9, ZZ) {
            return Z9 * ZZ;
          },
          keyKZ: function (Z9, ZZ) {
            return Z9 - ZZ;
          },
          JAgTS: function (Z9, ZZ) {
            return Z9(ZZ);
          },
          uhZJL: function (Z9, ZZ) {
            return Z9 !== ZZ;
          },
          IjsDI: "TbrXE",
          YEyPM: "ontimeout"
        };
        var Z8 = new XMLHttpRequest();
        Z8.open("GET", Z6.S, true);
        try {
          if ("timeout" in Z8) {
            Z8.timeout = B;
          }
        } catch (Z9) {}
        switch (Z6.T) {
          case 1:
            Z8.responseType = "json";
            break;
          case 3:
          case 2:
            Z8.responseType = "blob";
        }
        Z8.onload = function () {
          var ZZ = {
            MEebJ: "resize",
            JvFYm: function (ZI, Zd, ZO) {
              return ZI(Zd, ZO);
            },
            ticuD: function (ZI, Zd, ZO, ZR) {
              return ZI(Zd, ZO, ZR);
            },
            DwWfb: "transform",
            riKWa: "scale(",
            ILaKz: function (ZI, Zd) {
              return ZI / Zd;
            },
            xPxIP: function (ZI) {
              return ZI();
            },
            opNHc: function (ZI, Zd) {
              return ZI === Zd;
            }
          };
          if (Z8.status >= 200 && Z8.status < 300 || Z8.status === 0 && Z8.response) {
            (function (ZI, Zd) {
              var ZO = {
                iFqYs: function (ZR, ZK) {
                  return Z7.CdMdo(ZR, ZK);
                },
                KTqHG: function (ZR, ZK, Zg, ZT) {
                  return Z7.OmxwD(ZR, ZK, Zg, ZT);
                },
                mHYsu: Z7.KoRIx,
                YsaTk: Z7.UQvIB
              };
              if (Z7.KPdXB(Z7.PliBH, Z7.PliBH)) {
                if (Z8) {
                  var ZR = Zd.apply(ZO, arguments);
                  ZR = null;
                  return ZR;
                }
              } else {
                if (Z7.BxCjT(1, ZI.T) && Z7.xrcqY(Z7.UMTlI, typeof Zd)) {
                  try {
                    if (Z7.KPdXB(Z7.xUyiy, Z7.XLDld)) {
                      Zd = JSON.parse(Zd);
                    } else {
                      var ZT;
                      var Zx;
                      var ZL = Z9.pop();
                      if (ZZ.opNHc(null, ZZ)) {
                        ZI.apply(undefined, ZL);
                      } else {
                        ZT = ZL[0];
                        Zx = function (ZD) {
                          if (ZD) {
                            ZL[0] = ZD;
                          }
                          ZT.apply(undefined, ZL);
                        };
                        ZO.getSignedUrl(ZT).then(Zx, function () {
                          return ZO.iFqYs(Zx, "");
                        });
                      }
                    }
                  } catch (ZR) {
                    if (Z7.HyOJW(Z7.HGKvN, Z7.HGKvN)) {
                      var ZK = {
                        description: Z8,
                        fatal: !!Z9
                      };
                      ZO.KTqHG(Z7, ZO.mHYsu, ZO.YsaTk, ZK);
                    } else {
                      ZI.A = ZR;
                      Zd = undefined;
                    }
                  }
                }
                if (Z7.KZNZc(null, ZI.A) && Z7.YlSDx(null, Zd)) {
                  ZI.A = Z7.tQmNh;
                } else {
                  ZI.D = Zd;
                }
              }
            })(Z6, Z8.response);
          } else {
            Z6.A = `${Z8.status}: ${Z8.statusText}`;
          }
          W(Z6);
        };
        Z8.onerror = function () {
          if (Z7.LxEbo(Z7.vjdSZ, Z7.aUIww)) {
            Z9 = Z7.CdMdo(ZZ, ZI);
            Z7.CdMdo(Zd, ZO);
          } else {
            Z6.A = Z7.GACHq;
            Z7.dmCZH(W, Z6);
          }
        };
        Z8.ontimeout = function () {
          if (Z7.uhZJL(Z7.IjsDI, Z7.IjsDI)) {
            if (!Zc) {
              if (!Zb) {
                ZH = Zw;
                Z7.CdMdo(ZU, ZB);
              }
              var ZZ;
              var ZI = Z7.GJhaP(ZP.min(ZX.max(Z7.mumyY(Z7.mumyY(Zy, Zm), Zv), 0), ZJ), I0);
              Z7.CdMdo(I1, I2 = Z7.UfGpo(Z7.dVQAm(Z7.CfQfp(ZZ = ZI, 0.3) ? Z7.bTBrw(ZZ, ZZ) : Z7.MHUiI(Z7.UfGpo(1, Z7.BuzJF(1.25, I3.pow(Z7.mumyY(ZZ, 1), 3))), Z7.aoDED(0.25, I4.pow(Z7.mumyY(ZZ, 1), 2))), Z7.keyKZ(I5, I6)), I7));
              if (Z7.LxEbo(1, ZI)) {
                I8 = true;
                Z7.JAgTS(I9, IZ);
              }
            }
          } else {
            Z6.A = Z7.YEyPM;
            Z7.dmCZH(W, Z6);
          }
        };
        Z8.send();
      })(Z5);
    }
  }
  var U;
  var O = Object.create(null);
  function W(Z4) {
    if (Z4.A != null) {
      var Z6 = Z4.I === undefined ? 0 : Z4.I;
      (function (Z7, Z8, Z9, ZZ) {
        if (Z9 instanceof Error) {
          Z9 = Z9.message;
        }
        var ZI = Z7.split("?")[0];
        var Zd = `load resource fail|G1002|src: ${ZI}|reason: ${Z9}`;
        if (ZZ) {
          Zd += `|retryCount: ${ZZ}`;
        }
        gtag("event", "fault", {
          event_category: "game_shell",
          event_label: Zd
        });
      })(Z4.S, 0, Z4.A, Z6);
      if (Z6 !== false && (Z4.A === "onerror" || Z4.A === "ontimeout") && Z6 < K) {
        Z4.I = ++Z6;
        Z4.A = undefined;
        setTimeout(q, (1 << Z6) * 1000, Z4);
      } else if (Z4.P) {
        Z4.P();
      }
    } else if (Z4.R) {
      Z4.R();
    }
  }
  (U = {})[0] = "const a=10;let b=10;";
  U[1] = "var c=()=>{};";
  U[2] = "function d(a=2){};";
  U[3] = "+function e(...c){}(...[2,3]);";
  U[4] = "var f=1,g=`c${f}d`;";
  U[5] = "var h=0b111,q=0o767;";
  U[6] = "var i='/\\u{20BB7}/u';";
  U[7] = "var j=/s*/y;";
  U[8] = "var k=1,l={k,['x'+k]:2,c(){}};";
  U[9] = "var [z,y=3]=[1];var {e,f=5}={a:1,f:5};";
  U[10] = "class test{}; class test2 extends test{};";
  U[11] = "var o=Symbol('a');";
  U[12] = "for(var t of [1]){};";
  U[13] = "function*p(){ yield;}";
  var Y = U;
  var X = [[e, "Map", "WeakMap", "Set", "WeakSet", "Promise", "Proxy", "Reflect"], [Object, "assign"], [Array.prototype, "findIndex", "find"], [String.prototype, "repeat", "startsWith", "endsWith", "includes"], [Number, "isFinite", "isNaN", "isSafeInteger", "isInteger"], [Math, "trunc", "sign", "cbrt", "log2", "log10"]];
  function J() {
    return function (Z5) {
      var Z7 = {
        bknrt: "[a-zA-Z=]"
      };
      for (var Z8 = Object.keys(Z5), Z9 = 0; Z9 < Z8.length; Z9++) {
        var ZZ = Z5[Z8[Z9]];
        try {
          Function(ZZ);
        } catch (ZI) {
          return false;
        }
      }
      return true;
    }(Y) && function (Z5) {
      var Z7 = true;
      for (var Z8 = 0; Z8 < Z5.length; Z8++) {
        var Z9 = Z5[Z8];
        var ZZ = Z9[0];
        if (ZZ === undefined) {
          Z7 = false;
          break;
        }
        for (var ZI = 1; ZI < Z9.length; ZI++) {
          if (ZZ[Z9[ZI]] === undefined) {
            Z7 = false;
            break;
          }
        }
        if (!Z7) {
          break;
        }
      }
      return Z7;
    }(X);
  }
  var Q = {
    "0": {
      en: "Launch Failed",
      de: "Start fehlgeschlagen",
      es: "La inicialización ha fallado",
      id: "Peluncuran Gagal",
      ja: "起動失敗",
      ko: "시작 실패",
      "pt-br": "Falha no Lançamento",
      ru: "Сбой при запуске",
      sv: "Start misslyckades",
      th: "การโหลดล้มเหลว",
      vi: "Khởi chạy không thành công",
      zh: "未能成功启动"
    },
    "1": {
      en: "Game launch failed, please try again.",
      de: "Spielstart fehlgeschlagen, bitte versuchen Sie es erneut.",
      es: "Error al iniciar el juego, inténtelo de nuevo.",
      id: "Peluncuran permainan gagal, silakan coba lagi.",
      ja: "ゲームのローンチに失敗しました。再度お試しください。",
      ko: "게임을 실행하지 못했습니다. 다시 시도하십시오.",
      "pt-br": "Falha na inicialização do jogo. Tente novamente.",
      ru: "При запуске игры возник сбой. Пожалуйста, повторите попытку позднее.",
      sv: "Spelet laddades inte. Försök igen.",
      th: "การเปิดเกมล้มเหลว กรุณาลองอีกครั้ง",
      vi: "Khởi chạy trò chơi thất bại, vui lòng thử lại.",
      zh: "启动游戏失败，请重试。"
    },
    "2": {
      en: "Sorry, this game cannot be loaded as the current resources are out of date. Please try again later.",
      de: "Dieses Spiel kann leider nicht geladen werden, da die  Ressourcen nicht mehr aktuell sind. Bitte versuchen Sie es später erneut.",
      es: "Lo sentimos, el juego no puede cargarse debido a que los recursos actuales están obsoletos. Inténtalo de nuevo más tarde.",
      id: "Maaf, permainan ini tidak bisa dimuat karena sumber daya yang ada sudah kedaluwarsa. Silakan coba lagi nanti.",
      ja: "申し訳ありません。現在のリソースが古いため、このゲームを読み込むことはできません。後でもう一度お試しください。",
      ko: "죄송합니다. 현재 리소스가 최신이 아니기 때문에 이 게임을 불러올 수 없습니다. 나중에 다시 시도하세요.",
      "pt-br": "Desculpe, este jogo não pode ser carregado porque os recursos atuais estão desatualizados. Tente novamente mais tarde.",
      ru: "К сожалению, данную игру нельзя загрузить из-за устаревших ресурсов. Повторите попытку позже.",
      sv: "Det här spelet kan inte laddas eftersom de nuvarande resurserna är inaktuella. Försök igen senare.",
      th: "ขออภัย ไม่สามารถโหลดเกมนี้ได้เนื่องจากข้อมูลปัจจุบันไม่ใช่ข้อมูลล่าสุด กรุณาลองใหม่อีกครั้งในภายหลัง",
      vi: "Rất tiếc, không thể tải trò chơi này vì các tài nguyên hiện tại đã quá cũ. Vui lòng thử lại sau.",
      zh: "对不起，由于当前资源不是最新版本，因此游戏无法加载，请稍后再试。"
    },
    "3": {
      en: "Reload",
      de: "Neu laden",
      es: "Recargar",
      id: "Muat ulang",
      ja: "リロード",
      ko: "리로드",
      "pt-br": "Recarregar",
      ru: "Перезагрузить",
      sv: "Ladda om",
      th: "รีโหลด",
      vi: "Tải lại",
      zh: "重新加载"
    },
    "4": {
      en: "DIFFERENCE MAKES THE DIFFERENCE",
      de: "DER UNTERSCHIED MACHT DEN UNTERSCHIED",
      es: "LA DIFERENCIA QUE MARCA LA DIFERENCIA",
      id: "PERBEDAAN YANG MEMBUAT PERBEDAAN",
      ja: "違 い が   違 い を 生 み だ す",
      ko: "차 이 를   만 드 는   차 이",
      "pt-br": "SER DIFERENTE FAZ A DIFERENÇA",
      ru: "ИНДИВИДУАЛЬНОСТЬ ИМЕЕТ ЗНАЧЕНИЕ",
      sv: "SKILLNADEN SOM GÖR SKILLNAD",
      th: "ความแตกต่าง ที่เป็นตัวตัดสิน",
      vi: "SỰ KHÁC BIỆT TẠO NÊN SỰ KHÁC BIỆT",
      zh: "不  凡   成   就   非   凡"
    },
    "5": {
      en: "Warning: Insecure Connection",
      de: "Achtung: Unsichere Verbindung",
      es: "Aviso: La Conexión de Red no es Segura",
      id: "Peringatan: Koneksi Tidak Aman",
      ja: "注意：不安定なネットワーク接続",
      ko: "경고: 안전하지 않은 연결",
      "pt-br": "Aviso: Conexão Insegura",
      ru: "Внимание: небезопасное подключение к сети",
      sv: "Varning: Ostabil anslutning",
      th: "คำเตือน: การเชื่อมต่อไม่ปลอดภัย",
      vi: "Cảnh báo: Kết nối không an toàn",
      zh: "警告：连接不安全"
    },
    "6": {
      en: "PG content can only be accessed via a secure (HTTPS) connection. Please visit us through a secure site or contact the site's support team for assistance. Thank you.",
      de: "Der PG-Inhalt kann nur über eine sichere (HTTPS) Verbindung aufgerufen werden. Bitte besuchen Sie uns über eine sichere Website oder wenden Sie sich an den Kundenservice der Website, um Unterstützung zu erhalten. Vielen Dank.",
      es: "Solo es posible acceder al contenido de PG a través de una conexión segura (HTTPS). Visítenos a través de un sitio web seguro o póngase en contacto con el equipo de asistencia del sitio para obtener ayuda. Gracias.",
      id: "Konten PG hanya dapat diakses melalui koneksi aman (HTTPS). Harap kunjungi kami melalui situs aman atau hubungi tim dukungan situs untuk bantuan. Terima kasih.",
      ja: "PGコンテンツには、安全な (HTTPS) 接続経由でのみアクセスできます。安全なサイトからアクセスするか、サイトのサポートチームにご連絡ください。ご利用いただきありがとうございます。",
      ko: "PG 콘텐츠에는 안전한 (HTTPS) 연결을 통해서만 접속할 수 있습니다. 안전한 사이트를 통해 방문하시고 지원이 필요하시면 사이트 지원팀에 문의하세요. 감사합니다.",
      "pt-br": "O conteúdo do PG só pode ser acessado por meio de uma conexão segura (HTTPS). Visite-nos por meio de um site seguro ou entre em contato com a equipe de suporte do site para solicitar assistência. Obrigado.",
      ru: "Контент компании PG можно просматривать только через безопасное (HTTPS) подключение. Просим перейти на другой наш безопасный сайт или связаться со службой поддержки этого сайта для решения проблемы. Спасибо.",
      sv: "Innehåll från PG kan endast kommas åt via en säker (HTTPS) anslutning. Besök oss genom en säker webbplats eller kontakta webbplatsens support-team för hjälp. Tack.",
      th: "สามารถเข้าถึงเนื้อหา PG ได้ผ่านการเชื่อมต่อ (HTTPS) ที่ปลอดภัยเท่านั้น กรุณาเข้าชมผ่านเว็บไซต์ที่ปลอดภัยหรือติดต่อทีมงานสนับสนุนของเว็บไซต์เพื่อขอความช่วยเหลือ ขอขอบคุณ",
      vi: "Chỉ có thể truy cập nội dung PG thông qua kết nối bảo mật (HTTPS). Vui lòng truy cập chúng tôi thông qua một trang web bảo mật hoặc liên hệ với đội ngũ hỗ trợ của trang web để được trợ giúp. Xin cảm ơn.",
      zh: "PG内容仅能通过安全的HTTPS连接访问。请通过安全的网站访问我们，或联系网站支持团队寻求协助，谢谢。"
    }
  };
  var ee = j.language || j.lang || j.l || navigator.language;
  function ne(Z5) {
    var ZZ = Q[Z5];
    if (!ZZ) {
      return `${Z5}`;
    }
    if (ZZ[ee]) {
      return ZZ[ee];
    }
    var ZI = ee.split("-")[0];
    if (ZZ[ZI]) {
      return ZZ[ZI];
    } else {
      return ZZ.en;
    }
  }
  var te;
  var ie = "__sv";
  var ae = j[ie] !== undefined && j[ie] !== "";
  var re = false;
  var oe = [];
  function le() {
    var Z5 = function () {
      var Z6 = {
        pwmKi: function (ZZ, ZI) {
          return ZZ === ZI;
        },
        hVGyc: function (ZZ) {
          return ZZ();
        }
      };
      var Z7;
      var Z8;
      var Z9 = oe.pop();
      if (te === null) {
        q.apply(undefined, Z9);
      } else {
        Z7 = Z9[0];
        Z8 = function (ZZ) {
          if (ZZ) {
            Z9[0] = ZZ;
          }
          q.apply(undefined, Z9);
        };
        te.getSignedUrl(Z7).then(Z8, function () {
          var ZZ = {
            FqmFe: function (ZI, Zd) {
              return ZI < Zd;
            },
            ofXKu: function (ZI, Zd) {
              return ZI < Zd;
            },
            wDQYt: function (ZI, Zd, ZO) {
              return ZI(Zd, ZO);
            },
            NVURj: "stop",
            OcdoL: function (ZI, Zd, ZO, ZR, ZK, Zg, ZT, Zx) {
              return ZI(Zd, ZO, ZR, ZK, Zg, ZT, Zx);
            },
            cgeCh: "offset",
            bYKFu: "stop-color",
            MeTMI: "white",
            NszCe: "stop-opacity"
          };
          return Z8("");
        });
      }
    };
    while (oe.length) {
      Z5();
    }
  }
  var se = ae ? function () {
    oe.push(arguments);
    if (te === undefined) {
      (function () {
        if (!re) {
          re = true;
          var Z6 = j[ie].substring(2, 4) + ".js";
          q(location.origin + "/loader/" + Z6, 2, function (Z7) {
            if (Z7) {
              te = null;
            } else if ((te = window.sign || null) != null) {
              te.setQuery(j[ie]);
            }
            le();
          });
        }
      })();
    } else {
      setTimeout(le, 0);
    }
  } : q;
  function he(Z4) {
    var Z6 = parseInt(Z4);
    if (isNaN(Z6)) {
      return Z4;
    } else {
      return Z6;
    }
  }
  function ce(Z4, Z5) {
    var Z7 = Z4.split(".");
    var Z8 = Z5.split(".");
    for (var Z9 = Math.max(Z7.length, Z8.length), ZZ = 0; ZZ < Z9; ZZ++) {
      var ZI = he(Z7[ZZ] || 0);
      var Zd = he(Z8[ZZ] || 0);
      if (ZI < Zd) {
        return -1;
      }
      if (ZI > Zd) {
        return 1;
      }
    }
    return 0;
  }
  function ue(Z5, Z6, Z7 = 1) {
    var ZZ = Z7 === 0 ? document.createElement(Z6) : document.createElementNS("http://www.w3.org/2000/svg", Z6);
    Z5.appendChild(ZZ);
    return ZZ;
  }
  function ve() {
    var Z7 = [];
    for (var Z8 = 0; Z8 < arguments.length; Z8++) {
      Z7[Z8] = arguments[Z8];
    }
    var Z9 = Z7[0];
    for (var ZZ = 1; ZZ < Z7.length; ZZ += 2) {
      Z9.style[Z7[ZZ]] = Z7[ZZ + 1];
    }
    return Z9;
  }
  function de() {
    var Z7 = [];
    for (var Z8 = 0; Z8 < arguments.length; Z8++) {
      Z7[Z8] = arguments[Z8];
    }
    var Z9 = Z7[0];
    for (var ZZ = 1; ZZ < Z7.length; ZZ += 2) {
      Z9.setAttribute(Z7[ZZ], Z7[ZZ + 1]);
    }
    return Z9;
  }
  function fe(Z4) {
    return requestAnimationFrame(Z4);
  }
  function me(Z5, Z6) {
    if (Z5 / Z6 > 0.5625) {
      return 1920 / Z6;
    } else {
      return 1080 / Z5;
    }
  }
  function pe(Z4, Z5, Z6, Z7, Z8) {
    var ZZ;
    var ZI = Z8 === 0 ? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"112\" height=\"112\"><path d=\"M90.6 9.8h9.8V0h-9.8Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1\"/><path d=\"M0 21.1h9.8v-9.8H0Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1\"/><path d=\"M11.3 111.6h9.8v-9.8h-9.8Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1\"/><path d=\"M68 89h9.7v-9.8H68Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1\"/><path d=\"M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1\"/></svg>" : "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"113\" height=\"112\"><path d=\"M.3 32.4h9.8v-9.8H.3Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1\"/><path d=\"M22.8 9.8h9.7V0h-9.7Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1\"/><path d=\"M11.6 100.3h9.7v-9.8h-9.7Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1\"/><path d=\"M79 111.6h9.7v-9.8h-9.8Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1\"/><path d=\"M101.4 55h9.7v-9.7h-9.7Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1\"/><path d=\"M101.4 89h9.7v-9.8h-9.7Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1\"/><path d=\"M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0\" style=\"stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1\"/></svg>";
    var Zd = ue(Z4, "g");
    de(Zd, "id", `digit-${Z7}`);
    ve(Zd, "filter", `url(#motionFilter-${Z7})`);
    for (var ZO = 0; ZO < 5; ZO++) {
      var ZR = ue(Zd, "g");
      ve(ZR, "transform", `translate(0px, ${-ZO * (Z5 + Z6 * 2)}px)`);
      ZZ = ZI;
      ZR.innerHTML = ZZ;
    }
    return Zd;
  }
  function ge(Z4, Z5) {
    var Z7 = ue(Z4, "filter");
    de(Z7, "id", `motionFilter-${Z5}`, "width", "300%", "x", "-100%");
    var Z8 = ue(Z7, "feGaussianBlur");
    de(Z7, "class", "blurValues", "in", "SourceGraphic", "stdDeviation", "0 0");
    return Z8;
  }
  function Ze(Z4, Z5) {
    var Z6 = {
      XYbqH: "1|2|3|0|4",
      SJDVw: function (ZD, Zn) {
        return ZD(Zn);
      },
      lxoym: function (ZD, Zn) {
        return ZD + Zn;
      },
      KMCII: function (ZD, Zn) {
        return ZD + Zn;
      },
      KGsEG: function (ZD, Zn) {
        return ZD === Zn;
      },
      tJUVD: "$1$2",
      aVPjS: function (ZD, Zn) {
        return ZD >= Zn;
      },
      eXUtI: "0x61",
      eZcBz: function (ZD, Zn) {
        return ZD(Zn);
      },
      zjQzz: "0x41",
      FKyTw: function (ZD, Zn) {
        return ZD % Zn;
      },
      jhyLT: function (ZD, Zn) {
        return ZD - Zn;
      },
      MJxlH: "0x1a",
      BTyVd: function (ZD, Zn) {
        return ZD !== Zn;
      },
      OEZnF: function (ZD, Zn) {
        return ZD > Zn;
      },
      Hrpfj: function (ZD, Zn) {
        return ZD === Zn;
      },
      SLGrX: function (ZD, Zn, Zk) {
        return ZD(Zn, Zk);
      },
      yzNnu: function (ZD) {
        return ZD();
      },
      LjMcN: function (ZD, Zn) {
        return ZD + Zn;
      },
      YhaqD: "jrVoW",
      dysWe: "iDwYB",
      BPDvl: function (ZD, Zn) {
        return ZD < Zn;
      },
      IICpG: "vbVip",
      MTfTr: "stop",
      mpBRW: function (ZD, Zn, Zk, Zt, Zi, ZC, Zu, Zc) {
        return ZD(Zn, Zk, Zt, Zi, ZC, Zu, Zc);
      },
      OtOaa: "offset",
      VglVl: "stop-color",
      NMNdK: "white",
      HKyBI: "stop-opacity",
      VsfWo: "NcUau",
      CzWsP: "linearGradient",
      MHPZx: function (ZD, Zn, Zk, Zt, Zi, ZC, Zu, Zc, Zp, Zj, Zl, ZG) {
        return ZD(Zn, Zk, Zt, Zi, ZC, Zu, Zc, Zp, Zj, Zl, ZG);
      },
      pkObK: "gradient-",
      WeCCT: "100%",
      oznNK: "dvENY",
      MXQLf: "mask",
      oYfLc: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      zLZIh: "mask-",
      VXGYk: function (ZD, Zn, Zk, Zt, Zi, ZC, Zu, Zc, Zp, Zj, Zl, ZG) {
        return ZD(Zn, Zk, Zt, Zi, ZC, Zu, Zc, Zp, Zj, Zl, ZG);
      },
      GFnpJ: "rect",
      rSjWG: "width",
      txdWj: "height",
      BRkbA: "fill",
      QODgb: "url(#gradient-",
      ERBqO: function (ZD, Zn) {
        return ZD < Zn;
      },
      tCWIw: function (ZD, Zn, Zk, Zt, Zi, ZC, Zu, Zc) {
        return ZD(Zn, Zk, Zt, Zi, ZC, Zu, Zc);
      },
      zVhEg: function (ZD, Zn) {
        return ZD === Zn;
      },
      VzaaC: "DCHzT",
      eDVte: "pre",
      VRVOz: "font",
      aaiCN: "20px Roboto, sans-serif",
      dkjGK: "color",
      GoeaG: "#ccc",
      uYUvl: "opacity",
      exWmo: "text-align",
      AEApE: "center",
      IjxRi: "transition",
      KhmdE: "opacity 1.2s ease-in-out",
      psqcQ: "(((.+)+)+)+$",
      udWuT: "BxFvo",
      ZUJZB: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      wmFIr: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      XCHUs: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      ROQfj: "transform",
      yXYah: "scale(1)",
      UjHpc: function (ZD, Zn) {
        return ZD === Zn;
      },
      KnFmS: "FBEth",
      BurbU: "lRoeE",
      ECVNO: function (ZD, Zn, Zk, Zt, Zi, ZC) {
        return ZD(Zn, Zk, Zt, Zi, ZC);
      },
      YibcW: function (ZD, Zn, Zk) {
        return ZD(Zn, Zk);
      },
      MciKU: function (ZD, Zn) {
        return ZD + Zn;
      },
      fYKPj: function (ZD, Zn) {
        return ZD * Zn;
      },
      Xnwjc: function (ZD, Zn) {
        return ZD(Zn);
      },
      FVzSX: function (ZD, Zn) {
        return ZD + Zn;
      },
      cfxcY: function (ZD, Zn) {
        return ZD - Zn;
      },
      rFbPw: function (ZD, Zn) {
        return ZD(Zn);
      },
      jVycx: "0|4|1|2|3",
      GgRAs: "[a-zA-Z=]",
      hiWeP: function (ZD, Zn) {
        return ZD == Zn;
      },
      qPFkj: "object",
      hazzu: function (ZD, Zn) {
        return ZD(Zn);
      },
      ppedf: "0x0",
      NrObW: "0x2",
      JdWQe: "0xa",
      XfSLN: function (ZD, Zn) {
        return ZD == Zn;
      },
      DALaX: function (ZD, Zn) {
        return ZD(Zn);
      },
      CRYJU: function (ZD, Zn) {
        return ZD(Zn);
      },
      qElHV: function (ZD, Zn) {
        return ZD !== Zn;
      },
      vjQFW: "arPOr",
      CppBs: "tujmA",
      xgELX: function (ZD, Zn) {
        return ZD + Zn;
      },
      pAenL: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      yMuPI: "translate(",
      wymqH: function (ZD, Zn) {
        return ZD / Zn;
      },
      KjciU: function (ZD, Zn) {
        return ZD - Zn;
      },
      oCITg: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      FcgOM: "stdDeviation",
      rHIVJ: "FuzgH",
      GyXpE: "ooFUH",
      ejrAm: function (ZD, Zn) {
        return ZD * Zn;
      },
      xKYjo: function (ZD, Zn) {
        return ZD + Zn;
      },
      GvSVX: function (ZD, Zn) {
        return ZD - Zn;
      },
      PezkQ: function (ZD, Zn) {
        return ZD(Zn);
      },
      OrYwF: "nbiSZ",
      rHhxP: function (ZD, Zn) {
        return ZD !== Zn;
      },
      vmyBY: "fZzhd",
      svdMp: "MIBIO",
      rzYjf: function (ZD, Zn) {
        return ZD / Zn;
      },
      FJjbM: function (ZD, Zn) {
        return ZD <= Zn;
      },
      nqugU: function (ZD, Zn) {
        return ZD + Zn;
      },
      KoMoJ: function (ZD, Zn) {
        return ZD * Zn;
      },
      zoOuO: function (ZD, Zn) {
        return ZD - Zn;
      },
      ZwIcb: function (ZD, Zn) {
        return ZD(Zn);
      },
      hVIuh: function (ZD, Zn) {
        return ZD !== Zn;
      },
      BWksd: "pbLkJ",
      kIPAl: "MoBje",
      SkHBX: function (ZD, Zn) {
        return ZD === Zn;
      },
      JTjvR: function (ZD) {
        return ZD();
      },
      lzSFk: function (ZD) {
        return ZD();
      },
      ajDdZ: "translateY(0px)",
      FHTUY: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      Cduca: "translateY(",
      zDJZM: "px) scale(",
      kxYhx: function (ZD, Zn) {
        return ZD !== Zn;
      },
      Iystg: "osGVv",
      YuYmr: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      clAyi: "viewBox",
      DrigO: "0 0 ",
      apqjy: "overflow",
      kWEJi: "hidden",
      fAhdW: "BjtFH",
      dqTcz: "GoYYP",
      ubRYi: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      JWJPO: "http://www.w3.org/2000/svg",
      quFiG: "JnUUw",
      TCagp: "opacity 0.28s ease-in",
      OqkLL: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      sHVHb: "transform 0.5s ease-in-out",
      eIMUj: "opacity 0s linear 0.28s, transform 0.5s ease-in-out",
      ICtZl: function (ZD, Zn) {
        return ZD(Zn);
      },
      WjSgl: "px)",
      zsiVY: function (ZD, Zn) {
        return ZD(Zn);
      },
      Mkzrv: "LtPAo",
      TiwGg: "fkfyl",
      xidWI: function (ZD, Zn, Zk) {
        return ZD(Zn, Zk);
      },
      lOuUQ: function (ZD, Zn) {
        return ZD && Zn;
      },
      EuotV: function (ZD, Zn) {
        return ZD || Zn;
      },
      mbzwu: function (ZD, Zn) {
        return ZD === Zn;
      },
      CwzfD: "nxgnz",
      kJKhl: "jGjCl",
      ypgKN: "oqFYB",
      yjJJN: function (ZD, Zn) {
        return ZD(Zn);
      },
      XFuPm: function (ZD, Zn) {
        return ZD(Zn);
      },
      ujvCP: "wAMpT",
      PLTZH: function (ZD, Zn) {
        return ZD(Zn);
      },
      asHTx: function (ZD, Zn) {
        return ZD - Zn;
      },
      szoqi: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      Wpfxq: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      MAXOx: function (ZD, Zn) {
        return ZD(Zn);
      },
      VImmV: function (ZD, Zn) {
        return ZD === Zn;
      },
      QhtXg: "wmogf",
      dAwXd: function (ZD, Zn) {
        return ZD(Zn);
      },
      qGvYE: function (ZD, Zn) {
        return ZD > Zn;
      },
      lOhPj: "lzJwL",
      IzNnH: "AdEsN",
      GMMET: function (ZD, Zn) {
        return ZD % Zn;
      },
      pWGQN: function (ZD, Zn) {
        return ZD - Zn;
      },
      CnhDW: function (ZD, Zn) {
        return ZD != Zn;
      },
      zbACp: "G1002",
      XEyga: function (ZD, Zn) {
        return ZD == Zn;
      },
      MGnaP: "undefined",
      rOJwe: "G1008",
      ntRJC: function (ZD, Zn) {
        return ZD > Zn;
      },
      XqJKT: "vPxei",
      PWlbl: "eaGCG",
      qzPEP: function (ZD, Zn) {
        return ZD === Zn;
      },
      tiGmB: function (ZD, Zn) {
        return ZD !== Zn;
      },
      CAGgI: function (ZD, Zn) {
        return ZD == Zn;
      },
      FyEUW: function (ZD, Zn) {
        return ZD + Zn;
      },
      cNiEt: ".js",
      wLdtD: function (ZD, Zn, Zk, Zt) {
        return ZD(Zn, Zk, Zt);
      },
      tOOPh: "/loader/",
      ysbVN: function (ZD, Zn) {
        return ZD !== Zn;
      },
      ZLYRu: "CwSSp",
      AMXjS: function (ZD, Zn) {
        return ZD === Zn;
      },
      BdqDM: function (ZD, Zn, Zk) {
        return ZD(Zn, Zk);
      },
      HNwAY: "translate(0px, ",
      HjKVV: function (ZD, Zn) {
        return ZD + Zn;
      },
      GYfeT: function (ZD, Zn) {
        return ZD * Zn;
      },
      sDDNi: "obgIv",
      nxyap: function (ZD, Zn) {
        return ZD === Zn;
      },
      abWaJ: function (ZD, Zn) {
        return ZD === Zn;
      },
      IrJhj: function (ZD) {
        return ZD();
      },
      zmPpL: function (ZD, Zn, Zk, Zt, Zi, ZC, Zu, Zc, Zp, Zj) {
        return ZD(Zn, Zk, Zt, Zi, ZC, Zu, Zc, Zp, Zj);
      },
      lmWbp: "div",
      nwgcw: "display",
      tBdsI: "flex",
      IjsEA: "flex-direction",
      BMrnh: "column",
      nYXOK: "align-items",
      IyVAa: "justify-content",
      vxgNz: "svg",
      wywoL: "url(#mask-",
      TbUmC: function (ZD, Zn, Zk) {
        return ZD(Zn, Zk);
      },
      xQckg: "defs"
    };
    var Z7;
    var Z8;
    var Z9;
    var ZZ = 0;
    var ZI = [];
    var Zd = undefined;
    var ZO = undefined;
    Z6.zmPpL(ve, Z7 = Z6.OqkLL(ue, Z4, Z6.lmWbp, 0), Z6.nwgcw, Z6.tBdsI, Z6.IjsEA, Z6.BMrnh, Z6.nYXOK, Z6.AEApE, Z6.IyVAa, Z6.AEApE);
    var ZR = Z6.FVzSX(Date.now(), "");
    var ZK = Z6.BdqDM(ue, Z7, Z6.vxgNz);
    var Zg = Z9 = Z6.BdqDM(ue, ZK, Z6.vxgNz);
    Z6.FHTUY(de, Z9, Z6.MXQLf, Z6.wywoL.concat(ZR, ")"));
    var ZT = Z6.TbUmC(ue, ZK, Z6.xQckg);
    (function (ZD, Zn) {
      var Zk = {
        BzrgC: Z6.XYbqH,
        VGKer: function (Zi, ZC) {
          return Z6.SJDVw(Zi, ZC);
        },
        cZRSs: function (Zi, ZC) {
          return Z6.SJDVw(Zi, ZC);
        },
        mFmjb: function (Zi, ZC) {
          return Z6.lxoym(Zi, ZC);
        },
        lvwRh: function (Zi, ZC) {
          return Z6.KMCII(Zi, ZC);
        },
        fWdbt: function (Zi, ZC) {
          return Z6.KGsEG(Zi, ZC);
        },
        hAcpd: function (Zi, ZC) {
          return Z6.KMCII(Zi, ZC);
        },
        sLbBg: Z6.tJUVD,
        DCvmW: function (Zi, ZC) {
          return Z6.aVPjS(Zi, ZC);
        },
        QKxCq: function (Zi, ZC) {
          return Z6.SJDVw(Zi, ZC);
        },
        XJPdv: Z6.eXUtI,
        xvvbq: function (Zi, ZC) {
          return Z6.eZcBz(Zi, ZC);
        },
        hExJX: Z6.zjQzz,
        eoSiP: function (Zi, ZC) {
          return Z6.KMCII(Zi, ZC);
        },
        DvvYP: function (Zi, ZC) {
          return Z6.FKyTw(Zi, ZC);
        },
        tbpqd: function (Zi, ZC) {
          return Z6.jhyLT(Zi, ZC);
        },
        BHtdi: function (Zi, ZC) {
          return Z6.jhyLT(Zi, ZC);
        },
        ZCvQC: function (Zi, ZC) {
          return Z6.eZcBz(Zi, ZC);
        },
        JjmVK: Z6.MJxlH,
        ZoYIO: function (Zi, ZC) {
          return Z6.BTyVd(Zi, ZC);
        },
        HUoSM: function (Zi, ZC) {
          return Z6.OEZnF(Zi, ZC);
        },
        KhGyM: function (Zi, ZC) {
          return Z6.jhyLT(Zi, ZC);
        },
        zXbxf: function (Zi, ZC) {
          return Z6.Hrpfj(Zi, ZC);
        },
        JcnIT: function (Zi, ZC, Zu) {
          return Z6.SLGrX(Zi, ZC, Zu);
        },
        dWrFd: function (Zi) {
          return Z6.yzNnu(Zi);
        },
        DDRwI: function (Zi, ZC) {
          return Z6.SJDVw(Zi, ZC);
        },
        LnPIt: function (Zi, ZC) {
          return Z6.LjMcN(Zi, ZC);
        },
        MAkUo: Z6.YhaqD,
        XBMFN: Z6.dysWe,
        QEmPS: function (Zi, ZC) {
          return Z6.BPDvl(Zi, ZC);
        },
        HKptW: function (Zi, ZC) {
          return Z6.BTyVd(Zi, ZC);
        },
        RTQow: Z6.IICpG,
        hZrDJ: function (Zi, ZC, Zu) {
          return Z6.SLGrX(Zi, ZC, Zu);
        },
        rJnYq: Z6.MTfTr,
        zThOq: function (Zi, ZC, Zu, Zc, Zp, Zj, Zl, ZG) {
          return Z6.mpBRW(Zi, ZC, Zu, Zc, Zp, Zj, Zl, ZG);
        },
        HeKYs: Z6.OtOaa,
        WBQxk: Z6.VglVl,
        Yjpjh: Z6.NMNdK,
        tnjjF: Z6.HKyBI
      };
      if (Z6.BTyVd(Z6.VsfWo, Z6.VsfWo)) {
        var Zi = Zk.BzrgC.split("|");
        var ZC = 0;
        while (true) {
          switch (Zi[ZC++]) {
            case "0":
              if (Zj) {
                try {
                  Zp = Zk.VGKer(Zj, Zp);
                } catch (Zl) {
                  Zk.cZRSs(ZO, Zk.mFmjb(Zl, ""));
                }
              }
              continue;
            case "1":
              var Zu = Zk.lvwRh(Z8, "");
              var Zc = Zk.mFmjb(Z9.stack || "", "");
              var Zp = Zu;
              continue;
            case "2":
              if (Zc) {
                if (Zk.fWdbt(0, Zc.indexOf(Zu))) {
                  Zp = Zc;
                } else {
                  Zp += Zk.hAcpd("\n", Zc);
                }
              }
              continue;
            case "3":
              var Zj = this.onFormat || ZZ.onGAReceiveError;
              continue;
            case "4":
              return Zp.replace(/https?:\/\/[^/]+([0-9A-Za-z/._-]+)\S*(:[0-9]+:[0-9]+)/g, Zk.sLbBg).replace(/https?:\/\/[^/]+/g, "");
          }
          break;
        }
      } else {
        var Zt = Z6.SLGrX(ue, ZD, Z6.CzWsP);
        Z6.MHPZx(de, Zt, "id", Z6.pkObK.concat(Zn), "x1", "0%", "y1", "0%", "x2", "0%", "y2", Z6.WeCCT);
        (function () {
          var Zi = {
            XAJre: function (Zl, ZG) {
              return Zk.ZoYIO(Zl, ZG);
            },
            iWyUd: function (Zl, ZG) {
              return Zk.HUoSM(Zl, ZG);
            },
            HwoJE: function (Zl, ZG) {
              return Zk.KhGyM(Zl, ZG);
            },
            HPhKe: function (Zl, ZG) {
              return Zk.fWdbt(Zl, ZG);
            },
            apcil: function (Zl, ZG) {
              return Zk.ZCvQC(Zl, ZG);
            },
            NxKdh: function (Zl, ZG) {
              return Zk.zXbxf(Zl, ZG);
            },
            sEStJ: function (Zl, ZG, Za) {
              return Zk.JcnIT(Zl, ZG, Za);
            },
            HDPpY: function (Zl) {
              return Zk.dWrFd(Zl);
            },
            eamHM: function (Zl, ZG) {
              return Zk.DDRwI(Zl, ZG);
            },
            cMzRp: function (Zl, ZG) {
              return Zk.LnPIt(Zl, ZG);
            },
            EZNSo: function (Zl, ZG) {
              return Zk.HUoSM(Zl, ZG);
            }
          };
          if (Zk.ZoYIO(Zk.MAkUo, Zk.XBMFN)) {
            var ZC = [];
            for (var Zu = 0; Zk.QEmPS(Zu, arguments.length); Zu++) {
              ZC[Zu] = arguments[Zu];
            }
            for (var Zc = 0; Zk.QEmPS(Zc, ZC.length); Zc++) {
              if (Zk.HKptW(Zk.RTQow, Zk.RTQow)) {
                var Zl = Zt.now();
                if (Zi.XAJre(Zi, ZC) || Zi.iWyUd(Zi.HwoJE(Zl, Zu), 1000)) {
                  Zc = Zl;
                  Zp = Zj;
                  Zl = 0;
                } else {
                  ZG++;
                }
                if (Zi.HPhKe(0, Za)) {
                  Zi.apcil(ZV, ZQ);
                } else if (Zi.NxKdh(5, ZN)) {
                  Zi.sEStJ(ZA, Zo, 1);
                  var ZG = this.onFrequent || ZM.onGAFrequentError;
                  try {
                    if (ZG) {
                      Zi.HDPpY(ZG);
                    }
                  } catch (Za) {
                    Zi.eamHM(Zr, Zi.cMzRp(Za, ""));
                  }
                } else if (Zi.EZNSo(Zz, 5)) {
                  Zf = Zl;
                }
              } else {
                var Zp = Zk.hZrDJ(ue, Zt, Zk.rJnYq);
                var Zj = ZC[Zc];
                Zk.zThOq(de, Zp, Zk.HeKYs, Zj[0], Zk.WBQxk, Zk.Yjpjh, Zk.tnjjF, Zj[1]);
              }
            }
          } else {
            if (Zk.fWdbt("=", ZO)) {
              return ".";
            }
            var Zl = ZR.charCodeAt(0);
            var ZG = Zk.DCvmW(Zl, Zk.QKxCq(ZK, Zk.XJPdv)) ? Zk.xvvbq(Zg, Zk.XJPdv) : Zk.VGKer(ZT, Zk.hExJX);
            var Za = Zk.eoSiP(Zk.DvvYP(Zk.hAcpd(Zk.tbpqd(Zk.BHtdi(Zl, ZG), Zx), Zk.ZCvQC(ZL, Zk.JjmVK)), Zk.xvvbq(ZD, Zk.JjmVK)), ZG);
            return Zn.fromCharCode(Za);
          }
        })([0, 0], [0.2, 1], [0.8, 1], [1, 0]);
      }
    })(ZT, ZR);
    (function (ZD, Zn) {
      var Zk = {
        vvHPH: function (Zi, ZC) {
          return Z6.Hrpfj(Zi, ZC);
        }
      };
      if (Z6.KGsEG(Z6.oznNK, Z6.oznNK)) {
        var Zt = Z6.SLGrX(ue, ZD, Z6.MXQLf);
        Z6.oYfLc(de, Zt, "id", Z6.zLZIh.concat(Zn));
        Z6.VXGYk(de, Z6.SLGrX(ue, Zt, Z6.GFnpJ), "x", 0, "y", 0, Z6.rSjWG, Z6.WeCCT, Z6.txdWj, Z6.WeCCT, Z6.BRkbA, Z6.QODgb.concat(Zn, ")"));
      } else if (Zk.vvHPH(1, Z8)) {
        Z9 = 2;
        ZZ = ZI;
      }
    })(ZT, ZR);
    Z8 = function (ZD, Zn) {
      var Zk = {
        vkmTC: function (Zu, Zc) {
          return Z6.BPDvl(Zu, Zc);
        },
        ZGCib: function (Zu, Zc) {
          return Z6.ERBqO(Zu, Zc);
        },
        WPklt: function (Zu, Zc, Zp) {
          return Z6.SLGrX(Zu, Zc, Zp);
        },
        WhcGY: Z6.MTfTr,
        Xxxns: function (Zu, Zc, Zp, Zj, Zl, ZG, Za, ZV) {
          return Z6.tCWIw(Zu, Zc, Zp, Zj, Zl, ZG, Za, ZV);
        },
        sardC: Z6.OtOaa,
        VdKcq: Z6.VglVl,
        WpLTH: Z6.NMNdK,
        yGvnx: Z6.HKyBI
      };
      if (Z6.zVhEg(Z6.VzaaC, Z6.VzaaC)) {
        var Zt;
        var Zi;
        Zt = Zn;
        (Zi = Z6.oYfLc(ue, ZD, Z6.eDVte, 0)).textContent = Zt;
        var ZC = Zi;
        Z6.MHPZx(ve, ZC, Z6.VRVOz, Z6.aaiCN, Z6.dkjGK, Z6.GoeaG, Z6.uYUvl, "0", Z6.exWmo, Z6.AEApE, Z6.IjxRi, Z6.KhmdE);
        return ZC;
      } else {
        var Zu = Z6.SLGrX(ZZ, ZI, Z6.CzWsP);
        Z6.MHPZx(Zd, Zu, "id", Z6.pkObK.concat(ZO), "x1", "0%", "y1", "0%", "x2", "0%", "y2", Z6.WeCCT);
        (function () {
          var Zc = [];
          for (var Zp = 0; Zk.vkmTC(Zp, arguments.length); Zp++) {
            Zc[Zp] = arguments[Zp];
          }
          for (var Zj = 0; Zk.ZGCib(Zj, Zc.length); Zj++) {
            var Zl = Zk.WPklt(Zx, Zu, Zk.WhcGY);
            var ZG = Zc[Zj];
            Zk.Xxxns(ZL, Zl, Zk.sardC, ZG[0], Zk.VdKcq, Zk.WpLTH, Zk.yGvnx, ZG[1]);
          }
        })([0, 0], [0.2, 1], [0.8, 1], [1, 0]);
      }
    }(Z7, Z5);
    Z6.PLTZH(fe, function () {
      var ZD = {
        uTGwK: Z6.psqcQ
      };
      var Zn = ZD;
      if (Z6.BTyVd(Z6.udWuT, Z6.udWuT)) {
        return Z6.toString().search(UCUVvY.uTGwK).toString().constructor(Z7).search(UCUVvY.uTGwK);
      } else {
        Z6.ZUJZB(ve, Z8, Z6.uYUvl, "1");
      }
    });
    var Zx = ["1", "1"].map(function (ZD, Zn) {
      if (Z6.UjHpc(Z6.KnFmS, Z6.BurbU)) {
        var Zt = ZI;
        Zd = undefined;
        if (Zt) {
          Zt.remove();
        }
        ZO.k();
        var Zi = ZR.M();
        var ZC = ZK.H();
        Z6.wmFIr(Zg, Zi, Z6.uYUvl, "1");
        Z6.XCHUs(ZT, ZC, Z6.ROQfj, Z6.yXYah);
      } else {
        var Zk = `${Zn}-${ZR}`;
        return {
          i: Z6.ECVNO(pe, Zg, 112, 20, Zk, Zn),
          t: Z6.YibcW(ge, ZT, Zk),
          o: +ZD,
          h: 0,
          l: {
            x: Z6.MciKU(Z6.fYKPj(137, Zn), 12.5),
            y: 20
          }
        };
      }
    });
    function ZL() {
      var ZD = {
        zCiev: function (Zn, Zk) {
          return Z6.PezkQ(Zn, Zk);
        },
        tzUDs: function (Zn, Zk) {
          return Z6.BTyVd(Zn, Zk);
        },
        WSSwO: Z6.OrYwF,
        qRhAt: function (Zn, Zk) {
          return Z6.rHhxP(Zn, Zk);
        },
        ohTNs: Z6.vmyBY,
        DWpeS: Z6.svdMp,
        XgfQH: function (Zn, Zk) {
          return Z6.rzYjf(Zn, Zk);
        },
        eIrLg: function (Zn, Zk) {
          return Z6.cfxcY(Zn, Zk);
        },
        gcRkC: function (Zn, Zk) {
          return Z6.PezkQ(Zn, Zk);
        },
        SSxNG: function (Zn, Zk) {
          return Z6.xKYjo(Zn, Zk);
        },
        eYmQk: function (Zn, Zk) {
          return Z6.ejrAm(Zn, Zk);
        },
        pqjvS: function (Zn, Zk) {
          return Z6.FJjbM(Zn, Zk);
        },
        bMXRE: function (Zn, Zk) {
          return Z6.fYKPj(Zn, Zk);
        },
        UWRkj: function (Zn, Zk) {
          return Z6.nqugU(Zn, Zk);
        },
        tYzxp: function (Zn, Zk) {
          return Z6.KoMoJ(Zn, Zk);
        },
        ixcwF: function (Zn, Zk) {
          return Z6.ejrAm(Zn, Zk);
        },
        qNETs: function (Zn, Zk) {
          return Z6.zoOuO(Zn, Zk);
        },
        siCbc: function (Zn, Zk) {
          return Z6.UjHpc(Zn, Zk);
        },
        PvuCs: function (Zn, Zk) {
          return Z6.ZwIcb(Zn, Zk);
        }
      };
      if (Z6.hVIuh(Z6.BWksd, Z6.kIPAl)) {
        if (Z6.SkHBX(2, ZZ)) {
          if (Zd) {
            Z6.JTjvR(Zd);
          }
          if (ZO) {
            Z6.lzSFk(ZO);
          }
          ZZ = 3;
        } else if (Z6.zVhEg(1, ZZ)) {
          ZI.length = 0;
          Zx.forEach(function (Zn, Zk) {
            var Zt = {
              xgYHb: function (Zq, ZS) {
                return Z6.zVhEg(Zq, ZS);
              },
              RUwJO: function (Zq, ZS) {
                return Z6.aVPjS(Zq, ZS);
              },
              EEcuu: function (Zq, ZS) {
                return Z6.SJDVw(Zq, ZS);
              },
              dgvPW: Z6.eXUtI,
              SKFUK: function (Zq, ZS) {
                return Z6.Xnwjc(Zq, ZS);
              },
              NoiWn: Z6.zjQzz,
              YgoBK: function (Zq, ZS) {
                return Z6.FVzSX(Zq, ZS);
              },
              VVCss: function (Zq, ZS) {
                return Z6.FKyTw(Zq, ZS);
              },
              dgdPF: function (Zq, ZS) {
                return Z6.KMCII(Zq, ZS);
              },
              YCCTf: function (Zq, ZS) {
                return Z6.cfxcY(Zq, ZS);
              },
              FSDwu: function (Zq, ZS) {
                return Z6.rFbPw(Zq, ZS);
              },
              HrsVe: Z6.MJxlH,
              vlKke: function (Zq, ZS) {
                return Z6.Xnwjc(Zq, ZS);
              },
              nJwGv: Z6.jVycx,
              cvZci: Z6.GgRAs,
              FeKFq: function (Zq, ZS) {
                return Z6.hiWeP(Zq, ZS);
              },
              JrqAE: Z6.qPFkj,
              esGcZ: function (Zq, ZS, Zz) {
                return Z6.YibcW(Zq, ZS, Zz);
              },
              lVXkM: function (Zq, ZS) {
                return Z6.hazzu(Zq, ZS);
              },
              klEhf: Z6.ppedf,
              OqYVG: Z6.NrObW,
              lUWgS: function (Zq, ZS) {
                return Z6.eZcBz(Zq, ZS);
              },
              hcFbm: Z6.JdWQe,
              aZPxf: function (Zq, ZS) {
                return Z6.XfSLN(Zq, ZS);
              },
              imwsl: function (Zq, ZS) {
                return Z6.DALaX(Zq, ZS);
              },
              uebrM: function (Zq, ZS) {
                return Z6.CRYJU(Zq, ZS);
              },
              JPJwR: function (Zq, ZS) {
                return Z6.qElHV(Zq, ZS);
              },
              sEXVY: Z6.vjQFW,
              ZdtQv: Z6.CppBs,
              lcuYg: function (Zq, ZS) {
                return Z6.xgELX(Zq, ZS);
              },
              JlKbl: function (Zq, ZS) {
                return Z6.FKyTw(Zq, ZS);
              },
              vEiUO: function (Zq, ZS, Zz, Zf) {
                return Z6.pAenL(Zq, ZS, Zz, Zf);
              },
              wSpEG: Z6.ROQfj,
              KymuN: Z6.yMuPI,
              miKan: function (Zq, ZS) {
                return Z6.wymqH(Zq, ZS);
              },
              uduxx: function (Zq, ZS) {
                return Z6.jhyLT(Zq, ZS);
              },
              jmjDs: function (Zq, ZS) {
                return Z6.cfxcY(Zq, ZS);
              },
              XFkSP: function (Zq, ZS) {
                return Z6.KjciU(Zq, ZS);
              },
              VSMIR: function (Zq, ZS, Zz, Zf) {
                return Z6.oCITg(Zq, ZS, Zz, Zf);
              },
              pjGEk: Z6.FcgOM,
              CNWoN: function (Zq, ZS, Zz, Zf) {
                return Z6.XCHUs(Zq, ZS, Zz, Zf);
              },
              NCTrC: Z6.uYUvl,
              zZRuM: Z6.rHIVJ,
              ycoMN: function (Zq) {
                return Z6.yzNnu(Zq);
              },
              PIuWb: function (Zq, ZS) {
                return Z6.zVhEg(Zq, ZS);
              }
            };
            if (Z6.qElHV(Z6.GyXpE, Z6.GyXpE)) {
              var Zq = Zt.nJwGv.split("|");
              var ZS = 0;
              while (true) {
                switch (Zq[ZS++]) {
                  case "0":
                    var Zz = {
                      YjXdn: Zt.cvZci
                    };
                    var Zf = Zz;
                    continue;
                  case "1":
                    (function (ZH) {
                      ZH.kReplacer = Zf.YjXdn;
                    })(Zb ||= {});
                    continue;
                  case "2":
                    var ZA = Zt.FeKFq(Zt.JrqAE, typeof ZR) ? ZK : Zg;
                    var Zo = ZA.parseInt;
                    var ZM = ZA.isNaN;
                    var Zs = ZA.String;
                    var ZE = ZA.RegExp;
                    var Zr = ZA.Number;
                    var ZF = Zt.esGcZ(ZE, Zb.kReplacer, "g");
                    var Zh = Zt.esGcZ(Zo, Zt.FeKFq(null, ZT) ? undefined : Zx.substring(Zt.lVXkM(Zr, Zt.klEhf), Zt.SKFUK(Zr, Zt.OqYVG)), Zt.lUWgS(Zr, Zt.hcFbm));
                    continue;
                  case "3":
                    if (Zt.EEcuu(ZM, Zh) && (Zt.FeKFq(null, ZL) ? undefined : ZD.includes("."))) {
                      return Zn;
                    } else if (Zt.aZPxf(null, Zk)) {
                      return undefined;
                    } else {
                      return Zt.substring(Zt.imwsl(Zr, Zt.OqYVG)).replace(ZF, function (ZH) {
                        if (Zt.xgYHb("=", ZH)) {
                          return ".";
                        }
                        var Zw = ZH.charCodeAt(0);
                        var ZU = Zt.RUwJO(Zw, Zt.EEcuu(Zr, Zt.dgvPW)) ? Zt.SKFUK(Zr, Zt.dgvPW) : Zt.EEcuu(Zr, Zt.NoiWn);
                        var ZB = Zt.YgoBK(Zt.VVCss(Zt.dgdPF(Zt.YCCTf(Zt.YCCTf(Zw, ZU), Zh), Zt.FSDwu(Zr, Zt.HrsVe)), Zt.vlKke(Zr, Zt.HrsVe)), ZU);
                        return Zs.fromCharCode(ZB);
                      });
                    }
                  case "4":
                    var Zb;
                    continue;
                }
                break;
              }
            } else {
              var Zi;
              var ZC;
              var Zu;
              var Zc;
              var Zp;
              var Zj;
              var Zl;
              var ZG;
              var Za;
              var ZV;
              var ZQ;
              var ZN = Z6.fYKPj(152, Zn.h);
              var ZY = Z6.ejrAm(152, Z6.xKYjo(75, Zn.o));
              Zi = {
                v: ZN,
                _to: ZY,
                m: 1200,
                u: Z6.LjMcN(Z6.fYKPj(200, Z6.cfxcY(Z6.GvSVX(Zx.length, 1), Zk)), 400),
                Z: function () {},
                p: function (Zq) {
                  var ZS = {
                    KFfSS: function (ZA, Zo) {
                      return Zt.uebrM(ZA, Zo);
                    }
                  };
                  if (Zt.JPJwR(Zt.sEXVY, Zt.ZdtQv)) {
                    Zn.l.y = Zt.lcuYg(20, Zt.JlKbl(Zq, 608));
                    Zt.vEiUO(de, Zn.i, Zt.wSpEG, Zt.KymuN.concat(Zn.l.x, ", ").concat(Zn.l.y, ")"));
                    var Zz = Zt.miKan(Zt.dgdPF(ZN, ZY), 2);
                    var Zf = Zt.miKan(+Math.abs(Zt.uduxx(Math.abs(Zt.jmjDs(Math.abs(Zt.XFkSP(Zq, Zz)), Zz)), ZN)), 100).toFixed(1);
                    Zt.VSMIR(de, Zn.t, Zt.pjGEk, `0 ${Zf}`);
                  } else {
                    return ZS.KFfSS(Z6, Z7);
                  }
                },
                g: function () {
                  var Zq = {
                    lCBGD: function (ZS, Zz, Zf, ZA) {
                      return Zt.CNWoN(ZS, Zz, Zf, ZA);
                    },
                    jxOLV: Zt.NCTrC
                  };
                  if (Zt.xgYHb(Zt.zZRuM, Zt.zZRuM)) {
                    if (Zt.xgYHb(0, Zk)) {
                      Zt.ycoMN(ZL);
                    }
                  } else {
                    Zq.lCBGD(Z6, Z7, Zq.jxOLV, "1");
                  }
                }
              };
              Zc = Zi._to;
              Zp = Zi.m;
              Zj = Zi.u;
              Zl = Zi.Z;
              ZG = Zi.p;
              Za = Zi.g;
              ZV = Zu = Zi.v;
              ZQ = false;
              function ZW(Zq) {
                var ZS = {
                  EgerU: function (ZA, Zo) {
                    return ZD.zCiev(ZA, Zo);
                  }
                };
                if (ZD.tzUDs(ZD.WSSwO, ZD.WSSwO)) {
                  if (Zt.PIuWb(ZZ.filename, ZI)) {
                    Zd.A = ZO.error;
                    delete ZR[ZK];
                  }
                } else if (!ZQ) {
                  if (ZD.qRhAt(ZD.ohTNs, ZD.DWpeS)) {
                    if (!ZC) {
                      ZC = Zq;
                      ZD.zCiev(Zl, ZV);
                    }
                    var Zz;
                    var Zf = ZD.XgfQH(Math.min(Math.max(ZD.eIrLg(ZD.eIrLg(Zq, ZC), Zj), 0), Zp), Zp);
                    ZD.gcRkC(ZG, ZV = ZD.SSxNG(ZD.eYmQk(ZD.pqjvS(Zz = Zf, 0.3) ? ZD.bMXRE(Zz, Zz) : ZD.UWRkj(ZD.UWRkj(1, ZD.tYzxp(1.25, Math.pow(ZD.eIrLg(Zz, 1), 3))), ZD.ixcwF(0.25, Math.pow(ZD.eIrLg(Zz, 1), 2))), ZD.qNETs(Zc, Zu)), Zu));
                    if (ZD.siCbc(1, Zf)) {
                      ZQ = true;
                      ZD.PvuCs(Za, ZV);
                    }
                  } else {
                    ZS.EgerU(cancelAnimationFrame, Z5);
                  }
                }
              }
              ZI.push(ZW);
            }
          });
        }
      } else {
        if (Z9) {
          ZZ[0] = ZI;
        }
        Zd.apply(undefined, ZO);
      }
    }
    (function (ZD, Zn) {
      var Zk = {
        zZypc: function (Zt, Zi, ZC, Zu, Zc, Zp) {
          return Z6.ECVNO(Zt, Zi, ZC, Zu, Zc, Zp);
        },
        NkSRk: Z6.uYUvl,
        BdlLb: Z6.ROQfj,
        qhYjE: Z6.ajDdZ,
        GKlbF: function (Zt, Zi, ZC, Zu) {
          return Z6.FHTUY(Zt, Zi, ZC, Zu);
        },
        cFVpW: Z6.Cduca,
        tLQHs: Z6.zDJZM
      };
      if (Z6.kxYhx(Z6.Iystg, Z6.Iystg)) {
        Zk.zZypc(ZI, Zd, Zk.NkSRk, "1", Zk.BdlLb, Zk.qhYjE);
        Zk.GKlbF(ZO, ZR, Zk.NkSRk, "0");
        Zk.GKlbF(ZK, Zg, Zk.BdlLb, Zk.cFVpW.concat(ZT, Zk.tLQHs).concat(0.7, ")"));
      } else {
        Z6.YuYmr(de, ZD, Z6.clAyi, Z6.DrigO.concat(Zn, " ").concat(152));
        Z6.ECVNO(ve, ZD, Z6.apqjy, Z6.kWEJi, Z6.txdWj, 152);
      }
    })(ZK, Z6.GYfeT(137, Zx.length));
    Zx.forEach(function (ZD) {
      if (Z6.qElHV(Z6.fAhdW, Z6.dqTcz)) {
        Z6.ubRYi(de, ZD.i, Z6.ROQfj, Z6.yMuPI.concat(ZD.l.x, ", ").concat(ZD.l.y, ")"));
      } else {
        Z5.push(arguments);
      }
    });
    return {
      H: function () {
        var ZD = {
          NuAav: function (Zn, Zk) {
            return Z6.UjHpc(Zn, Zk);
          },
          XRxgt: Z6.JWJPO
        };
        if (Z6.hVIuh(Z6.quFiG, Z6.quFiG)) {
          if (ZD.NuAav(undefined, Zd)) {
            ZO = 1;
          }
          var Zn = ZD.NuAav(0, ZR) ? ZK.createElement(Zg) : ZT.createElementNS(ZD.XRxgt, Zx);
          ZL.appendChild(Zn);
          return Zn;
        } else {
          return Z7;
        }
      },
      M: function () {
        var ZD = {
          HXytQ: function (Zn, Zk, Zt, Zi, ZC, Zu) {
            return Z6.ECVNO(Zn, Zk, Zt, Zi, ZC, Zu);
          },
          gbRjx: Z6.uYUvl,
          KgOzM: Z6.ROQfj,
          YTKcU: Z6.ajDdZ,
          FDYrl: function (Zn, Zk, Zt, Zi) {
            return Z6.ubRYi(Zn, Zk, Zt, Zi);
          },
          Hthxq: Z6.Cduca,
          yuxTz: Z6.zDJZM,
          qNxTK: function (Zn, Zk) {
            return Z6.KMCII(Zn, Zk);
          },
          jVLKd: function (Zn, Zk) {
            return Z6.KjciU(Zn, Zk);
          },
          sVATg: function (Zn, Zk, Zt, Zi) {
            return Z6.wmFIr(Zn, Zk, Zt, Zi);
          },
          ChPPA: Z6.IjxRi,
          wRlqE: Z6.TCagp,
          LlrhD: function (Zn, Zk, Zt, Zi) {
            return Z6.OqkLL(Zn, Zk, Zt, Zi);
          },
          jZakj: Z6.sHVHb,
          YTHxu: Z6.eIMUj,
          FYWVL: function (Zn, Zk) {
            return Z6.ICtZl(Zn, Zk);
          },
          EaMcy: Z6.WjSgl,
          PzWaF: function (Zn, Zk) {
            return Z6.zsiVY(Zn, Zk);
          }
        };
        if (Z6.KGsEG(Z6.Mkzrv, Z6.TiwGg)) {
          var Zn = {
            NGMEe: function (Zt, Zi, ZC, Zu, Zc, Zp) {
              return ZD.HXytQ(Zt, Zi, ZC, Zu, Zc, Zp);
            },
            KDdAc: ZD.gbRjx,
            NyJwt: ZD.KgOzM,
            IiRFb: ZD.YTKcU,
            CJUVZ: function (Zt, Zi, ZC, Zu) {
              return ZD.FDYrl(Zt, Zi, ZC, Zu);
            },
            XBndL: ZD.Hthxq,
            AmByF: ZD.yuxTz,
            LNVzJ: function (Zt, Zi) {
              return ZD.qNxTK(Zt, Zi);
            },
            lmrLW: function (Zt, Zi) {
              return ZD.jVLKd(Zt, Zi);
            },
            ZJjGK: function (Zt, Zi, ZC, Zu) {
              return ZD.sVATg(Zt, Zi, ZC, Zu);
            },
            fDzDe: ZD.ChPPA,
            WgNLS: ZD.wRlqE,
            xakQR: function (Zt, Zi, ZC, Zu) {
              return ZD.LlrhD(Zt, Zi, ZC, Zu);
            },
            opxop: ZD.jZakj,
            PEcLq: ZD.YTHxu,
            rkFKK: function (Zt, Zi) {
              return ZD.FYWVL(Zt, Zi);
            },
            NQskT: function (Zt, Zi, ZC, Zu, Zc, Zp) {
              return ZD.HXytQ(Zt, Zi, ZC, Zu, Zc, Zp);
            },
            pucmO: ZD.EaMcy
          };
          function Zk() {
            var ZX = {
              eJvFW: function (ZJ, I0, I1, I2, I3, I4) {
                return Zn.NGMEe(ZJ, I0, I1, I2, I3, I4);
              },
              QErQP: Zn.KDdAc,
              zVPCs: Zn.NyJwt,
              QRLwl: Zn.IiRFb,
              eUwjX: function (ZJ, I0, I1, I2) {
                return Zn.CJUVZ(ZJ, I0, I1, I2);
              },
              Tokhv: Zn.XBndL,
              vhvsq: Zn.AmByF
            };
            var Zy = Zk.M();
            var Zm = Zf.H();
            var Zv = Zn.LNVzJ(Zn.lmrLW(ZA.offsetTop, Zo.V()), 2);
            Zn.ZJjGK(ZM, Zy, Zn.fDzDe, Zn.WgNLS);
            Zn.xakQR(Zs, Zm, Zn.fDzDe, Zn.opxop);
            Zn.xakQR(ZE, Zr, Zn.fDzDe, Zn.PEcLq);
            Zn.rkFKK(ZF, function () {
              ZX.eJvFW(Zy, Zm, ZX.QErQP, "1", ZX.zVPCs, ZX.QRLwl);
              ZX.eUwjX(Zv, Zy, ZX.QErQP, "0");
              ZX.eUwjX(ZX, Zm, ZX.zVPCs, ZX.Tokhv.concat(Zv, ZX.vhvsq).concat(0.7, ")"));
            });
          }
          ZD.PzWaF(ZN, function () {
            Zn.NQskT(Zk, Zf, Zn.KDdAc, "0", Zn.NyJwt, Zn.XBndL.concat(ZA.offsetHeight, Zn.pucmO));
            Zo._(Zk);
          });
        } else {
          return Z8;
        }
      },
      V: function () {
        var ZD = {
          wbKov: function (Zn, Zk, Zt) {
            return Z6.xidWI(Zn, Zk, Zt);
          },
          loiAR: function (Zn, Zk) {
            return Z6.qElHV(Zn, Zk);
          },
          NEGuJ: function (Zn, Zk) {
            return Z6.lOuUQ(Zn, Zk);
          },
          qywRH: function (Zn, Zk) {
            return Z6.EuotV(Zn, Zk);
          },
          cVzyk: function (Zn, Zk, Zt) {
            return Z6.YibcW(Zn, Zk, Zt);
          }
        };
        if (Z6.mbzwu(Z6.CwzfD, Z6.CwzfD)) {
          return 152;
        } else {
          var Zn = Z8.split("-");
          var Zk = Z9.split("-");
          var Zt = ZD.wbKov(ZZ, Zn[0], Zk[0]);
          if (ZD.loiAR(0, Zt)) {
            return Zt;
          }
          var Zi = Zn[1];
          var ZC = Zk[1];
          if (ZD.NEGuJ(Zi, !ZC)) {
            return -1;
          } else if (ZD.NEGuJ(!Zi, ZC)) {
            return 1;
          } else if (ZD.qywRH(Zi, ZC)) {
            return ZD.cVzyk(ZI, Zi, ZC);
          } else {
            return 0;
          }
        }
      },
      k: function () {
        var ZD = {
          nYOCP: function (Zi, ZC, Zu, Zc, Zp, Zj) {
            return Z6.ECVNO(Zi, ZC, Zu, Zc, Zp, Zj);
          },
          PPTpm: Z6.uYUvl,
          vUtdF: Z6.ROQfj,
          vaIyD: Z6.ajDdZ,
          eVKXp: function (Zi, ZC, Zu, Zc) {
            return Z6.OqkLL(Zi, ZC, Zu, Zc);
          },
          wqENi: function (Zi, ZC, Zu, Zc) {
            return Z6.FHTUY(Zi, ZC, Zu, Zc);
          },
          AAoLW: Z6.Cduca,
          CyCcT: Z6.zDJZM,
          LAqyE: function (Zi, ZC) {
            return Z6.xgELX(Zi, ZC);
          },
          VTHNw: function (Zi, ZC) {
            return Z6.asHTx(Zi, ZC);
          },
          JOJPo: function (Zi, ZC, Zu, Zc) {
            return Z6.szoqi(Zi, ZC, Zu, Zc);
          },
          AnfPZ: Z6.IjxRi,
          GRuqR: Z6.TCagp,
          alMIW: function (Zi, ZC, Zu, Zc) {
            return Z6.Wpfxq(Zi, ZC, Zu, Zc);
          },
          EldRW: Z6.sHVHb,
          XVVyz: Z6.eIMUj,
          DJzfd: function (Zi, ZC) {
            return Z6.MAXOx(Zi, ZC);
          },
          lMQEl: function (Zi, ZC) {
            return Z6.VImmV(Zi, ZC);
          },
          RisAI: Z6.QhtXg,
          MJnRs: function (Zi, ZC) {
            return Z6.dAwXd(Zi, ZC);
          },
          qaYVw: function (Zi, ZC) {
            return Z6.BPDvl(Zi, ZC);
          },
          rtulz: function (Zi, ZC) {
            return Z6.CRYJU(Zi, ZC);
          },
          mFxxu: function (Zi, ZC) {
            return Z6.qGvYE(Zi, ZC);
          },
          GncvD: Z6.lOhPj,
          RxEmf: Z6.IzNnH,
          MWUei: function (Zi, ZC) {
            return Z6.GMMET(Zi, ZC);
          },
          OGhoC: Z6.yMuPI,
          Dgbif: function (Zi, ZC) {
            return Z6.wymqH(Zi, ZC);
          },
          UYaiT: function (Zi, ZC) {
            return Z6.xKYjo(Zi, ZC);
          },
          BeVfu: function (Zi, ZC) {
            return Z6.pWGQN(Zi, ZC);
          },
          qbluU: Z6.FcgOM,
          xOUUt: function (Zi, ZC) {
            return Z6.CnhDW(Zi, ZC);
          },
          aBybU: function (Zi, ZC, Zu) {
            return Z6.YibcW(Zi, ZC, Zu);
          },
          PXFTk: Z6.zbACp,
          ofdQU: function (Zi, ZC) {
            return Z6.XEyga(Zi, ZC);
          },
          AloAd: Z6.MGnaP,
          RJkvl: Z6.rOJwe,
          GOHNR: function (Zi, ZC, Zu) {
            return Z6.YibcW(Zi, ZC, Zu);
          },
          ZhDAm: function (Zi, ZC) {
            return Z6.ntRJC(Zi, ZC);
          }
        };
        if (Z6.rHhxP(Z6.XqJKT, Z6.PWlbl)) {
          var Zn;
          var Zk;
          var Zt;
          if (!Z6.qzPEP(1, ZZ) && (!Z6.tiGmB(0, ZZ) || !Z6.qElHV(3, ZZ))) {
            ZZ = 1;
            Z6.yzNnu(ZL);
            Zn = function (Zi) {
              var ZC = {
                QclCf: function (Zu, Zc) {
                  return ZD.qaYVw(Zu, Zc);
                },
                ecaZm: function (Zu, Zc) {
                  return ZD.MJnRs(Zu, Zc);
                },
                DtzYO: function (Zu, Zc) {
                  return ZD.rtulz(Zu, Zc);
                },
                bADFe: function (Zu, Zc) {
                  return ZD.qaYVw(Zu, Zc);
                },
                NkpLm: function (Zu, Zc) {
                  return ZD.mFxxu(Zu, Zc);
                }
              };
              if (ZD.lMQEl(ZD.GncvD, ZD.RxEmf)) {
                var Zu = {
                  EUcju: function (ZV, ZQ, ZN, ZY, ZW, Zq) {
                    return ZD.nYOCP(ZV, ZQ, ZN, ZY, ZW, Zq);
                  },
                  eGUKP: ZD.PPTpm,
                  PArqp: ZD.vUtdF,
                  sqfgH: ZD.vaIyD,
                  TPPho: function (ZV, ZQ, ZN, ZY) {
                    return ZD.eVKXp(ZV, ZQ, ZN, ZY);
                  },
                  OmvBd: function (ZV, ZQ, ZN, ZY) {
                    return ZD.wqENi(ZV, ZQ, ZN, ZY);
                  },
                  wCYJb: ZD.AAoLW,
                  NoPdM: ZD.CyCcT
                };
                var Zc = ZT.M();
                var Zp = Zx.H();
                var Zj = ZD.LAqyE(ZD.VTHNw(ZL.offsetTop, ZD.V()), 2);
                ZD.JOJPo(Zn, Zc, ZD.AnfPZ, ZD.GRuqR);
                ZD.alMIW(Zk, Zp, ZD.AnfPZ, ZD.EldRW);
                ZD.eVKXp(Zt, Zi, ZD.AnfPZ, ZD.XVVyz);
                ZD.DJzfd(ZC, function () {
                  Zu.EUcju(Zc, Zp, Zu.eGUKP, "1", Zu.PArqp, Zu.sqfgH);
                  Zu.TPPho(Zj, Zc, Zu.eGUKP, "0");
                  Zu.OmvBd(ZV, Zp, Zu.PArqp, Zu.wCYJb.concat(Zj, Zu.NoPdM).concat(0.7, ")"));
                });
              } else {
                ZI.forEach(function (Zu) {
                  if (ZD.lMQEl(ZD.RisAI, ZD.RisAI)) {
                    return ZD.MJnRs(Zu, Zi);
                  } else {
                    var Zc = Z9.split(".");
                    var Zp = ZZ.split(".");
                    for (var Zj = ZI.max(Zc.length, Zp.length), Zl = 0; ZC.QclCf(Zl, Zj); Zl++) {
                      var ZG = ZC.ecaZm(ZR, Zc[Zl] || 0);
                      var Za = ZC.DtzYO(ZK, Zp[Zl] || 0);
                      if (ZC.bADFe(ZG, Za)) {
                        return -1;
                      }
                      if (ZC.NkpLm(ZG, Za)) {
                        return 1;
                      }
                    }
                    return 0;
                  }
                });
              }
            };
            (Zt = function (Zi) {
              if (Z6.rHhxP(Z6.kJKhl, Z6.ypgKN)) {
                Zk = Z6.yjJJN(fe, Zt);
                Z6.XFuPm(Zn, Zi);
              } else {
                ZL.l.y = ZD.LAqyE(20, ZD.MWUei(ZD, 608));
                ZD.eVKXp(Zn, Zk.i, ZD.vUtdF, ZD.OGhoC.concat(Zt.l.x, ", ").concat(Zi.l.y, ")"));
                var ZC = ZD.Dgbif(ZD.UYaiT(ZC, Zu), 2);
                var Zu = ZD.Dgbif(+Zc.abs(ZD.BeVfu(Zp.abs(ZD.VTHNw(Zj.abs(ZD.BeVfu(Zl, ZC)), ZC)), ZG)), 100).toFixed(1);
                ZD.wqENi(Za, ZV.t, ZD.qbluU, `0 ${Zu}`);
              }
            })(0);
            Zd = function () {
              if (Z6.hVIuh(Z6.ujvCP, Z6.ujvCP)) {
                if (ZD.xOUUt(null, ZN)) {
                  return ZD.aBybU(ZY, 1, ZD.PXFTk);
                }
                if (ZD.ofdQU(ZD.AloAd, typeof ZW)) {
                  ZD.aBybU(Zq, 1, ZD.RJkvl);
                } else {
                  ZD.GOHNR(ZS, function () {
                    var IE = {
                      SharedPath: I7,
                      GameDir: I8,
                      AssetTable: I9,
                      ShellDir: IZ,
                      Plugins: II,
                      Requirements: Id,
                      LocalizedTitleKey: IO,
                      SupportedLanguages: IR,
                      ThemeColor: IK,
                      LobbyMode: Ig,
                      SupportXSMaxRatio: IT,
                      AspectRatio: Ix,
                      Orientation: IL,
                      Name: ID,
                      Version: In,
                      Index: Ik,
                      Identifier: It,
                      PluginDependencies: Ii,
                      EIF: IC,
                      Ecma: Iu,
                      Platform: Ic,
                      Blobs: Ip,
                      BootTime: Ij,
                      initialLoader: Il
                    };
                    return I5.start(I6, IE);
                  }, 0);
                }
              } else {
                Z6.PLTZH(cancelAnimationFrame, Zk);
              }
            };
          }
        } else {
          var Zi = ZD.DJzfd(ZZ, ZI[Zd] || 0);
          var ZC = ZD.MJnRs(ZO, ZR[ZK] || 0);
          if (ZD.qaYVw(Zi, ZC)) {
            return -1;
          }
          if (ZD.ZhDAm(Zi, ZC)) {
            return 1;
          }
        }
      },
      _: function (ZD) {
        if (Z6.ysbVN(Z6.ZLYRu, Z6.ZLYRu)) {
          var Zn = {
            OiVKT: function (Zt, Zi) {
              return Z6.CAGgI(Zt, Zi);
            },
            GrApq: function (Zt) {
              return Z6.JTjvR(Zt);
            }
          };
          ZK = true;
          var Zk = Z6.FyEUW(Zg[ZT].substring(2, 4), Z6.cNiEt);
          Z6.wLdtD(Zx, Z6.FyEUW(Z6.FyEUW(location.origin, Z6.tOOPh), Zk), 2, function (ZQ) {
            if (ZQ) {
              Zk = null;
            } else if (!Zn.OiVKT(null, Zc = Zp.sign || null)) {
              Zj.setQuery(Zl[ZG]);
            }
            Zn.GrApq(Za);
          });
        } else if (Z6.AMXjS(1, ZZ)) {
          ZZ = 2;
          ZO = ZD;
        }
      },
      F: function () {
        var ZD = {
          NHqEt: function (Zk, Zt, Zi) {
            return Z6.BdqDM(Zk, Zt, Zi);
          },
          cwHuE: function (Zk, Zt, Zi, ZC) {
            return Z6.wLdtD(Zk, Zt, Zi, ZC);
          },
          iLNPS: Z6.ROQfj,
          AkVat: Z6.HNwAY,
          CsXhg: function (Zk, Zt) {
            return Z6.KoMoJ(Zk, Zt);
          },
          ztUIu: function (Zk, Zt) {
            return Z6.HjKVV(Zk, Zt);
          },
          yzSzO: function (Zk, Zt) {
            return Z6.GYfeT(Zk, Zt);
          },
          hLGaZ: Z6.WjSgl
        };
        if (Z6.ysbVN(Z6.sDDNi, Z6.sDDNi)) {
          var Zt = ZD.NHqEt(ZO, ZR, "g");
          ZD.cwHuE(ZK, Zt, ZD.iLNPS, ZD.AkVat.concat(ZD.CsXhg(-Zg, ZD.ztUIu(ZT, ZD.yzSzO(2, Zx))), ZD.hLGaZ));
          ZL = ZD;
          Zt.innerHTML = Zn;
        } else {
          var Zn;
          if (Z6.kxYhx(0, ZZ)) {
            ZZ = 0;
            if (Z7) {
              if (!Z6.nxyap(null, Zn = Z7.parentElement) && !Z6.abWaJ(undefined, Zn)) {
                Zn.removeChild(Z7);
              }
            }
            if (Zd) {
              Z6.IrJhj(Zd);
            }
          }
        }
      }
    };
  }
  var ye = i;
  var be = "";
  e.GtmId = new String(e.GtmId);
  var _e = J() ? 2015 : 5;
  var ke = k;
  var xe = O;
  var we = Date.now();
  var He = j.or;
  if (He) {
    if ((He = function (Z4) {
      var Z6;
      (function (ZK) {
        ZK.kReplacer = "[a-zA-Z=]";
      })(Z6 ||= {});
      var Z7 = typeof window == "object" ? window : global;
      var Z8 = Z7.parseInt;
      var Z9 = Z7.isNaN;
      var ZZ = Z7.String;
      var ZI = Z7.RegExp;
      var Zd = Z7.Number;
      var ZO = ZI(Z6.kReplacer, "g");
      var ZR = Z8(Z4 == null ? undefined : Z4.substring(Zd("0x0"), Zd("0x2")), Zd("0xa"));
      if (Z9(ZR) && (Z4 == null ? undefined : Z4.includes("."))) {
        return Z4;
      } else if (Z4 == null) {
        return undefined;
      } else {
        return Z4.substring(Zd("0x2")).replace(ZO, function (ZK) {
          if (ZK === "=") {
            return ".";
          }
          var Zg = ZK.charCodeAt(0);
          var ZT = Zg >= Zd("0x61") ? Zd("0x61") : Zd("0x41");
          var Zx = (Zg - ZT - ZR + Zd("0x1a")) % Zd("0x1a") + ZT;
          return ZZ.fromCharCode(Zx);
        });
      }
    }(He)).indexOf("//") === 0) {
      He = location.protocol + He;
    } else if (!/^https?:/.test(He)) {
      He = location.protocol + "//" + He;
    }
    be = He + location.pathname.replace("index.html", "");
    ye = He + ye;
  }
  var Se = j.blockpage;
  if (Se) {
    var Me = document.createElement("div");
    Me.id = "block-page";
    Me.style.backgroundColor = "#" + Se;
    document.body.appendChild(Me);
  }
  var Te;
  var Pe = function (Z4, Z5, Z6) {
    var Z7 = {
      PQRiF: "div",
      dErTs: "block-page",
      aJTOm: function (ZT, Zx) {
        return ZT + Zx;
      },
      IFYVv: function (ZT, Zx, ZL, ZD, Zn, Zk) {
        return ZT(Zx, ZL, ZD, Zn, Zk);
      },
      hiTpJ: function (ZT, Zx, ZL) {
        return ZT(Zx, ZL);
      },
      TOeis: function (ZT, Zx) {
        return ZT * Zx;
      },
      gUWgO: function (ZT, Zx) {
        return ZT !== Zx;
      },
      RfhZG: "dVHcN",
      YezXN: "oXmbR",
      AnHfQ: function (ZT, Zx, ZL) {
        return ZT(Zx, ZL);
      },
      zXDTF: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      UupHr: "transform",
      hVcGG: "scale(",
      jTCSU: function (ZT, Zx) {
        return ZT / Zx;
      },
      qUBhz: "viewBox",
      VJsKo: "0 0 ",
      NHDTI: "overflow",
      vwWbB: "hidden",
      SJqKK: "height",
      WZbyT: function (ZT, Zx) {
        return ZT === Zx;
      },
      kycrE: "JqcVz",
      pOsVB: "GARBy",
      Jfeaf: "resize",
      YbQCI: function (ZT, Zx) {
        return ZT === Zx;
      },
      oQmdy: "rmRPT",
      ZGtIT: "hgols",
      YXtAW: function (ZT) {
        return ZT();
      },
      tasJj: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      gRhAs: "pre",
      dfAHd: function (ZT, Zx, ZL, ZD, Zn, Zk, Zt, Zi, ZC, Zu, Zc, Zp) {
        return ZT(Zx, ZL, ZD, Zn, Zk, Zt, Zi, ZC, Zu, Zc, Zp);
      },
      CwMXk: "font",
      nslCr: "20px Roboto, sans-serif",
      XXoHE: "color",
      IVTgD: "#ccc",
      vhkzA: "opacity",
      zjqPO: "text-align",
      MniKE: "center",
      dQCCb: "transition",
      faHet: "opacity 1.2s ease-in-out",
      HoShu: function (ZT, Zx) {
        return ZT(Zx);
      },
      BNbPa: function (ZT, Zx) {
        return ZT + Zx;
      },
      sChCl: function (ZT, Zx) {
        return ZT !== Zx;
      },
      AfJzi: "VsiCg",
      vAHir: function (ZT, Zx, ZL, ZD, Zn, Zk) {
        return ZT(Zx, ZL, ZD, Zn, Zk);
      },
      AsGpk: "translateY(0px)",
      HFMRP: "translateY(",
      IxetI: "px) scale(",
      gyaVE: function (ZT, Zx) {
        return ZT !== Zx;
      },
      NzePY: "YiVzX",
      uQXsv: function (ZT, Zx) {
        return ZT - Zx;
      },
      sAUyS: "opacity 0.28s ease-in",
      kEEQg: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      JLqgb: "transform 0.5s ease-in-out",
      qoeuG: "opacity 0s linear 0.28s, transform 0.5s ease-in-out",
      LSMAo: function (ZT, Zx) {
        return ZT !== Zx;
      },
      uNZDo: "RlxzQ",
      omYpT: "VrdAe",
      jBdKZ: function (ZT, Zx, ZL, ZD, Zn, Zk) {
        return ZT(Zx, ZL, ZD, Zn, Zk);
      },
      UvRNj: "px)",
      Ksfzi: function (ZT, Zx) {
        return ZT + Zx;
      },
      PVQkI: ".js",
      rSTWa: "/loader/",
      cYkiT: function (ZT, Zx) {
        return ZT == Zx;
      },
      rhAys: function (ZT) {
        return ZT();
      },
      QSOmW: function (ZT, Zx, ZL) {
        return ZT(Zx, ZL);
      },
      GakIb: "error",
      HJfaC: function (ZT, Zx) {
        return ZT === Zx;
      },
      lhukh: function (ZT, Zx) {
        return ZT === Zx;
      },
      gvAgW: function (ZT, Zx) {
        return ZT !== Zx;
      },
      bIBDv: "kVSxS",
      VQwqm: "tijtI",
      uwpRq: function (ZT, Zx) {
        return ZT === Zx;
      },
      iRdPT: "isgVQ",
      BDwKZ: "fzGXJ",
      alUbt: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      kshja: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      uuAXS: "class",
      lgkHG: "il-err-container",
      Qibar: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      mWLGm: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      rYVAD: "il-err-title",
      pGchE: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      Ewfzp: "il-err-desc",
      TGsLt: function (ZT, Zx) {
        return ZT > Zx;
      },
      mGEjk: "iTdib",
      QgnpO: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      ggZtc: "il-btn-container",
      kokyS: function (ZT, Zx) {
        return ZT < Zx;
      },
      TsBTp: function (ZT, Zx) {
        return ZT !== Zx;
      },
      eKsCJ: "rxgzl",
      WyOOV: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      FHcPf: "il-btn",
      hNXaW: "flex",
      srBLR: function (ZT, Zx) {
        return ZT === Zx;
      },
      gwXmb: function (ZT, Zx) {
        return ZT == Zx;
      },
      tBATS: function (ZT, Zx) {
        return ZT === Zx;
      },
      WVmoe: "dCDVp",
      nidtc: function (ZT, Zx) {
        return ZT == Zx;
      },
      hZNBO: function (ZT) {
        return ZT();
      },
      xeZBl: "hkWVr",
      LJQXh: "usHpA",
      zjIjw: "scale(1)",
      hKUHF: function (ZT, Zx) {
        return ZT instanceof Zx;
      },
      XqViy: "load resource fail|G1002|src: ",
      EaiqX: "|reason: ",
      Wmmgf: "|retryCount: ",
      JNNOu: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      QJRAs: "event",
      fGNSJ: "fault",
      bnFQu: "game_shell",
      bTlUV: function (ZT, Zx) {
        return ZT != Zx;
      },
      NmqOh: "onerror",
      kWCKN: "ontimeout",
      iCGoW: function (ZT, Zx) {
        return ZT * Zx;
      },
      yXmBg: function (ZT, Zx) {
        return ZT << Zx;
      },
      FOGmf: function (ZT, Zx) {
        return ZT === Zx;
      },
      vHHKO: "DprGZ",
      cFPQl: "jYJIc",
      Bsdik: function (ZT, Zx) {
        return ZT === Zx;
      },
      fTQTy: function (ZT, Zx) {
        return ZT === Zx;
      },
      AUkqN: function (ZT, Zx) {
        return ZT === Zx;
      },
      SuZXP: function (ZT, Zx) {
        return ZT === Zx;
      },
      rBJQx: function (ZT) {
        return ZT();
      },
      RPsZL: function (ZT, Zx) {
        return ZT instanceof Zx;
      },
      rrJTP: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      LxbrL: function (ZT, Zx) {
        return ZT === Zx;
      },
      tiaKt: function (ZT, Zx) {
        return ZT === Zx;
      },
      bTnuz: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      CNCsN: function (ZT, Zx) {
        return ZT * Zx;
      },
      KfKOg: "WmnGT",
      YtlAO: "qAZiT",
      jcLNz: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      eKHMv: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      NCyuw: "initial-loader",
      Slfjn: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      bLOtn: "il-wrapper",
      rqnen: function (ZT, Zx, ZL) {
        return ZT(Zx, ZL);
      },
      bQWaq: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      HJalB: "style",
      BcsJw: ".initial-loader{background-color:#000;height:inherit;margin:auto;position:absolute;transition:opacity .35s ease-in;width:inherit}.il-wrapper,.initial-loader{align-items:center;display:flex;flex-direction:column;justify-content:center}.il-circle-loading{align-items:center;display:flex;height:10px;justify-content:space-between;width:40px}.il-circle{animation-direction:alternate;animation-duration:.25s;animation-iteration-count:infinite;animation-name:il-circle-bounce;animation-timing-function:ease-out;background-color:#30a2d0;border-radius:50%;height:10px;position:relative;width:10px}.il-circle:first-of-type{animation-delay:0s}.il-circle:nth-of-type(2){animation-delay:-75ms}.il-circle:nth-of-type(3){animation-delay:-.15s}@keyframes il-circle-bounce{0%{bottom:0}90%,to{bottom:15px}}.il-err-container{display:flex;flex-direction:column;font-family:PingFangSC-Regular;position:absolute;width:413px}.il-err-title{color:#fff;font-size:27px;padding:10px 0;text-align:center}.il-err-desc{color:#98989e;font-size:18px;line-height:24px;text-align:center}.il-btn-container{color:#fff;padding-top:68px}.il-btn,.il-btn-container{align-items:center;display:flex;justify-content:center}.il-btn{border:.6px solid #fff;border-radius:6px;cursor:pointer;font-family:PingFangSC-Semibold;font-size:20px;margin:0 7px;min-height:26px;min-width:120px;padding:17px 25px;text-align:center;user-select:none}.il-btn:active{opacity:.6}",
      MIHnL: function (ZT, Zx) {
        return ZT === Zx;
      },
      RBDsD: "xlyFs",
      zKPKY: "VGvGz",
      qgpqa: function (ZT, Zx, ZL, ZD) {
        return ZT(Zx, ZL, ZD);
      },
      qCtfR: "il-circle-loading ",
      zBLZU: function (ZT, Zx) {
        return ZT < Zx;
      },
      scgLq: "il-circle",
      hzCct: function (ZT, Zx) {
        return ZT === Zx;
      },
      SqqCd: function (ZT, Zx, ZL) {
        return ZT(Zx, ZL);
      }
    };
    var Z8 = Z7.eKHMv(ue, Z4, Z7.PQRiF, 0);
    Z7.QgnpO(de, Z8, Z7.uuAXS, Z7.NCyuw);
    var Z9;
    var ZZ;
    var ZI;
    var Zd = Z7.alUbt(ue, Z8, Z7.PQRiF, 0);
    Z7.Slfjn(de, Zd, Z7.uuAXS, Z7.bLOtn);
    var ZO = Z7.rqnen(me, 1440, 1024);
    var ZR = function (ZT, Zx) {
      var ZL = {
        UqKhO: Z7.PQRiF,
        BlTCq: Z7.dErTs,
        NpFFV: function (Zn, Zk) {
          return Z7.aJTOm(Zn, Zk);
        },
        tYsvN: function (Zn, Zk, Zt, Zi, ZC, Zu) {
          return Z7.IFYVv(Zn, Zk, Zt, Zi, ZC, Zu);
        },
        QcjNE: function (Zn, Zk, Zt) {
          return Z7.hiTpJ(Zn, Zk, Zt);
        },
        wDdgL: function (Zn, Zk) {
          return Z7.TOeis(Zn, Zk);
        },
        ocAGN: function (Zn, Zk) {
          return Z7.gUWgO(Zn, Zk);
        },
        UPFHO: Z7.RfhZG,
        QBYYP: Z7.YezXN,
        qDqDG: function (Zn, Zk, Zt) {
          return Z7.AnHfQ(Zn, Zk, Zt);
        },
        fPUoz: function (Zn, Zk, Zt, Zi) {
          return Z7.zXDTF(Zn, Zk, Zt, Zi);
        },
        PZqfz: Z7.UupHr,
        XobtE: Z7.hVcGG,
        SzQuH: function (Zn, Zk) {
          return Z7.jTCSU(Zn, Zk);
        },
        qEoYy: function (Zn, Zk, Zt, Zi) {
          return Z7.zXDTF(Zn, Zk, Zt, Zi);
        },
        AKqCi: Z7.qUBhz,
        DiRZu: Z7.VJsKo,
        JBFXC: Z7.NHDTI,
        KHGjI: Z7.vwWbB,
        BPmQm: Z7.SJqKK,
        jqmRN: function (Zn, Zk) {
          return Z7.WZbyT(Zn, Zk);
        },
        zfcoS: Z7.kycrE,
        LrzAT: Z7.pOsVB,
        zhddG: Z7.Jfeaf
      };
      if (Z7.YbQCI(Z7.oQmdy, Z7.ZGtIT)) {
        var Zn = Z7.createElement(ZL.UqKhO);
        Zn.id = ZL.BlTCq;
        Zn.style.backgroundColor = ZL.NpFFV("#", Z8);
        Z9.body.appendChild(Zn);
      } else {
        function ZD() {
          if (ZL.ocAGN(ZL.UPFHO, ZL.QBYYP)) {
            var Zn = ZL.qDqDG(me, window.innerWidth, window.innerHeight);
            ZL.fPUoz(ve, ZT, ZL.PZqfz, ZL.XobtE.concat(ZL.SzQuH(Zx, Zn).toFixed(4), ")"));
          } else {
            var Zt = `${ZO}-${ZR}`;
            return {
              i: ZL.tYsvN(ZK, Zg, 112, 20, Zt, ZT),
              t: ZL.QcjNE(Zx, ZL, Zt),
              o: +ZD,
              h: 0,
              l: {
                x: ZL.NpFFV(ZL.wDdgL(137, Zn), 12.5),
                y: 20
              }
            };
          }
        }
        window.addEventListener(Z7.Jfeaf, ZD);
        Z7.YXtAW(ZD);
        return function () {
          if (ZL.jqmRN(ZL.zfcoS, ZL.LrzAT)) {
            ZL.qEoYy(Z9, ZZ, ZL.AKqCi, ZL.DiRZu.concat(ZI, " ").concat(152));
            ZL.tYsvN(Zd, ZO, ZL.JBFXC, ZL.KHGjI, ZL.BPmQm, 152);
          } else {
            window.removeEventListener(ZL.zhddG, ZD);
          }
        };
      }
    }(Zd, ZO);
    var ZK = Z7.bQWaq(ue, document.head, Z7.HJalB, 0);
    ZK.textContent = Z7.BcsJw;
    if (Z7.MIHnL(0, Z5)) {
      if (Z7.gyaVE(Z7.RBDsD, Z7.zKPKY)) {
        Z7.qgpqa(de, ZZ = Z7.kEEQg(ue, Zd, Z7.PQRiF, 0), Z7.uuAXS, Z7.qCtfR);
        for (var Zg = 0; Z7.zBLZU(Zg, 3); Zg++) {
          Z7.WyOOV(de, Z7.jcLNz(ue, ZZ, Z7.PQRiF, 0), Z7.uuAXS, Z7.scgLq);
        }
      } else {
        var ZT = Z7.apply(Z8, arguments);
        Z9 = null;
        return ZT;
      }
    } else if (Z7.hzCct(1, Z5)) {
      (Z9 = Z7.SqqCd(Ze, Zd, Z6)).k();
    }
    return {
      handleError: function (ZT, Zx, ZL) {
        var ZD = {
          umWyq: function (Zp, Zj) {
            return Z7.Ksfzi(Zp, Zj);
          },
          xTlgC: Z7.PVQkI,
          jCMVd: function (Zp, Zj, Zl, ZG) {
            return Z7.zXDTF(Zp, Zj, Zl, ZG);
          },
          aJzgE: function (Zp, Zj) {
            return Z7.aJTOm(Zp, Zj);
          },
          aTpCM: Z7.rSTWa,
          hGEaJ: function (Zp, Zj) {
            return Z7.cYkiT(Zp, Zj);
          },
          gEoMT: function (Zp) {
            return Z7.rhAys(Zp);
          },
          FPqps: function (Zp, Zj) {
            return Z7.YbQCI(Zp, Zj);
          },
          JKnMr: function (Zp, Zj, Zl) {
            return Z7.QSOmW(Zp, Zj, Zl);
          },
          PWUlr: Z7.GakIb,
          lyaEZ: function (Zp, Zj) {
            return Z7.HoShu(Zp, Zj);
          },
          KSftv: function (Zp, Zj) {
            return Z7.HJfaC(Zp, Zj);
          },
          zuSCC: function (Zp, Zj) {
            return Z7.lhukh(Zp, Zj);
          },
          YWKFI: function (Zp, Zj, Zl, ZG) {
            return Z7.kEEQg(Zp, Zj, Zl, ZG);
          },
          MfhaB: Z7.vhkzA
        };
        if (Z7.gvAgW(Z7.bIBDv, Z7.VQwqm)) {
          if (Z7.uwpRq(undefined, ZL)) {
            ZL = [];
          }
          if (!ZI) {
            if (Z7.LSMAo(Z7.iRdPT, Z7.BDwKZ)) {
              Z7.alUbt(de, ZI = Z7.kshja(ue, Zd, Z7.PQRiF, 0), Z7.uuAXS, Z7.lgkHG);
              var Zn = Z7.Qibar(ue, ZI, Z7.PQRiF, 0);
              Z7.mWLGm(de, Zn, Z7.uuAXS, Z7.rYVAD);
              Zn.textContent = ZT;
              var Zk = Z7.pGchE(ue, ZI, Z7.PQRiF, 0);
              Z7.kshja(de, Zk, Z7.uuAXS, Z7.Ewfzp);
              Zk.textContent = Zx;
              if (Z7.TGsLt(ZL.length, 2)) {
                ZL.length = 2;
              }
              if (Z7.TGsLt(ZL.length, 0)) {
                if (Z7.YbQCI(Z7.mGEjk, Z7.mGEjk)) {
                  var Zt = Z7.QgnpO(ue, ZI, Z7.PQRiF, 0);
                  Z7.kshja(de, Zt, Z7.uuAXS, Z7.ggZtc);
                  for (var Zi = 0; Z7.kokyS(Zi, ZL.length); Zi++) {
                    if (Z7.TsBTp(Z7.eKsCJ, Z7.eKsCJ)) {
                      var Zp;
                      var Zj;
                      Zp = Z8;
                      (Zj = Z7.tasJj(Z9, ZZ, Z7.gRhAs, 0)).textContent = Zp;
                      var Zl = Zj;
                      Z7.dfAHd(ZI, Zl, Z7.CwMXk, Z7.nslCr, Z7.XXoHE, Z7.IVTgD, Z7.vhkzA, "0", Z7.zjqPO, Z7.MniKE, Z7.dQCCb, Z7.faHet);
                      return Zl;
                    } else {
                      var ZC = Z7.Qibar(ue, Zt, Z7.PQRiF, 0);
                      Z7.WyOOV(de, ZC, Z7.uuAXS, Z7.FHcPf);
                      if (Z7.TGsLt(ZL.length, 1)) {
                        Z7.mWLGm(ve, ZC, Z7.hNXaW, "1");
                      }
                      ZC.textContent = ZL[Zi].label;
                      var Zu = ZL[Zi].onclick;
                      if (Zu) {
                        ZC.onclick = Zu;
                      }
                    }
                  }
                } else {
                  return Z5;
                }
              }
              if (Z7.srBLR(0, Z5)) {
                if (!Z7.gwXmb(null, ZZ)) {
                  ZZ.remove();
                }
              } else if (Z7.tBATS(1, Z5)) {
                if (Z7.gyaVE(Z7.WVmoe, Z7.WVmoe)) {
                  var Zp = {
                    LNRpn: function (Zj, Zl) {
                      return ZD.hGEaJ(Zj, Zl);
                    },
                    azRPl: function (Zj) {
                      return ZD.gEoMT(Zj);
                    }
                  };
                  ZD.push(arguments);
                  if (ZD.FPqps(undefined, Zn)) {
                    (function () {
                      if (!ZY) {
                        ZF = true;
                        var ZJ = ZD.umWyq(Zh[Zb].substring(2, 4), ZD.xTlgC);
                        ZD.jCMVd(ZH, ZD.aJzgE(ZD.umWyq(location.origin, ZD.aTpCM), ZJ), 2, function (I6) {
                          if (I6) {
                            ZJ = null;
                          } else if (!Zp.LNRpn(null, ZJ = I0.sign || null)) {
                            I1.setQuery(I2[I3]);
                          }
                          Zp.azRPl(I4);
                        });
                      }
                    })();
                  } else {
                    ZD.JKnMr(ZQ, ZN, 0);
                  }
                } else {
                  function Zc() {
                    var Zp = {
                      evGgu: function (Za, ZV) {
                        return Z7.HoShu(Za, ZV);
                      },
                      MncqW: function (Za, ZV) {
                        return Z7.BNbPa(Za, ZV);
                      },
                      yqUdp: function (Za, ZV) {
                        return Z7.sChCl(Za, ZV);
                      },
                      yabIx: Z7.AfJzi,
                      gwuSX: function (Za, ZV, ZQ, ZN, ZY, ZW) {
                        return Z7.vAHir(Za, ZV, ZQ, ZN, ZY, ZW);
                      },
                      yseEI: Z7.vhkzA,
                      KPMKT: Z7.UupHr,
                      UkqzF: Z7.AsGpk,
                      YqFLi: function (Za, ZV, ZQ, ZN) {
                        return Z7.tasJj(Za, ZV, ZQ, ZN);
                      },
                      ZncKo: Z7.HFMRP,
                      Sypsk: Z7.IxetI
                    };
                    if (Z7.gyaVE(Z7.NzePY, Z7.NzePY)) {
                      Zd.removeEventListener(ZD.PWUlr, ZO);
                      ZR.head.removeChild(ZK);
                      Zg.revokeObjectURL(ZT);
                      ZD.lyaEZ(Zx, ZL);
                    } else {
                      var Zj = Z9.M();
                      var Zl = Z9.H();
                      var ZG = Z7.BNbPa(Z7.uQXsv(ZI.offsetTop, Z9.V()), 2);
                      Z7.zXDTF(ve, Zj, Z7.dQCCb, Z7.sAUyS);
                      Z7.kEEQg(ve, Zl, Z7.dQCCb, Z7.JLqgb);
                      Z7.tasJj(ve, ZI, Z7.dQCCb, Z7.qoeuG);
                      Z7.HoShu(fe, function () {
                        if (Zp.yqUdp(Zp.yabIx, Zp.yabIx)) {
                          Zp.evGgu(Z6, Zp.MncqW(Z7, ""));
                        } else {
                          Zp.gwuSX(ve, ZI, Zp.yseEI, "1", Zp.KPMKT, Zp.UkqzF);
                          Zp.YqFLi(ve, Zj, Zp.yseEI, "0");
                          Zp.YqFLi(ve, Zl, Zp.KPMKT, Zp.ZncKo.concat(ZG, Zp.Sypsk).concat(0.7, ")"));
                        }
                      });
                    }
                  }
                  Z7.HoShu(fe, function () {
                    var Zp = {
                      PEZoU: function (Zj) {
                        return Z7.YXtAW(Zj);
                      }
                    };
                    if (Z7.LSMAo(Z7.uNZDo, Z7.omYpT)) {
                      Z7.jBdKZ(ve, ZI, Z7.vhkzA, "0", Z7.UupHr, Z7.HFMRP.concat(ZI.offsetHeight, Z7.UvRNj));
                      Z9._(Zc);
                    } else if (Z6) {
                      Zp.PEZoU(Z7);
                    }
                  });
                }
              }
            } else {
              var Zp = {
                buMrt: function (Zj, Zl) {
                  return Z7.HoShu(Zj, Zl);
                }
              };
              Z6.forEach(function (Zj) {
                return Zp.buMrt(Zj, Z8);
              });
            }
          }
        } else {
          ZD.YWKFI(Zx, ZL, ZD.MfhaB, "0");
          ZD.JKnMr(ZD, function () {
            var ZE;
            var Zr;
            var ZF;
            if (ZD.FPqps(1, Za)) {
              ZV.F();
            }
            ZD.gEoMT(ZQ);
            if (!ZD.FPqps(null, ZE = ZN.parentNode) && !ZD.KSftv(undefined, ZE)) {
              ZE.removeChild(ZY);
            }
            if (!ZD.KSftv(null, Zr = ZW.parentNode) && !ZD.zuSCC(undefined, Zr)) {
              Zr.removeChild(Zq);
            }
            if (!ZD.FPqps(null, ZF = ZS.parentNode) && !ZD.FPqps(undefined, ZF)) {
              ZF.removeChild(Zz);
            }
            if (Zf) {
              ZD.gEoMT(ZA);
            }
          }, 350);
        }
      },
      resume: function () {
        if (Z7.LSMAo(Z7.xeZBl, Z7.LJQXh)) {
          var ZT = ZI;
          ZI = undefined;
          if (ZT) {
            ZT.remove();
          }
          Z9.k();
          var Zx = Z9.M();
          var ZL = Z9.H();
          Z7.WyOOV(ve, Zx, Z7.vhkzA, "1");
          Z7.Qibar(ve, ZL, Z7.UupHr, Z7.zjIjw);
        } else {
          var ZD = {
            QZjGA: function (Zk, Zt) {
              return Z7.nidtc(Zk, Zt);
            },
            FoLeQ: function (Zk) {
              return Z7.hZNBO(Zk);
            }
          };
          if (!Zg) {
            Zp = true;
            var Zn = Z7.aJTOm(Zj[Zl].substring(2, 4), Z7.PVQkI);
            Z7.QgnpO(ZG, Z7.aJTOm(Z7.Ksfzi(location.origin, Z7.rSTWa), Zn), 2, function (Zr) {
              if (Zr) {
                Zn = null;
              } else if (!ZD.QZjGA(null, Zz = Zf.sign || null)) {
                ZA.setQuery(Zo[ZM]);
              }
              ZD.FoLeQ(Zs);
            });
          }
        }
      },
      hideLoading: function (ZT) {
        if (Z7.gvAgW(Z7.KfKOg, Z7.YtlAO)) {
          Z7.jcLNz(ve, Z8, Z7.vhkzA, "0");
          Z7.AnHfQ(setTimeout, function () {
            var Zx = {
              TAAgi: function (Zk, Zt) {
                return Z7.hKUHF(Zk, Zt);
              },
              yiJGF: Z7.XqViy,
              HdqNs: Z7.EaiqX,
              UEgnW: Z7.Wmmgf,
              pDfwB: function (Zk, Zt, Zi, ZC) {
                return Z7.JNNOu(Zk, Zt, Zi, ZC);
              },
              rfbFR: Z7.QJRAs,
              aKqCK: Z7.fGNSJ,
              WjyDd: Z7.bnFQu,
              LGJcw: function (Zk, Zt) {
                return Z7.bTlUV(Zk, Zt);
              },
              cSchs: function (Zk, Zt) {
                return Z7.tBATS(Zk, Zt);
              },
              KfxfB: function (Zk, Zt) {
                return Z7.gvAgW(Zk, Zt);
              },
              qYcIl: function (Zk, Zt) {
                return Z7.HJfaC(Zk, Zt);
              },
              fTiZN: Z7.NmqOh,
              EgHlc: Z7.kWCKN,
              iRVsa: function (Zk, Zt) {
                return Z7.kokyS(Zk, Zt);
              },
              nvTYd: function (Zk, Zt, Zi, ZC) {
                return Z7.alUbt(Zk, Zt, Zi, ZC);
              },
              RKhlT: function (Zk, Zt) {
                return Z7.iCGoW(Zk, Zt);
              },
              UsuWY: function (Zk, Zt) {
                return Z7.yXmBg(Zk, Zt);
              }
            };
            if (Z7.FOGmf(Z7.vHHKO, Z7.cFPQl)) {
              var Zk = {
                XbuGz: function (Zi, ZC) {
                  return Zx.TAAgi(Zi, ZC);
                },
                IItXO: Zx.yiJGF,
                ubBTS: Zx.HdqNs,
                KMgDT: Zx.UEgnW,
                SVvJt: function (Zi, ZC, Zu, Zc) {
                  return Zx.pDfwB(Zi, ZC, Zu, Zc);
                },
                lNYZK: Zx.rfbFR,
                hxOqN: Zx.aKqCK,
                xcaig: Zx.WjyDd
              };
              if (Zx.LGJcw(null, Zt.A)) {
                var Zt = Zx.cSchs(undefined, ZA.I) ? 0 : Zo.I;
                (function (I5, I6, I7, I8) {
                  if (Zk.XbuGz(I7, Zt)) {
                    I7 = I7.message;
                  }
                  var I9 = I5.split("?")[0];
                  var IZ = Zk.IItXO.concat(I9, Zk.ubBTS).concat(I7);
                  if (I8) {
                    IZ += Zk.KMgDT.concat(I8);
                  }
                  Zk.SVvJt(Zv, Zk.lNYZK, Zk.hxOqN, {
                    event_category: Zk.xcaig,
                    event_label: IZ
                  });
                })(ZE.S, 0, Zr.A, Zt);
                if (Zx.KfxfB(false, Zt) && (Zx.qYcIl(Zx.fTiZN, ZF.A) || Zx.cSchs(Zx.EgHlc, Zh.A)) && Zx.iRVsa(Zt, Zb)) {
                  ZH.I = ++Zt;
                  Zw.A = undefined;
                  Zx.nvTYd(ZU, ZB, Zx.RKhlT(1000, Zx.UsuWY(1, Zt)), ZP);
                } else if (ZX.P) {
                  Zy.P();
                }
              } else if (Zz.R) {
                Zf.R();
              }
            } else {
              var ZL;
              var ZD;
              var Zn;
              if (Z7.Bsdik(1, Z5)) {
                Z9.F();
              }
              Z7.YXtAW(ZR);
              if (!Z7.WZbyT(null, ZL = ZK.parentNode) && !Z7.HJfaC(undefined, ZL)) {
                ZL.removeChild(ZK);
              }
              if (!Z7.fTQTy(null, ZD = Zd.parentNode) && !Z7.YbQCI(undefined, ZD)) {
                ZD.removeChild(Zd);
              }
              if (!Z7.AUkqN(null, Zn = Z8.parentNode) && !Z7.SuZXP(undefined, Zn)) {
                Zn.removeChild(Z8);
              }
              if (ZT) {
                Z7.rBJQx(ZT);
              }
            }
          }, 350);
        } else {
          var Zx = {
            ukRBK: function (ZD, Zn) {
              return Z7.RPsZL(ZD, Zn);
            },
            GGdNK: Z7.XqViy,
            RJVBw: Z7.EaiqX,
            GaRjU: Z7.Wmmgf,
            TYdic: function (ZD, Zn, Zk, Zt) {
              return Z7.rrJTP(ZD, Zn, Zk, Zt);
            },
            PZcAJ: Z7.QJRAs,
            zofgx: Z7.fGNSJ,
            ynNWw: Z7.bnFQu
          };
          var ZL = Z7.SuZXP(undefined, ZD.I) ? 0 : Zn.I;
          (function (ZM, Zs, ZE, Zr) {
            if (Zx.ukRBK(ZE, ZL)) {
              ZE = ZE.message;
            }
            var ZF = ZM.split("?")[0];
            var Zh = Zx.GGdNK.concat(ZF, Zx.RJVBw).concat(ZE);
            if (Zr) {
              Zh += Zx.GaRjU.concat(Zr);
            }
            Zx.TYdic(ZW, Zx.PZcAJ, Zx.zofgx, {
              event_category: Zx.ynNWw,
              event_label: Zh
            });
          })(Zi.S, 0, ZC.A, ZL);
          if (Z7.LSMAo(false, ZL) && (Z7.LxbrL(Z7.NmqOh, Zu.A) || Z7.tiaKt(Z7.kWCKN, Zc.A)) && Z7.kokyS(ZL, Zp)) {
            Zj.I = ++ZL;
            Zl.A = undefined;
            Z7.bTnuz(ZG, Za, Z7.CNCsN(1000, Z7.yXmBg(1, ZL)), ZV);
          } else if (ZQ.P) {
            ZN.P();
          }
        }
      }
    };
  }(document.body, J() ? 1 : 0, ne(4));
  function Ee(Z4, Z5) {
    var Z7 = `${ne(Z4)} (${Z5})`;
    Pe.handleError(ne(0), Z7, [{
      label: ne(3),
      onclick: function () {
        location.reload();
      }
    }]);
  }
  function Ve(Z4) {
    if (Z4 != null) {
      return Ee(1, "G1002");
    }
    if (typeof shell == "undefined") {
      Ee(1, "G1008");
    } else {
      setTimeout(function () {
        var Z7 = {
          SharedPath: ye,
          GameDir: be,
          AssetTable: a,
          ShellDir: r,
          Plugins: o,
          Requirements: l,
          LocalizedTitleKey: s,
          SupportedLanguages: h,
          ThemeColor: c,
          LobbyMode: u,
          SupportXSMaxRatio: v,
          AspectRatio: d,
          Orientation: f,
          Name: m,
          Version: p,
          Index: g,
          Identifier: Z,
          PluginDependencies: b,
          EIF: y,
          Ecma: _e,
          Platform: ke,
          Blobs: xe,
          BootTime: we,
          initialLoader: Pe
        };
        return shell.start(Te, Z7);
      }, 0);
    }
  }
  if (window.isSecureContext !== undefined ? window.isSecureContext : window.location.protocol.startsWith("https:")) {
    se(ye + r + "index.json", 1, function (Z4, Z5) {
      if (Z4 != null) {
        return Ee(1, "G1002");
      }
      var Z7;
      var Z8;
      Z7 = (Te = Z5).version;
      Z8 = t;
      if (typeof Z7 == "string" && typeof Z8 == "string" && function (Z9, ZZ) {
        var ZI = Z9.split("-");
        var Zd = ZZ.split("-");
        var ZO = ce(ZI[0], Zd[0]);
        if (ZO !== 0) {
          return ZO;
        }
        var ZR = ZI[1];
        var ZK = Zd[1];
        if (ZR && !ZK) {
          return -1;
        } else if (!ZR && ZK) {
          return 1;
        } else if (ZR || ZK) {
          return ce(ZR, ZK);
        } else {
          return 0;
        }
      }(Z7, Z8) !== -1) {
        se(ye + r + Te.main, 2, Ve);
      } else {
        Ee(2, "G1011");
      }
    });
  } else {
    gtag("event", "insecure_context", {
      event_category: "engagement"
    });
    Pe.handleError(ne(5), ne(6));
  }
})();
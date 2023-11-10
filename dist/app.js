var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/iso-639-1/src/data.js
var require_data = __commonJS((exports, module) => {
  var LANGUAGES_LIST = {
    aa: {
      name: "Afar",
      nativeName: "Afaraf"
    },
    ab: {
      name: "Abkhaz",
      nativeName: "\u0430\u04A7\u0441\u0443\u0430 \u0431\u044B\u0437\u0448\u04D9\u0430"
    },
    ae: {
      name: "Avestan",
      nativeName: "avesta"
    },
    af: {
      name: "Afrikaans",
      nativeName: "Afrikaans"
    },
    ak: {
      name: "Akan",
      nativeName: "Akan"
    },
    am: {
      name: "Amharic",
      nativeName: "\u12A0\u121B\u122D\u129B"
    },
    an: {
      name: "Aragonese",
      nativeName: "aragon\xE9s"
    },
    ar: {
      name: "Arabic",
      nativeName: "\u0627\u064E\u0644\u0652\u0639\u064E\u0631\u064E\u0628\u0650\u064A\u064E\u0651\u0629\u064F"
    },
    as: {
      name: "Assamese",
      nativeName: "\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE"
    },
    av: {
      name: "Avaric",
      nativeName: "\u0430\u0432\u0430\u0440 \u043C\u0430\u0446\u04C0"
    },
    ay: {
      name: "Aymara",
      nativeName: "aymar aru"
    },
    az: {
      name: "Azerbaijani",
      nativeName: "az\u0259rbaycan dili"
    },
    ba: {
      name: "Bashkir",
      nativeName: "\u0431\u0430\u0448\u04A1\u043E\u0440\u0442 \u0442\u0435\u043B\u0435"
    },
    be: {
      name: "Belarusian",
      nativeName: "\u0431\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F \u043C\u043E\u0432\u0430"
    },
    bg: {
      name: "Bulgarian",
      nativeName: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438 \u0435\u0437\u0438\u043A"
    },
    bi: {
      name: "Bislama",
      nativeName: "Bislama"
    },
    bm: {
      name: "Bambara",
      nativeName: "bamanankan"
    },
    bn: {
      name: "Bengali",
      nativeName: "\u09AC\u09BE\u0982\u09B2\u09BE"
    },
    bo: {
      name: "Tibetan",
      nativeName: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
    },
    br: {
      name: "Breton",
      nativeName: "brezhoneg"
    },
    bs: {
      name: "Bosnian",
      nativeName: "bosanski jezik"
    },
    ca: {
      name: "Catalan",
      nativeName: "Catal\xE0"
    },
    ce: {
      name: "Chechen",
      nativeName: "\u043D\u043E\u0445\u0447\u0438\u0439\u043D \u043C\u043E\u0442\u0442"
    },
    ch: {
      name: "Chamorro",
      nativeName: "Chamoru"
    },
    co: {
      name: "Corsican",
      nativeName: "corsu"
    },
    cr: {
      name: "Cree",
      nativeName: "\u14C0\u1426\u1403\u152D\u140D\u140F\u1423"
    },
    cs: {
      name: "Czech",
      nativeName: "\u010De\u0161tina"
    },
    cu: {
      name: "Old Church Slavonic",
      nativeName: "\u0469\u0437\u044B\u043A\u044A \u0441\u043B\u043E\u0432\u0463\u043D\u044C\u0441\u043A\u044A"
    },
    cv: {
      name: "Chuvash",
      nativeName: "\u0447\u04D1\u0432\u0430\u0448 \u0447\u04D7\u043B\u0445\u0438"
    },
    cy: {
      name: "Welsh",
      nativeName: "Cymraeg"
    },
    da: {
      name: "Danish",
      nativeName: "dansk"
    },
    de: {
      name: "German",
      nativeName: "Deutsch"
    },
    dv: {
      name: "Divehi",
      nativeName: "\u078B\u07A8\u0788\u07AC\u0780\u07A8"
    },
    dz: {
      name: "Dzongkha",
      nativeName: "\u0F62\u0FAB\u0F7C\u0F44\u0F0B\u0F41"
    },
    ee: {
      name: "Ewe",
      nativeName: "E\u028Begbe"
    },
    el: {
      name: "Greek",
      nativeName: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"
    },
    en: {
      name: "English",
      nativeName: "English"
    },
    eo: {
      name: "Esperanto",
      nativeName: "Esperanto"
    },
    es: {
      name: "Spanish",
      nativeName: "Espa\xF1ol"
    },
    et: {
      name: "Estonian",
      nativeName: "eesti"
    },
    eu: {
      name: "Basque",
      nativeName: "euskara"
    },
    fa: {
      name: "Persian",
      nativeName: "\u0641\u0627\u0631\u0633\u06CC"
    },
    ff: {
      name: "Fula",
      nativeName: "Fulfulde"
    },
    fi: {
      name: "Finnish",
      nativeName: "suomi"
    },
    fj: {
      name: "Fijian",
      nativeName: "vosa Vakaviti"
    },
    fo: {
      name: "Faroese",
      nativeName: "f\xF8royskt"
    },
    fr: {
      name: "French",
      nativeName: "Fran\xE7ais"
    },
    fy: {
      name: "Western Frisian",
      nativeName: "Frysk"
    },
    ga: {
      name: "Irish",
      nativeName: "Gaeilge"
    },
    gd: {
      name: "Scottish Gaelic",
      nativeName: "G\xE0idhlig"
    },
    gl: {
      name: "Galician",
      nativeName: "galego"
    },
    gn: {
      name: "Guaran\xED",
      nativeName: "Ava\xF1e'\u1EBD"
    },
    gu: {
      name: "Gujarati",
      nativeName: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0"
    },
    gv: {
      name: "Manx",
      nativeName: "Gaelg"
    },
    ha: {
      name: "Hausa",
      nativeName: "\u0647\u064E\u0648\u064F\u0633\u064E"
    },
    he: {
      name: "Hebrew",
      nativeName: "\u05E2\u05D1\u05E8\u05D9\u05EA"
    },
    hi: {
      name: "Hindi",
      nativeName: "\u0939\u093F\u0928\u094D\u0926\u0940"
    },
    ho: {
      name: "Hiri Motu",
      nativeName: "Hiri Motu"
    },
    hr: {
      name: "Croatian",
      nativeName: "Hrvatski"
    },
    ht: {
      name: "Haitian",
      nativeName: "Krey\xF2l ayisyen"
    },
    hu: {
      name: "Hungarian",
      nativeName: "magyar"
    },
    hy: {
      name: "Armenian",
      nativeName: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576"
    },
    hz: {
      name: "Herero",
      nativeName: "Otjiherero"
    },
    ia: {
      name: "Interlingua",
      nativeName: "Interlingua"
    },
    id: {
      name: "Indonesian",
      nativeName: "Bahasa Indonesia"
    },
    ie: {
      name: "Interlingue",
      nativeName: "Interlingue"
    },
    ig: {
      name: "Igbo",
      nativeName: "As\u1EE5s\u1EE5 Igbo"
    },
    ii: {
      name: "Nuosu",
      nativeName: "\uA188\uA320\uA4BF Nuosuhxop"
    },
    ik: {
      name: "Inupiaq",
      nativeName: "I\xF1upiaq"
    },
    io: {
      name: "Ido",
      nativeName: "Ido"
    },
    is: {
      name: "Icelandic",
      nativeName: "\xCDslenska"
    },
    it: {
      name: "Italian",
      nativeName: "Italiano"
    },
    iu: {
      name: "Inuktitut",
      nativeName: "\u1403\u14C4\u1483\u144E\u1450\u1466"
    },
    ja: {
      name: "Japanese",
      nativeName: "\u65E5\u672C\u8A9E"
    },
    jv: {
      name: "Javanese",
      nativeName: "basa Jawa"
    },
    ka: {
      name: "Georgian",
      nativeName: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8"
    },
    kg: {
      name: "Kongo",
      nativeName: "Kikongo"
    },
    ki: {
      name: "Kikuyu",
      nativeName: "G\u0129k\u0169y\u0169"
    },
    kj: {
      name: "Kwanyama",
      nativeName: "Kuanyama"
    },
    kk: {
      name: "Kazakh",
      nativeName: "\u049B\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456"
    },
    kl: {
      name: "Kalaallisut",
      nativeName: "kalaallisut"
    },
    km: {
      name: "Khmer",
      nativeName: "\u1781\u17C1\u1798\u179A\u1797\u17B6\u179F\u17B6"
    },
    kn: {
      name: "Kannada",
      nativeName: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1"
    },
    ko: {
      name: "Korean",
      nativeName: "\uD55C\uAD6D\uC5B4"
    },
    kr: {
      name: "Kanuri",
      nativeName: "Kanuri"
    },
    ks: {
      name: "Kashmiri",
      nativeName: "\u0915\u0936\u094D\u092E\u0940\u0930\u0940"
    },
    ku: {
      name: "Kurdish",
      nativeName: "Kurd\xEE"
    },
    kv: {
      name: "Komi",
      nativeName: "\u043A\u043E\u043C\u0438 \u043A\u044B\u0432"
    },
    kw: {
      name: "Cornish",
      nativeName: "Kernewek"
    },
    ky: {
      name: "Kyrgyz",
      nativeName: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430"
    },
    la: {
      name: "Latin",
      nativeName: "latine"
    },
    lb: {
      name: "Luxembourgish",
      nativeName: "L\xEBtzebuergesch"
    },
    lg: {
      name: "Ganda",
      nativeName: "Luganda"
    },
    li: {
      name: "Limburgish",
      nativeName: "Limburgs"
    },
    ln: {
      name: "Lingala",
      nativeName: "Ling\xE1la"
    },
    lo: {
      name: "Lao",
      nativeName: "\u0E9E\u0EB2\u0EAA\u0EB2\u0EA5\u0EB2\u0EA7"
    },
    lt: {
      name: "Lithuanian",
      nativeName: "lietuvi\u0173 kalba"
    },
    lu: {
      name: "Luba-Katanga",
      nativeName: "Kiluba"
    },
    lv: {
      name: "Latvian",
      nativeName: "latvie\u0161u valoda"
    },
    mg: {
      name: "Malagasy",
      nativeName: "fiteny malagasy"
    },
    mh: {
      name: "Marshallese",
      nativeName: "Kajin M\u0327aje\u013C"
    },
    mi: {
      name: "M\u0101ori",
      nativeName: "te reo M\u0101ori"
    },
    mk: {
      name: "Macedonian",
      nativeName: "\u043C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438 \u0458\u0430\u0437\u0438\u043A"
    },
    ml: {
      name: "Malayalam",
      nativeName: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02"
    },
    mn: {
      name: "Mongolian",
      nativeName: "\u041C\u043E\u043D\u0433\u043E\u043B \u0445\u044D\u043B"
    },
    mr: {
      name: "Marathi",
      nativeName: "\u092E\u0930\u093E\u0920\u0940"
    },
    ms: {
      name: "Malay",
      nativeName: "Bahasa Melayu"
    },
    mt: {
      name: "Maltese",
      nativeName: "Malti"
    },
    my: {
      name: "Burmese",
      nativeName: "\u1017\u1019\u102C\u1005\u102C"
    },
    na: {
      name: "Nauru",
      nativeName: "Dorerin Naoero"
    },
    nb: {
      name: "Norwegian Bokm\xE5l",
      nativeName: "Norsk bokm\xE5l"
    },
    nd: {
      name: "Northern Ndebele",
      nativeName: "isiNdebele"
    },
    ne: {
      name: "Nepali",
      nativeName: "\u0928\u0947\u092A\u093E\u0932\u0940"
    },
    ng: {
      name: "Ndonga",
      nativeName: "Owambo"
    },
    nl: {
      name: "Dutch",
      nativeName: "Nederlands"
    },
    nn: {
      name: "Norwegian Nynorsk",
      nativeName: "Norsk nynorsk"
    },
    no: {
      name: "Norwegian",
      nativeName: "Norsk"
    },
    nr: {
      name: "Southern Ndebele",
      nativeName: "isiNdebele"
    },
    nv: {
      name: "Navajo",
      nativeName: "Din\xE9 bizaad"
    },
    ny: {
      name: "Chichewa",
      nativeName: "chiChe\u0175a"
    },
    oc: {
      name: "Occitan",
      nativeName: "occitan"
    },
    oj: {
      name: "Ojibwe",
      nativeName: "\u140A\u14C2\u1511\u14C8\u142F\u14A7\u140E\u14D0"
    },
    om: {
      name: "Oromo",
      nativeName: "Afaan Oromoo"
    },
    or: {
      name: "Oriya",
      nativeName: "\u0B13\u0B21\u0B3C\u0B3F\u0B06"
    },
    os: {
      name: "Ossetian",
      nativeName: "\u0438\u0440\u043E\u043D \xE6\u0432\u0437\u0430\u0433"
    },
    pa: {
      name: "Panjabi",
      nativeName: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40"
    },
    pi: {
      name: "P\u0101li",
      nativeName: "\u092A\u093E\u0934\u093F"
    },
    pl: {
      name: "Polish",
      nativeName: "Polski"
    },
    ps: {
      name: "Pashto",
      nativeName: "\u067E\u069A\u062A\u0648"
    },
    pt: {
      name: "Portuguese",
      nativeName: "Portugu\xEAs"
    },
    qu: {
      name: "Quechua",
      nativeName: "Runa Simi"
    },
    rm: {
      name: "Romansh",
      nativeName: "rumantsch grischun"
    },
    rn: {
      name: "Kirundi",
      nativeName: "Ikirundi"
    },
    ro: {
      name: "Romanian",
      nativeName: "Rom\xE2n\u0103"
    },
    ru: {
      name: "Russian",
      nativeName: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
    },
    rw: {
      name: "Kinyarwanda",
      nativeName: "Ikinyarwanda"
    },
    sa: {
      name: "Sanskrit",
      nativeName: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D"
    },
    sc: {
      name: "Sardinian",
      nativeName: "sardu"
    },
    sd: {
      name: "Sindhi",
      nativeName: "\u0938\u093F\u0928\u094D\u0927\u0940"
    },
    se: {
      name: "Northern Sami",
      nativeName: "Davvis\xE1megiella"
    },
    sg: {
      name: "Sango",
      nativeName: "y\xE2ng\xE2 t\xEE s\xE4ng\xF6"
    },
    si: {
      name: "Sinhala",
      nativeName: "\u0DC3\u0DD2\u0D82\u0DC4\u0DBD"
    },
    sk: {
      name: "Slovak",
      nativeName: "sloven\u010Dina"
    },
    sl: {
      name: "Slovenian",
      nativeName: "sloven\u0161\u010Dina"
    },
    sm: {
      name: "Samoan",
      nativeName: "gagana fa'a Samoa"
    },
    sn: {
      name: "Shona",
      nativeName: "chiShona"
    },
    so: {
      name: "Somali",
      nativeName: "Soomaaliga"
    },
    sq: {
      name: "Albanian",
      nativeName: "Shqip"
    },
    sr: {
      name: "Serbian",
      nativeName: "\u0441\u0440\u043F\u0441\u043A\u0438 \u0458\u0435\u0437\u0438\u043A"
    },
    ss: {
      name: "Swati",
      nativeName: "SiSwati"
    },
    st: {
      name: "Southern Sotho",
      nativeName: "Sesotho"
    },
    su: {
      name: "Sundanese",
      nativeName: "Basa Sunda"
    },
    sv: {
      name: "Swedish",
      nativeName: "Svenska"
    },
    sw: {
      name: "Swahili",
      nativeName: "Kiswahili"
    },
    ta: {
      name: "Tamil",
      nativeName: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD"
    },
    te: {
      name: "Telugu",
      nativeName: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41"
    },
    tg: {
      name: "Tajik",
      nativeName: "\u0442\u043E\u04B7\u0438\u043A\u04E3"
    },
    th: {
      name: "Thai",
      nativeName: "\u0E44\u0E17\u0E22"
    },
    ti: {
      name: "Tigrinya",
      nativeName: "\u1275\u130D\u122D\u129B"
    },
    tk: {
      name: "Turkmen",
      nativeName: "T\xFCrkmen\xE7e"
    },
    tl: {
      name: "Tagalog",
      nativeName: "Wikang Tagalog"
    },
    tn: {
      name: "Tswana",
      nativeName: "Setswana"
    },
    to: {
      name: "Tonga",
      nativeName: "faka Tonga"
    },
    tr: {
      name: "Turkish",
      nativeName: "T\xFCrk\xE7e"
    },
    ts: {
      name: "Tsonga",
      nativeName: "Xitsonga"
    },
    tt: {
      name: "Tatar",
      nativeName: "\u0442\u0430\u0442\u0430\u0440 \u0442\u0435\u043B\u0435"
    },
    tw: {
      name: "Twi",
      nativeName: "Twi"
    },
    ty: {
      name: "Tahitian",
      nativeName: "Reo Tahiti"
    },
    ug: {
      name: "Uyghur",
      nativeName: "\u0626\u06C7\u064A\u063A\u06C7\u0631\u0686\u06D5\u200E"
    },
    uk: {
      name: "Ukrainian",
      nativeName: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"
    },
    ur: {
      name: "Urdu",
      nativeName: "\u0627\u0631\u062F\u0648"
    },
    uz: {
      name: "Uzbek",
      nativeName: "\u040E\u0437\u0431\u0435\u043A"
    },
    ve: {
      name: "Venda",
      nativeName: "Tshiven\u1E13a"
    },
    vi: {
      name: "Vietnamese",
      nativeName: "Ti\u1EBFng Vi\u1EC7t"
    },
    vo: {
      name: "Volap\xFCk",
      nativeName: "Volap\xFCk"
    },
    wa: {
      name: "Walloon",
      nativeName: "walon"
    },
    wo: {
      name: "Wolof",
      nativeName: "Wollof"
    },
    xh: {
      name: "Xhosa",
      nativeName: "isiXhosa"
    },
    yi: {
      name: "Yiddish",
      nativeName: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9"
    },
    yo: {
      name: "Yoruba",
      nativeName: "Yor\xF9b\xE1"
    },
    za: {
      name: "Zhuang",
      nativeName: "Sa\u026F cue\u014B\u0185"
    },
    zh: {
      name: "Chinese",
      nativeName: "\u4E2D\u6587"
    },
    zu: {
      name: "Zulu",
      nativeName: "isiZulu"
    }
  };
  module.exports = LANGUAGES_LIST;
});

// node_modules/iso-639-1/src/index.js
var require_src = __commonJS((exports, module) => {
  var LANGUAGES_LIST = require_data();
  var LANGUAGES = {};
  var LANGUAGES_BY_NAME = {};
  var LANGUAGE_CODES = [];
  var LANGUAGE_NAMES = [];
  var LANGUAGE_NATIVE_NAMES = [];
  for (const code in LANGUAGES_LIST) {
    const { name, nativeName } = LANGUAGES_LIST[code];
    LANGUAGES[code] = LANGUAGES_BY_NAME[name.toLowerCase()] = LANGUAGES_BY_NAME[nativeName.toLowerCase()] = { code, name, nativeName };
    LANGUAGE_CODES.push(code);
    LANGUAGE_NAMES.push(name);
    LANGUAGE_NATIVE_NAMES.push(nativeName);
  }
  module.exports = class ISO6391 {
    static getLanguages(codes = []) {
      return codes.map((code) => ISO6391.validate(code) ? Object.assign({}, LANGUAGES[code]) : { code, name: "", nativeName: "" });
    }
    static getName(code) {
      return ISO6391.validate(code) ? LANGUAGES_LIST[code].name : "";
    }
    static getAllNames() {
      return LANGUAGE_NAMES.slice();
    }
    static getNativeName(code) {
      return ISO6391.validate(code) ? LANGUAGES_LIST[code].nativeName : "";
    }
    static getAllNativeNames() {
      return LANGUAGE_NATIVE_NAMES.slice();
    }
    static getCode(name) {
      name = name.toLowerCase();
      return LANGUAGES_BY_NAME.hasOwnProperty(name) ? LANGUAGES_BY_NAME[name].code : "";
    }
    static getAllCodes() {
      return LANGUAGE_CODES.slice();
    }
    static validate(code) {
      return LANGUAGES_LIST.hasOwnProperty(code);
    }
  };
});

// src/consts.ts
var userSelectedInstance = "0w0.is";
var userSelectedInstanceUrl = "https://" + userSelectedInstance;
var accountsPath = "users";
var statusesPath = "statuses";
var emojiCSS = `
.emoji {
	vertical-align: middle;
	/* stares at https://bugzilla.mozilla.org/show_bug.cgi?id=1310170 */
	height: 1.375rem;
	min-width: 1.375rem;
	transition: transform 0.1s ease-in-out;
	max-width: 100%;
	object-fit: contain;
}

.emoji:hover {
	z-index: 1;
	transform: scale(2);
}
`;
var postCSS = `
	width: calc(100% - 1rem);
	padding: 0.5rem 0.5rem 0.5rem 0.5rem;
	margin: 0.5rem 0.5rem 0 0.5rem;
	background: transparent;
	transition: background 0.2s ease-in-out;
	border-radius: 8px;
`;
var selectCss = `
select {
	color: var(--text);
	background: var(--background);
	border: 1px solid var(--border);
	border-radius: 8px;
	padding: 0.25rem;
	transition: border 0.2s ease-in-out;
	height: 100%;
}

select:hover {
	border-color: var(--accent);
}
`;

// src/utils.ts
function relativeTime(date) {
  const now = Date.now();
  const time = date.getTime();
  if (time < now)
    return `${toRelativeString(time, now)} ago`;
  else
    return `in ${toRelativeString(time, now)}`;
}
var toRelativeString = function(time, now) {
  if (time > now - 60000) {
    return `${Math.round((now - time) / 1000)}s`;
  } else if (time > now - 3600000) {
    return `${Math.round((now - time) / 1000 / 60)}m`;
  } else if (time > now - 86400000) {
    return `${Math.round((now - time) / 1000 / 60 / 60)}h`;
  } else if (time > now - 604800000) {
    return `${Math.round((now - time) / 1000 / 60 / 60 / 24)}d`;
  } else if (time > now - 2592000000) {
    return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 7)}w`;
  } else if (time > now - 31536000000) {
    return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 30)}mo`;
  } else {
    return `${Math.round((now - time) / 1000 / 60 / 60 / 24 / 365)}y`;
  }
};
function asReadableDate(date) {
  return date.toLocaleString();
}
async function fetchJsonAsync(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
async function fetchAsync(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
function escapeHTML(string) {
  const lookup = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return string.replace(/[&"'<>]/g, (c) => lookup[c]);
}
function formatInEmojis(string, emojis) {
  for (const emoji of emojis) {
    const emojiHtml = escapeHTML(emoji.shortcode);
    const emojiImg = `<img src="${emoji.url}" alt="${emojiHtml}" title=":${emojiHtml}:" class="emoji" />`;
    string = string.replaceAll(`:${emojiHtml}:`, emojiImg);
  }
  return parseHTML(string);
}
function createElement(elementType, classes = "") {
  const element = document.createElement(elementType);
  if (classes)
    element.className = classes;
  return element;
}
async function aCreateElement(elementType, classes = "") {
  const element = document.createElement(elementType);
  element.className = classes;
  return element;
}
function putChildrenInNewContainer(children, containerClass) {
  const childrenContainer = createElement("div", containerClass);
  childrenContainer.append(...children);
  return childrenContainer;
}
function parseHTML(html) {
  return Array.from(parser.parseFromString(`${html}`, "text/html").body.childNodes);
}
function parseSVG(svg) {
  return parser.parseFromString(svg, "image/svg+xml").firstChild;
}
function chunkArray(array, chunkSize) {
  return array.map((_item, index) => index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null).filter(Boolean);
}
function pathToAccount(accountId) {
  return `/${accountsPath}/${accountId}`;
}
var parser = new DOMParser;

// src/models/iconSet.ts
var IconSet;
(function(IconSet2) {
  IconSet2["MaterialSymbols"] = "material-symbols";
  IconSet2["Tabler"] = "tabler";
  IconSet2["FontAwesome"] = "font-awesome";
})(IconSet || (IconSet = {}));

// src/models/icons.ts
var Icon;
(function(Icon2) {
  Icon2["VisibilityPublic"] = "visibility-public";
  Icon2["VisibilityUnlisted"] = "visibility-unlisted";
  Icon2["VisibilityFollowers"] = "visibility-followers";
  Icon2["VisibilityLocal"] = "visibility-local";
  Icon2["VisibilityDirect"] = "visibility-direct";
  Icon2["Favourite"] = "favourite-star";
  Icon2["Boost"] = "boost";
  Icon2["Reply"] = "reply";
  Icon2["More"] = "more";
  Icon2["AddReaction"] = "add-reaction";
  Icon2["Quote"] = "quote";
})(Icon || (Icon = {}));

// src/models/visibility.ts
var Visibility;
(function(Visibility2) {
  Visibility2["Public"] = "public";
  Visibility2["Unlisted"] = "unlisted";
  Visibility2["Local"] = "local";
  Visibility2["Followers"] = "private";
  Visibility2["Direct"] = "direct";
})(Visibility || (Visibility = {}));

// src/curryingUtils.ts
function putChildrenInCurryContainer(container) {
  return function(children) {
    container.append(...children);
    return container;
  };
}
function putChildInCurryContainer(container) {
  return function(child) {
    if (child)
      container.appendChild(child);
    return container;
  };
}
function putChildInNewCurryContainer(containerClass, elementType = "div") {
  return function(child) {
    const container = createElement(elementType, containerClass);
    container.appendChild(child);
    return container;
  };
}
function putChildrenInNewCurryContainer(containerClass, elementType = "div") {
  return function(children) {
    const container = createElement(elementType, containerClass);
    container.append(...children);
    return container;
  };
}
function addClasses(classes) {
  return function(element) {
    element.className += " " + classes;
    return element;
  };
}

// src/assets.ts
async function fetchIcon(icon) {
  const iconSet2 = IconSet.MaterialSymbols;
  if (!icons2[icon]) {
    icons2[icon] = await fetchAsync(`/assets/svgs/${iconSet2}/${icon}.svg`).then(parseSVG).then(putChildInNewCurryContainer("svg"));
  }
  return icons2[icon];
}
function getIconEnumForVisibility(visibility2) {
  switch (visibility2) {
    case Visibility.Public:
      return Icon.VisibilityPublic;
    case Visibility.Unlisted:
      return Icon.VisibilityUnlisted;
    case Visibility.Local:
      return Icon.VisibilityLocal;
    case Visibility.Followers:
      return Icon.VisibilityFollowers;
    case Visibility.Direct:
      return Icon.VisibilityDirect;
    default:
      throw new Error("Unknown visibility: " + visibility2);
  }
}
var icons2 = {};

// src/fetchStuff.ts
async function fetchStatusById(id) {
  return fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/statuses/" + id);
}
async function fetchContextByPostId(id) {
  return fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/statuses/" + id + "/context");
}
async function fetchUserStatuses(id) {
  return fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/accounts/" + id + "/statuses");
}
async function fetchFederatedTimeline() {
  return fetchJsonAsync(userSelectedInstanceUrl + "/api/v1/timelines/public");
}
async function fetchStatusAndContext(statusId) {
  return Promise.all([fetchStatusById(statusId), fetchContextByPostId(statusId)]);
}

// src/elements/customElement.ts
class CustomHTMLElement extends HTMLElement {
  static tagName;
  static baseToClone;
  elements = {};
  values = {};
  static observedAttributes;
  constructor(css = new CSSStyleSheet, elements = {}, layout = undefined) {
    super();
    this.elements = elements;
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [css];
    shadow.append(...layout || Object.values(elements));
  }
  appendElements(...elements) {
    if (!this.shadowRoot)
      return;
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(...elements);
  }
  addClasses(classes) {
    this.className += " " + classes;
    return this;
  }
  update(element, newValue, update) {
    if (this.values[element] === newValue)
      return;
    if (this.values[element] === undefined && newValue === null)
      return;
    this.values[element] = newValue;
    const maybeElement = this.elements[element];
    if (maybeElement)
      update(maybeElement, newValue);
  }
  set(element, ...data) {
    this.elements[element].setData(...data);
  }
  replaceAll(valueName, newValue, replace, ...args) {
    if (this.values[valueName] !== newValue) {
      this.values[valueName] = newValue;
      this.shadowRoot?.replaceChildren(...replace(newValue, ...args));
    }
  }
  replaceChildrenOfElement(elementName, newValue, replace, ...args) {
    if (this.values[elementName] !== newValue) {
      this.values[elementName] = newValue;
      this.elements[elementName].replaceChildren(...replace(newValue, ...args));
    }
  }
  toggleClassOnElement(elementName, className, newValue) {
    if (this.values[`${elementName}-${className}`] !== newValue) {
      this.values[elementName] = newValue;
      this.elements[elementName].classList.toggle(className, newValue);
    }
  }
}

// src/elements/account/accountDisplayName.ts
var sheet = new CSSStyleSheet;
sheet.replaceSync(`
:host {
	font-weight: bold;
	margin: 0;
	display: inline-block;
}

${emojiCSS}
`);

class AccountDisplayName extends CustomHTMLElement {
  static tagName = "display-name";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    super(sheet);
  }
  setData(displayName, emojis) {
    this.replaceAll("displayName", displayName, formatInEmojis, emojis);
  }
}

// src/domUtils.ts
function newElement(elementData) {
  const element = document.createElement(elementData.element);
  for (const key in elementData) {
    if (key === "element")
      continue;
    if (key === "children" && elementData["children"]) {
      element.append(...elementData["children"]);
      continue;
    }
    if (element instanceof CustomHTMLElement && element.constructor.observedAttributes?.includes(key)) {
      element.setAttribute(key, elementData[key]);
    } else {
      element[key] = elementData[key];
    }
  }
  return element;
}
function setInnerText(element, text) {
  element.innerText = text;
}
function setInnerTextAsRelativeTime(element, time) {
  setInnerText(element, relativeTime(new Date(time)));
}
function putChildrenInContainer(container, ...children) {
  container.append(...children);
}
function addEventListener2(element, event, listener) {
  element.addEventListener(event, listener);
}
function setAnchorHref(element, href) {
  element.href = href;
}
function setSrc(element, src) {
  element.src = src;
}
function setTitle(element, title) {
  element.title = title;
}
function newContainerFor(type, classes, ...children) {
  const container = createElement(type, classes);
  container.append(...children);
  return container;
}
function addClasses2(element, classes) {
  element.className += " " + classes;
}

// src/elements/post/postBoostedBy.ts
var sheet2 = new CSSStyleSheet;
sheet2.replaceSync(`
:host {
	color: var(--repeated);
	display: flex;
	padding-bottom: 0.5rem;
	padding-left: calc(var(--post-pfp-size) + 0.5rem - 24px);
	white-space: pre-line;
}

.boosted-by-ico {
	margin-right: 0.5rem;
	fill: var(--repeated);
	height: 24px;
}

.boosted-time {
	text-align: right;
	display: inline-block;
	width: auto;
	margin-left: auto;
}

.boosted-by {
	white-space: pre;
}

display-name {
	--text-color: var(--repeated);
}
`);

class PostBoostedBy extends CustomHTMLElement {
  static tagName = "boosted-by";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      displayName: new AccountDisplayName,
      boostedTime: newElement({ element: "span", className: "boosted-time" })
    };
    const textSpan = newElement({
      element: "span",
      className: "boosted-by",
      innerText: "Boosted by "
    });
    const layout = [PostBoostedBy.getIcon(), textSpan, elements.displayName, elements.boostedTime];
    super(sheet2, elements, layout);
  }
  setData(post) {
    this.set("displayName", post.account.display_name, post.account.emojis);
    this.update("boostedTime", post.created_at, setInnerTextAsRelativeTime);
  }
  static getIcon() {
    const icon = newElement({ element: "custom-icon", icon: Icon.Boost });
    addClasses2(icon, "boosted-by-ico");
    return icon;
  }
}

// src/elements/account/accountAvatar.ts
var sheet3 = new CSSStyleSheet;
sheet3.replaceSync(`
:host {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	z-index: 1;
}

.avatar {
	height: var(--post-pfp-size);
	width: var(--post-pfp-size);
	border-radius: 8px;
}

:host(.with-border) .avatar {
	border: 4px solid var(--background-translucent);
}
`);

class AccountAvatar extends CustomHTMLElement {
  static tagName = "account-avatar";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      avatar: newElement({ element: "img", className: "avatar" })
    };
    super(sheet3, elements);
  }
  setData(avatarSrc) {
    this.update("avatar", avatarSrc, setSrc);
    return this;
  }
}

// src/elements/account/accountBio.ts
var sheet4 = new CSSStyleSheet;
sheet4.replaceSync(`
${emojiCSS}
`);

class AccountBio extends CustomHTMLElement {
  static tagName = "account-bio";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    super(sheet4);
  }
  setData(bio, emojis) {
    this.replaceAll("bio", bio, formatInEmojis, emojis);
  }
}

// src/elements/account/profilePreview.ts
var sheet5 = new CSSStyleSheet;
sheet5.replaceSync(`
:host {
	animation: 0.2s fadeIn;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    filter: opacity(0%);
  }
  100% {
    filter: opacity(100%);
  }
}

a {
	color: var(--accent);
}

.preview {
	margin-top: 0.5rem;
	background: var(--background);
	border-radius: 8px;
	border: 1px solid var(--border);
	box-shadow: 0 0 8px var(--shadow);
	overflow: hidden;
	--post-pfp-size:var(--pfp-size-large)
}

.header {
	height: 6rem;
	width: 100%;
	object-fit: cover;
}

x-avatar {
	position: absolute;
	top: calc(6rem - var(--post-pfp-size) / 2);
	left: 1rem;
}

.content {
	padding: 1rem;
}
`);

class ProfilePreview extends CustomHTMLElement {
  static tagName = "profile-preview";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      header: newElement({ element: "img", className: "header" }),
      avatar: AccountAvatar.newClone().addClasses("with-border"),
      displayName: AccountDisplayName.newClone(),
      bio: AccountBio.newClone(),
      createdAt: newElement({ element: "p", className: "created-at" })
    };
    const textContent = newContainerFor("div", "text-content", elements.displayName, elements.bio, elements.createdAt);
    const content = newContainerFor("div", "content", elements.avatar, textContent);
    const layout = [newContainerFor("div", "preview", elements.header, content)];
    super(sheet5, elements, layout);
  }
  setData(account) {
    this.update("header", account.header, setSrc);
    this.set("avatar", account.avatar);
    this.set("displayName", account.display_name, account.emojis);
    this.set("bio", account.note, account.emojis);
    this.update("createdAt", account.created_at, setInnerTextAsRelativeTime);
  }
}

// src/elements/post/avatarWithPreview.ts
var sheet6 = new CSSStyleSheet;
sheet6.replaceSync(`
:host {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: var(--post-pfp-size);
}

.link {
	width: var(--post-pfp-size);
	height: var(--post-pfp-size);
}

.avatar-line {
	display: none;
	background: var(--border);
	width: 4px;
	flex-grow: 1;
	margin-bottom: -1.5rem;
}

.avatar-line.visible {
	display: flex;
}

profile-preview {
	display: none;
	position: absolute;
	top: var(--post-pfp-size);
	z-index: 9;

	width: 50ch;
}

.preview-visible {
	display: block;
}
`);

class AvatarWithPreview extends CustomHTMLElement {
  static tagName = "avatar-with-preview";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      avatar: AccountAvatar.newClone(),
      anchor: newElement({ element: "a", className: "link" }),
      profilePreview: ProfilePreview.newClone(),
      avatarLine: newElement({ element: "div", className: "avatar-line" })
    };
    elements.anchor.appendChild(elements.avatar);
    const layout = [elements.anchor, elements.profilePreview, elements.avatarLine];
    super(sheet6, elements, layout);
    addEventListener2(elements.anchor, "click", AvatarWithPreview.toggleProfilePreview(this));
  }
  setData(account, includeSpaceForAvatarLine = false) {
    this.set("avatar", account.avatar);
    this.update("anchor", account.id, AvatarWithPreview.setAnchorToAccount);
    this.set("profilePreview", account);
    this.toggleClassOnElement("avatarLine", "visible", includeSpaceForAvatarLine);
  }
  static setAnchorToAccount(anchor, accountId) {
    setAnchorHref(anchor, pathToAccount(accountId));
  }
  static toggleProfilePreview(elem) {
    return function(e) {
      e.preventDefault();
      elem.elements["profilePreview"].classList.toggle("preview-visible");
    };
  }
}

// src/elements/post/emojiReaction.ts
var sheet7 = new CSSStyleSheet;
sheet7.replaceSync(`
:host {
	display: flex;
	align-items: center;
	padding: 0.5rem;
	gap: 0.5rem;
	border-radius: 8px;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out;
}

${emojiCSS}

:host(:hover) {
	border-color: var(--accent);
}

.emoji:hover {
	transform: scale(1);
}

:host(:hover) .emoji {
	transform: scale(1.5);
}
`);
var reactionType;
(function(reactionType2) {
  reactionType2[reactionType2["emojiReaction"] = 0] = "emojiReaction";
  reactionType2[reactionType2["customReaction"] = 1] = "customReaction";
})(reactionType || (reactionType = {}));

class EmojiReaction extends CustomHTMLElement {
  static tagName = "emoji-reaction";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      emoji: newElement({ element: "span", className: "emoji" }),
      count: newElement({ element: "span", className: "count" })
    };
    super(sheet7, elements);
  }
  setData(emojiReaction) {
    const newReactionType = EmojiReaction.getReactionType(emojiReaction);
    if (this.values["reactionType"] !== newReactionType) {
      this.values["reactionType"] = newReactionType;
      this.elements["emoji"].replaceChildren(EmojiReaction.createEmojiElement(emojiReaction));
    } else if (newReactionType === reactionType.customReaction) {
      setSrc(this.elements["emoji"], emojiReaction.url);
    } else {
      setInnerText(this.elements["emoji"], emojiReaction.name);
    }
    this.update("count", emojiReaction.count, setInnerText);
  }
  static getReactionType(emojiReaction) {
    if (emojiReaction.url) {
      return reactionType.customReaction;
    } else {
      return reactionType.emojiReaction;
    }
  }
  static createEmojiElement(emojiReaction) {
    if (emojiReaction.url) {
      const img = createElement("img");
      setSrc(img, emojiReaction.url);
      setTitle(img, `:${emojiReaction.name}:`);
      return img;
    } else {
      const span = createElement("span");
      setInnerText(span, emojiReaction.name);
      return span;
    }
  }
}

// src/elements/post/emojiReactions.ts
var sheet8 = new CSSStyleSheet;
sheet8.replaceSync(`
:host {
	margin-top: 0.5rem;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;
	row-gap: 0.5rem;
}
`);

class EmojiReactions extends CustomHTMLElement {
  static tagName = "emoji-reactions";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  currentReactions = {};
  constructor() {
    super(sheet8);
  }
  setData(emojiReactions) {
    if (!emojiReactions) {
      return;
    }
    emojiReactions.forEach((emojiReaction2) => {
      if (this.currentReactions[emojiReaction2.name]) {
        this.currentReactions[emojiReaction2.name].setData(emojiReaction2);
      } else {
        const reaction = new EmojiReaction;
        reaction.setData(emojiReaction2);
        this.currentReactions[emojiReaction2.name] = reaction;
        this.append(reaction);
      }
    });
  }
}

// src/elements/post/postInteractionItem.ts
var sheet9 = new CSSStyleSheet;
sheet9.replaceSync(`
:host {
	display: flex;
	align-items: center;
}

.icon {
	box-sizing: content-box;
	height: 24px;
	width: 24px;
	padding: 0.25rem;
	transition: fill 0.2s ease-in, transform 0.7s ease-in-out;
	fill: var(--post-interaction);
	cursor: pointer;
}

.interaction-text {
	margin-left: 0.25rem;
}

.svg {
	height: 24px;
	width: 24px;
}

.icon-${Icon.Favourite} {
	transform-origin: 50% 54%;
}

.icon:hover {
	fill: var(--accent);
}

.hidden-checkbox {
	display: none;
}

.hidden-checkbox:checked + .icon-${Icon.Reply},
.hidden-checkbox:checked + .icon-${Icon.Quote},
.hidden-checkbox:checked + .icon-${Icon.AddReaction} {
	fill: var(--interacted);
}

.hidden-checkbox:checked + .icon-${Icon.Boost} {
	fill: var(--repeated);
}

.hidden-checkbox:checked + .icon-${Icon.Favourite} {
	fill: var(--favourited);
}

.spinny-icon:hover,
.hidden-checkbox:checked + .spinny-icon {
	transform: rotate(360deg);
}

.display-none {
	display: none;
}
`);

class PostInteractionItem extends CustomHTMLElement {
  static tagName = "post-interaction-item";
  constructor(icon) {
    const elements = {
      hiddenCheckbox: newElement({
        element: "input",
        type: "checkbox",
        className: "hidden-checkbox",
        id: "checkbox"
      }),
      iconLabel: newElement({
        element: "label",
        className: `icon icon-${icon} ${PostInteractionItem.addClassIfSpinny(icon)}`,
        htmlFor: "checkbox",
        children: [newElement({ element: "custom-icon", icon })]
      }),
      interactionCount: newElement({
        element: "span",
        className: "interaction-text  display-none"
      })
    };
    super(sheet9, elements);
  }
  setData(count) {
    this.update("interactionCount", count, setInnerText);
    this.toggleClassOnElement("interactionCount", "display-none", count === undefined);
  }
  static addClassIfSpinny(icon) {
    switch (icon) {
      case Icon.Reply:
      case Icon.Boost:
      case Icon.Favourite:
      case Icon.AddReaction:
        return "spinny-icon";
      default:
        return "";
    }
  }
}

// src/elements/post/postInteractionsRow.ts
var sheet10 = new CSSStyleSheet;
sheet10.replaceSync(`
:host {
	display: flex;
	justify-content: space-between;
}

:host(.extra-margin) {
	margin-left: var(--post-pfp-size);
}
`);

class PostInteractionsRow extends CustomHTMLElement {
  static tagName = "post-interactions-row";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      [Icon.Reply]: new PostInteractionItem(Icon.Reply),
      [Icon.Boost]: new PostInteractionItem(Icon.Boost),
      [Icon.Quote]: new PostInteractionItem(Icon.Quote),
      [Icon.Favourite]: new PostInteractionItem(Icon.Favourite),
      [Icon.AddReaction]: new PostInteractionItem(Icon.AddReaction),
      [Icon.More]: new PostInteractionItem(Icon.More)
    };
    super(sheet10, elements);
  }
  setData(post) {
    this.set(Icon.Reply, post.replies_count);
    this.set(Icon.Boost, post.reblogs_count);
    this.set(Icon.Favourite, post.favourites_count);
  }
}

// src/elements/post/postMediaItem.ts
var sheet11 = new CSSStyleSheet;
sheet11.replaceSync(`
:host {
	border-radius: 8px;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out;
	max-width: 100%;
	height: 18rem;
	overflow: hidden;
	display: flex;
	justify-content: center;
	min-width: 20%;
	width: auto;
}

:host(:hover) {
	border-color: var(--border-hover);
}

.media {
	width: auto;
	height: 100%;
	max-width: 100%;
	margin: auto;
	display: block;
	object-fit: contain;
}

.post-media-item.sensitive {
	filter: blur(8px);
}
`);

class PostMediaItem extends CustomHTMLElement {
  static tagName = "post-media-item";
  element;
  src;
  isSensitive = false;
  constructor() {
    super(sheet11);
  }
  setData(attachment, isSensitive) {
    if (this.src !== attachment.url) {
      this.element = PostMediaItem.constructMediaDomItem(attachment);
      this.shadowRoot?.replaceChildren(this.element);
    }
    if (this.isSensitive !== isSensitive) {
      this.isSensitive = isSensitive;
      this.element?.classList.toggle("sensitive");
    }
  }
  static constructMediaDomItem(attachment) {
    let element;
    switch (attachment.type) {
      case "image":
        element = document.createElement("img");
        break;
      case "gifv":
      case "video":
        element = document.createElement("video");
        break;
      case "audio":
        element = document.createElement("audio");
        break;
      default:
        console.log(attachment);
        throw new Error("Unknown media type: " + attachment.type);
    }
    if (PostMediaItem.shouldEnableMediaControls(attachment.type)) {
      element.controls = true;
    }
    setSrc(element, attachment.url);
    addClasses2(element, "media");
    return element;
  }
  static shouldEnableMediaControls(attachmentType) {
    switch (attachmentType) {
      case "video":
      case "gifv":
      case "audio":
        return true;
      default:
        return false;
    }
  }
}

// src/elements/post/postMediaRow.ts
var sheet12 = new CSSStyleSheet;
sheet12.replaceSync(`
:host {
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	width: auto;
	max-width: 100%;
}
`);

class MediaRow extends CustomHTMLElement {
  static tagName = "media-row";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  mediaItems = [];
  constructor() {
    super(sheet12);
  }
  setData(attachments, isSensitive) {
    attachments.forEach((attachment, index) => {
      let mediaItem = this.mediaItems[index];
      if (!mediaItem) {
        mediaItem = new PostMediaItem;
        this.mediaItems.push(mediaItem);
      }
      mediaItem.setData(attachment, isSensitive);
    });
    this.shadowRoot?.replaceChildren(...this.mediaItems);
  }
}

// src/elements/post/postMedia.ts
var sheet13 = new CSSStyleSheet;
sheet13.replaceSync(`
:host {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
}
`);

class PostMedia extends CustomHTMLElement {
  static tagName = "post-media";
  static maxItemsInRow = 3;
  rows = [];
  constructor() {
    super(sheet13);
  }
  setData(attachments, isSensitive) {
    const chunked = chunkArray(attachments, PostMedia.maxItemsInRow);
    chunked.forEach((chunk, index) => {
      let row = this.rows[index];
      if (!row) {
        row = new MediaRow;
        this.rows.push(row);
        this.appendElements(row);
      }
      row.setData(chunk, isSensitive);
    });
  }
}

// src/elements/post/postTextContent.ts
var sheet14 = new CSSStyleSheet;
sheet14.replaceSync(`
:host {
	overflow-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

pre {
	white-space: pre-wrap;
}

p {
	margin: 0;
}

a {
	color: var(--accent);
}

/* akkoma sends the inline quote text (RE: <Link to quoted post>) in a span with this class */
.quote-inline {
	display: none;
}

/* but on quoted posts that are also quoting something, probably a good idea to show that it is */
/* TODO get this bit to work again */
.post-quote .quote-inline {
	display: inline;
}

${emojiCSS}
`);

class PostTextContent extends CustomHTMLElement {
  static tagName = "post-text-content";
  constructor() {
    super(sheet14);
  }
  setData(content, emojis, mentions) {
    this.replaceAll("content", content, PostTextContent.parseContent, emojis, mentions);
  }
  static parseContent(content, emojis, mentions) {
    const parsedNodes = formatInEmojis(content, emojis);
    PostTextContent.addOnClickListenersToMentions(parsedNodes, mentions);
    return parsedNodes;
  }
  static addOnClickListenersToMentions(elements, mentions) {
    elements.forEach((element) => PostTextContent.walk(element, mentions));
  }
  static walk(node, mentions) {
    const children = node.childNodes;
    children.forEach((child) => PostTextContent.walk(child, mentions));
    PostTextContent.interceptUrlMentions(node, mentions);
  }
  static interceptUrlMentions(node, mentions) {
    if (!(node instanceof HTMLAnchorElement) || node.className !== "u-url mention")
      return;
    const mention = mentions.find((mention2) => mention2.url === node.href);
    if (!mention)
      return;
    node.title = mention.acct;
    node.dataset["accountId"] = mention.id;
    node.addEventListener("click", this.redirectToAccountPageOnClick);
  }
  static redirectToAccountPageOnClick(e) {
    e.preventDefault();
    let targetElement;
    if (e.target instanceof HTMLSpanElement)
      targetElement = e.target.parentElement;
    else
      targetElement = e.target;
    if (!targetElement)
      return;
    history.pushState(null, "", pathToAccount(targetElement.dataset["accountId"]));
    window.dispatchEvent(new Event("popstate"));
  }
}

// src/userInstanceInfo.ts
var isAkkoma = true;

// src/elements/account/usernameAcct.ts
var sheet15 = new CSSStyleSheet;
sheet15.replaceSync(`
:host {
	display: flex;
	align-items: center;
}

.acct {
	display: flex;
	align-items: center;
	color: var(--accent);
}

.username {
	color: var(--text);
	margin: 0;
	display: flex;
	align-items: center;
}

.instance {
	color: var(--subtext);
}

.favicon {
	margin-left: 0.5rem;
	width: 16px;
	height: 16px;
	transition: transform 0.1s ease-in-out;
}

.favicon:hover {
	transform: scale(2);
}
`);

class UsernameAcct extends CustomHTMLElement {
  static tagName = "username-acct";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      acct: createElement("a", "acct"),
      username: createElement("span", "username"),
      instance: createElement("span", "instance"),
      favicon: isAkkoma ? createElement("img", "favicon") : ""
    };
    putChildrenInContainer(elements.acct, elements.username, elements.instance);
    const layout = [elements.acct, elements.favicon];
    super(sheet15, elements, layout);
  }
  setData(account) {
    let [username, instance] = account.acct.split("@");
    if (!instance)
      instance = userSelectedInstance;
    this.update("username", `@${username}`, setInnerText);
    this.update("instance", `@${instance}`, setInnerText);
    this.update("acct", account.id, UsernameAcct.setAcctHref);
    this.setFavicon(account.akkoma.instance);
  }
  static setAcctHref(acct, accountId) {
    setAnchorHref(acct, pathToAccount(accountId));
  }
  setFavicon(instance) {
    if (!isAkkoma)
      return;
    if (!instance || !instance.favicon)
      return;
    this.update("favicon", instance.favicon, setSrc);
    let title;
    if (instance.nodeinfo?.software?.version)
      title = `${instance.name} (${instance.nodeinfo.software.name} ${instance.nodeinfo.software.version})`;
    else
      title = instance.name;
    this.update("favicon", title, setTitle);
  }
}

// src/elements/post/postInfo.ts
var sheet16 = new CSSStyleSheet;
sheet16.replaceSync(`
:host {
	display: flex;
}

a {
	color: var(--accent);
}

.poster-text-info {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-left: 1rem;
}

.left-column {
	display: flex;
	flex-direction: column;
}

.right-column {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.display-none {
	display: none;
}

.post-visibility {
	fill: var(--subtext);
	height: 24px;
}

.times {
	text-align: right;
}
`);

class PostInfo extends CustomHTMLElement {
  static tagName = "post-info";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      avatar: AvatarWithPreview.newClone().addClasses("display-none"),
      displayName: new AccountDisplayName,
      usernameAcct: new UsernameAcct,
      createdAt: newElement({ element: "span", className: "post-time" }),
      editedAt: newElement({ element: "span", className: "edit-time" }),
      visibility: newElement({ element: "span", className: "post-visibility" }),
      times: newElement({ element: "a", className: "times" })
    };
    elements.times.append(elements.createdAt, elements.editedAt);
    const leftCol = newElement({
      element: "div",
      className: "left-column",
      children: [elements.displayName, elements.usernameAcct]
    });
    const rightCol = newElement({
      element: "div",
      className: "right-column",
      children: [elements.times, elements.visibility]
    });
    const textInfo = newElement({
      element: "div",
      className: "poster-text-info",
      children: [leftCol, rightCol]
    });
    const layout = [elements.avatar, textInfo];
    super(sheet16, elements, layout);
  }
  setData(post, shouldIncludeAvatar) {
    if (shouldIncludeAvatar)
      this.set("avatar", post.account);
    this.toggleClassOnElement("avatar", "display-none", !shouldIncludeAvatar);
    this.set("displayName", post.account.display_name, post.account.emojis);
    this.set("usernameAcct", post.account);
    this.update("createdAt", post.created_at, PostInfo.setCreatedAt);
    this.update("editedAt", post.edited_at, PostInfo.setEditedAt);
    this.update("times", post.id, PostInfo.setTimesHref);
    this.replaceChildrenOfElement("visibility", post.visibility, PostInfo.newPostVisibilityIcon);
  }
  static newPostVisibilityIcon(visibility2) {
    const icon = newElement({
      element: "custom-icon",
      icon: getIconEnumForVisibility(visibility2)
    });
    addClasses2(icon, "post-visibility");
    setTitle(icon, visibility2);
    return [icon];
  }
  static setCreatedAt(createdAtSpan, createdAt) {
    const date = new Date(createdAt);
    setInnerText(createdAtSpan, relativeTime(date));
    setTitle(createdAtSpan, asReadableDate(date));
  }
  static setEditedAt(editedAtSpan, editedAt) {
    const date = new Date(editedAt);
    setInnerText(editedAtSpan, ` (edited ${relativeTime(date)})`);
    setTitle(editedAtSpan, asReadableDate(date));
  }
  static setTimesHref(times, statusId) {
    setAnchorHref(times, `/${statusesPath}/${statusId}`);
  }
}

// src/elements/post/postContentWarning.ts
var sheet17 = new CSSStyleSheet;
sheet17.replaceSync(`
span {
	overflow-wrap: anywhere;
	hyphens: auto;
}

button {
	background: none;
	border: var(--accent) 1px solid;
	border-radius: 8px;
	color: var(--text);
	cursor: pointer;
	font-size: 1rem;
	font-weight: bold;
  line-height: 20px;
  transition: transform .1s;
}

button:hover {
  background: var(--button-background-hover);
}

button:active {
  transform: scale(.96);
	background: var(--button-background-active);
}

${emojiCSS}
`);

class PostContentWarning extends CustomHTMLElement {
  static tagName = "post-content-warning";
  constructor() {
    const elements = {
      content: newElement({ element: "span" }),
      showContent: newElement({ element: "button", innerText: "Show content" })
    };
    const layout = [elements.content, " ", elements.showContent];
    super(sheet17, elements, layout);
  }
  setData(content, emojis, parent) {
    this.replaceChildrenOfElement("content", content, formatInEmojis, emojis);
    this.update("showContent", parent, PostContentWarning.setOnClick);
  }
  static setOnClick(button, parent) {
    button.onclick = () => {
      parent.classList.toggle("content-hidden");
      button.innerText = parent.classList.contains("content-hidden") ? "Show content" : "Hide content";
    };
  }
}

// src/elements/post/standardPost.ts
var sheet18 = new CSSStyleSheet;
sheet18.replaceSync(`
:host {
	${postCSS}
	display: flex;
}

:host(.quoted-post) {
	margin: 0;
	padding: 0.5rem;
	border: 1px solid var(--border);
	transition: border 0.2s ease-in-out;
	border-radius: 8px;
}

:host(.quoted-post:hover) {
	border-color: var(--border-hover);
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
}

:host(.boosted-post),
:host(.boosted-post:hover) {
	padding: 0;
	margin: 0;
	background: none;
	width: 100%;
}

.post-body {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-inner-body {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-spoiler .post-inner-body {
	filter: blur(8px);
	/*height: 2ch;*/
	overflow: hidden;
	user-select: none;
}

.display-none {
	display: none;
}

:host(.content-hidden) .post-inner-body {
	display: none;
}

:host(.content-hidden) .quoted-post {
	display: none;
}
`);

class StandardPost extends CustomHTMLElement {
  static tagName = "standard-post";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      avatar: AvatarWithPreview.newClone().addClasses("display-none"),
      posterInfo: PostInfo.newClone(),
      spoilerText: new PostContentWarning,
      content: new PostTextContent,
      media: new PostMedia,
      quote: "",
      emojiReactions: EmojiReactions.newClone(),
      interactionsRow: PostInteractionsRow.newClone()
    };
    const innerBody = newElement({
      element: "div",
      className: "post-inner-body",
      children: [elements.content, elements.media]
    });
    const body = newElement({
      element: "div",
      className: "post-body",
      children: [
        elements.posterInfo,
        elements.spoilerText,
        innerBody,
        elements.emojiReactions,
        elements.interactionsRow
      ]
    });
    const layout = [elements.avatar, body];
    super(sheet18, elements, layout);
  }
  setData(post, includeSpaceForAvatarLine, isQuoted) {
    this.id = post.id;
    this.toggleClassOnElement("avatar", "display-none", !includeSpaceForAvatarLine);
    if (includeSpaceForAvatarLine)
      this.set("avatar", post.account, true);
    this.set("posterInfo", post, !includeSpaceForAvatarLine);
    this.toggleClassOnElement("spoilerText", "display-none", !post.spoiler_text);
    this.set("spoilerText", post.spoiler_text, post.emojis, this);
    if (post.spoiler_text)
      this.classList.add("content-hidden");
    this.toggleClassOnElement("content", "display-none", !post.content);
    this.set("content", post.content, post.emojis, post.mentions);
    this.toggleClassOnElement("media", "display-none", !post.media_attachments.length);
    this.set("media", post.media_attachments, post.sensitive);
    if (post.quote) {
      if (!this.elements["quote"]) {
        const quote = StandardPost.newClone().addClasses("quoted-post");
        this.elements["quote"] = quote;
        this.elements["emojiReactions"].parentNode.insertBefore(quote, this.elements["emojiReactions"]);
      }
      this.elements["quote"].setData(post.quote, false, true);
    }
    this.toggleClassOnElement("emojiReactions", "display-none", !post.emoji_reactions?.length);
    this.set("emojiReactions", post.emoji_reactions);
    this.toggleClassOnElement("interactionsRow", "display-none", isQuoted);
    this.toggleClassOnElement("interactionsRow", "extra-margin", !includeSpaceForAvatarLine);
    this.set("interactionsRow", post, includeSpaceForAvatarLine);
  }
}

// src/elements/post/boost.ts
var sheet19 = new CSSStyleSheet;
sheet19.replaceSync(`
:host {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	${postCSS}
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
`);

class Boost extends CustomHTMLElement {
  static tagName = "boost-post";
  static baseToClone;
  static newClone() {
    if (!this.baseToClone)
      this.baseToClone = new this;
    return this.baseToClone.cloneNode(true);
  }
  constructor() {
    const elements = {
      boostedBy: new PostBoostedBy,
      post: new StandardPost().addClasses("boosted-post")
    };
    super(sheet19, elements);
  }
  setData(post) {
    if (!post.reblog)
      throw new Error("Post is not boosted");
    this.id = post.id;
    this.set("boostedBy", post);
    this.set("post", post.reblog);
  }
}

// src/elements/post/post.ts
var sheet20 = new CSSStyleSheet;
sheet20.replaceSync(`
:host {
	width: calc(100% - 1rem);
	/* todo root post should have top split 50/50 */
	padding: 0.5rem 0.5rem 0.5rem 0.5rem;
	margin: 0.5rem 0.5rem 0 0.5rem;
	display: flex;
	background: transparent;
	transition: background 0.2s ease-in-out;
	border-radius: 8px;
}

:host(.quoted-post) {
	margin: 0;
	padding: 0.5rem;
	width: 100%;
}

:host(:hover) {
	--post-interaction: var(--text);
	background: var(--background-post-hover);
}

.boosted-post,
.boosted-post:hover {
	padding: 0;
	margin: 0;
	background: none;
}

.post-body {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-inner-body {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.post-spoiler .post-inner-body {
	filter: blur(8px);
	/*height: 2ch;*/
	overflow: hidden;
	user-select: none;
}
`);

class Post {
  static async build(post, inludeSpaceForAvatarLine = false, isQuoted = false) {
    if (post.reblog) {
      return this.constructBoost(post);
    } else {
      return this.constructPost(inludeSpaceForAvatarLine, post, isQuoted);
    }
  }
  static fillMissingData(post) {
    return post;
  }
  static constructBoost(post) {
    const boost2 = Boost.newClone();
    boost2.setData(post);
    return boost2;
  }
  static constructPost(inludeSpaceForAvatarLine, post, isQuoted) {
    const newPost = StandardPost.newClone();
    newPost.setData(post, inludeSpaceForAvatarLine, isQuoted);
    return newPost;
  }
}

// node_modules/autosize/dist/autosize.esm.js
var t = function(t2) {
  var o = e.get(t2);
  o && o.destroy();
};
var o = function(t2) {
  var o2 = e.get(t2);
  o2 && o2.update();
};
var e = new Map;
var r = null;
typeof window == "undefined" ? ((r = function(e2) {
  return e2;
}).destroy = function(e2) {
  return e2;
}, r.update = function(e2) {
  return e2;
}) : ((r = function(t2, o2) {
  return t2 && Array.prototype.forEach.call(t2.length ? t2 : [t2], function(t3) {
    return function(t4) {
      if (t4 && t4.nodeName && t4.nodeName === "TEXTAREA" && !e.has(t4)) {
        var o3, r2 = null, n = window.getComputedStyle(t4), i = (o3 = t4.value, function() {
          a({ testForHeightReduction: o3 === "" || !t4.value.startsWith(o3), restoreTextAlign: null }), o3 = t4.value;
        }), l = function(o4) {
          t4.removeEventListener("autosize:destroy", l), t4.removeEventListener("autosize:update", s), t4.removeEventListener("input", i), window.removeEventListener("resize", s), Object.keys(o4).forEach(function(e2) {
            return t4.style[e2] = o4[e2];
          }), e.delete(t4);
        }.bind(t4, { height: t4.style.height, resize: t4.style.resize, textAlign: t4.style.textAlign, overflowY: t4.style.overflowY, overflowX: t4.style.overflowX, wordWrap: t4.style.wordWrap });
        t4.addEventListener("autosize:destroy", l), t4.addEventListener("autosize:update", s), t4.addEventListener("input", i), window.addEventListener("resize", s), t4.style.overflowX = "hidden", t4.style.wordWrap = "break-word", e.set(t4, { destroy: l, update: s }), s();
      }
      function a(e2) {
        var o4, i2, l2 = e2.restoreTextAlign, s2 = l2 === undefined ? null : l2, d = e2.testForHeightReduction, u = d === undefined || d, c = n.overflowY;
        if (t4.scrollHeight !== 0 && (n.resize === "vertical" ? t4.style.resize = "none" : n.resize === "both" && (t4.style.resize = "horizontal"), u && (o4 = function(e3) {
          for (var t5 = [];e3 && e3.parentNode && e3.parentNode instanceof Element; )
            e3.parentNode.scrollTop && t5.push([e3.parentNode, e3.parentNode.scrollTop]), e3 = e3.parentNode;
          return function() {
            return t5.forEach(function(e4) {
              var t6 = e4[0], o5 = e4[1];
              t6.style.scrollBehavior = "auto", t6.scrollTop = o5, t6.style.scrollBehavior = null;
            });
          };
        }(t4), t4.style.height = ""), i2 = n.boxSizing === "content-box" ? t4.scrollHeight - (parseFloat(n.paddingTop) + parseFloat(n.paddingBottom)) : t4.scrollHeight + parseFloat(n.borderTopWidth) + parseFloat(n.borderBottomWidth), n.maxHeight !== "none" && i2 > parseFloat(n.maxHeight) ? (n.overflowY === "hidden" && (t4.style.overflow = "scroll"), i2 = parseFloat(n.maxHeight)) : n.overflowY !== "hidden" && (t4.style.overflow = "hidden"), t4.style.height = i2 + "px", s2 && (t4.style.textAlign = s2), o4 && o4(), r2 !== i2 && (t4.dispatchEvent(new Event("autosize:resized", { bubbles: true })), r2 = i2), c !== n.overflow && !s2)) {
          var v = n.textAlign;
          n.overflow === "hidden" && (t4.style.textAlign = v === "start" ? "end" : "start"), a({ restoreTextAlign: v, testForHeightReduction: true });
        }
      }
      function s() {
        a({ testForHeightReduction: true, restoreTextAlign: null });
      }
    }(t3);
  }), t2;
}).destroy = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], t), e2;
}, r.update = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], o), e2;
});
var n = r;
var autosize_esm_default = n;

// src/newPost/autoSizeTextArea.ts
class AutoSize extends HTMLTextAreaElement {
  static tagName = "auto-size";
  static extends = "textarea";
  constructor() {
    super();
    autosize_esm_default(this);
  }
}

// src/elements/customIcon.ts
var sheet21 = new CSSStyleSheet;
sheet21.replaceSync(`

`);

class CustomIcon extends CustomHTMLElement {
  static tagName = "custom-icon";
  static observedAttributes = ["icon"];
  constructor() {
    super(sheet21);
  }
  setData() {
  }
  async attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot?.append(await fetchIcon(newValue).then((icon) => icon.cloneNode(true)));
  }
}

// src/newPost/languageSelector.ts
var import_iso_639_1 = __toESM(require_src(), 1);
var sheet22 = new CSSStyleSheet;
sheet22.replaceSync(`
select {
	font-family: monospace;
	width: 6ch;
}

${selectCss}
`);

class LanguageSelector extends CustomHTMLElement {
  static tagName = "language-selector";
  constructor() {
    const elements = {
      select: newElement({ element: "select" })
    };
    for (const code of import_iso_639_1.default.getAllCodes()) {
      const name = import_iso_639_1.default.getNativeName(code);
      const option = newElement({
        element: "option",
        value: code,
        innerText: `${code} - ${name}`
      });
      elements.select.append(option);
    }
    super(sheet22, elements);
  }
  setData() {
  }
}

// src/newPost/postFormatSelector.ts
var sheet23 = new CSSStyleSheet;
sheet23.replaceSync(`
${selectCss}
`);

class PostFormatSelector extends CustomHTMLElement {
  static tagName = "post-format-selector";
  constructor() {
    const elements = {
      select: newElement({ element: "select" })
    };
    const options = ["Text", "Markdown", "MFM", "HTML", "BBCode"];
    options.forEach((option) => {
      const optionElement = newElement({
        element: "option",
        textContent: option
      });
      elements.select.appendChild(optionElement);
    });
    super(sheet23, elements);
  }
  setData() {
  }
}

// src/defineCustomElements.ts
function defineCustomElements() {
  const elements = [
    AutoSize,
    LanguageSelector,
    PostFormatSelector,
    CustomIcon,
    AccountAvatar,
    AccountBio,
    AccountDisplayName,
    ProfilePreview,
    UsernameAcct,
    AvatarWithPreview,
    Boost,
    PostBoostedBy,
    EmojiReaction,
    EmojiReactions,
    PostInteractionsRow,
    MediaRow,
    PostTextContent,
    PostContentWarning,
    PostInfo,
    PostInteractionItem,
    PostMedia,
    PostMediaItem,
    StandardPost
  ];
  elements.forEach((element) => {
    if (element.extends) {
      customElements.define(element.tagName, element, { extends: element.extends });
    } else {
      customElements.define(element.tagName, element);
    }
  });
}

// src/app.ts
async function main() {
  defineCustomElements();
  addEventListener("popstate", () => {
    console.log("popstate");
    doStuffForUrl();
  });
  doStuffForUrl();
}
async function doStuffForUrl() {
  const url = new URL(document.location.href);
  const path = url.pathname.split("/");
  timelineDiv.innerHTML = "";
  perfLastTime = performance.now();
  fetchIconsInAdvance().then(perfMessage("fetchIconsInAdvance"));
  switch (path[1]) {
    case accountsPath: {
      const accountId = path[2];
      fetchUserStatuses(accountId).then(perfMessage("fetchUserStatuses")).then(renderTimeline).then(perfMessage("renderTimeline"));
      break;
    }
    case statusesPath: {
      const statusId = path[2];
      const [status, context] = await fetchStatusAndContext(statusId).then(perfMessage("fetchStatusAndContext"));
      const postTrees = await putStatusInContext(status, context).then(buildPostTree).then(perfMessage("buildPostTree"));
      renderPostTree(postTrees[0]).then(perfMessage("renderPostTree")).then(putChildrenInCurryContainer(timelineDiv)).then(() => {
        scrollToIfReply(status);
        loadingPostsDiv.style.display = "none";
      });
      break;
    }
    default: {
      fetchFederatedTimeline().then(perfMessage("fetchFederatedTimeline")).then(renderTimeline).then(perfMessage("renderTimeline"));
      break;
    }
  }
}
async function fetchIconsInAdvance() {
  Object.values(Icon).map(fetchIcon);
}
var scrollToIfReply = function(status) {
  if (status.in_reply_to_id)
    scrollToElementWithId(status.id);
};
var scrollToElementWithId = function(id) {
  document.getElementById(id).scrollIntoView();
};
async function putStatusInContext(status, context) {
  return [...context.ancestors, status, ...context.descendants];
}
var renderTimeline = function(statuses) {
  timelineDiv.innerHTML = "";
  return Promise.all(statuses.map(fetchPostsUpwards)).then(perfMessage("fetchPostsUpwards")).then((posts) => Promise.all(posts.map(renderPostGroup))).then(perfMessage("renderPostGroup")).then(putChildrenInCurryContainer(timelineDiv));
};
async function fetchPostsUpwards(post2, heightAbove = 1) {
  if (post2.in_reply_to_id && heightAbove > 0) {
    return fetchStatusById(post2.in_reply_to_id).then((fetchedPost) => fetchPostsUpwards(fetchedPost, heightAbove - 1)).then((posts) => [...posts, post2]);
  } else
    return [post2];
}
async function renderPostGroup(posts) {
  const postContainer = aCreateElement("div", "post-container");
  if (posts[0].in_reply_to_id) {
    constructReplyTopLine(posts[0]).then(putChildInCurryContainer(await postContainer));
  }
  return Promise.all(posts.map((post2, index, { length }) => Post.build(post2, index !== length - 1))).then(putChildrenInCurryContainer(await postContainer));
}
async function renderPostTree(tree) {
  const postDiv = StandardPost.newClone();
  postDiv.setData(tree, tree.children && tree.children.length > 0, false);
  if (!tree.children || tree.children.length === 0) {
    return [postDiv];
  } else if (tree.children.length === 1) {
    return [postDiv, ...await renderPostTree(tree.children[0])];
  } else {
    return Promise.all(tree.children.map(renderPostTree)).then((children) => children.map(putChildrenInNewCurryContainer("post-child-container"))).then((childrenDivs) => Promise.all(childrenDivs.map(putChildrenInContainerWithLine))).then(putChildrenInNewCurryContainer("post-children-container")).then(async (childrenContainer) => {
      return [postDiv, childrenContainer];
    });
  }
  async function putChildrenInContainerWithLine(childrenDiv) {
    return Promise.all([
      aCreateElement("div", "post-child-line-connector"),
      aCreateElement("div", "post-child-line")
    ]).then(putChildrenInNewCurryContainer("post-child-line-container")).then((lineContainer) => putChildrenInNewContainer([lineContainer, childrenDiv], "post-child-container-outer"));
  }
}
async function constructReplyTopLine(post2) {
  let replyTo = post2.mentions.find((mention) => mention.id === post2.in_reply_to_account_id);
  if (!replyTo)
    replyTo = post2.account;
  const line = newElement({ element: "div", className: "avatar-line-top" });
  const icon = newElement({ element: "custom-icon", icon: Icon.Reply });
  addClasses("post-replies-top-icon")(icon);
  const text = newElement({
    element: "a",
    className: "post-replies-top-text",
    href: `/${statusesPath}/${post2.in_reply_to_id}`,
    innerText: "Reply to " + replyTo.acct
  });
  return newElement({
    element: "div",
    className: "post-replies-top",
    children: [line, icon, text]
  });
}
var buildPostTree = function(statuses) {
  const tree = [];
  for (let i = 0;i < statuses.length; i++) {
    if (statuses[i].in_reply_to_id) {
      const parent = statuses.filter((status) => status.id === statuses[i].in_reply_to_id).pop();
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(statuses[i]);
    } else {
      tree.push(statuses[i]);
    }
  }
  return tree;
};
var perfMessage = function(message) {
  return async function(value) {
    await value;
    console.log(message + " took " + (performance.now() - perfLastTime) + "ms");
    perfLastTime = performance.now();
    return value;
  };
};
var timelineDiv = document.getElementById("timeline-content");
var loadingPostsDiv = document.getElementById("loading-posts");
var perfLastTime = performance.now();
main().catch(console.error);

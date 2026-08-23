// ── Venue directory ──────────────────────────────────────────────
// 1店舗 = 1エントリ。URL の ?venue=<略称> でどのエントリを表示するか切り替わる。
// 例: index.html?venue=TGOO
//
// フィールド:
//   name          会場名（必須）
//   city          表示用の地域名（必須）
//   heroImage     トップのヒーロー背景写真。未設定ならプレースホルダー表示
//   venueImage    データ提出窓口カードに出す会場写真。未設定ならプレースホルダー表示
//   formUrl       データ提出フォームのURL。未設定なら「フォーム準備中」表示
//   contactEmail  よくあるご質問の「解決しないときは」に出す問い合わせ先
//   businessHours 同上、営業時間の表記
//
// 新しい店舗を追加する時は、このオブジェクトに1エントリ追記するだけでよい。
// index.html 側やコンポーネント側の変更は不要。

const VENUES = {
  TGOO: {
    name: 'THE GARDEN ORIENTAL OSAKA',
    city: '大阪',
    heroImage: 'logo/hero-chapel.jpg',
    venueImage: 'logo/venue-tgoo.png',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSenXJPyBJgJN4O1k4TCzEA1NNl7F7BfB6RxjQasbx_J1w31Kg/viewform?usp=header',
    contactEmail: 'osaka@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  TKN: {
    name: 'THE KAWABUN NAGOYA（料亭河文）',
    city: '名古屋',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScJ_bvnLwLEpBEHJXf98gvLTq33tFpJpqqwWLI3A40th6aiHQ/viewform?usp=dialog',
    contactEmail: 'fem.nagoya@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  TCH: {
    name: 'THE CONDER HOUSE',
    city: '名古屋',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc8hnaTSG7hJGgqLOXjPFein62LaPALAMm4XEZKzMejm2W7bA/viewform?usp=dialog',
    contactEmail: 'fem.nagoya@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  TNH: {
    name: 'THE NANZAN HOUSE',
    city: '名古屋',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScTw1oRoE6N5xDnHU0F5jCczIigWm9g-ryATNjwtEtUfYws6Q/viewform?usp=dialog',
    contactEmail: 'fem.nagoya@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  MGH: {
    name: 'THE MARK GRAND HOTEL',
    city: '埼玉',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfXdTnMifWzCM9iOsqZQL6ZI6pEUwPeB5-rR792qAJMi89NPg/viewform?usp=dialog',
    contactEmail: 'mgh.bridal@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  MHY: {
    name: 'THE MARITIME HOTEL YOKOHAMA BAY',
    city: '横浜',
    // 要確認: 頂いたURLが MGH と同一だったため、そのまま暫定反映しています。
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfXdTnMifWzCM9iOsqZQL6ZI6pEUwPeB5-rR792qAJMi89NPg/viewform?usp=dialog',
    contactEmail: 'mgh.bridal@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  KSR: {
    name: 'KIKUSUIRO',
    city: '奈良',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdiOfuH58CUZyuvGPa1xau5EpMvsh1bubUgzokasIu31_hj7g/viewform?usp=dialog',
    contactEmail: 'osaka@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  SDH: {
    name: 'THE SODOH HIGASHIYAMA KYOTO',
    city: '京都',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdf-0L9fsSAKUBixjryub9tO07PvvwRxlI_XYv5fdxB1DCt7w/viewform?usp=dialog',
    contactEmail: 'femkyoto@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  FGK: {
    name: 'FORTUNE GARDEN KYOTO',
    city: '京都',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe6tfyOOTuPlZFM3H6qprYiJuAZkccsD2UOuQ9kqtrrn89oTA/viewform?usp=dialog',
    contactEmail: 'femkyoto@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  OHK: {
    name: 'THE ORIENT KOBE',
    city: '神戸',
    // 要確認: 提出フォームURLが未着のため空欄(「フォーム準備中」表示)にしています。
    formUrl: '',
    contactEmail: 'oriental@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  WTS: {
    name: 'WITH THE STYLE FUKUOKA',
    city: '福岡',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfGBdbVcXYZlkYE7Y-Pdb2KpQ73XINnNGDrJlaMEChEUZDNsQ/viewform?usp=dialog',
    contactEmail: 'hakata@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  TLF: {
    name: 'THE LUIGANS Spa & Resort',
    city: '福岡',
    // 要確認: 頂いたURLが WTS と同一だったため、そのまま暫定反映しています。
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfGBdbVcXYZlkYE7Y-Pdb2KpQ73XINnNGDrJlaMEChEUZDNsQ/viewform?usp=dialog',
    contactEmail: 'hakata@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  KHC: {
    name: '熊本ホテルキャッスル',
    city: '熊本',
    // 要確認: 提出フォームURLが未着のため空欄(「フォーム準備中」表示)にしています。
    formUrl: '',
    contactEmail: 'kumamoto@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  SWGH: {
    name: 'Southwest Grand Hotel',
    city: '沖縄',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdwIF_4yYp2Q7Mgz-9LtZ_M2gazxrXZxWoIH1S0K4DwxhbIlg/viewform?usp=dialog',
    contactEmail: 'okinawa@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
  SGO: {
    name: 'South Gate Hotel Okinawa',
    city: '沖縄',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeGJSnQd9Aaqo2KOJ-X32TkGbyubAT8NWaErGogV3a8Rzu9tQ/viewform?usp=dialog',
    contactEmail: 'okinawa@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },
};

// 別名 → 正式な略称。旧URL(?venue=osaka-tgoo)との互換や、
// 1店舗に複数の略称がある場合(例: TKN / KBN)に使う。
const VENUE_ALIASES = {
  KBN: 'TKN',
  'osaka-tgoo': 'TGOO',
};

const DEFAULT_VENUE_SLUG = 'TGOO';

function resolveVenueSlug() {
  const raw = new URLSearchParams(window.location.search).get('venue');
  if (!raw) return DEFAULT_VENUE_SLUG;
  if (VENUES[raw]) return raw;
  const upper = raw.toUpperCase();
  if (VENUES[upper]) return upper;
  if (VENUE_ALIASES[raw]) return VENUE_ALIASES[raw];
  if (VENUE_ALIASES[upper]) return VENUE_ALIASES[upper];
  return DEFAULT_VENUE_SLUG;
}

const CURRENT_VENUE_SLUG = resolveVenueSlug();
const VENUE = VENUES[CURRENT_VENUE_SLUG];

Object.assign(window, { VENUES, VENUE_ALIASES, DEFAULT_VENUE_SLUG, CURRENT_VENUE_SLUG, VENUE });

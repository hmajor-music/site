// ── Venue directory ──────────────────────────────────────────────
// 1店舗 = 1エントリ。URL の ?venue=<slug> でどのエントリを表示するか切り替わる。
// 例: index.html?venue=osaka-tgoo
//
// フィールド:
//   name          会場名（必須）
//   city          表示用の地域名（必須）
//   heroImage     トップのヒーロー背景写真。未設定ならプレースホルダー表示
//   venueImage    データ提出窓口カードに出す会場写真。未設定ならプレースホルダー表示
//   formUrl       データ提出フォームのURL（必須）
//   contactEmail  よくあるご質問の「解決しないときは」に出す問い合わせ先
//   businessHours 同上、営業時間の表記
//
// 新しい店舗を追加する時は、このオブジェクトに1エントリ追記するだけでよい。
// index.html 側やコンポーネント側の変更は不要。

const VENUES = {
  'osaka-tgoo': {
    name: 'THE GARDEN ORIENTAL OSAKA',
    city: '大阪',
    heroImage: 'logo/hero-chapel.jpg',
    venueImage: 'logo/venue-tgoo.png',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSenXJPyBJgJN4O1k4TCzEA1NNl7F7BfB6RxjQasbx_J1w31Kg/viewform?usp=header',
    contactEmail: 'osaka@fem-produce.co.jp',
    businessHours: '営業時間 12:00–18:00 火曜日定休',
  },

  // ▼ 追加する店舗はこの形式でコピーして埋めてください（実データが揃うまでのひな形）。
  // 'venue-slug': {
  //   name: '会場名',
  //   city: '地域名',
  //   heroImage: 'logo/xxxxx-hero.jpg',    // 未定なら省略可（プレースホルダー表示）
  //   venueImage: 'logo/xxxxx-venue.jpg',  // 未定なら省略可（プレースホルダー表示）
  //   formUrl: 'https://...',
  //   contactEmail: 'xxxxx@fem-produce.co.jp',
  //   businessHours: '営業時間 12:00–18:00 火曜日定休',
  // },
};

const DEFAULT_VENUE_SLUG = 'osaka-tgoo';

function resolveVenueSlug() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('venue');
  return (slug && VENUES[slug]) ? slug : DEFAULT_VENUE_SLUG;
}

const CURRENT_VENUE_SLUG = resolveVenueSlug();
const VENUE = VENUES[CURRENT_VENUE_SLUG];

Object.assign(window, { VENUES, DEFAULT_VENUE_SLUG, CURRENT_VENUE_SLUG, VENUE });

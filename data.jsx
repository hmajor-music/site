// ── Static content data ───────────────────────────────────────

const FAQS = [
  {
    q: '映像のアスペクト比は16:9でいいですか？',
    a: '会場のスクリーンに最適化されているため、原則 16:9（横長）で書き出してください。4:3 や縦型で作成すると、上下や左右に黒帯が入ったり、見切れる原因になります。',
    qEn: 'Should my video be 16:9?',
    aEn: 'Yes — please export in 16:9 (widescreen), which is optimized for the venue screen. 4:3 or vertical video will result in black bars or cropping.',
  },
  {
    q: '提出できるデータ形式・容量を教えてください。',
    a: 'MP4（H.264）形式、解像度 1920×1080（フルHD・16:9）で書き出してください。これを超える4Kなどは会場のプロジェクターが非対応です。ページ内の「データ提出窓口」の専用フォームからアップロードしてください（容量はフォームの仕様に準じます）。',
    qEn: 'What file format and size can I submit?',
    aEn: 'Please export as MP4 (H.264), 1920×1080 (Full HD, 16:9). The venue projector does not support 4K or higher. Upload via the dedicated form in the "Data Submission" section (file size follows the form\'s own limits).',
  },
  {
    q: 'Youtubeやその他の配信サービスにアップされている映像や音源を使ったムービーを上映することはできますか？',
    a: '上映はできません。Youtubeをはじめとする配信サービスで閲覧可能なものでも、そのコンテンツの著作権者の許諾が必要です。配信サービス上で閲覧可能状態になっていたとしても、使用を許諾しているものではありませんので無断使用となってしまうため上映は出来かねます。',
    qEn: 'Can I show a video that uses footage or music from YouTube or another streaming service?',
    aEn: 'No. Even content that is publicly viewable on YouTube or similar services still requires the copyright holder\'s permission. Being viewable does not mean it is licensed for this use, so we cannot screen it.',
  },
  {
    q: 'BGMは自分で決めておくべきですか？',
    a: 'お二人がどのようなご披露宴にしたいのか、ゲストへの想い、会場の広さ・進行を踏まえ、お打ち合わせでミュージックプランナーと一緒に決めていきます。もちろん、イメージや候補曲があればぜひお聞かせください。',
    qEn: 'Do we need to choose the BGM ourselves in advance?',
    aEn: 'Not necessarily — our music planner will help you choose during the meeting, based on the mood you want, your guests, and the venue and timeline. Any ideas or favorite songs you already have are very welcome.',
  },
  {
    q: '挙式のBGMはどのように決めますか？',
    a: 'BGMのお打ち合わせでお伺いするのは、ご披露宴の楽曲についてです。挙式のBGMは、生演奏にあわせて特別にセレクトした楽曲をご用意しております。詳細については担当プランナーまでお問い合わせください。',
    qEn: 'How is the music for the ceremony itself decided?',
    aEn: 'The BGM meeting covers reception music. Ceremony music is a specially curated selection paired with live performance — please ask your planner for details.',
  },
  {
    q: 'プロフィールムービーの長さの目安は？',
    a: '一般的には 5〜8分（BGM 2〜3曲）が目安です。お食事の時間とのバランスを考え、長くなりすぎないことをおすすめしています。',
    qEn: 'How long should the profile movie be?',
    aEn: 'Typically 5–8 minutes (2–3 songs). We recommend keeping it balanced with the meal time rather than making it too long.',
  },
  {
    q: '提出後にデータの差し替えはできますか？',
    a: '挙式7日前までであれば差し替え可能です。それ以降は再生確認の都合上お受けできない場合がありますので、お早めにご相談ください。',
    qEn: 'Can we replace the file after submitting it?',
    aEn: 'Yes, up until 7 days before the ceremony. After that we may be unable to accept changes due to playback checks, so please contact us early.',
  },
];

const QUICK_ACTIONS = [
  { id: 'video',  target: 'manual',    label: '映像の作り方・ルール', sub: 'サイズ / 形式の基本', labelEn: 'Video Guidelines', subEn: 'Size & format basics' },
  { id: 'bgm',    target: 'copyright', label: 'BGM・著作権について', sub: '楽曲利用の手続き', labelEn: 'Music & Copyright', subEn: 'Licensing procedure' },
  { id: 'submit', target: 'submit',    label: 'データ提出窓口', sub: '専用フォームへ', labelEn: 'Data Submission', subEn: 'To the submission form' },
];

Object.assign(window, { FAQS, QUICK_ACTIONS });

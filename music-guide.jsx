// ── Music Guide page (別ページ) ──────────────────────────────────
// 元サイト https://b-ms.net/user/top の内容を、本サイトのデザインで再構成したもの。
//
// PLAYLISTS の各曲は appleMusicUrl が未設定なら「準備中」表示になる。
// 曲目データが届いたら、この配列に埋めれば反映される。
const PLAYLISTS = [
  {
    id: 'playlist01',
    title: '古き良き楽曲を中心に創る、上質な空間選曲リスト',
    lead: '定番のスタンダードナンバーを軸に、上品で落ち着いた雰囲気をつくります。',
    songs: [
      { title: "A Lover's Concerto", artist: 'Sarah Vaughan', detail: 'バッハ作"メヌエット ト長調"をモチーフにして作られたサラ・ヴォーンの代表曲のひとつ。優雅なバイオリンをバックに、サラ・ヴォーンが力強く、美しい歌声で歌う至極のラブ・ソング。', appleMusicUrl: 'https://music.apple.com/jp/song/ラヴァーズ-コンチェルト/1458055037' },
      { title: 'Cheek to Cheek', artist: 'Karen Souza', detail: 'アルゼンチン出身のシンガーソングライター兼プロデューサー。スタンダードナンバー「Cheek to Cheek」ではハスキーな歌声で上質な雰囲気を醸し出す。華やかなシーンにオススメ。', appleMusicUrl: 'https://music.apple.com/jp/album/cheek-to-cheek/1536411272?i=1536411461' },
      { title: 'Almost Like Being In Love', artist: 'Natalie Cole', detail: 'ブロードウェイミュージカル『Brigadoon』の為に作られた曲。多くのアーティストがカバーするがナタリー・コールはビッグバンドを従え華やかに歌い上げている。パーティーの始まりを感じさせるのにもオススメ。', appleMusicUrl: 'https://music.apple.com/jp/song/almost-like-being-in-love/1576789317' },
      { title: 'For Once in My Life', artist: 'Stevie Wonder', detail: '元はスローバラードの楽曲をStevie Wonderがアップテンポにカバーしヒット。「僕を必要としてくれる人に出逢えた」と喜びを表現している内容と曲のアレンジが見事に組み合わさっている。', appleMusicUrl: 'https://music.apple.com/jp/song/for-once-in-my-life/1442836195' },
      { title: 'Hallelujah, I Love Her So', artist: 'Ray Charles', detail: '盲目のピアニスト、歌手として有名なレイ・チャールズ。恋する幸せな気持ちを歌った楽曲でThe Beatlesなど数多くのアーティストがカバーした。', appleMusicUrl: 'https://music.apple.com/jp/song/hallelujah-i-love-her-so/46592137' },
      { title: 'The Onion Song', artist: 'Marvin Gaye & Tammi Terrell', detail: 'Marvin Gayeの最高のパートナーと言われているTammi Terrellとの楽曲。二人の掛け合いが明るくハッピーな気持ちにさせてくれる。椎名林檎も自身の兄と「玉葱のハッピーソング」としてカバーしている。', appleMusicUrl: 'https://music.apple.com/jp/song/the-onion-song/1440918322' },
      { title: 'Be My Baby', artist: 'The Ronettes', detail: '1960年代を代表するアーティストの1つ、ザ・ロネッツ。代表曲でもあるこの曲は親しみやすいメロディにレトロでかわいい空間をつくってくれる。', appleMusicUrl: 'https://music.apple.com/jp/song/ビー-マイ-ベイビー/420123652' },
      { title: 'Whatever Will Be, Will Be (Que Sera, Sera)', artist: 'Doris Day', detail: '「どんな未来が待っているかわからないけれどなるようになるさ」といったポジティブな曲。レトロで大人かわいい雰囲気に。', appleMusicUrl: 'https://music.apple.com/jp/song/whatever-will-be-will-be-que-sera-sera/891710754' },
      { title: "Singin' In the Rain", artist: 'Gene Kelly', detail: '「晴れやかな気分で歌いながら踊るんだ」と歌っているとおり、雨の日でも楽しい気分や出かけたくなるような気持ちにさせてくれる。', appleMusicUrl: 'https://music.apple.com/jp/song/singin-in-the-rain/1455420758' },
      { title: 'Over the Rainbow', artist: 'Frank Sinatra', detail: 'ミュージカル映画『オズの魔法使い』で、主演のジュディ・ガーランドが歌ったものが原曲。多くのアレンジがあるが、特にJAZZのスタンダードとして定着している。こちらのFrank Sinatraは力強く情緒的に歌いあげている。', appleMusicUrl: 'https://music.apple.com/jp/song/over-the-rainbow/628522882' },
      { title: "Can't Help Falling In Love", artist: 'Elvis Presley', detail: '邦題「好きにならずにいられない」　多くのアーティストがカバーする名曲。現在でもサンプリングして使用されるなど、時代を超えて愛されている。', appleMusicUrl: 'https://music.apple.com/jp/song/cant-help-falling-in-love/949550091' },
      { title: 'What a Wonderful World', artist: 'Louis Armstrong', detail: '邦題「この素晴らしき世界」　平和を願って作られ、数多くのアーティストがカバーする名曲。現在でも映画やCMで使用されている。', appleMusicUrl: 'https://music.apple.com/jp/song/この素晴らしき世界/1440787254' },
      { title: 'You Raise Me Up', artist: 'Celtic Woman', detail: 'スコットランド民謡を元に作られた名曲。数多くのアーティストがこの曲に惚れ込みカバーをしているがケルティック・ウーマンはお勧めの一つ。他にはウェストライフなどもあり、是非聴き比べてみては。', appleMusicUrl: 'https://music.apple.com/jp/song/you-raise-me-up/715786864' },
      { title: 'Book Of Days', artist: 'Enya', detail: 'ケルト音楽をベースとした独特の制作手法で唯一無二の音楽が地球規模で絶賛を浴びるEnya。この楽曲は壮大なバッキングと神聖なコーラスが優雅な空間をつくりだす。', appleMusicUrl: 'https://music.apple.com/jp/song/book-of-days/339592235' },
    ],
  },
  {
    id: 'playlist02',
    title: 'トレンドポップスを中心に創る、スタイリッシュな空間選曲リスト',
    lead: '今の空気感を纏った洋楽・邦楽ポップスで、華やかに仕上げます。',
    songs: [
      { title: 'Love Never Felt So Good', artist: 'Michael Jackson', detail: '歌手、作曲家のPaul Ankaとの共作。「恋してこんなに幸せな気持ちになったことなんて今まで一度もなかったんだ」という内容が表現された素晴らしいラブソング。', appleMusicUrl: 'https://music.apple.com/jp/song/love-never-felt-so-good/850697799' },
      { title: 'Sugar', artist: 'Maroon 5', detail: 'Sunday Morningなど数多くの大ヒットを生み出し世界中で人気のMaroon 5。 タイトル通りの甘いラブソングSugarは、LAで実際に行われている結婚式にて撮影されMVも話題に。', appleMusicUrl: 'https://music.apple.com/jp/song/sugar/1440853441' },
      { title: 'Speechless', artist: 'Dan + Shay', detail: 'グラミー受賞歴もあるダン・アンド・シェイ。素敵すぎて言葉にできない、と彼女のことを歌っている甘いラブソング。きれいな印象のメロディラインで感動的な雰囲気を演出することもできる。', appleMusicUrl: 'https://music.apple.com/jp/song/speechless/1383989668' },
      { title: 'All My Love (feat.Juliette Ashby)', artist: 'Lack of Afro', detail: '英国出身のAndy Gibbonsによるユニット。Soul、Funkシーンで絶大な人気を誇る彼の2016年度発表のアルバムより、レトロ感漂うキュートで爽やかな楽曲。', appleMusicUrl: 'https://music.apple.com/jp/song/all-my-love-feat-juliette-ashby/1811427204' },
      { title: 'ME!', artist: 'Taylor Swift', detail: 'Panic! At The Discoのボーカルとのコラボ曲。お互いに「最高のパートナー」と想い合う内容でハッピーな気持ちにさせてくれる。明るい雰囲気をつくりたい時にオススメ。', appleMusicUrl: 'https://music.apple.com/jp/song/me-feat-brendon-urie-of-panic-at-the-disco/1468058706' },
      { title: 'Smile', artist: 'Katy Perry', detail: '軽快なイントロで始まるアップテンポな楽曲。「笑顔を手に入れた」と歌う前向きな曲調とKaty Perryの声が明るい雰囲気を作ってくれる。', appleMusicUrl: 'https://music.apple.com/jp/song/smile/1522812316' },
      { title: "I Won't Let You Down", artist: 'OK Go', detail: 'アメリカのインディー・ロックバンド。MVがユニークで話題。この曲では日本のアーティストPerfumeが出演している。クセになるメロディも特徴的な楽曲。', appleMusicUrl: 'https://music.apple.com/jp/song/i-wont-let-you-down/1451526199' },
      { title: 'Soul Deep', artist: 'Tahiti 80', detail: 'フランスのポップミュージックバンド。始まりから明るく雰囲気を作ってくれる楽曲。パーティーのスタートを感じさせる演出等でもオススメ。', appleMusicUrl: 'https://music.apple.com/jp/song/soul-deep/400826581' },
      { title: 'Unlonely', artist: 'Jason Mraz', detail: '『I\'m Yours』で多くのファンを獲得したJason Mraz。「寂しい思いはさせないよ」と相手を想って歌っているあたたかな楽曲。', appleMusicUrl: 'https://music.apple.com/jp/song/unlonely/1396747090' },
      { title: "Haven't Met You Yet", artist: 'Michael Buble', detail: '唯一無二の声と称賛される歌手マイケル・ブーブレ。CMでも起用され、明るく爽やかで馴染みやすいメロディが魅力。', appleMusicUrl: 'https://music.apple.com/jp/song/havent-met-you-yet/668403662' },
      { title: 'Fire Escape', artist: 'Andrew McMahon', detail: 'CMで起用され話題に。明るく前向きな気持ちにしてくれるポップな楽曲。エンディングを演出するのにも相性の良い曲調となっている。', appleMusicUrl: 'https://music.apple.com/jp/song/ファイヤー-エスケイプ-きみがいる世界/1440941317' },
      { title: "If I Can't Have You", artist: 'Shawn Mendes', detail: 'モデルでもあるシンガーソングライターのShawn Mendes。「君がいないと・・・」と素直に想いを歌っているラブソングで、大人っぽい雰囲気の演出にも好相性。', appleMusicUrl: 'https://music.apple.com/jp/album/if-i-cant-have-you/1460840847?i=1460840853' },
      { title: 'I Choose You', artist: 'Sara Bareilles', detail: 'Maroon 5など、多くのアーティストのコンサートで前座をつとめていた経験もあるサラ・バレリス。「わたしが選ぶのはあなたよ　あなたしかいないの」と歌う真っ直ぐなラブソング。', appleMusicUrl: 'https://music.apple.com/jp/song/i-choose-you/1440505355' },
      { title: 'Perfect', artist: 'Ed Sheeran', detail: '『Thinking Out Loud』で日本でも大人気となったEd Sheeran。自身の恋人に贈ったプロポーズソングともいわれている楽曲。Beyonceとのデュエット・バージョンも人気。', appleMusicUrl: 'https://music.apple.com/jp/song/perfect/1193701400' },
      { title: 'Better Place', artist: 'Rachel Platten', detail: '「あなたと一緒にいると全てがうまくいく」といった愛にあふれた楽曲。優しい歌声であたたかく穏やかな雰囲気に。', appleMusicUrl: 'https://music.apple.com/jp/song/better-place/1064145225' },
    ],
  },
  {
    id: 'playlist03',
    title: '広く愛される映画音楽等を中心に創る、アットホームな空間選曲リスト',
    lead: '誰もが知る映画・アニメ音楽で、あたたかく和やかな時間を演出します。',
    songs: [
      { title: 'All You Need Is Love', artist: 'The Beatles', detail: '世界中で愛され続ける普遍的な名曲。ジョン・レノンが作曲。みんなに必要なのは愛なんだ、と繰り返し歌い壮大なテーマで世界中へメッセージを送っている。', appleMusicUrl: 'https://music.apple.com/jp/song/愛こそはすべて-オール-ユー-ニード-イズ-ラヴ/1440833920' },
      { title: 'L-O-V-E', artist: 'Natalie Cole', detail: '実の父であるナット・キング・コールの同曲をカバーしたもので、より軽やかで可愛らしいアレンジに仕上がっている。ナットは世界中の人々に歌が届く事を願って、英語・フランス語・ドイツ語・イタリア語・スペイン語、日本語で歌ったバージョンも存在する。', appleMusicUrl: 'https://music.apple.com/jp/song/l-o-v-e/1576789297' },
      { title: 'Best of My Love', artist: 'The Emotions', detail: 'アース・ウィンド&ファイアのモーリス・ホワイトが惚れこんだガールズトリオ、ザ・エモーションズの大ヒットナンバー。軽快に刻まれるリズムやポジティブなホーンセクションをバックに気持ちよさそうに歌われるエモーションズのキュートで切ないハーモニーが聴きどころ。', appleMusicUrl: 'https://music.apple.com/jp/song/best-of-my-love/882955357' },
      { title: 'Oh, Pretty Woman', artist: 'Roy Orbison', detail: 'ジュリア・ロバーツの出世作となった映画『プリティ・ウーマン』にも起用された楽曲。素敵な女性を褒めたたえる歌。軽快で明快なリズムは場面を力強く彩ってくれる。', appleMusicUrl: 'https://music.apple.com/jp/song/oh-pretty-woman/872478306' },
      { title: "Wouldn't It Be Nice", artist: 'The Beach Boys', detail: '映画『50回目のファースト・キス』や『陽だまりの彼女』で使用された曲。邦題「素敵じゃないか」。「僕らは結婚して幸せになれる」と歌っているハッピーな歌。', appleMusicUrl: 'https://music.apple.com/jp/song/wouldnt-it-be-nice/1440841243' },
      { title: 'How Long Will I Love You', artist: 'Jon Boden, Sam Sweeney & Ben Coleman', detail: 'イギリスのフォークロックバンドThe Waterboysのカバーで、映画『アバウトタイム』のテーマ曲。あたたかい雰囲気をつくれる穏やかな曲調が魅力。', appleMusicUrl: 'https://music.apple.com/jp/song/ハウ-ロング-ウィル-アイ-ラヴ-ユー/1440779013' },
      { title: "We're All In This Together", artist: 'High School Musical Cast', detail: 'ミュージカル映画『ハイスクール・ミュージカル』のエンディング曲。アップテンポな楽曲なのでしっかりと盛り上げたい演出にオススメ。', appleMusicUrl: 'https://music.apple.com/jp/song/were-all-in-this-together/1440747354' },
      { title: 'Suddenly I See', artist: 'KT Tunstall', detail: '映画『プラダを着た悪魔』のオープニングで使用された楽曲。時代を問わず愛される。オシャレに女性らしさを演出したいときにオススメ。', appleMusicUrl: 'https://music.apple.com/jp/song/サドゥンリー-アイ-シー/724917482' },
      { title: 'Stand By Me', artist: 'Ben E. King', detail: '映画『スタンド・バイ・ミー』テーマ曲。誰もが聞いたことがあり郷愁を感じる、幅広い年代に愛される楽曲。「どんな時も僕の側にいてほしい」と大切な人への愛しい想いを歌っている。', appleMusicUrl: 'https://music.apple.com/jp/song/stand-by-me/68100555' },
      { title: 'Beyond the Sea', artist: 'Rod Stewart', detail: 'フランスのシャルル・トレネによって発表された楽曲。最大のヒットはアメリカでのボビー・ダーリン。近年ではロビー・ウイリアムスが歌ったことで馴染みがある。こちらロッド・スチュワートのバージョンは持ち前のハスキー・ヴォイスで軽やかに聴かせてくれる。', appleMusicUrl: 'https://music.apple.com/jp/song/beyond-the-sea/396461571' },
      { title: 'Two of Us', artist: 'Aimee Mann & Michael Penn', detail: '映画『アイ・アム・サム』の挿入歌。ビートルズのカバー曲で構成されたサウンドトラックの内の爽やかな楽曲。', appleMusicUrl: 'https://music.apple.com/jp/song/two-of-us/305849557' },
      { title: 'Your Song', artist: 'Elton John', detail: 'イギリスを代表するシンガーソングライター、エルトン・ジョンの名ラブソング。作詞はコンビで数多くの作品を手掛けるパーニー・トーピン。エルトンは、この曲をパーニーの歌詞に合わせわずか15分で作曲。生まれるべくして生まれた作品といえます。', appleMusicUrl: 'https://music.apple.com/jp/song/your-song/1440810937' },
      { title: "I'm Forrest... Forrest Gump", artist: 'Alan Silvestri', detail: '名作と称される映画『フォレスト・ガンプ』のテーマ曲。バック・トゥ・ザ・フューチャーやアベンジャーズなどの音楽も手掛ける作曲家アラン・シルヴェストリ作。爽やかなピアノのメロディが印象的。', appleMusicUrl: 'https://music.apple.com/jp/song/im-forrest-forrest-gump/203797501' },
      { title: 'Glasgow Love Theme', artist: 'Craig Armstrong', detail: '映画『ラブ・アクチュアリー』の劇中曲。落ち着いたピアノのメロディにストリングスが重なり合い、しっかりと曲の世界観を感じることができる。', appleMusicUrl: 'https://music.apple.com/jp/song/グラスゴーから愛のテーマ/1440719166' },
      { title: 'New Cinema Paradise', artist: 'Ennio Morricone', detail: 'イタリア映画『ニュー・シネマ・パラダイス』のメインタイトル曲。映画音楽界で活躍する、エンニオ・モリコーネの洗練されたピアノとストリングスを中心にシンプルに構成されるこの楽曲は、誇張する事なく自然と空間に溶け込んでくれる。', appleMusicUrl: 'https://music.apple.com/jp/song/cinema-paradiso-main-theme/830673236' },
    ],
  },
];

function backHref() {
  return `index.html${window.location.search}`;
}

// ── Header ───────────────────────────────────────────────────
function MusicGuideHeader() {
  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line">
      <div className="h-[64px] sm:h-[76px] px-4 sm:px-8 lg:px-14 max-w-[1280px] mx-auto flex items-center justify-between">
        <a href={backHref()} className="flex items-center gap-2.5 sm:gap-4 active:opacity-70 transition-opacity shrink-0 no-underline">
          <Logo h={28} className="sm:hidden" />
          <span className="hidden sm:inline-block"><Logo h={34} /></span>
          <span className="h-4 sm:h-6 w-px bg-line"></span>
          <span className="font-gothic text-ink/60 text-[9.5px] sm:text-[10.5px] tracking-[.15em] sm:tracking-[.2em] truncate max-w-[170px] sm:max-w-none">{VENUE.name}</span>
        </a>
        <a href={backHref()}
          className="group inline-flex items-center gap-2 font-gothic text-ink/65 hover:text-ink transition-colors duration-300 no-underline"
          style={{ fontSize: 12, letterSpacing: '.1em' }}>
          <IconChevL size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          ご案内ページへ戻る
        </a>
      </div>
    </header>
  );
}

// ── 1. Top ───────────────────────────────────────────────────
function MusicTop() {
  return (
    <section id="top" className="scroll-mt-16 px-5 sm:px-14 pt-20 sm:pt-32 pb-16 sm:pb-24 text-center">
      <Reveal className="max-w-[1280px] mx-auto flex flex-col items-center">
        <span className="text-goldDeep/70"><IconMusic size={30} /></span>
        <Eyebrow en="Song Selection Guide" center />
        <h1 className="font-mincho text-ink mt-7 leading-[1.5] text-[26px] sm:text-[34px]" style={{ letterSpacing: '.05em', fontWeight: 400 }}>
          おふたりのイメージを、<br className="sm:hidden" />音楽でも表現します。
        </h1>
        <p className="font-gothic text-muted mt-6 leading-[1.95] text-[12.5px] sm:text-[13.5px]" style={{ maxWidth: 480 }}>
          お打ち合わせの前に知っておきたい、選曲の考え方と組み合わせ例をご紹介します。
        </p>
        <a href="#concept" className="mt-12 sm:mt-16 text-goldDeep/60 hover:text-goldDeep transition-colors duration-300">
          <IconChevD size={22} />
        </a>
      </Reveal>
    </section>
  );
}

// ── 2. Concept ───────────────────────────────────────────────
function MusicConcept() {
  return (
    <section id="concept" className="scroll-mt-16 px-5 sm:px-14 py-16 sm:py-24 bg-cream/50">
      <div className="max-w-[1280px] mx-auto">
        <SectionHead en="Concept" title="音楽で、空間の完成度を高める。" center
          sub="パーティーのコンセプトとは、ドレスや花や部屋のコーディネートと同様に、音楽を空間に合わせることでより完成度が高まります。" />
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mt-2">
          {[
            { icon: IconHeart, label: 'ドレス', body: 'お二人が選んだドレスの雰囲気' },
            { icon: IconSparkle, label: '装花・空間', body: '会場のコーディネートやテーマ' },
            { icon: IconMusic, label: '音楽', body: 'それらに寄り添う一曲' },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 90} className="bg-white border border-line px-6 py-8 text-center">
              <span className="text-goldDeep/70 inline-block"><c.icon size={24} /></span>
              <div className="font-mincho text-ink mt-4" style={{ fontSize: 14.5, letterSpacing: '.04em' }}>{c.label}</div>
              <div className="font-gothic text-muted mt-2" style={{ fontSize: 11.5 }}>{c.body}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. For example ───────────────────────────────────────────
// 元サイトの白ドレス／カラードレスの線画アイコンを SVG で再現したもの
function DressIllustration({ color, label }) {
  return (
    <div className="bg-cream flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
      <svg viewBox="0 0 120 140" className="h-[62%]" role="img" aria-label={label}>
        <path
          d="M46 10 Q60 20 74 10 L87 20 L81 29 L75 26 C75 37 72 45 70 52 C81 68 88 94 89 128 L31 128 C32 94 39 68 50 52 C48 45 45 37 45 26 L39 29 L33 20 Z"
          fill="none" stroke={color} strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function MusicExample() {
  return (
    <section id="example" className="scroll-mt-16 px-5 sm:px-14 py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto">
        <SectionHead en="For example" title="ひとつのイメージに、絞らなくていい。" center
          sub="選曲のポイントですが、ひとつのイメージだけではなく、複数のイメージを組み合わせることもおすすめしております。" />
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Reveal>
            <DressIllustration color="#FFFFFF" label="白ドレス" />
            <p className="font-gothic text-ink/70 mt-4 leading-[1.9] text-[12.5px] text-center">
              前半のウェディングドレスでは<br />『古き良き上質な音楽』
            </p>
          </Reveal>
          <Reveal delay={100}>
            <DressIllustration color="#A80000" label="カラードレス" />
            <p className="font-gothic text-ink/70 mt-4 leading-[1.9] text-[12.5px] text-center">
              後半のカラードレスでは<br />『最新のトレンド音楽』
            </p>
          </Reveal>
        </div>
        <p className="text-center font-gothic text-muted mt-8 text-[12px]">などが、コーディネートの一例です。</p>
      </div>
    </section>
  );
}

// ── 4. Recommend ─────────────────────────────────────────────
function MusicRecommend({ onOpen }) {
  return (
    <section id="recommend" className="scroll-mt-16 px-5 sm:px-14 py-16 sm:py-24 bg-cream/50">
      <div className="max-w-[1280px] mx-auto">
        <SectionHead en="Recommend" title="組み合わせ例を、聴いてみる。" center
          sub="異なるイメージ毎に、音楽の組み合わせ例をご紹介します。カードを選ぶと曲目が開きます。" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 border border-line sm:border-r-0 sm:border-b-0">
          {PLAYLISTS.map((pl, i) => (
            <Reveal key={pl.id} as="button" delay={i * 90} onClick={() => onOpen(i)}
              className="group text-left bg-white border-b sm:border-r border-line px-6 py-9 transition-colors duration-300 hover:bg-cream/60 sm:last:border-b-0">
              <span className="font-enserif text-gold" style={{ fontSize: 20 }}>{String(i + 1).padStart(2, '0')}</span>
              <div className="font-mincho text-ink mt-4 leading-relaxed" style={{ fontSize: 14.5, letterSpacing: '.03em' }}>{pl.title}</div>
              <div className="flex items-center gap-2 mt-7 text-goldDeep font-gothic transition-transform duration-300 group-hover:translate-x-1.5"
                style={{ fontSize: 10.5, letterSpacing: '.18em' }}>
                曲目を見る <IconChevR size={13} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Recommend modal ──────────────────────────────────────────
function PlaylistModal({ playlist, onClose }) {
  if (!playlist) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 anim-fade" style={{ background: 'rgba(44,40,35,.55)' }} onClick={onClose}>
      <div className="bg-white max-w-lg w-full max-h-[85vh] overflow-y-auto anim-pop" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 px-7 sm:px-9 pt-8 pb-6 border-b border-line">
          <h3 className="font-mincho text-ink leading-relaxed" style={{ fontSize: 16.5, letterSpacing: '.03em' }}>{playlist.title}</h3>
          <button onClick={onClose} className="shrink-0 text-ink/40 hover:text-ink transition-colors duration-300"><IconClose size={20} /></button>
        </div>
        <div className="px-7 sm:px-9 py-7">
          <p className="font-gothic text-muted leading-[1.9] text-[12px]">{playlist.lead}</p>

          {playlist.songs.length === 0 ? (
            <div className="mt-7 border border-dashed border-line px-6 py-8 text-center">
              <p className="font-gothic text-muted text-[12px] leading-[1.9]">曲目は準備中です。<br />お打ち合わせで担当ミュージックプランナーがご案内いたします。</p>
            </div>
          ) : (
            <div className="mt-6 border-t border-line">
              {playlist.songs.map((s, i) => (
                <div key={i} className="py-4 border-b border-line">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 text-goldDeep/70"><IconMusic size={13} /></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline flex-wrap gap-x-2">
                        <span className="font-mincho text-ink" style={{ fontSize: 13.5 }}>{s.title}</span>
                        <span className="font-gothic text-muted" style={{ fontSize: 11 }}>/ {s.artist}</span>
                      </div>
                      {s.detail && (
                        <p className="font-gothic text-ink/60 mt-1.5 leading-[1.8]" style={{ fontSize: 11 }}>{s.detail}</p>
                      )}
                    </div>
                    {s.appleMusicUrl ? (
                      <a href={s.appleMusicUrl} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 text-goldDeep font-gothic no-underline" style={{ fontSize: 10.5, letterSpacing: '.08em' }}>
                        試聴 <IconExternal size={12} />
                      </a>
                    ) : (
                      <span className="shrink-0 font-gothic text-muted/60" style={{ fontSize: 10.5 }}>準備中</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── 5. How is it ─────────────────────────────────────────────
function MusicHowIsIt() {
  return (
    <section id="howisit" className="scroll-mt-16 px-5 sm:px-14 py-16 sm:py-24 text-center">
      <Reveal className="max-w-[1280px] mx-auto flex flex-col items-center">
        <Eyebrow en="How is it?" center />
        <p className="font-mincho text-ink mt-7 leading-[1.9] text-[16px] sm:text-[18px]" style={{ letterSpacing: '.04em', maxWidth: 480 }}>
          音楽のイメージはいかがですか？<br />
          大切なパーティーの音楽を選ぶのは楽しいけど、<br className="hidden sm:block" />
          ちょっと大変なことですよね。
        </p>
        <p className="font-mincho text-goldDeep mt-8" style={{ fontSize: 16, letterSpacing: '.06em' }}>でも、ご安心ください。</p>
      </Reveal>
    </section>
  );
}

// ── 6. Introduce ─────────────────────────────────────────────
function MusicIntroduce() {
  return (
    <section id="introduce" className="scroll-mt-16 px-5 sm:px-14 py-16 sm:py-24 bg-cream/50">
      <Reveal className="max-w-3xl mx-auto bg-white border border-line px-7 sm:px-11 py-10 sm:py-14 flex items-start gap-6 sm:gap-8">
        <span className="shrink-0 text-goldDeep/70"><IconPerson size={30} /></span>
        <div>
          <Eyebrow en="Introduce" />
          <p className="font-mincho text-ink mt-5 leading-relaxed" style={{ fontSize: 15.5, letterSpacing: '.03em' }}>
            特別に、ミュージックプランナーを用意しております。
          </p>
          <p className="font-gothic text-ink/70 mt-4 leading-[2.05]" style={{ fontSize: 12.5 }}>
            音楽のプロが、おふたりのイメージに合う楽曲をご提案させていただきますので、お打ち合わせ当日までは、楽しみながら音楽のイメージを膨らませてご準備していただけたらと思います。
          </p>
        </div>
      </Reveal>
    </section>
  );
}

// ── 7. Closing ───────────────────────────────────────────────
function MusicClosing() {
  return (
    <section id="closing" className="scroll-mt-16 px-5 sm:px-14 py-20 sm:py-28 text-center" style={{ background: '#2C2823' }}>
      <Reveal className="max-w-[1280px] mx-auto flex flex-col items-center">
        <p className="font-mincho text-ivory leading-[1.9]" style={{ fontSize: 16, letterSpacing: '.05em' }}>
          それでは、お会いできることを楽しみにしております。
        </p>
        <a href={backHref()}
          className="mt-10 inline-flex items-center gap-2.5 bg-transparent text-goldSoft border border-gold/50 px-8 py-4 font-gothic transition-colors duration-300 hover:bg-white/5 no-underline"
          style={{ fontSize: 12.5, letterSpacing: '.12em' }}>
          ご案内ページへ戻る <IconChevR size={14} />
        </a>
      </Reveal>
    </section>
  );
}

// ── App ──────────────────────────────────────────────────────
function MusicGuideApp() {
  const [openIndex, setOpenIndex] = React.useState(null);

  React.useEffect(() => {
    document.title = `選曲ガイド ｜ ${VENUE.name}`;
  }, []);

  return (
    <div className="bg-ivory w-full">
      <MusicGuideHeader />
      <MusicTop />
      <MusicConcept />
      <MusicExample />
      <MusicRecommend onOpen={setOpenIndex} />
      <MusicHowIsIt />
      <MusicIntroduce />
      <MusicClosing />
      <PlaylistModal playlist={openIndex !== null ? PLAYLISTS[openIndex] : null} onClose={() => setOpenIndex(null)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MusicGuideApp />);

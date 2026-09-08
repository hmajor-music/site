// ── BGM section (お客様にお願いしたい3点) ───────────────────────

const BGM_POINTS = [
  {
    title: '披露宴のBGMは、基本ご準備は不要です',
    titleEn: 'No preparation needed for reception BGM',
    body: 'BGM打ち合わせで決まった楽曲は、当会場がCD原盤のご準備と許諾申請を行います。ご披露宴のBGMについて、お客様での手配は基本的に必要ありません。',
    bodyEn: 'Once songs are decided in the BGM meeting, the venue handles sourcing the master audio and licensing. You generally don\'t need to arrange anything yourselves.',
  },
  {
    title: '制作会社が作る映像の音源は、制作会社とのやり取りに',
    titleEn: 'Audio for outsourced videos is handled with that production company',
    body: '映像制作会社が制作する映像（ダイジェスト・エンドロールなど）の音源につきましては、お客様と映像制作会社との間でのやり取りとなります。',
    bodyEn: 'For videos made by an outside production company (highlight reels, end rolls, etc.), audio arrangements are between you and that company.',
  },
  {
    title: 'ご余興の音源は、担当の方でのご用意をお願いします',
    titleEn: 'Please have entertainment-segment audio prepared by whoever is performing',
    body: 'ご友人やご家族のご余興で使用される音源につきましては、原則としてご担当の方でのご用意をお願いしております。編集されている音源やバージョンの違いにより、当会場でご準備したものとは相違が出る可能性があるためです。',
    bodyEn: 'Audio for friends\' or family\'s entertainment segments should generally be prepared by them directly, since edited tracks or different versions may differ from what the venue would source.',
  },
  {
    title: '打ち合わせ後の内容変更は、披露宴日の7日前まで',
    titleEn: 'Changes after the meeting: up to 7 days before the reception',
    body: 'BGM打ち合わせ後の内容変更は、ご披露宴日の7日前までとさせていただきます。お早めのご確認にご協力ください。',
    bodyEn: 'Any changes after the BGM meeting must be made by 7 days before the reception. Please review your selections early.',
  },
];

const UNUSABLE = [
  {
    title: '動画配信サービス上の、個人が投稿された音源',
    titleEn: 'User-uploaded audio from video platforms',
    body: 'YouTube などで公開されている「弾いてみた」「歌ってみた」などの音源は、正規の許諾手続きが取れないためご使用いただけません。',
    bodyEn: 'Covers or performances posted on YouTube and similar platforms cannot be used, as proper licensing cannot be obtained for them.',
  },
  {
    title: '未発売の音源・入手できない音源',
    titleEn: 'Unreleased or unobtainable tracks',
    body: 'CD や配信として発売されていない楽曲、または現在入手ができない楽曲は、原盤のご準備ができないためご使用いただけません。',
    bodyEn: 'Songs never released on CD or streaming, or currently unavailable, cannot be used since the master audio cannot be sourced.',
  },
];

const PERMISSION = [
  {
    title: 'カラオケマシンの伴奏を録音された音源',
    titleEn: 'Audio recorded from a karaoke machine',
    body: 'カラオケボックスなどでカラオケマシンの伴奏を録音した音源をご使用になる場合は、カラオケマシンを別途ご発注いただく必要がございます（別途料金を頂戴いたします）。なお、ご自身での生演奏を録音されたものはご使用いただけます。また、CDのカップリングなどに収録されているカラオケバージョン・インストゥルメンタル音源であれば、当会場で手配が可能です。',
    bodyEn: 'To use audio recorded from a karaoke-box machine, you will need to separately order a karaoke machine (an extra fee applies). A recording of your own live performance is fine to use, and instrumental/karaoke versions included on official CD releases can be arranged by the venue.',
  },
  {
    title: 'テレビ・映画・アニメなどの映像の流用',
    titleEn: 'Repurposed TV, film, or anime footage',
    body: '番組や作品の映像を切り取って使用するには権利者の個別許諾が必要で、実際には許諾が下りないケースがほとんどです。ご使用はご遠慮ください。',
    bodyEn: 'Using clips from a broadcast or film requires individual permission from the rights holder, which is rarely granted in practice. Please refrain from using such footage.',
  },
  {
    title: '歌詞を文字として映像に入れ込む場合',
    titleEn: 'Displaying lyrics as on-screen text',
    body: '歌詞の表示は BGM とは別の手続きとなり、ISUM（一般社団法人 音楽特定利用促進機構）への申請が必要です。ISUM に登録されている楽曲であれば当会場で代理申請が可能ですが、別途申請料を頂戴いたします。登録のない楽曲は申請自体がお受けできませんのでご了承ください。',
    bodyEn: 'Showing lyrics on screen requires a separate application to ISUM (Japan\'s music-lyric-use organization), apart from the BGM license. The venue can apply on your behalf for songs registered with ISUM (a separate fee applies); unregistered songs cannot be applied for at all.',
  },
];

function CopyrightSection() {
  return (
    <section id="copyright" className="scroll-mt-20 px-5 sm:px-14 py-12 sm:py-24 bg-cream/50">
      <div className="max-w-[1280px] mx-auto">
      <SectionHead en="About BGM" title="BGM・著作権について。" titleEn="About Music & Copyright"
        sub="お打ち合わせで決まったBGMは、許諾申請も音源準備も当会場が行います。"
        subEn="For BGM decided at your meeting, the venue handles both licensing and sourcing the audio." center />

      <div className="max-w-3xl mx-auto border-t border-line">
        {BGM_POINTS.map((p, i) => (
          <Reveal key={i} delay={i * 70} className="bg-white border-b border-x border-line px-5 sm:px-9 py-6 sm:py-8 flex items-start gap-4 sm:gap-7">
            <span className="shrink-0 font-enserif text-gold pt-0.5 text-lg sm:text-[20px]">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h4 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink leading-relaxed text-[14.5px] sm:text-[15.5px]`} style={{ letterSpacing: '.04em' }}>{T(p.title, p.titleEn)}</h4>
              <p className="font-gothic text-ink/70 mt-2 sm:mt-3 leading-[1.85] sm:leading-[2] text-[12px] sm:text-[12.5px]">{T(p.body, p.bodyEn)}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="text-center font-gothic text-muted mt-6 sm:mt-9 text-[10.5px] sm:text-[11px] px-2">
        {T(
          '※ 上記はBGMリストにも記載しております。ご不明な点はお打合せ時担当ミュージックプランナーへお問い合わせください。',
          'These points are also noted on the BGM list. Please ask your music planner at the meeting if anything is unclear.'
        )}
      </p>

      <Reveal className="max-w-3xl mx-auto mt-10 sm:mt-16 px-6 sm:px-10 py-7 sm:py-11" style={{ background: '#F4EEE3' }}>
        <div className="font-gothic text-goldDeep text-[10px] sm:text-[10.5px]" style={{ letterSpacing: '.22em' }}>ABOUT THE CEREMONY</div>
        <h4 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink mt-3 sm:mt-5 leading-relaxed text-lg sm:text-[19px]`} style={{ letterSpacing: '.04em' }}>
          {T('挙式のBGMについて', 'About music for the ceremony')}
        </h4>
        <p className="font-gothic text-ink/70 mt-3 sm:mt-5 leading-[1.9] sm:leading-[2.1] text-[12px] sm:text-[12.5px]">
          {T(
            'BGM のお打ち合わせでお伺いするのは、ご披露宴の楽曲についてです。挙式のBGMは、生演奏にあわせて特別にセレクトした楽曲をご用意しております。詳細については担当プランナーまでお問い合わせください。',
            'The BGM meeting covers reception music. Ceremony music is a specially curated selection paired with live performance — please ask your planner for details.'
          )}
        </p>
      </Reveal>

      <SubHead en="Audio we're unable to use">ご使用いただけない音源について</SubHead>
      <p className="text-center font-gothic text-muted mx-auto -mt-2 sm:-mt-4 mb-6 sm:mb-10 leading-[1.8] sm:leading-[2] text-[11.5px] sm:text-[12.5px]" style={{ maxWidth: 620 }}>
        {T(
          '著作権・著作隣接権の手続きが取れないため、以下の音源は会場での上映・再生ができません。',
          'Because licensing cannot be arranged for the following, the venue is unable to play them.'
        )}
      </p>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 border border-line md:border-r-0 md:border-b-0">
        {UNUSABLE.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="bg-white border-b md:border-r border-line px-5 sm:px-7 py-6 sm:py-8 last:border-b-0 md:last:border-b">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <span className="shrink-0 mt-0.5 sm:mt-1 text-ink/35"><IconClose size={14} /></span>
              <h4 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink leading-relaxed text-[13.5px] sm:text-[14px]`} style={{ letterSpacing: '.03em' }}>{T(p.title, p.titleEn)}</h4>
            </div>
            <p className="font-gothic text-ink/70 mt-2.5 sm:mt-3.5 leading-[1.8] sm:leading-[1.95] text-[11.5px] sm:text-[12px]">{T(p.body, p.bodyEn)}</p>
          </Reveal>
        ))}
      </div>

      <SubHead en="Requiring a separate order or permission">別途のご発注・許可が必要なもの</SubHead>
      <p className="text-center font-gothic text-muted mx-auto -mt-2 sm:-mt-4 mb-6 sm:mb-10 leading-[1.8] sm:leading-[2] text-[11.5px] sm:text-[12.5px]" style={{ maxWidth: 620 }}>
        {T(
          '下記は BGM の許諾とは別に、機材のご発注または権利者への個別の申請が必要になります。',
          'The following require either an equipment order or an individual application to the rights holder, separate from BGM licensing.'
        )}
      </p>
      <div className="max-w-3xl mx-auto border-t border-line">
        {PERMISSION.map((p, i) => (
          <Reveal key={p.title} delay={i * 70} className="bg-white border-b border-x border-line px-5 sm:px-9 py-6 sm:py-8 flex items-start gap-3.5 sm:gap-5">
            <span className="shrink-0 mt-0.5 text-goldDeep"><IconAlert size={17} /></span>
            <div>
              <h4 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink leading-relaxed text-[14px] sm:text-[15px]`} style={{ letterSpacing: '.04em' }}>{T(p.title, p.titleEn)}</h4>
              <p className="font-gothic text-ink/70 mt-2 sm:mt-3 leading-[1.85] sm:leading-[2] text-[12px] sm:text-[12.5px]">{T(p.body, p.bodyEn)}</p>
            </div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}

Object.assign(window, { CopyrightSection });

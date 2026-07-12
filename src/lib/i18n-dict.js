// Shared EN/ZH dictionary for the client-side language toggle.
// Imported both by the i18n runtime script and (optionally) any Astro
// component that needs a server-rendered default string.
//
// Keys with {placeholders} are interpolated at runtime — see i18n.js.
export const dict = {
  en: {
    'site.tagline': 'Unofficial · community-maintained',
    'nav.lenses': 'Lenses',
    'nav.about': 'About & Disclaimer',
    'nav.github': 'GitHub',
    // Accessible name for the language switcher. The links inside it are
    // labelled with each language's own name (see src/lib/locales.js), which
    // is deliberately *not* translated — someone who can't read the current
    // page still has to be able to find their language.
    'lang.switchLabel': 'Switch language',

    // Brand display names — identity mapping in English, translated in zh
    // (see below). Keyed by the exact `brand` string used in lenses.json.
    'brand.Leica': 'Leica',
    'brand.Panasonic': 'Panasonic',
    'brand.Sigma': 'Sigma',
    'brand.Samyang': 'Samyang',
    'brand.Viltrox': 'Viltrox',
    'brand.Sirui': 'Sirui',
    'brand.TTArtisan': 'TTArtisan',
    'brand.7Artisans': '7Artisans',
    'brand.Laowa': 'Laowa',
    'brand.Meike': 'Meike',

    'footer.copyright': '© {year} L-Mount Lens Guide contributors',
    'footer.codeUnder': 'Code under',
    'footer.dataUnder': ', data under',
    'footer.mit': 'MIT',
    'footer.ccbysa': 'CC BY-SA 4.0',
    'footer.contribute': 'Contribute on GitHub',
    'footer.disclaimer': 'This is an unofficial, community-maintained project. It is not affiliated with, '
      + 'sponsored by, or endorsed by Leica Camera AG, the L-Mount Alliance, Panasonic, Sigma, '
      + 'or any other manufacturer. "L-Mount" is a trademark of Leica Camera AG. See the',
    'footer.aboutLink': 'About & Disclaimer',
    'footer.aboutLinkSuffix': 'page for details.',

    'home.title': 'L-Mount Lens Database',
    'home.intro': 'An unofficial, community-maintained directory of L-Mount lenses.',

    'filterBar.searchPlaceholder': 'Search brand, model, or focal length (e.g. "Sigma 35mm")',
    'filterBar.searchAriaLabel': 'Search lenses',
    'filterBar.brand': 'Brand',
    'filterBar.allBrands': 'All brands',
    'filterBar.allianceBrandsGroup': 'L-Mount Alliance members',
    'filterBar.thirdPartyBrandsGroup': 'Third-party (non-Alliance)',
    'filterBar.format': 'Format',
    'filterBar.allFormats': 'All formats',
    'filterBar.fullFrame': 'Full Frame',
    'filterBar.apsc': 'APS-C',
    'filterBar.focus': 'AF / MF',
    'filterBar.allFocus': 'AF & MF',
    'filterBar.af': 'Autofocus',
    'filterBar.mf': 'Manual focus',
    'filterBar.lensType': 'Prime / Zoom',
    'filterBar.allLensTypes': 'Prime & Zoom',
    'filterBar.prime': 'Prime',
    'filterBar.zoom': 'Zoom',
    'filterBar.alliance': 'Alliance status',
    'filterBar.allLenses': 'All lenses',
    'filterBar.allianceMember': 'L-Mount Alliance member',
    'filterBar.thirdParty': 'Third-party (non-Alliance)',
    'filterBar.weight': 'Weight',
    'filterBar.anyWeight': 'Any weight',
    'filterBar.focalLength': 'Focal length',
    'filterBar.focalRangeHint': 'Lenses whose focal range overlaps your selection are shown, so zoom lenses are included.',
    'filterBar.focalMinLabel': 'Minimum focal length',
    'filterBar.focalMaxLabel': 'Maximum focal length',
    'filterBar.sortBy': 'Sort by',
    'filterBar.sort.focalAsc': 'Focal length (short to long)',
    'filterBar.sort.focalDesc': 'Focal length (long to short)',
    'filterBar.sort.apertureAsc': 'Max aperture (fastest first)',
    'filterBar.sort.weightAsc': 'Weight (lightest first)',
    'filterBar.sort.weightDesc': 'Weight (heaviest first)',
    'filterBar.sort.yearDesc': 'Release year (newest first)',
    'filterBar.sort.yearAsc': 'Release year (oldest first)',
    'filterBar.cards': 'Cards',
    'filterBar.table': 'Table',
    'filterBar.clear': 'Clear filters',
    'filterBar.showingCount': 'Showing {count} of {total} lenses',
    'filterBar.noResults': 'No lenses match your filters. Try clearing some filters.',

    'category.Wide Angle': 'Wide Angle',
    'category.Standard': 'Standard',
    'category.Portrait': 'Portrait',
    'category.Telephoto': 'Telephoto',
    'category.Macro': 'Macro',
    'category.Cine': 'Cine',

    // Deliberately shorter than the detail page's "L-Mount Alliance member":
    // the card's badge row has to share one line with the compare button, and
    // the longer wording pushed the third badge onto a second line on most
    // cards. The badge's colour already distinguishes it from "Third-party",
    // and the detail page spells the status out in full. Used only by
    // LensCard.astro — the filter bar and detail page have their own keys.
    'card.allianceMember': 'Alliance',
    'card.thirdParty': 'Third-party',
    'card.focalLength': 'Focal length',
    'card.maxAperture': 'Max aperture',
    'card.weight': 'Weight',
    'card.released': 'Released',

    'table.brand': 'Brand',
    'table.model': 'Model',
    'table.alliance': 'Alliance',
    'table.format': 'Format',
    'table.type': 'Type',
    'table.focus': 'Focus',
    'table.focalLength': 'Focal length',
    'table.maxAperture': 'Max aperture',
    'table.weight': 'Weight',
    'table.year': 'Year',
    'table.member': 'Member',
    'table.thirdParty': 'Third-party',
    'table.compare': 'Compare',

    'compare.add': 'Add to compare',
    'compare.remove': 'Remove from comparison',
    'compare.floatingButton': 'Compare lenses ({count})',
    'compare.startComparing': 'Start comparing',
    'compare.panelTitle': 'Comparing',
    'compare.clearAll': 'Clear all',
    'compare.title': 'Lens Comparison',
    'compare.intro': 'Compare the specifications of your selected lenses side by side.',
    'compare.empty': 'No lenses selected for comparison.',
    'compare.emptyAction': 'Back to lens list',

    'detail.back': '← Back to lens list',
    'detail.allianceMember': 'L-Mount Alliance member',
    'detail.thirdParty': 'Third-party (non-Alliance)',
    'detail.af': 'Autofocus',
    'detail.mf': 'Manual focus',
    'detail.notAlliance': 'Not an L-Mount Alliance product.',
    'detail.notAllianceBody': 'is not a listed member of the L-Mount Alliance. This entry means the '
      + 'manufacturer offers (or claims) an L-Mount version of this lens — it does not imply official '
      + 'certification, testing, or endorsement by the L-Mount Alliance, Leica Camera AG, Panasonic, or Sigma. '
      + 'See the About & Disclaimer page.',
    'detail.officialPage': 'Official page',
    'detail.sponsored': '(sponsored)',
    'detail.specifications': 'Specifications',
    'detail.notes': 'Notes',
    'detail.dataSources': 'Data sources',
    'detail.sourcesFooter': 'Specifications are compiled from the sources above and may contain errors or become '
      + 'outdated. Always confirm critical specs with the manufacturer before purchase. See About & Disclaimer.',

    'spec.mount': 'Mount',
    'spec.format': 'Format',
    'spec.lensType': 'Lens type',
    'spec.focusType': 'Focus type',
    'spec.focalLength': 'Focal length',
    'spec.maxAperture': 'Maximum aperture',
    'spec.minAperture': 'Minimum aperture',
    'spec.weight': 'Weight',
    'spec.filterThread': 'Filter thread',
    'spec.filterThreadNone': 'None / not applicable',
    'spec.minFocusDistance': 'Minimum focus distance',
    'spec.maxMagnification': 'Maximum magnification',
    'spec.stabilization': 'Optical stabilization',
    'spec.weatherSealed': 'Weather sealed',
    'spec.releaseYear': 'Release year',
    'spec.allianceMember': 'L-Mount Alliance member',
    'spec.yes': 'Yes',
    'spec.no': 'No',
    'spec.noThirdParty': 'No (third-party)',
    'spec.notSpecified': 'Not specified',

    'about.title': 'About & Disclaimer',
    'about.intro': '<strong>L-Mount Lens Guide</strong> is an unofficial, community-maintained directory of '
      + 'lenses for the L-Mount lens mount system. It is a volunteer open-source project, built and maintained '
      + 'by photography enthusiasts, not by any camera or lens manufacturer.',
    'about.h.noAffiliation': 'No affiliation, sponsorship, or endorsement',
    'about.noAffiliation1': 'This project is <strong>not affiliated with, sponsored by, or endorsed by</strong> '
      + 'Leica Camera AG, the L-Mount Alliance, Panasonic, Sigma, or any other brand mentioned on this site. '
      + 'Product names, brand names, and specifications referenced here belong to their respective owners and '
      + 'are used solely for identification and informational purposes (nominative fair use).',
    'about.noAffiliation2': '<strong>"L-Mount" and "L-Mount Alliance" are trademarks of Leica Camera AG.</strong> '
      + 'Their use on this site refers only to the lens mount standard and its ecosystem, and does not imply '
      + 'any business relationship with Leica Camera AG.',
    'about.noAffiliation3': 'This site does not use official manufacturer logos, the Leica red dot, or any other '
      + 'manufacturer trademark graphics. Brand names are shown as plain text only.',
    'about.h.allianceMeaning': 'What "L-Mount Alliance member" means on this site',
    'about.allianceMeaning1': 'Each lens entry is tagged as either an <strong>L-Mount Alliance member</strong> '
      + 'product or a <strong>third-party (non-Alliance)</strong> product:',
    'about.allianceMeaning.member': '<strong>L-Mount Alliance member</strong> — the brand is a publicly listed '
      + 'member of the <a href="https://l-mount.com/" target="_blank" rel="noopener noreferrer">L-Mount Alliance</a> '
      + '(as of 2026: Leica, Panasonic, Sigma, Ernst Leitz Wetzlar, DJI, Astrodesign, Samyang, Blackmagic Design, '
      + 'Sirui, Viltrox, and Freefly). This reflects the brand’s membership status, not a per-lens certification.',
    'about.allianceMeaning.thirdParty': '<strong>Third-party (non-Alliance)</strong> — the manufacturer is not '
      + 'an L-Mount Alliance member. Listing a lens here only means the manufacturer sells, or has announced, '
      + 'an L-Mount version of that lens. It is <strong>not</strong> a claim of official compatibility testing, '
      + 'certification, or endorsement by the L-Mount Alliance or any Alliance member. Third-party lenses may '
      + 'have compatibility limitations (autofocus behavior, firmware support, stabilization coordination, '
      + 'etc.) that differ from Alliance-member lenses — always check current compatibility notes from the '
      + 'lens manufacturer before purchasing.',
    'about.h.dataAccuracy': 'Data accuracy',
    'about.dataAccuracy1': 'Lens specifications are compiled from publicly available manufacturer sources and '
      + 'community references. They may contain errors, omissions, or become outdated as products are updated '
      + 'or discontinued. Every lens entry lists its source links — always verify specifications against '
      + 'the manufacturer’s current published data before making a purchasing decision. If you spot an '
      + 'error, please open an issue or pull request.',
    'about.h.commercialLinks': 'Commercial links',
    'about.commercialLinks1': 'This site currently contains only plain, non-monetized "search this retailer" '
      + 'links — no affiliate program is active today. The data model reserves fields (<code>affiliateUrls</code>, '
      + '<code>retailerSearchUrls[].sponsored</code>) for future monetized links. If and when any sponsored or '
      + 'affiliate link is added, it will be clearly and visibly labeled "sponsored" or "affiliate" in the UI, '
      + 'and outbound links will use <code>rel="sponsored nofollow"</code> as appropriate.',
    'about.h.license': 'License',
    'about.license1': 'Site source code is available under the MIT License. Lens specification data is '
      + 'available under the Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0) license. See '
      + '<code>LICENSE</code> and <code>DATA_LICENSE.md</code> in the project repository for details.',
    'about.h.contact': 'Contact / contribute',
    'about.contact1': 'This is an open-source project — contributions, corrections, and new lens '
      + 'submissions are welcome via GitHub. See <code>CONTRIBUTING.md</code> for how to submit a new lens entry.',
    'about.repoLink': 'the project repository',
    'about.repoLink2': 'GitHub',

    // Page <title> and <meta description>. Rendered per locale at build
    // time, which is what makes each language separately indexable.
    'seo.homeTitle': 'L-Mount Lens Guide — Unofficial L-Mount Lens Database',
    'seo.homeDescription': 'Browse, search, and filter {count} L-Mount lenses from L-Mount Alliance '
      + 'members (Leica, Panasonic, Sigma, and other Alliance brands) and third-party manufacturers. '
      + 'Unofficial, community-maintained.',
    'seo.aboutTitle': 'About & Disclaimer — L-Mount Lens Guide',
    'seo.aboutDescription': 'L-Mount Lens Guide is an unofficial, community-maintained project. It is '
      + 'not affiliated with, sponsored by, or endorsed by Leica Camera AG, the L-Mount Alliance, '
      + 'Panasonic, Sigma, or any other manufacturer.',
    'seo.compareTitle': 'Lens Comparison — L-Mount Lens Guide',
    'seo.compareDescription': 'Compare specifications of selected L-Mount lenses side by side.',
    'seo.lensTitle': '{brand} {model} — L-Mount Lens Guide',
    'seo.lensDescription': '{brand} {model}: {focal} {aperture}, {format}, {focus}, {weight}. {alliance}',
    'seo.lensAlliance': 'L-Mount Alliance member.',
    'seo.lensThirdParty': 'Third-party L-Mount lens (not an Alliance member).',
  },

  zh: {
    'site.tagline': '非官方 · 社区维护',
    'nav.lenses': '镜头列表',
    'nav.about': '关于与免责声明',
    'nav.github': 'GitHub',
    'lang.switchLabel': '切换语言',

    'brand.Leica': '徕卡',
    'brand.Panasonic': '松下',
    'brand.Sigma': '适马',
    'brand.Samyang': '森养',
    'brand.Viltrox': '唯卓仕',
    'brand.Sirui': '思锐',
    'brand.TTArtisan': '铭匠光学',
    'brand.7Artisans': '七工匠',
    'brand.Laowa': '老蛙',
    'brand.Meike': '美科',

    'footer.copyright': '© {year} L-Mount Lens Guide 贡献者',
    'footer.codeUnder': '代码遵循',
    'footer.dataUnder': '协议，数据遵循',
    'footer.mit': 'MIT',
    'footer.ccbysa': 'CC BY-SA 4.0',
    'footer.contribute': '在 GitHub 上参与贡献',
    'footer.disclaimer': '本站是非官方、社区维护的项目，与 Leica Camera AG、L-Mount Alliance、Panasonic、Sigma '
      + '及其他任何厂商均无隶属、赞助或背书关系。"L-Mount" 是 Leica Camera AG 的商标。详见',
    'footer.aboutLink': '关于与免责声明',
    'footer.aboutLinkSuffix': '页面。',

    'home.title': 'L 卡口镜头数据库',
    'home.intro': '一个非官方、社区维护的 L 卡口镜头目录',

    'filterBar.searchPlaceholder': '搜索品牌、型号或焦段（例如 "适马 35mm"）',
    'filterBar.searchAriaLabel': '搜索镜头',
    'filterBar.brand': '品牌',
    'filterBar.allBrands': '全部品牌',
    'filterBar.allianceBrandsGroup': 'L-Mount Alliance 联盟成员',
    'filterBar.thirdPartyBrandsGroup': '第三方（非联盟）',
    'filterBar.format': '画幅',
    'filterBar.allFormats': '全部画幅',
    'filterBar.fullFrame': '全画幅',
    'filterBar.apsc': 'APS-C',
    'filterBar.focus': 'AF / MF',
    'filterBar.allFocus': 'AF 与 MF',
    'filterBar.af': '自动对焦',
    'filterBar.mf': '手动对焦',
    'filterBar.lensType': '定焦 / 变焦',
    'filterBar.allLensTypes': '定焦与变焦',
    'filterBar.prime': '定焦',
    'filterBar.zoom': '变焦',
    'filterBar.alliance': '联盟状态',
    'filterBar.allLenses': '全部镜头',
    'filterBar.allianceMember': 'L-Mount Alliance 联盟成员',
    'filterBar.thirdParty': '第三方（非联盟）',
    'filterBar.weight': '重量',
    'filterBar.anyWeight': '不限重量',
    'filterBar.focalLength': '焦段',
    'filterBar.focalRangeHint': '与所选焦段存在交集的镜头都会显示（兼容变焦镜头）。',
    'filterBar.focalMinLabel': '最短焦段',
    'filterBar.focalMaxLabel': '最长焦段',
    'filterBar.sortBy': '排序方式',
    'filterBar.sort.focalAsc': '焦距（从短到长）',
    'filterBar.sort.focalDesc': '焦距（从长到短）',
    'filterBar.sort.apertureAsc': '最大光圈（从大到小）',
    'filterBar.sort.weightAsc': '重量（从轻到重）',
    'filterBar.sort.weightDesc': '重量（从重到轻）',
    'filterBar.sort.yearDesc': '发布年份（从新到旧）',
    'filterBar.sort.yearAsc': '发布年份（从旧到新）',
    'filterBar.cards': '卡片视图',
    'filterBar.table': '表格视图',
    'filterBar.clear': '清空筛选',
    'filterBar.showingCount': '共 {total} 支镜头，当前显示 {count} 支',
    'filterBar.noResults': '没有符合筛选条件的镜头，请尝试清空部分筛选条件。',

    'category.Wide Angle': '广角',
    'category.Standard': '标准',
    'category.Portrait': '人像',
    'category.Telephoto': '长焦',
    'category.Macro': '微距',
    'category.Cine': '电影镜头',

    'card.allianceMember': '联盟成员',
    'card.thirdParty': '第三方',
    'card.focalLength': '焦距',
    'card.maxAperture': '最大光圈',
    'card.weight': '重量',
    'card.released': '发布年份',

    'table.brand': '品牌',
    'table.model': '型号',
    'table.alliance': '联盟状态',
    'table.format': '画幅',
    'table.type': '类型',
    'table.focus': '对焦',
    'table.focalLength': '焦距',
    'table.maxAperture': '最大光圈',
    'table.weight': '重量',
    'table.year': '年份',
    'table.member': '联盟成员',
    'table.thirdParty': '第三方',
    'table.compare': '对比',

    'compare.add': '加入对比',
    'compare.remove': '移出对比',
    'compare.floatingButton': '对比镜头（{count}）',
    'compare.startComparing': '开始对比',
    'compare.panelTitle': '待对比镜头',
    'compare.clearAll': '清空全部',
    'compare.title': '镜头对比',
    'compare.intro': '并排比较所选镜头的规格参数。',
    'compare.empty': '暂无待对比的镜头。',
    'compare.emptyAction': '返回镜头列表',

    'detail.back': '← 返回镜头列表',
    'detail.allianceMember': 'L-Mount Alliance 联盟成员',
    'detail.thirdParty': '第三方（非联盟）',
    'detail.af': '自动对焦',
    'detail.mf': '手动对焦',
    'detail.notAlliance': '非 L-Mount Alliance 联盟产品。',
    'detail.notAllianceBody': '并非 L-Mount Alliance 的官方成员。此条目仅表示该厂商提供（或宣称提供）'
      + '此镜头的 L 卡口版本 —— 并不代表已获得 L-Mount Alliance、Leica Camera AG、Panasonic 或 Sigma 的官方'
      + '认证、测试或背书。详见"关于与免责声明"页面。',
    'detail.officialPage': '官方页面',
    'detail.sponsored': '（赞助）',
    'detail.specifications': '规格参数',
    'detail.notes': '备注',
    'detail.dataSources': '数据来源',
    'detail.sourcesFooter': '以上规格参数整理自上述来源，可能存在错误或已过时。购买前请务必以厂商官方公布的'
      + '最新数据为准。详见"关于与免责声明"页面。',

    'spec.mount': '卡口',
    'spec.format': '画幅',
    'spec.lensType': '镜头类型',
    'spec.focusType': '对焦方式',
    'spec.focalLength': '焦距',
    'spec.maxAperture': '最大光圈',
    'spec.minAperture': '最小光圈',
    'spec.weight': '重量',
    'spec.filterThread': '滤镜口径',
    'spec.filterThreadNone': '无 / 不适用',
    'spec.minFocusDistance': '最近对焦距离',
    'spec.maxMagnification': '最大放大倍率',
    'spec.stabilization': '光学防抖',
    'spec.weatherSealed': '防尘防滴',
    'spec.releaseYear': '发布年份',
    'spec.allianceMember': 'L-Mount Alliance 联盟成员',
    'spec.yes': '是',
    'spec.no': '否',
    'spec.noThirdParty': '否（第三方）',
    'spec.notSpecified': '未标注',

    'about.title': '关于与免责声明',
    'about.intro': '<strong>L-Mount Lens Guide</strong> 是一个非官方、社区维护的 L 卡口镜头目录。这是一个'
      + '志愿者主导的开源项目，由摄影爱好者构建和维护，并非由任何相机或镜头厂商运营。',
    'about.h.noAffiliation': '无隶属、赞助或背书关系',
    'about.noAffiliation1': '本项目与 Leica Camera AG、L-Mount Alliance、Panasonic、Sigma 及本站提及的其他任何'
      + '品牌<strong>均无隶属、赞助或背书关系</strong>。本站提及的产品名称、品牌名称及相关规格均属于其各自'
      + '所有者，仅用于标识和信息说明目的（指名性合理使用）。',
    'about.noAffiliation2': '<strong>"L-Mount" 与 "L-Mount Alliance" 是 Leica Camera AG 的商标。</strong>'
      + '本站使用这些名称仅为指代该卡口标准及其生态系统，并不代表与 Leica Camera AG 存在任何商业关系。',
    'about.noAffiliation3': '本站不使用任何厂商的官方 Logo、Leica 红点标志或其他厂商商标图形，品牌名称仅以'
      + '纯文本形式展示。',
    'about.h.allianceMeaning': '本站"L-Mount Alliance 联盟成员"标签的含义',
    'about.allianceMeaning1': '每条镜头数据都会标注为<strong>"L-Mount Alliance 联盟成员"</strong>产品或'
      + '<strong>"第三方（非联盟）"</strong>产品：',
    'about.allianceMeaning.member': '<strong>L-Mount Alliance 联盟成员</strong> —— 该品牌是 '
      + '<a href="https://l-mount.com/" target="_blank" rel="noopener noreferrer">L-Mount Alliance</a> '
      + '公开列出的成员（截至 2026 年：Leica、Panasonic、Sigma、Ernst Leitz Wetzlar、DJI、Astrodesign、'
      + 'Samyang、Blackmagic Design、Sirui、Viltrox 及 Freefly）。这反映的是品牌的联盟成员身份，而非针对单个'
      + '镜头的认证。',
    'about.allianceMeaning.thirdParty': '<strong>第三方（非联盟）</strong> —— 该厂商并非 L-Mount Alliance '
      + '成员。收录这类镜头仅表示厂商销售或已宣布推出该镜头的 L 卡口版本，<strong>并不代表</strong>已获得 '
      + 'L-Mount Alliance 或任何联盟成员的官方兼容性测试、认证或背书。第三方镜头在自动对焦表现、固件支持、'
      + '防抖协同等方面可能与联盟成员镜头存在差异 —— 购买前请务必查阅镜头厂商公布的最新兼容性说明。',
    'about.h.dataAccuracy': '数据准确性',
    'about.dataAccuracy1': '镜头规格数据整理自公开的厂商资料和社区参考信息，可能包含错误、遗漏，或随着产品'
      + '更新、停产而过时。每条镜头数据都附有来源链接 —— 做出购买决定前，请务必以厂商当前公布的数据为准进行'
      + '核实。如发现错误，欢迎提交 Issue 或 Pull Request。',
    'about.h.commercialLinks': '商业链接说明',
    'about.commercialLinks1': '本站目前仅包含普通的、未变现的"在该零售商处搜索"链接 —— 目前没有启用任何'
      + '联盟营销（affiliate）计划。数据模型中预留了字段（<code>affiliateUrls</code>、'
      + '<code>retailerSearchUrls[].sponsored</code>）供未来接入商业化链接使用。一旦启用任何赞助或返佣链接，'
      + '界面上都会清晰、显著地标注"赞助"或"返佣"字样，对外链接也会按需使用 <code>rel="sponsored nofollow"</code>。',
    'about.h.license': '许可协议',
    'about.license1': '本站源代码采用 MIT 许可协议。镜头规格数据采用知识共享署名-相同方式共享 4.0 协议'
      + '（CC BY-SA 4.0）。详见项目仓库中的 <code>LICENSE</code> 与 <code>DATA_LICENSE.md</code> 文件。',
    'about.h.contact': '联系与贡献',
    'about.contact1': '这是一个开源项目 —— 欢迎通过 GitHub 提交修正、新增镜头数据或其他贡献。提交新镜头数据'
      + '的方法请见 <code>CONTRIBUTING.md</code>。',
    'about.repoLink': '项目仓库',
    'about.repoLink2': 'GitHub',

    'seo.homeTitle': 'L 卡口镜头指南 — 非官方 L 卡口镜头数据库',
    'seo.homeDescription': '浏览、搜索并筛选 {count} 支 L 卡口镜头，涵盖 L 卡口联盟成员'
      + '（徕卡、松下、适马及其他联盟品牌）与第三方厂商产品。非官方，社区维护。',
    'seo.aboutTitle': '关于与免责声明 — L 卡口镜头指南',
    'seo.aboutDescription': 'L 卡口镜头指南是一个非官方、由社区维护的项目，与徕卡相机股份公司、'
      + 'L 卡口联盟、松下、适马或任何其他厂商均无从属、赞助或背书关系。',
    'seo.compareTitle': '镜头对比 — L 卡口镜头指南',
    'seo.compareDescription': '并排对比所选 L 卡口镜头的规格参数。',
    'seo.lensTitle': '{brand} {model} — L 卡口镜头指南',
    'seo.lensDescription': '{brand} {model}：{focal} {aperture}，{format}，{focus}，{weight}。{alliance}',
    'seo.lensAlliance': 'L 卡口联盟成员产品。',
    'seo.lensThirdParty': '第三方 L 卡口镜头（非联盟成员）。',
  },
};

# 镜头逐条资料核查：2026-10-21

本次对全部 **168 个存储条目**逐一查验。**审查完成不等于所有参数已经证实**。每款的已核实字段、待核实字段、核实值、修正建议、官方来源及原文摘录均保存在 [完整机器可读记录](lens-audit-2026-10-21.json)。网站的 `/data-audit` 和 `/zh/data-audit` 页面提供逐款记录。

## 结果

- 原生 L 卡口身份确认：**168/168**。初代 Meike 85mm F1.8 STM 初查曾暂缓收录，同日专项复查找回厂家原产品页存档，现已确认原生 L 版本并恢复目录及对比。
- 所有必核字段都有本次资料支持：**25 款**；其余条目至少有一个待核实字段，不能据此认定整款镜头错误。
- 在前两轮修正基础上，本轮又调整 **37 款的原有字段**（包括规格纠错、倍率精度、命名及 L 版上市年份口径），补充变光圈两端字段后共有 **48 款**发生参数变化；所有条目补充核查元数据并更新有据描述。
- 共有 **455 个字段待核实**。这是证据缺口数量，不是错误数量。常见缺口是厂家未明确说明是否无 OIS、未给 L 版独立重量、未找到 L 版实际上市日期。

## 初代 Meike 85mm F1.8 STM 专项补证

同日扩大检索后，通过 [Internet Archive 保存的厂家原产品页](https://web.archive.org/web/20250808210240id_/https://meikeglobal.com/products/85mm-f1-8l)确认这款原生 L 卡口镜头确实存在。存档标题明确为 “Meike 85mm F1.8 Auto Focus STM Full Frame Lens for L Mount Camera”，正文列出 L 卡口兼容、6 组 9 片、9 片光圈叶片、F1.8–22、67mm、镜身净重386g，以及 E/Z/L/X 版最近对焦0.9m（0.85m对应EF版）。这组特征与PRO、SE II区分明确。

[Hot Rod Cameras 独立产品页](https://hotrodcameras.com/products/meike-85mm-f-1-8-full-frame-af-lens-leica-l)使用 SKU `MK-8518FFSTM-L`，另有不同SKU的PRO II页面；[The Reliable Store](https://thereliablestore.com/products/meike-85mm-f18-mark-i-lens-for-l-mount-fast-portrait-prime-with-autofocus)明确写Mark I、L-Mount。这些零售来源作为身份交叉证据，规格仍优先采用厂家存档，避免零售页混入Sony E或EF版文案。

原官方URL现为404、中文旧页漏列L，不能证明镜头从未存在。Google／DuckDuckGo的跳转或挑战、Bing无关结果、Brave后续429均未作为事实证据。中文2024上市新闻只拿到搜索摘要，未据其给首次实际上市年份定值。存档日期亦不当作上市日期。现恢复收录，并确认最小光圈、L版重量、滤镜及最近对焦；倍率、OIS、整镜防护和首次上市年等剩余缺证字段继续标待核实。

## 核查规则与页面行为

- 重量必须对应 L 卡口，并说明遮光罩／脚架环口径。E、EF、RF 等其他卡口重量和未分卡口的区间，不能作为已确认 L 版重量。
- `releaseYear` 指原生 L 版本首次实际上市年份；不把产品设计年份、其他卡口年份、公告年份或尚未兑现的上市计划混入。历史或未来年份缺证时，保留原值供追溯，但页面显示待核实。
- 最近对焦距离从传感器／胶片平面计，不能拿镜头前端工作距离代替。
- `weatherSealed` 指整镜防尘防溅。官网仅提到卡口密封，并不能证明整镜有或没有防护；只有明确写“仅卡口”等限制时，才据此判定不是整镜防护。
- 规格表未提 OIS，不等于厂家明确说明没有 OIS；同理，未提防护不等于没有防护。
- 原版 DG DN、后续去掉 DN 的重命名版本以及旧版／新版镜头分别核对，不混用页面。停产版本只要原生 L 卡口存在得到确认，仍可收录。
- 联盟成员正面身份依据 Leica 官方完整名单与加入声明。未在所引名录出现的品牌暂标待核实，不直接用缺席证明其非成员。
- 型号身份跟随官方对该版本的确认；定焦／变焦也可由已确认的相等／不同焦距端点判定。用途分类属于编辑标签，不作为厂商规格认证。
- 未核实参数在详情、卡片、列表、SEO 和对比中不作为确定数值展示；数值过滤／排序不使用这些存储值，未知值始终排在已知值后面。
- 为了保留历史修改线索，JSON 中可能保留尚未核实的旧值。读取数据时必须同时检查 `verification`；只有 `verifiedFields` 中且不在 `unresolvedFields` 中的字段可视为当前资料支持的值。`confirmedValues` 固定每个已核实字段的审查值，防止以后悄悄变值却沿用旧核实状态。
- 先前已取得的引用保留，新来源追加。HTTP 404、官网内部矛盾及抓取失败同样记录；引用一个 URL 本身不等于它支持该条目的所有字段。

## 本轮原有字段的调整

以下相对本轮开始时的数据，已包括前两轮更新；不把补充长焦端／广角端光圈字段单独算作原值错误。

| 镜头 | 原值 → 新值 |
|---|---|
| Leica Summilux-SL 50mm f/1.4 ASPH | 最近对焦距离：`0.45` → `0.6`；最大倍率：`0.15` → `0.1` |
| Leica APO-Summicron-SL 90mm f/2 ASPH | 最近对焦距离：`0.5` → `0.6`；最大倍率：`0.19` → `0.2` |
| Panasonic Lumix S PRO 50mm F1.4 | 最近对焦距离：`0.4` → `0.44`；最大倍率：`0.2` → `0.15` |
| Panasonic Lumix S PRO 70-200mm F2.8 O.I.S. | L版首次上市年份：`2019` → `2020` |
| Sigma 100-400mm F5-6.3 DG DN OS Contemporary | 最小光圈：`22` → `29` |
| Sigma 28-70mm F2.8 DG DN Contemporary | 最大倍率：`0.44` → `0.303`；整镜防尘防溅：`true` → `false` |
| Sigma 150-600mm F5-6.3 DG DN OS Sports | 最小光圈：`22` → `29` |
| Sirui Aurora 85mm F1.4 | 最大倍率：`0.13` → `0.115` |
| 7Artisans 60mm F2.8 Macro Mark II | 最小光圈：`16` → `22` |
| Sigma 16-300mm F3.5-6.7 DC OS Contemporary | 最小光圈：`22` → `45` |
| Sigma 20-200mm F3.5-6.3 DG Contemporary | 最小光圈：`22` → `40` |
| Sigma 60-600mm F4.5-6.3 DG DN OS Sports | 最小光圈：`22` → `32` |
| Leica Summicron-TL 23 f/2 ASPH. | 最近对焦距离：`0.3` → `0.35` |
| Sigma 14mm F1.8 DG HSM Art | L版首次上市年份：`2017` → `2020` |
| Sigma 16mm F1.4 DC DN Contemporary | L版首次上市年份：`2017` → `2020` |
| Sigma 45mm F2.8 DG DN Contemporary | L版重量：`220` → `215` |
| Sigma 56mm F1.4 DC DN Contemporary | L版首次上市年份：`2018` → `2020` |
| Sigma 70mm F2.8 DG Macro Art | L版首次上市年份：`2018` → `2020` |
| Meike 24mm F1.4 MIX | 最大倍率：`0.1` → `0.13`；整镜防尘防溅：`false` → `true` |
| Meike 35mm F2.0 STM | 最大倍率：`0.08` → `0.1` |
| Meike 35mm F1.8 PRO STM | 最大倍率：`0.11` → `0.13` |
| Meike 50mm F1.8 STM | 最大倍率：`0.09` → `0.1` |
| Panasonic LUMIX S 18-40mm F4.5-6.3 | 最小光圈：`22` → `32` |
| Panasonic LUMIX S 28-200mm F4-7.1 MACRO O.I.S. | 最小光圈：`32` → `45` |
| Viltrox AF 28mm F4.5 Chip | 最大倍率：`0.11` → `0.1` |
| Sigma 300-600mm F4 DG OS Sports | 最大倍率：`0.17` → `0.167` |
| Sigma 17-40mm F1.8 DC Art | 最大倍率：`0.21` → `0.208` |
| Sigma 35mm F1.4 DG II Art | 最大倍率：`0.19` → `0.185` |
| Sigma 85mm F1.2 DG Art | 最大倍率：`0.11` → `0.112` |
| Sigma 20-60mm F2.8-4 DG Contemporary | 最小光圈：`22` → `32`；最大倍率：`0.43` → `0.435` |
| 7Artisans AF 135mm F1.8 | 整镜防尘防溅：`null` → `true` |
| Meike 85mm F1.8 SE Mark II STM | 最大倍率：`0.15` → `0.11` |
| Laowa 180mm F4.5 1.5X Ultra Macro APO (MF) | 型号／版本：`"AF 180mm F4.5 1.5X Ultra Macro APO"` → `"180mm F4.5 1.5X Ultra Macro APO (MF)"` |
| Laowa Aksen 17.5mm F1.7 5-10X Ultra Macro APO | 滤镜口径：`42` → `null` |
| Mitakon 55mm F2.8 1-5X Macro | 最近对焦距离：`0.279` → `0.272` |
| Panasonic LUMIX S PRO 70-200mm F4 O.I.S. (S-R70200A) | 型号／版本：`"LUMIX S PRO 70-200mm F4 O.I.S. (2026)"` → `"LUMIX S PRO 70-200mm F4 O.I.S. (S-R70200A)"` |
| Sigma 28mm F1.4 DG HSM Art | L版首次上市年份：`2019` → `2020` |

## 全部 168 条的覆盖表

下表“L 已确认”只确认原生卡口版本，不代表所有规格都已确认。所有来源原文见 JSON 记录与网站核查页。

| 镜头 ID | L 卡口 | 待核实字段 |
|---|---|---|
| `leica-summicron-sl-35mm-f2-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-summilux-sl-50mm-f1-4-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-apo-summicron-sl-90mm-f2-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-vario-elmarit-sl-24-70mm-f2-8-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-apo-vario-elmarit-sl-90-280mm-f2-8-4` | 已确认 | L版首次上市年份 |
| `panasonic-lumix-s-24-105mm-f4-macro-ois` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-pro-50mm-f1-4` | 已确认 | 光学防抖 |
| `panasonic-lumix-s-pro-70-200mm-f2-8-ois` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-20-60mm-f3-5-5-6` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-85mm-f1-8` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-100mm-f2-8-macro` | 已确认 | 无（本次必核字段均有来源支持） |
| `sigma-35mm-f1-4-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-24mm-f1-4-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-65mm-f2-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-100-400mm-f5-6-3-dg-dn-os-contemporary` | 已确认 | 整镜防尘防溅 |
| `sigma-28-70mm-f2-8-dg-dn-contemporary` | 已确认 | 光学防抖 |
| `sigma-105mm-f2-8-dg-dn-macro-art` | 已确认 | 光学防抖 |
| `sigma-150-600mm-f5-6-3-dg-dn-os-sports` | 已确认 | 无（本次必核字段均有来源支持） |
| `sirui-aurora-85mm-f1-4` | 已确认 | 光学防抖、L版首次上市年份 |
| `sirui-aurora-35mm-f1-4` | 已确认 | 光学防抖、L版首次上市年份 |
| `ttartisan-50mm-f1-4` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-21mm-f1-5-asph` | 已确认 | 联盟成员身份、L版重量、滤镜口径、最近对焦距离、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-35mm-f1-4-iii` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-60mm-f2-8-macro` | 已确认 | 联盟成员身份、L版重量、整镜防尘防溅、L版首次上市年份 |
| `laowa-15mm-f2-zero-d` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-100mm-f2-8-2x-ultra-macro-apo` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `sigma-10-18mm-f2-8-dc-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-14-24mm-f2-8-dg-dn-art` | 已确认 | 光学防抖、L版首次上市年份 |
| `sigma-16-28mm-f2-8-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-16-300mm-f3-5-6-7-dc-os-contemporary` | 已确认 | 无（本次必核字段均有来源支持） |
| `sigma-18-50mm-f2-8-dc-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-20-200mm-f3-5-6-3-dg-contemporary` | 已确认 | 光学防抖 |
| `sigma-24-70mm-f2-8-dg-dn-art` | 已确认 | 对焦方式、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `sigma-28-45mm-f1-8-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-28-105mm-f2-8-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-60-600mm-f4-5-6-3-dg-dn-os-sports` | 已确认 | 无（本次必核字段均有来源支持） |
| `sigma-70-200mm-f2-8-dg-dn-os-sports` | 已确认 | 无（本次必核字段均有来源支持） |
| `samyang-af-35-150mm-f2-2-8` | 已确认 | 光学防抖、L版首次上市年份 |
| `viltrox-af-16mm-f1-8` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-af-24mm-f1-8` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-af-35mm-f1-8` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-af-50mm-f1-8` | 已确认 | 联盟成员身份、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-af-85mm-f1-8` | 已确认 | 联盟成员身份、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-af-40mm-f2` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-af-75mm-f2` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-super-vario-elmar-tl-11-23mm-f3-5-4-5-asph` | 已确认 | 画幅、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-super-vario-elmar-sl-16-35mm-f3-5-4-5-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-vario-elmar-tl-18-56mm-f3-5-5-6-asph` | 已确认 | 画幅、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-vario-elmarit-sl-24-90mm-f2-8-4-asph` | 已确认 | 对焦方式、L版首次上市年份 |
| `leica-apo-vario-elmar-tl-55-135mm-f3-5-4-5-asph` | 已确认 | 画幅、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-vario-elmar-sl-100-400mm-f5-6-3` | 已确认 | L版首次上市年份 |
| `leica-elmarit-tl-18mm-f2-8-asph` | 已确认 | 画幅、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-super-apo-summicron-sl-21mm-f2-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-summicron-tl-23mm-f2-asph` | 已确认 | 画幅、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-summilux-tl-35mm-f1-4-asph` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-apo-summicron-sl-35mm-f2-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-summicron-sl-50mm-f2-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-apo-summicron-sl-50mm-f2-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-apo-macro-elmarit-tl-60mm-f2-8-asph` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-apo-summicron-sl-75mm-f2-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `sigma-14mm-f1-4-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-14mm-f1-8-dg-hsm-art` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-15mm-f1-4-dg-dn-diagonal-fisheye-art` | 已确认 | 光学防抖 |
| `sigma-16mm-f1-4-dc-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-17mm-f4-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-20mm-f1-4-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-20mm-f2-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-23mm-f1-4-dc-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-24mm-f2-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-24mm-f3-5-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-30mm-f1-4-dc-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-35mm-f1-2-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-35mm-f1-2-dg-ii-art` | 已确认 | 光学防抖 |
| `sigma-35mm-f2-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-40mm-f1-4-dg-hsm-art` | 已确认 | 光学防抖、L版首次上市年份 |
| `sigma-45mm-f2-8-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `sigma-50mm-f1-4-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-50mm-f2-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-56mm-f1-4-dc-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-70mm-f2-8-dg-macro-art` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-90mm-f2-8-dg-dn-contemporary` | 已确认 | 光学防抖、整镜防尘防溅 |
| `sigma-105mm-f1-4-dg-hsm-art` | 已确认 | 光学防抖、L版首次上市年份 |
| `sigma-135mm-f1-4-dg-art` | 已确认 | 光学防抖 |
| `sigma-200mm-f2-dg-os-sports` | 已确认 | 无（本次必核字段均有来源支持） |
| `sigma-500mm-f5-6-dg-dn-os-sports` | 已确认 | 无（本次必核字段均有来源支持） |
| `meike-24mm-f1-4-mix` | 已确认 | 联盟成员身份、L版重量、光学防抖、L版首次上市年份 |
| `meike-35mm-f2-stm` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-35mm-f1-8-pro-stm` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-50mm-f1-8-stm` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-55mm-f1-8-pro-stm` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-85mm-f1-4-stm` | 已确认 | 联盟成员身份、L版重量、整镜防尘防溅、L版首次上市年份 |
| `meike-85mm-f1-4-stm-mix-ii` | 已确认 | 联盟成员身份、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-85mm-f1-8-stm` | 已确认（官方原页存档补证，已恢复） | 联盟成员身份、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-85mm-f1-8-pro-stm` | 已确认 | 联盟成员身份、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `panasonic-lumix-s-14-28mm-f4-5-6-macro` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-pro-16-35mm-f4` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-18-40mm-f4-5-6-3` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-24-60mm-f2-8` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-pro-24-70mm-f2-8` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-28-200mm-f4-7-1-macro-ois` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-pro-70-200mm-f4-ois` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-70-300mm-f4-5-5-6-macro-ois` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-100-500mm-f5-7-1-ois` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-18mm-f1-8` | 已确认 | 光学防抖 |
| `panasonic-lumix-s-24mm-f1-8` | 已确认 | 光学防抖 |
| `panasonic-lumix-s-35mm-f1-8` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-40mm-f2` | 已确认 | 无（本次必核字段均有来源支持） |
| `panasonic-lumix-s-50mm-f1-8` | 已确认 | 无（本次必核字段均有来源支持） |
| `viltrox-af-28mm-f4-5` | 已确认 | 滤镜口径、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-tilt-50mm-f1-4` | 已确认 | 联盟成员身份、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `sigma-300-600mm-f4-dg-os-sports` | 已确认 | 无（本次必核字段均有来源支持） |
| `sigma-17-40mm-f1-8-dc-art` | 已确认 | 光学防抖 |
| `sigma-35mm-f1-4-dg-ii-art` | 已确认 | 光学防抖 |
| `sigma-85mm-f1-2-dg-art` | 已确认 | 光学防抖 |
| `sigma-20-60mm-f2-8-4-dg-contemporary` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-vario-elmarit-sl-28-70mm-f2-8-asph` | 已确认 | 光学防抖 |
| `leica-summilux-sl-50mm-f1-4-asph-2026` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-apo-macro-elmarit-sl-100mm-f2-8` | 已确认 | 光学防抖、L版首次上市年份 |
| `panasonic-lumix-s-20mm-f2-5` | 已确认 | L版首次上市年份 |
| `ttartisan-af-50mm-f1-8-neo` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-af-85mm-f1-8-neo` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-14mm-f2-8-asph` | 已确认 | 联盟成员身份、L版重量、滤镜口径、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-tilt-shift-17mm-f4-asph` | 已确认 | 联盟成员身份、L版重量、滤镜口径、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-af-10mm-f2-5` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-af-135mm-f1-8` | 已确认 | 联盟成员身份、L版重量、光学防抖、L版首次上市年份 |
| `7artisans-af-40mm-f2-5` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-14mm-f2-8` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `7artisans-75mm-f1-4` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-85mm-f1-8-se-ii` | 已确认 | 联盟成员身份、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `samyang-af-14-24mm-f2-8` | 已确认 | 光学防抖、L版首次上市年份 |
| `samyang-af-60-180mm-f2-8` | 已确认 | 光学防抖、L版首次上市年份 |
| `laowa-15mm-f4-5-0-5x-macro` | 已确认 | 联盟成员身份、最小光圈、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-8-15mm-f2-8-ff-zoom-fisheye` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-af-180mm-f4-5-1-5x-ultra-macro-apo` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-35mm-f2-8-zero-d-tilt-shift-0-5x-macro` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-aksen-45mm-f2-8-1-5x-ultra-macro-apo` | 已确认 | 联盟成员身份、L版重量、最近对焦距离、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-aksen-17-5mm-f1-7-5-10x-ultra-macro-apo` | 已确认 | 联盟成员身份、L版重量、最近对焦距离、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `mitakon-55mm-f2-8-1-5x-macro` | 已确认 | 联盟成员身份、最小光圈、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `astrhori-af-85mm-f1-8-mark-ii` | 已确认 | 联盟成员身份、L版重量、滤镜口径、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `astrhori-6mm-f2-8-fisheye` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `brightin-star-35mm-f1-4` | 已确认 | 联盟成员身份、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `panasonic-lumix-s-pro-70-200mm-f4-ois-2026` | 已确认 | L版首次上市年份 |
| `sigma-50mm-f1-2-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-85mm-f1-4-dg-dn-art` | 已确认 | 光学防抖 |
| `sigma-24-70mm-f2-8-dg-dn-ii-art` | 已确认 | 光学防抖 |
| `sigma-20mm-f1-4-dg-hsm-art` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `sigma-24mm-f1-4-dg-hsm-art` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `sigma-28mm-f1-4-dg-hsm-art` | 已确认 | 光学防抖 |
| `sigma-35mm-f1-4-dg-hsm-art` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `sigma-50mm-f1-4-dg-hsm-art` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `sigma-85mm-f1-4-dg-hsm-art` | 已确认 | 光学防抖、L版首次上市年份 |
| `sigma-135mm-f1-8-dg-hsm-art` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `leica-apo-summicron-sl-28mm-f2-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-super-vario-elmarit-sl-14-24mm-f2-8-asph` | 已确认 | 光学防抖、L版首次上市年份 |
| `leica-vario-elmarit-sl-70-200mm-f2-8-asph` | 已确认 | L版首次上市年份 |
| `panasonic-lumix-s-26mm-f8` | 已确认 | 无（本次必核字段均有来源支持） |
| `viltrox-af-14mm-f4-0-air` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `viltrox-af-20mm-f2-8-air` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `viltrox-af-40mm-f2-5-air` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `viltrox-af-50mm-f2-0-air` | 已确认 | 光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-ffii-ts-24mm-f2-c-dreamer` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-acris-35mm-f2-8-1x-macro-apo` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `laowa-ffii-12mm-f2-8-c-d-dreamer` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `mitakon-200mm-f4-1x-macro` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-500mm-f6-3` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `ttartisan-100mm-f2-8-macro-2x` | 已确认 | 联盟成员身份、L版重量、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-50mm-f1-2` | 已确认 | 联盟成员身份、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |
| `meike-50mm-f1-7` | 已确认 | 联盟成员身份、L版重量、最大倍率、光学防抖、整镜防尘防溅、L版首次上市年份 |

## 验证命令

```sh
npm run validate:data
node --test tests/verification.test.mjs
npm run check
npm run build
node scripts/validate-rendered-audit.mjs
```

数据验证检查结构、完整覆盖和已核实值与证据记录的一致性，不能自动判断厂商参数是否真实。页面验证检查所有 336 个中英文详情页、目录、对比、核查页及未确认卡口详情的 noindex 行为。上述验证不执行 Git 提交或网站部署。

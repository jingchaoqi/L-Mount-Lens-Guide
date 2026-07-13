# L-Mount Lens Guide（L 卡口镜头指南）

[English](README.md) | 中文

[![GitHub Repo stars](https://img.shields.io/github/stars/jingchaoqi/L-Mount-Lens-Guide?style=flat)](https://github.com/jingchaoqi/L-Mount-Lens-Guide/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/jingchaoqi/L-Mount-Lens-Guide?style=flat)](https://github.com/jingchaoqi/L-Mount-Lens-Guide/commits/main)

<div align="center">

### ✨ 👉 **[点击这里在线体验 — jingchaoqi.github.io/L-Mount-Lens-Guide](https://jingchaoqi.github.io/L-Mount-Lens-Guide/)** 👈 ✨

</div>

---

一个非官方、社区维护的 **L 卡口**（L-Mount）镜头数据库与导航站点。收录了
L-Mount Alliance 联盟成员（Leica、Panasonic、Sigma，以及其他在
[l-mount.com](https://l-mount.com/) 公开列出的品牌）的镜头，也收录了生产
L 卡口镜头的第三方厂商（TTArtisan、7Artisans、Laowa 等）的镜头——两者会
明确标注区分，不会混淆。

**本项目与 Leica Camera AG、L-Mount Alliance、Panasonic、Sigma 或任何其他
厂商均无隶属、赞助或背书关系。** "L-Mount" 是 Leica Camera AG 的商标。完整
免责声明见 [`/about`](src/pages/[...locale]/about.astro)。

## 目标

- 一个快速、可搜索、可筛选的 L 卡口镜头目录——单页即可在桌面或移动端浏览、
  比较规格参数。
- 清晰、诚实地标注官方联盟成员镜头 vs. 第三方 L 卡口镜头，不暗示不存在的
  官方认证。
- 完全数据驱动：每个镜头页面都由结构化数据生成，而非手写 HTML，所以新增一
  支镜头是"改数据"而不是"改代码"。
- 任何人都可以通过 Pull Request 方便地提交勘误或新增镜头。

## 技术栈

- [Astro](https://astro.build/)（静态输出）——不使用客户端框架；页面是纯
  HTML/CSS，配合几小块 vanilla JS 实现搜索/筛选和镜头对比功能。
- TypeScript 用于数据类型和页面逻辑。
- 数据保存在 `src/data/lenses.json`，每次构建前都会经过 Node 脚本校验。
- 中英双语靠静态生成实现：每个页面在构建时按每种语言各渲染一份，因此不存在
  运行时的翻译过程。
- 无后端、无数据库——以静态文件形式部署到 GitHub Pages。

## 项目结构

```
src/
  data/lenses.json        # 镜头数据库（新增/更新镜头就改这个文件）
  lib/types.ts             # 镜头条目的 TypeScript 类型定义
  lib/lenses.ts             # 数据加载与格式化辅助函数
  lib/locales.js             # 语言注册表：站点支持哪些语言
  lib/i18n.ts                 # 构建期翻译 + 带语言前缀的 URL 辅助函数
  lib/i18n-dict.js             # 中英文 UI 文案字典
  components/                   # LensCard、LensTable、FilterBar、Header、Footer、Compare*
  layouts/Layout.astro           # 公共 HTML 外壳、SEO meta、hreflang、语言跳转脚本
  pages/[...locale]/index.astro        # 首页：可搜索/可筛选的镜头列表
  pages/[...locale]/lenses/[id].astro  # 镜头详情页（每支镜头一个，自动生成）
  pages/[...locale]/about.astro        # 关于与免责声明页面
  pages/[...locale]/compare.astro      # 镜头横向对比页面
  scripts/filter.js         # 客户端搜索/筛选/排序/视图切换逻辑
  scripts/compare.js         # 客户端镜头对比选择逻辑
  scripts/i18n.js             # 供 JS 动态生成文案使用的 t()；并记住语言选择
scripts/validate-data.mjs     # 数据校验脚本（必填字段、id、URL、notes 的语言键等）
```

所有路由都位于 `pages/[...locale]/` 之下。Astro 会为其中每个页面按每种语言各
生成一份静态页面（详见下面的[多语言](#多语言)）。

## 多语言

站点提供英文和中文两种语言。每个页面都会在**构建时按每种语言各服务端渲染一
份**，所以浏览器收到的 HTML 本身就已经是正确的语言——没有运行时翻译过程，也
就不存在需要遮掩的"语言闪烁"。

- **URL 结构**：默认语言（英文）不带前缀——`/`、`/about`、`/compare`、
  `/lenses/<id>`；其余每种语言都带自己的前缀——`/zh/`、`/zh/about`、
  `/zh/compare`、`/zh/lenses/<id>`。在 112 支镜头、2 种语言的情况下，构建会产
  出 230 个页面（每种语言 115 个）。
- **首次访问**：`<head>` 里有一小段阻塞式内联脚本，只出现在不带前缀的页面上。
  它按以下优先级决定语言：用户明确保存过的选择（`localStorage`）> 浏览器的
  `navigator.languages` > 英文。如果结果不是默认语言，它会在 body 被解析之前
  跳转到带前缀的 URL，因此此时页面还未绘制任何内容。带语言前缀的 URL 永远不会
  再跳转：显式的 URL 优先级最高，可以放心分享，也不会造成跳转循环。
- **切换语言**：页头的语言切换是一个指向同一页面另一语言版本的普通链接，即使
  禁用 JavaScript 也能正常工作。点击它同时会记住这次选择，下次首访时上面的跳转
  逻辑会优先采用它。
- **SEO**：每种语言都有各自可被索引的 URL、各自翻译过的 `<title>` 与
  `<meta name="description">`、各自的 canonical，以及覆盖所有语言（外加
  `x-default`）的 `<link rel="alternate" hreflang>`。
- **已知取舍**：在禁用 JavaScript 的情况下，浏览器语言为中文的访客如果落在不带
  前缀的 URL 上，看到的会是英文页面（语言链接仍然可用）。此外，中文访客首次访
  问不带前缀的 URL 时，会多付出一次客户端跳转的代价。

### 新增一种语言

1. 在 `src/lib/locales.js` 里新增一条记录——语言代码（即 URL 前缀）、
   `<html lang>` 的取值、该语言对自己的称呼（用作切换链接的文字），以及应当匹配
   到它的 `navigator.language` 前缀。
2. 在 `src/lib/i18n-dict.js` 里新增该语言的文案段落，包括每个品牌的
   `brand.<Brand>` 键。
3. （可选）为 `src/data/lenses.json` 中的条目补上 `notes.<code>`——没有翻译的
   条目会自动回退到英文。

改动到此为止。路由、`hreflang` 备用链接、语言切换器、首访跳转逻辑以及客户端搜索
索引，全部都由 `locales.js` 这份注册表推导而来——不需要改动其他任何代码。

## 新增或编辑镜头

完整指南见 [`CONTRIBUTING.md`](CONTRIBUTING.md)（英文）。简要版：

1. 在 `src/data/lenses.json` 里按照 `src/lib/types.ts` 定义的结构新增一条
   记录。
2. 准确设置 `allianceMember`——只有品牌是 L-Mount Alliance 公开列出的成员
   时才为 `true`，其余一律为 `false`；以
   [l-mount.com](https://l-mount.com/) 的成员名单为准。目前数据集中被标记为
   联盟成员的品牌是 Leica、Panasonic、Samyang、Sigma、Sirui 和 Viltrox。
3. `notes` 要写成按语言代码索引的对象，例如
   `{ "en": "...", "zh": "..." }`。其中 `"en"` 是必填项，其余语言均为可选，
   缺失时会回退到英文。
4. 至少提供一条 `sourceUrls`，注明规格数据的出处。
5. 运行 `npm run validate:data` 并修复所有报错。
6. 提交 Pull Request。

不需要改动其他代码——列表页、筛选器和详情页都会根据数据文件自动生成。

## 本地开发

需要 Node.js 18+。

```bash
npm install
npm run dev        # 启动本地开发服务器，支持热更新
```

其他脚本：

```bash
npm run validate:data   # 校验 src/data/lenses.json
npm run build            # 先校验数据，再构建静态站点到 dist/
npm run preview           # 本地预览生产构建结果
npm run lint               # 对项目做类型检查（astro check）
```

## 部署到 GitHub Pages

本仓库自带一个 GitHub Actions 工作流（`.github/workflows/deploy.yml`），
每次 push 到 `main` 分支时会自动构建并部署到 GitHub Pages。

要在你 fork 的仓库里启用：

1. 在你的 GitHub 仓库里，进入 **Settings → Pages**，把 **Source** 设置为
   **GitHub Actions**。
2. 打开 `astro.config.mjs` 并更新：
   - `site` —— 你的 GitHub Pages 地址，例如 `https://your-username.github.io`
   - `REPO_NAME` —— 你的仓库名（用于拼出 `base` 路径，例如
     `/L-Mount-Lens-Guide/`）。如果你部署到自定义域名或
     `<user>.github.io` 根仓库，把 `base` 改成 `/` 即可。
3. push 到 `main`。工作流会用 `npm run build` 构建站点，并把 `dist/` 目录
   发布到 GitHub Pages。

如果想手动部署：

```bash
npm run build
# 然后把 dist/ 目录的内容发布到你选择的 GitHub Pages 分支/托管服务
```

## 许可协议

- **代码**：[MIT](LICENSE)
- **镜头数据**（`src/data/lenses.json`）：[CC BY-SA 4.0](DATA_LICENSE.md) ——
  该文件里说明了选用理由，以及对二次使用者的要求。

## 免责声明（摘要）

这是一个业余爱好性质的社区开源项目，不是任何相机或镜头厂商的官方资源。
第三方（非联盟）镜头条目只表示该厂商提供或宣称提供该产品的 L 卡口版本——
不代表已获得 L-Mount Alliance 的认证或背书。购买前请务必以厂商公布的信息
为准核实规格参数。完整免责声明见 `src/pages/[...locale]/about.astro`（渲染于
`/about` 页面，中文版位于 `/zh/about`）。

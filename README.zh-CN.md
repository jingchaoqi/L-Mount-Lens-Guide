# L-Mount Lens Guide（L 卡口镜头指南）

[English](README.md) | 中文

一个非官方、社区维护的 **L 卡口**（L-Mount）镜头数据库与导航站点。收录了
L-Mount Alliance 联盟成员（Leica、Panasonic、Sigma，以及其他在
[l-mount.com](https://l-mount.com/) 公开列出的品牌）的镜头，也收录了生产
L 卡口镜头的第三方厂商（TTArtisan、7Artisans、Laowa 等）的镜头——两者会
明确标注区分，不会混淆。

**本项目与 Leica Camera AG、L-Mount Alliance、Panasonic、Sigma 或任何其他
厂商均无隶属、赞助或背书关系。** "L-Mount" 是 Leica Camera AG 的商标。完整
免责声明见 [`/about`](src/pages/about.astro)。

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
  HTML/CSS，配合一小块 vanilla JS 实现搜索/筛选功能。
- TypeScript 用于数据类型和页面逻辑。
- 数据保存在 `src/data/lenses.json`，每次构建前都会经过 Node 脚本校验。
- 无后端、无数据库——以静态文件形式部署到 GitHub Pages。

## 项目结构

```
src/
  data/lenses.json        # 镜头数据库（新增/更新镜头就改这个文件）
  lib/types.ts             # 镜头条目的 TypeScript 类型定义
  lib/lenses.ts             # 数据加载与格式化辅助函数
  components/               # LensCard、LensTable、FilterBar、Header、Footer
  layouts/Layout.astro      # 公共 HTML 外壳 + SEO meta 标签
  pages/index.astro          # 首页：可搜索/可筛选的镜头列表
  pages/lenses/[id].astro    # 镜头详情页（每支镜头一个，自动生成）
  pages/about.astro           # 关于与免责声明页面
  scripts/filter.js           # 客户端搜索/筛选/排序/视图切换逻辑
scripts/validate-data.mjs     # 数据校验脚本（必填字段、id、URL 等）
```

## 新增或编辑镜头

完整指南见 [`CONTRIBUTING.md`](CONTRIBUTING.md)（英文）。简要版：

1. 在 `src/data/lenses.json` 里按照 `src/lib/types.ts` 定义的结构新增一条
   记录。
2. 准确设置 `allianceMember`——只有品牌是 L-Mount Alliance 公开列出的成员
   时才为 `true`，其余一律为 `false`。
3. 至少提供一条 `sourceUrls`，注明规格数据的出处。
4. 运行 `npm run validate:data` 并修复所有报错。
5. 提交 Pull Request。

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
为准核实规格参数。完整免责声明见 `src/pages/about.astro`（渲染于
`/about` 页面）。

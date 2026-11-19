# 技术与 AI 手记

本地 Hexo 8 + Butterfly 5.7.2 博客。没有部署到公网。

## 第一步：启动预览

在项目目录运行（使用项目自带 CLI，不依赖全局 PATH）：

```bash
cd /Users/u/Desktop/my-blog
npm run server -- --ip 127.0.0.1
```

浏览器打开 http://127.0.0.1:4000/ 。停止服务按 Ctrl+C。

全局 Hexo CLI 已安装到 `/Users/u/.local/bin/hexo`；未修改 shell 启动配置。

## 第二步：撰写文章

```bash
npx hexo new post "你的文章标题"
```

在 `source/_posts/` 编辑 Markdown。写法参考 `ai-tools-efficiency-test.md`，其中包含二级标题、命令、提示词、引用及图片占位。

图片放入 `source/img/`，Markdown 使用 `/img/文件名`。保留了默认 Hello World 作为第二张卡片，便于观察双栏。

## 第三步：生成并检查

```bash
npx hexo clean && npx hexo g
node verification/check.cjs
```

输出目录是 `public/`。测试脚本针对随项目提供的两篇示例文章；增删文章后需同步调整断言。

## 主要配置

- `_config.yml`：站名、作者、语言、域名、代码高亮、搜索索引。
- `_config.butterfly.yml`：从安装包原始配置复制并定制，保留注释。
- `source/css/custom.css`：`index_layout: 4` 上图下文 + 双栏 CSS Grid，768px 以下单栏。不使用额外瀑布流脚本。
- 新版搜索开关为 `search.use: local_search`，不是旧版 `local_search.enable`。
- 复制按钮为 `code_blocks.copy: true`；关闭复制追加版权文字，方便直接运行命令。
- 目录和最近文章开启；进场、按钮旋转、打字、背景与点击特效关闭，关闭访客统计及分享插件。
- 图标字体仍使用主题默认 jsDelivr CDN，需要网络；封面、主题脚本和搜索索引使用本地文件。

正式上线前将 `_config.yml` 的 `url` 从本地地址改为真实站点域名，并修改作者与站名后重新生成。

## 验证与限制

详见 `verification/REPORT.md`。静态构建和 HTTP 检查通过；浏览器工具不可用，尚未实际点击验证剪贴板与搜索，也没有完成截图和移动端视觉验收。

npm 审计报告了 9 项 high 级别依赖风险，传播自 picomatch ReDoS。详见 `verification/npm-audit.json`。未执行 `npm audit fix --force`，因为其建议会将 Hexo 降到 3.9.0，造成不兼容。不要把开发服务器暴露到公网，不要构建不可信模板；正式部署前应重新评估依赖修复。

## 恢复配置

原始配置备份位于 `verification/originals/`，原始 SHA256 位于 `verification/original-sha256.txt`，修改差异位于两个 `.diff` 文件。仅需要撤回主题定制时，先备份当前配置，再用 originals 中同名主题配置替换根目录配置；删除该配置中的自定义 CSS 注入即可取消网格定制。恢复根配置会切回默认 landscape 主题。无需修改 node_modules。

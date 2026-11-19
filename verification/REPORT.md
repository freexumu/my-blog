# 本次搭建验证记录

日期：2026-11-18；目录：/Users/u/Desktop/my-blog。

## 执行顺序与结果

1. `pwd; ls -la; node -v; npm -v; git --version; command -v hexo`：目录为空；Node v24.22.0、npm 11.19.1、Git 2.54.0；无全局 hexo。
2. `npm install -g hexo-cli`：退出 243，/usr/local/lib/node_modules 权限不足。随后 `npm install -g hexo-cli --prefix /Users/u/.local`：退出 0。
3. `/Users/u/.local/bin/hexo init .`：退出 0，模板与依赖安装完成。
4. 修改前 `./node_modules/.bin/hexo generate`：退出 0。原始输出见 baseline-build.log。
5. `npm install hexo-theme-butterfly hexo-renderer-pug hexo-renderer-stylus hexo-generator-search`：退出 0，新增 39 包；报告 9 high 风险以及 install-scripts 提示。未盲目启用全部安装脚本，实际构建与高亮生成成功。
6. 复制原始主题配置，备份并记录 SHA256；修改配置、增加 CSS 网格、本地 SVG 占位图、示例文章、分类及标签页面。
7. `./node_modules/.bin/hexo clean && ./node_modules/.bin/hexo g`：退出 0，生成 27 个文件，原始输出见 clean.log 和 build.log。
8. `node verification/check.cjs`：首次检查有两项失败，见 check-initial.log。检查实际 HTML 后发现网格应作用于 .recent-post-items，且高亮 token 不使用 hljs 前缀；修正 CSS 选择器及测试断言。最终检查全部通过，见 check.log。
9. `./node_modules/.bin/hexo server --ip 127.0.0.1`：沙箱内监听 EPERM，退出 2；获准后运行成功，输出 `Hexo is running at http://127.0.0.1:4000/`。
10. curl 分别请求首页、/2026/11/18/ai-tools-efficiency-test/ 和 /search.xml：退出 0，全部 HTTP 200。
11. 浏览器工具返回 `The browser access host is unavailable`。未完成视觉、剪贴板、目录点击及动态搜索交互测试。
12. npm audit 首次沙箱内 DNS 失败；获准联网重试，退出 1（存在漏洞），JSON 见 npm-audit.json。9 项 high 来自 picomatch 风险及依赖链；未强制降级 Hexo。

## 交付与恢复

主要产物：根目录两个配置文件、source/css/custom.css、source/img/tutorial-cover.svg、source/_posts/ai-tools-efficiency-test.md、public/、README.md。

原始配置保存在 originals/，校验和见 original-sha256.txt，配置差异见 site-config.diff、theme-config.diff。恢复说明见 README.md。

参考站 freedidi.com 无法通过网页工具读取，未声称像素级复刻；按用户指定的清爽卡片图文方向实现。配置对照了安装包及 Butterfly 官方文档：https://butterfly.js.org/posts/4aa8abbe/ 。

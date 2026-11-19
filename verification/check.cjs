const fs = require('node:fs');
const assert = require('node:assert/strict');
const yaml = require('js-yaml');
const site = yaml.load(fs.readFileSync('_config.yml', 'utf8'));
const theme = yaml.load(fs.readFileSync('_config.butterfly.yml', 'utf8'));
const home = fs.readFileSync('public/index.html', 'utf8');
const post = fs.readFileSync('public/2026/11/18/ai-tools-efficiency-test/index.html', 'utf8');
const search = fs.readFileSync('public/search.xml', 'utf8');
const css = fs.readFileSync('public/css/custom.css', 'utf8');
const checks = {
  '中文与主题': site.language === 'zh-CN' && site.theme === 'butterfly',
  '代码高亮与复制配置': site.syntax_highlighter === 'highlight.js' && theme.code_blocks.copy === true,
  '双栏网格与移动端单栏规则': theme.index_layout === 4 && css.includes('repeat(2, minmax(0, 1fr))') && css.includes('@media (max-width: 768px)'),
  '首页两张卡片': (home.match(/class="recent-post-item"/g) || []).length === 2,
  '文章目录与最近文章': post.includes('id="card-toc"') && post.includes('card-recent-post'),
  '生成的语法高亮': post.includes('class="highlight bash"') && post.includes('<span class="string">'),
  '本地搜索脚本与索引': theme.search.use === 'local_search' && home.includes('/js/search/local-search.js') && search.includes('AI工具与效率教程测试') && search.includes('提示词'),
  '二级标题、引用块、图片': post.includes('<h2') && post.includes('<blockquote>') && post.includes('/img/tutorial-cover.svg'),
  '关闭进场与按钮动画': !theme.enter_transitions && !theme.rightside_config_animation,
};
for (const [name, ok] of Object.entries(checks)) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); }
assert(Object.values(checks).every(Boolean), 'Generated-output validation failed');

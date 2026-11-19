#!/bin/bash
cd "$(dirname "$0")"
git add .
git commit -m "update post $(date '+%Y-%m-%d %H:%M')"
git push
echo "========================================"
echo "✅ 推送成功！约 1 分钟后访问 https://52275227.xyz 查看效果"
echo "========================================"

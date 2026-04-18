# 筛选浮层演示

这是一个基于 React + Vite 开发的移动端筛选浮层演示，按照 Figma 设计稿实现。

## 功能特点

- 📱 移动端适配（375px 宽度）
- 🔄 左侧 tab 与右侧内容联动
- 🎨 渐变色按钮和选中状态
- 📸 背景图片展示
- ✅ 筛选选项选择和计数
- 🔙 重置和应用按钮

## 技术栈

- React 18
- Vite
- CSS3

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
├── public/           # 静态资源
│   └── background.png  # 背景图片
├── src/
│   ├── App.jsx       # 主应用组件
│   ├── App.css       # 样式文件
│   ├── main.jsx      # 入口文件
│   └── index.css     # 全局样式
├── index.html        # HTML 模板
├── package.json      # 项目配置
└── vite.config.js    # Vite 配置
```

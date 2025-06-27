# React Sequence Diagram

一个美观、交互式的React时序图组件，支持动画播放和交互控制。

[示例图](./seq1.jpg)

## 特性

- 🎨 美观的UI设计，基于TailwindCSS
- ⚡ 流畅的动画效果
- 🎮 交互式播放控制（播放/暂停/重置）
- ⚙️ 可调节的播放速度
- 📱 响应式设计
- 🔧 TypeScript支持
- 🎯 高度可定制

## 安装

```bash
npm install @sharp9/react-sequence-diagram
# 或
pnpm add @sharp9/react-sequence-diagram
# 或
yarn add @sharp9/react-sequence-diagram
```

## 使用方法

```tsx
import React from 'react';
import { SequenceDiagram } from '@sharp9/react-sequence-diagram';
import { Users, Server, Database } from 'lucide-react';

const actors = [
  { 
    name: 'Client', 
    label: '客户端', 
    color: 'bg-blue-500', 
    icon: <Users size={20} /> 
  },
  { 
    name: 'Server', 
    label: '服务器', 
    color: 'bg-green-500', 
    icon: <Server size={20} /> 
  },
  { 
    name: 'Database', 
    label: '数据库', 
    color: 'bg-purple-500', 
    icon: <Database size={20} /> 
  }
];

const steps = [
  { from: 0, to: 1, message: '发送请求', type: 'request' },
  { from: 1, to: 2, message: '查询数据', type: 'request' },
  { from: 2, to: 1, message: '返回数据', type: 'response' },
  { from: 1, to: 0, message: '返回响应', type: 'response', highlight: true }
];

function App() {
  return (
    <SequenceDiagram 
      title="API调用流程"
      subtitle="用户请求处理时序图"
      actors={actors} 
      steps={steps} 
    />
  );
}
```

## API

### SequenceDiagram Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `"时序流程图"` | 图表标题 |
| `subtitle` | `string` | `"组件化流程展示"` | 图表副标题 |
| `actors` | `Actor[]` | - | 参与者数组 |
| `steps` | `Step[]` | - | 步骤数组 |
| `defaultSpeed` | `number` | `1000` | 默认播放速度(毫秒) |
| `width` | `number` | `800` | 画布宽度 |
| `height` | `number` | `400` | 画布高度 |

### Actor 类型

```tsx
interface Actor {
  name: string;        // 参与者名称
  label: string;       // 显示标签
  color: string;       // 背景颜色(Tailwind类名)
  icon: React.ReactNode; // 图标组件
}
```

### Step 类型

```tsx
interface Step {
  from: number;        // 发送方索引
  to: number;          // 接收方索引
  message: string;     // 消息内容
  type: "request" | "response"; // 消息类型
  highlight?: boolean; // 是否高亮显示
}
```

## 开发

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动demo演示
pnpm dev

# 构建库文件
pnpm build

# 清理构建文件
pnpm clean
```

### 项目结构

```
react-sequence-diagram/
├── src/                 # 源代码
│   ├── SequenceDiagram.tsx
│   ├── index.ts
│   └── index.css
├── demo/               # 演示页面
│   ├── index.html
│   ├── index.tsx
│   └── tsconfig.json
├── dist/               # 构建输出
└── package.json
```

## License

MIT

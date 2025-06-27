# 发布指南 (Publishing Guide)

本文档提供了将 `@sharp9/react-sequence-diagram` 包发布到 npm 的详细步骤。

## 发布前准备 (Pre-publishing Checklist)

### 1. 确保代码质量
- [ ] 代码已完成开发和测试
- [ ] 所有功能正常工作
- [ ] 文档已更新（README.md）
- [ ] 示例代码可以正常运行

### 2. 版本管理
检查当前版本：
```bash
npm version
```

更新版本号（选择其中一种）：
```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 次要版本 (1.0.0 -> 1.1.0)
npm version minor

# 主要版本 (1.0.0 -> 2.0.0)
npm version major
```

### 3. 构建项目
确保构建成功：
```bash
# 清理之前的构建
pnpm clean

# 重新构建
pnpm build
```

## 发布步骤 (Publishing Steps)

### 1. npm 账户设置

#### 如果没有 npm 账户：
1. 访问 [npmjs.com](https://www.npmjs.com/) 注册账户
2. 验证邮箱

#### 登录 npm：
```bash
npm login
```
输入你的用户名、密码和邮箱。

#### 验证登录状态：
```bash
npm whoami
```

### 2. 检查包名可用性
```bash
npm view @sharp9/react-sequence-diagram
```
如果包名已存在，需要修改 `package.json` 中的 `name` 字段。

### 3. 发布包

#### 首次发布：
```bash
npm publish --access public
```

#### 如果是组织包（已配置）：
```bash
# 包名已配置为 "@sharp9/react-sequence-diagram"
npm publish --access public
```

### 4. 验证发布
```bash
# 检查包是否成功发布
npm view @sharp9/react-sequence-diagram

# 在新项目中测试安装
mkdir test-install
cd test-install
npm init -y
npm install @sharp9/react-sequence-diagram
```

## 自动化发布 (Automated Publishing)

### 使用 GitHub Actions

创建 `.github/workflows/publish.yml`：

```yaml
name: Publish to npm

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm build
        
      - name: Publish
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 设置 GitHub Secrets：
1. 生成 npm token：`npm token create`
2. 在 GitHub 仓库设置中添加 `NPM_TOKEN` secret

## 发布清单 (Publishing Checklist)

### 发布前检查：
- [ ] `package.json` 信息正确（name, version, description, author）
- [ ] `README.md` 文档完整
- [ ] 构建输出正常（dist 目录）
- [ ] TypeScript 类型定义文件存在
- [ ] dependencies 和 peerDependencies 配置正确
- [ ] `files` 字段包含必要文件
- [ ] LICENSE 文件存在

### 发布后检查：
- [ ] npm 上的包页面显示正常
- [ ] 可以正常安装和导入
- [ ] 文档和示例代码正确
- [ ] 版本号正确

## 常见问题 (Troubleshooting)

### 1. 包名已存在
- 修改包名或使用组织前缀
- 例：`@sharp9/react-sequence-diagram`（已配置）

### 2. 权限错误
```bash
# 确保已登录
npm whoami

# 如果使用组织包，确保有发布权限
npm publish --access public
```

### 3. 构建失败
```bash
# 清理并重新构建
pnpm clean
pnpm install
pnpm build
```

### 4. TypeScript 类型问题
确保 `tsconfig.json` 配置正确，包含 `declaration: true`

## 版本发布策略 (Versioning Strategy)

### 语义化版本（Semantic Versioning）
- **MAJOR**（主版本）：不兼容的 API 变更
- **MINOR**（次版本）：向后兼容的功能性新增
- **PATCH**（补丁版本）：向后兼容的问题修正

### 发布标签
```bash
# 开发版本
npm publish --tag beta

# 正式版本（默认）
npm publish --tag latest
```

## 维护建议 (Maintenance Tips)

1. **定期更新依赖**：保持依赖包的最新稳定版本
2. **监控下载量**：通过 npm 统计了解包的使用情况
3. **收集反馈**：关注 GitHub issues 和 npm 评论
4. **安全更新**：及时修复安全漏洞
5. **文档维护**：保持文档与代码同步

## 下一步 (Next Steps)

发布成功后，可以考虑：

1. **推广包**：
   - 在社交媒体分享
   - 写技术博客介绍
   - 提交到 awesome 列表

2. **改进包**：
   - 收集用户反馈
   - 添加新功能
   - 优化性能

3. **社区建设**：
   - 创建示例项目
   - 制作视频教程
   - 参与相关讨论

---

**注意**：首次发布前，建议先在测试环境验证所有功能，确保包的质量和可用性。
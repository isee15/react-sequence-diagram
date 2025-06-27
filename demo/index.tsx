import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';
import { SequenceDiagram } from '../src/SequenceDiagram';
import { Users, Globe, Server, Database, Mail, Shield, ShoppingCart, CreditCard, Package, Truck } from 'lucide-react';

// 用户注册流程
const registrationActors = [
  { name: 'User', label: '用户浏览器', color: 'bg-blue-500', icon: <Users size={20} /> },
  { name: 'Frontend', label: '前端应用', color: 'bg-green-500', icon: <Globe size={20} /> },
  { name: 'API', label: 'API网关', color: 'bg-purple-500', icon: <Server size={20} /> },
  { name: 'Auth', label: '认证服务', color: 'bg-orange-500', icon: <Shield size={20} /> },
  { name: 'Database', label: '用户数据库', color: 'bg-red-500', icon: <Database size={20} /> },
  { name: 'Email', label: '邮件服务', color: 'bg-cyan-500', icon: <Mail size={20} /> }
];

const registrationSteps = [
  { from: 0, to: 1, message: '填写注册表单并提交', type: 'request' },
  { from: 1, to: 2, message: 'POST /api/register (用户信息)', type: 'request' },
  { from: 2, to: 3, message: '验证用户信息格式', type: 'request' },
  { from: 3, to: 4, message: '检查邮箱是否已存在', type: 'request' },
  { from: 4, to: 3, message: '返回查询结果', type: 'response' },
  { from: 3, to: 4, message: '创建用户记录', type: 'request', highlight: true },
  { from: 4, to: 3, message: '返回用户ID', type: 'response' },
  { from: 3, to: 5, message: '发送验证邮件', type: 'request' },
  { from: 5, to: 3, message: '邮件发送成功', type: 'response' },
  { from: 3, to: 2, message: '注册成功，返回token', type: 'response' },
  { from: 2, to: 1, message: '返回注册结果', type: 'response' },
  { from: 1, to: 0, message: '显示"请查看邮箱验证"提示', type: 'response' }
];

// 电商下单流程
const orderActors = [
  { name: 'Customer', label: '用户', color: 'bg-blue-500', icon: <Users size={20} /> },
  { name: 'Shop', label: '商城应用', color: 'bg-green-500', icon: <ShoppingCart size={20} /> },
  { name: 'Payment', label: '支付服务', color: 'bg-yellow-500', icon: <CreditCard size={20} /> },
  { name: 'Inventory', label: '库存服务', color: 'bg-purple-500', icon: <Package size={20} /> },
  { name: 'Logistics', label: '物流服务', color: 'bg-orange-500', icon: <Truck size={20} /> }
];

const orderSteps = [
  { from: 0, to: 1, message: '选择商品，点击下单', type: 'request' },
  { from: 1, to: 3, message: '检查商品库存', type: 'request' },
  { from: 3, to: 1, message: '库存充足，锁定库存', type: 'response' },
  { from: 1, to: 2, message: '创建订单，发起支付', type: 'request', highlight: true },
  { from: 2, to: 1, message: '支付成功通知', type: 'response' },
  { from: 1, to: 3, message: '确认扣减库存', type: 'request' },
  { from: 3, to: 1, message: '库存扣减完成', type: 'response' },
  { from: 1, to: 4, message: '创建发货任务', type: 'request' },
  { from: 4, to: 1, message: '生成快递单号', type: 'response' },
  { from: 1, to: 0, message: '订单创建成功，等待发货', type: 'response' }
];

function DemoApp() {
  const [currentDemo, setCurrentDemo] = useState('registration');

  const demos = {
    registration: {
      title: '用户注册流程',
      subtitle: '微服务架构下的用户注册完整时序图',
      actors: registrationActors,
      steps: registrationSteps
    },
    order: {
      title: '电商下单流程',
      subtitle: '电商平台下单支付完整流程时序图',
      actors: orderActors,
      steps: orderSteps
    }
  };

  const currentDemoData = demos[currentDemo];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">React 时序图组件演示</h1>
          <p className="text-gray-600">展示不同业务场景的时序交互流程</p>
        </div>

        {/* Demo 切换按钮 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-2 flex gap-2">
            <button
              onClick={() => setCurrentDemo('registration')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentDemo === 'registration'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              用户注册
            </button>
            <button
              onClick={() => setCurrentDemo('order')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentDemo === 'order'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              电商下单
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <SequenceDiagram 
            title={currentDemoData.title}
            subtitle={currentDemoData.subtitle}
            actors={currentDemoData.actors} 
            steps={currentDemoData.steps} 
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">功能特性</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                支持播放/暂停/重置控制
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                可调节播放速度
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                消息高亮显示
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                响应式设计
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">技术栈</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                React 18 + TypeScript
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                TailwindCSS 样式
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                Lucide React 图标
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Vite 构建工具
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">使用场景</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                API 接口文档
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                系统架构设计
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                业务流程演示
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                技术培训教学
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoApp />
  </React.StrictMode>
);

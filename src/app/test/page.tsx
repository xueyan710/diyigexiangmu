// 图片测试页面 - 简化版，专注于核心问题诊断
'use client';

import { useState, useEffect } from 'react';

export default function ImageTest() {
  // 核心状态管理
  const [isImageAccessible, setIsImageAccessible] = useState<boolean | null>(null);
  const [fileSize] = useState<string>('~12.8 MB (已通过命令行确认)');
  const [testTime] = useState<string>(new Date().toLocaleString());

  // 简单测试图片是否可访问
  useEffect(() => {
    // 我们不尝试完整加载图片，只检查服务器是否能响应请求
    fetch('/profile.jpg', { method: 'HEAD' })
      .then(response => {
        console.log('图片HEAD请求结果:', response.status, response.statusText);
        setIsImageAccessible(response.ok);
      })
      .catch(error => {
        console.error('图片HEAD请求失败:', error);
        setIsImageAccessible(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-2xl font-bold mb-8 text-center text-blue-600">
        📷 图片加载诊断中心
      </h1>

      {/* 诊断结果卡片 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-md border-l-4 border-blue-500">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">🔍</span>关键发现
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 mt-1 text-green-500">✓</span>
            <span>服务器可以访问：已通过命令行成功下载profile.jpg文件</span>
          </li>
          <li className="flex items-start">
            <span className={`mr-2 mt-1 ${isImageAccessible ? 'text-green-500' : isImageAccessible === null ? 'text-yellow-500' : 'text-red-500'}`}>
              {isImageAccessible ? '✓' : isImageAccessible === null ? '⏳' : '✗'}
            </span>
            <span>
              {isImageAccessible ? '浏览器可以连接到图片URL' : isImageAccessible === null ? '正在检查连接...' : '浏览器无法连接到图片URL'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1 text-red-500">⚠️</span>
            <span>文件大小：{fileSize}（远大于网页图片建议大小）</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1 text-yellow-500">ℹ️</span>
            <span>测试时间：{testTime}</span>
          </li>
        </ul>
      </div>

      {/* 图片预览区域 - 简化版 */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">图片预览</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px]">
          <p className="text-gray-500 mb-4 text-center">
            <strong>注意：</strong>由于文件过大（{fileSize}），
            浏览器可能需要很长时间才能加载或无法完成加载
          </p>
          <div className="flex flex-col items-center">
            <img 
              src="/profile.jpg" 
              alt="测试图片 - profile.jpg" 
              className="max-w-full h-auto rounded"
              style={{ maxHeight: '400px' }}
            />
            <p className="mt-4 text-sm text-gray-500">路径: /profile.jpg</p>
          </div>
        </div>
      </div>

      {/* 解决方案卡片 */}
      <div className="bg-green-50 p-6 rounded-lg shadow-sm w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-green-700">
          <span className="mr-2">💡</span>解决方案
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-green-700 mb-2">1. 优化图片大小</h3>
            <p className="text-sm">将profile.jpg压缩至2MB以下，建议分辨率：1000×1000像素左右</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-green-700 mb-2">2. 清除浏览器缓存</h3>
            <p className="text-sm">按 Ctrl+Shift+R 强制刷新页面，清除缓存后重试</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-green-700 mb-2">3. 检查文件格式</h3>
            <p className="text-sm">确保图片是标准的JPEG格式，没有损坏</p>
          </div>
        </div>
      </div>
    </div>
  );
}
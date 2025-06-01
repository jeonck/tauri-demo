import React from 'react';
import { Rocket, Shield, Zap, Package } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tauri 데모 앱
              </h1>
              <p className="text-gray-600 text-sm">
                크로스 플랫폼 데스크톱 앱의 미래를 체험하세요
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Package className="w-4 h-4 text-green-600" />
                <span>~10MB</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span>빠름</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>보안</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            🚀 Tauri의 핵심 강점들
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>작은 번들 크기 (3-15MB)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>메모리 효율성 (Rust 백엔드)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>네이티브 성능</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>강력한 보안 모델</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
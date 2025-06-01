import React from 'react';
import { 
  Star, 
  Layers, 
  BarChart3, 
  Shield, 
  Monitor, 
  Package 
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: 'features' | 'performance' | 'security' | 'system' | 'bundle') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    {
      id: 'features',
      label: '핵심 기능',
      icon: Star,
      description: 'Tauri의 주요 특징들'
    },
    {
      id: 'performance',
      label: '성능 테스트',
      icon: BarChart3,
      description: '실시간 성능 측정'
    },
    {
      id: 'security',
      label: '보안 기능',
      icon: Shield,
      description: '보안 모델 및 권한'
    },
    {
      id: 'system',
      label: '시스템 통합',
      icon: Monitor,
      description: 'OS와의 네이티브 연동'
    },
    {
      id: 'bundle',
      label: '번들 크기',
      icon: Package,
      description: '크기 비교 및 최적화'
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id as any)}
                className={`
                  flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-200 whitespace-nowrap
                  ${isActive 
                    ? 'border-blue-500 text-blue-600 bg-blue-50' 
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
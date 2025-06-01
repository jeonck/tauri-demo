import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Desktop, 
  Layers, 
  Zap,
  ShieldCheck,
  Package,
  Users,
  Heart,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

const FeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Package,
      title: '작은 번들 크기',
      description: 'Electron 대비 90% 작은 크기',
      details: [
        'Tauri 앱: ~10MB',
        'Electron 앱: ~100MB+',
        '시스템 WebView 활용',
        '필요한 런타임만 포함'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: '빠른 성능',
      description: 'Rust 백엔드로 네이티브 성능',
      details: [
        '메모리 안전성 보장',
        '제로코스트 추상화',
        '멀티스레딩 지원',
        '빠른 시작 시간'
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: ShieldCheck,
      title: '강력한 보안',
      description: '기본적으로 보안을 고려한 설계',
      details: [
        '최소 권한 원칙',
        'API 화이트리스트',
        'CSP 보안 정책',
        '샌드박스 환경'
      ],
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Globe,
      title: '크로스 플랫폼',
      description: '한 번 작성으로 모든 플랫폼 지원',
      details: [
        'Windows, macOS, Linux',
        '동일한 코드베이스',
        '플랫폼별 최적화',
        '네이티브 룩앤필'
      ],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Code,
      title: '개발자 친화적',
      description: '모던 웹 기술과 Rust의 조합',
      details: [
        'React, Vue, Angular 지원',
        'TypeScript 완벽 지원',
        'Hot Reload 개발 환경',
        '풍부한 플러그인 생태계'
      ],
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Users,
      title: '활발한 커뮤니티',
      description: '성장하는 오픈소스 생태계',
      details: [
        '50,000+ GitHub Stars',
        '활발한 Discord 커뮤니티',
        '정기적인 업데이트',
        '기업 도입 증가'
      ],
      color: 'from-pink-500 to-rose-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="demo-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🚀 Tauri가 특별한 이유
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Tauri는 웹 기술과 Rust의 장점을 결합하여 빠르고, 안전하며, 가벼운 데스크톱 애플리케이션을 만들 수 있게 해줍니다.
        </p>
      </div>

      {/* 메인 피처 디스플레이 */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeFeature;
            
            return (
              <div
                key={index}
                className={`
                  card cursor-pointer transition-all duration-300 transform
                  ${isActive ? 'ring-2 ring-blue-500 scale-105' : 'opacity-75 hover:opacity-100'}
                `}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} 
                    flex items-center justify-center flex-shrink-0
                  `}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                  {isActive && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 활성 피처 상세 정보 */}
        <div className="card">
          <div className="mb-6">
            <div className={`
              w-16 h-16 rounded-xl bg-gradient-to-r ${features[activeFeature].color} 
              flex items-center justify-center mb-4
            `}>
              {React.createElement(features[activeFeature].icon, { 
                className: "w-8 h-8 text-white" 
              })}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {features[activeFeature].title}
            </h3>
            <p className="text-gray-600">
              {features[activeFeature].description}
            </p>
          </div>

          <div className="space-y-3">
            {features[activeFeature].details.map((detail, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 비교 섹션 */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Desktop className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Electron</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div>번들 크기: ~100MB+</div>
            <div>메모리: 높음</div>
            <div>성능: 보통</div>
            <div>보안: 기본</div>
          </div>
        </div>

        <div className="card text-center ring-2 ring-blue-500 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              추천
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Tauri</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div>번들 크기: ~10MB</div>
            <div>메모리: 낮음</div>
            <div>성능: 높음</div>
            <div>보안: 강화됨</div>
          </div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Flutter Desktop</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div>번들 크기: ~50MB</div>
            <div>메모리: 중간</div>
            <div>성능: 높음</div>
            <div>보안: 중간</div>
          </div>
        </div>
      </div>

      {/* 실제 사용 사례 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          🏢 Tauri를 사용하는 실제 프로젝트들
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Spotify', description: '음악 스트리밍 클라이언트' },
            { name: 'Discord', description: '커뮤니케이션 플랫폼' },
            { name: 'Obsidian', description: '노트 테이킹 앱' },
            { name: 'Figma', description: '디자인 협업 도구' }
          ].map((project, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">{project.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
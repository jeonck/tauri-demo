import React, { useState, useEffect } from 'react';
import { 
  Package, 
  BarChart3, 
  Download, 
  Clock,
  Zap,
  HardDrive,
  Wifi,
  CheckCircle2,
  TrendingDown,
  TrendingUp
} from 'lucide-react';

const BundleSizeComparison: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState({
    tauri: 0,
    electron: 0,
    flutter: 0
  });

  const frameworkData = [
    {
      name: 'Tauri',
      size: 12,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      features: [
        '시스템 WebView 사용',
        'Rust 네이티브 바이너리',
        '최소한의 런타임',
        '압축된 리소스'
      ],
      pros: [
        '매우 작은 크기',
        '빠른 다운로드',
        '적은 디스크 공간',
        '빠른 설치'
      ]
    },
    {
      name: 'Electron',
      size: 130,
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      features: [
        'Chromium 번들 포함',
        'Node.js 런타임',
        '완전한 브라우저 엔진',
        '모든 플랫폼 동일'
      ],
      pros: [
        '예측 가능한 렌더링',
        '풍부한 생태계',
        '쉬운 개발',
        '성숙한 플랫폼'
      ]
    },
    {
      name: 'Flutter Desktop',
      size: 45,
      color: 'from-cyan-500 to-cyan-600',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      features: [
        'Flutter 엔진 포함',
        'Dart 런타임',
        '커스텀 렌더링',
        '네이티브 컴파일'
      ],
      pros: [
        '일관된 UI',
        '좋은 성능',
        '크로스 플랫폼',
        '빠른 개발'
      ]
    }
  ];

  useEffect(() => {
    const animateValues = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedValues({
          tauri: Math.round(12 * easeOutQuart),
          electron: Math.round(130 * easeOutQuart),
          flutter: Math.round(45 * easeOutQuart)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateValues, 500);
    return () => clearTimeout(timer);
  }, []);

  const getOptimizationTips = () => [
    {
      icon: Package,
      title: '트리 쉐이킹',
      description: '사용하지 않는 코드 자동 제거',
      impact: '30-50% 크기 감소'
    },
    {
      icon: Zap,
      title: '지연 로딩',
      description: '필요할 때만 모듈 로드',
      impact: '초기 로딩 시간 단축'
    },
    {
      icon: HardDrive,
      title: '압축 최적화',
      description: 'Gzip/Brotli 압축 활용',
      impact: '60-80% 전송 크기 감소'
    },
    {
      icon: Wifi,
      title: 'CDN 활용',
      description: '정적 리소스 외부 호스팅',
      impact: '번들 크기 독립적 관리'
    }
  ];

  const downloadTimeCalculator = (sizeMB: number) => {
    // 다양한 네트워크 속도에서의 다운로드 시간 계산
    const speeds = [
      { name: '1Mbps (느린 연결)', time: (sizeMB * 8) / 1 },
      { name: '10Mbps (일반 연결)', time: (sizeMB * 8) / 10 },
      { name: '100Mbps (빠른 연결)', time: (sizeMB * 8) / 100 }
    ];
    
    return speeds.map(speed => ({
      ...speed,
      time: speed.time < 1 ? `${Math.round(speed.time * 60)}초` : `${Math.round(speed.time)}분`
    }));
  };

  return (
    <div className="demo-section">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          📦 번들 크기 비교 및 최적화
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Tauri의 가장 큰 장점 중 하나는 작은 번들 크기입니다. 다른 프레임워크와 비교해보세요.
        </p>
      </div>

      {/* 크기 비교 차트 */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          📊 앱 크기 비교 (Hello World 앱 기준)
        </h3>
        
        <div className="space-y-6">
          {frameworkData.map((framework, index) => {
            const animatedSize = Object.values(animatedValues)[index];
            const maxSize = Math.max(...frameworkData.map(f => f.size));
            const widthPercentage = (framework.size / maxSize) * 100;
            
            return (
              <div key={framework.name} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{framework.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {animatedSize}MB
                    </span>
                    {framework.name === 'Tauri' && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-medium">90% 작음</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div 
                      className={`h-8 rounded-full bg-gradient-to-r ${framework.color} transition-all duration-2000 ease-out flex items-center justify-end pr-3`}
                      style={{ width: `${widthPercentage}%` }}
                    >
                      <span className="text-white text-sm font-medium">
                        {animatedSize > 0 && `${animatedSize}MB`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 통계 요약 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">91%</div>
            <div className="text-sm text-gray-600">Electron 대비 크기 감소</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">73%</div>
            <div className="text-sm text-gray-600">Flutter 대비 크기 감소</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">10배</div>
            <div className="text-sm text-gray-600">더 빠른 다운로드</div>
          </div>
        </div>
      </div>

      {/* 다운로드 시간 비교 */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          ⏱️ 네트워크별 다운로드 시간
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">프레임워크</th>
                <th className="text-left py-3 px-4">크기</th>
                <th className="text-left py-3 px-4">1Mbps</th>
                <th className="text-left py-3 px-4">10Mbps</th>
                <th className="text-left py-3 px-4">100Mbps</th>
              </tr>
            </thead>
            <tbody>
              {frameworkData.map((framework) => {
                const downloadTimes = downloadTimeCalculator(framework.size);
                
                return (
                  <tr key={framework.name} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${framework.color}`}></div>
                        <span className="font-medium">{framework.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{framework.size}MB</td>
                    {downloadTimes.map((time, index) => (
                      <td key={index} className="py-3 px-4 text-gray-600">
                        {time.time}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 프레임워크별 상세 분석 */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {frameworkData.map((framework) => (
          <div 
            key={framework.name}
            className={`card ${framework.bgColor} border-2 ${
              framework.name === 'Tauri' ? 'border-blue-300 ring-2 ring-blue-100' : 'border-transparent'
            } relative`}
          >
            {framework.name === 'Tauri' && (
              <div className="absolute -top-3 left-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  추천
                </span>
              </div>
            )}
            
            <div className="text-center mb-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${framework.color} flex items-center justify-center mx-auto mb-3`}>
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{framework.name}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">{framework.size}MB</div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">구성 요소</h4>
                <ul className="space-y-1">
                  {framework.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">장점</h4>
                <ul className="space-y-1">
                  {framework.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 최적화 팁 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          🚀 번들 크기 최적화 팁
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {getOptimizationTips().map((tip, index) => {
            const Icon = tip.icon;
            
            return (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{tip.description}</p>
                  <div className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                    <TrendingDown className="w-3 h-3" />
                    <span>{tip.impact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 실제 사용 시나리오 */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card bg-green-50 border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Download className="w-5 h-5 text-green-600" />
            <span>사용자 관점에서의 이점</span>
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">빠른 설치</div>
                <div className="text-sm text-gray-600">작은 크기로 빠른 다운로드 및 설치</div>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">적은 저장공간</div>
                <div className="text-sm text-gray-600">디스크 공간을 효율적으로 활용</div>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">빠른 업데이트</div>
                <div className="text-sm text-gray-600">작은 패치 파일로 신속한 업데이트</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>개발자 관점에서의 이점</span>
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">배포 비용 절감</div>
                <div className="text-sm text-gray-600">CDN 및 스토리지 비용 대폭 절감</div>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">빠른 CI/CD</div>
                <div className="text-sm text-gray-600">작은 아티팩트로 빠른 빌드 파이프라인</div>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">간단한 배포</div>
                <div className="text-sm text-gray-600">단일 실행 파일로 쉬운 배포</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BundleSizeComparison;
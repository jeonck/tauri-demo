import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  AlertTriangle, 
  CheckCircle2,
  Globe,
  Server,
  FileText,
  Settings
} from 'lucide-react';

const SecurityDemo: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const securityFeatures = [
    {
      icon: Shield,
      title: '기본 보안 설계',
      description: 'Security by Default',
      details: [
        '최소 권한 원칙 적용',
        '모든 API 기본적으로 비활성화',
        '명시적 권한 승인 필요',
        '런타임 권한 검증'
      ],
      code: `{
  "allowlist": {
    "all": false,
    "fs": {
      "readFile": true,
      "writeFile": false
    },
    "dialog": {
      "open": true,
      "save": false
    }
  }
}`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Lock,
      title: 'API 화이트리스트',
      description: '필요한 API만 선택적 활성화',
      details: [
        '세분화된 권한 제어',
        '불필요한 API 접근 차단',
        '런타임 검증',
        '타입 안전성 보장'
      ],
      code: `// 승인된 API만 사용 가능
await invoke('read_file_content', { 
  path: '/safe/path/file.txt' 
});

// 비승인 API는 컴파일 오류
await invoke('dangerous_operation'); // ❌`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: 'CSP 보안 정책',
      description: 'Content Security Policy',
      details: [
        'XSS 공격 방지',
        '안전한 리소스 로딩',
        '인라인 스크립트 제한',
        '신뢰할 수 있는 도메인만 허용'
      ],
      code: `{
  "security": {
    "csp": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  }
}`,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Server,
      title: '샌드박스 환경',
      description: '격리된 실행 환경',
      details: [
        '프로세스 격리',
        '시스템 리소스 보호',
        '제한된 파일 시스템 접근',
        '네트워크 요청 제어'
      ],
      code: `// 샌드박스 내에서만 실행
const safeOperation = async () => {
  // 허용된 경로만 접근 가능
  const content = await readTextFile('data/safe.txt');
  return content;
};`,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const vulnerabilityComparison = [
    {
      framework: 'Electron',
      vulnerabilities: [
        'Node.js 런타임 노출',
        '파일시스템 전체 접근',
        '원격 코드 실행 위험',
        '기본 보안 설정 부족'
      ],
      riskLevel: 'high',
      score: 6.5
    },
    {
      framework: 'Tauri',
      vulnerabilities: [
        '최소 권한 원칙',
        '선택적 API 활성화',
        'Rust 메모리 안전성',
        '강화된 샌드박싱'
      ],
      riskLevel: 'low',
      score: 9.2
    }
  ];

  return (
    <div className="demo-section">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🛡️ 보안 기능 및 모델
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Tauri는 보안을 최우선으로 설계되었습니다. 최소 권한 원칙과 다층 보안 모델로 애플리케이션을 보호합니다.
        </p>
      </div>

      {/* 보안 기능 탭 */}
      <div className="card mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = selectedFeature === index;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{feature.title}</span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className={`
              w-16 h-16 rounded-xl bg-gradient-to-r ${securityFeatures[selectedFeature].color} 
              flex items-center justify-center mb-4
            `}>
              {React.createElement(securityFeatures[selectedFeature].icon, { 
                className: "w-8 h-8 text-white" 
              })}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {securityFeatures[selectedFeature].title}
            </h3>
            <p className="text-gray-600 mb-4">
              {securityFeatures[selectedFeature].description}
            </p>
            
            <div className="space-y-3">
              {securityFeatures[selectedFeature].details.map((detail, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">예시 코드</span>
            </div>
            <pre className="text-green-400 text-sm overflow-x-auto">
              <code>{securityFeatures[selectedFeature].code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* 보안 비교 */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          🔒 보안 프레임워크 비교
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {vulnerabilityComparison.map((item, index) => {
            const isSecure = item.riskLevel === 'low';
            
            return (
              <div key={index} className={`
                p-6 rounded-lg border-2 transition-all duration-200
                ${isSecure 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-red-200 bg-red-50'
                }
              `}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.framework}
                  </h4>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${isSecure 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                    }
                  `}>
                    보안 점수: {item.score}/10
                  </div>
                </div>
                
                <div className="space-y-2">
                  {item.vulnerabilities.map((vuln, vIndex) => (
                    <div key={vIndex} className="flex items-center space-x-3">
                      {isSecure ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      )}
                      <span className="text-sm text-gray-700">{vuln}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 보안 모범 사례 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Key className="w-5 h-5 text-blue-600" />
            <span>권한 관리 모범 사례</span>
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>최소 권한 원칙:</strong> 필요한 최소한의 권한만 부여</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>명시적 승인:</strong> 모든 권한을 명시적으로 설정</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>정기적 검토:</strong> 사용되지 않는 권한 제거</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>사용자 동의:</strong> 민감한 작업에 대한 사용자 확인</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-600" />
            <span>보안 모니터링</span>
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>실시간 감시:</strong> 의심스러운 활동 탐지</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>로그 기록:</strong> 모든 시스템 호출 기록</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>무결성 검증:</strong> 코드 변조 방지</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>자동 업데이트:</strong> 보안 패치 자동 적용</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 보안 통계 */}
      <div className="card mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          🛡️ Tauri 보안 통계
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-1">0</div>
            <div className="text-sm text-gray-600">알려진 RCE 취약점</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">API 화이트리스트 적용</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 mb-1">99.9%</div>
            <div className="text-sm text-gray-600">메모리 안전성</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 mb-1">5ms</div>
            <div className="text-sm text-gray-600">평균 권한 검증 시간</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDemo;
import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { 
  Activity, 
  Clock, 
  Cpu, 
  MemoryStick, 
  Zap, 
  Loader2,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

interface PerformanceResult {
  executionTime: number;
  result: number;
  iterations: number;
}

const PerformanceDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<PerformanceResult[]>([]);
  const [currentTest, setCurrentTest] = useState<string>('');

  const performanceTests = [
    { name: '가벼운 연산', iterations: 100000, description: '10만회 반복 연산' },
    { name: '중간 연산', iterations: 1000000, description: '100만회 반복 연산' },
    { name: '무거운 연산', iterations: 10000000, description: '1000만회 반복 연산' },
  ];

  const runPerformanceTest = async (iterations: number, testName: string) => {
    setIsRunning(true);
    setCurrentTest(testName);
    
    try {
      const startTime = performance.now();
      const result = await invoke<number>('perform_heavy_computation', { iterations });
      const endTime = performance.now();
      
      const executionTime = endTime - startTime;
      
      const newResult: PerformanceResult = {
        executionTime,
        result,
        iterations
      };
      
      setResults(prev => [...prev, newResult]);
    } catch (error) {
      console.error('성능 테스트 실패:', error);
    } finally {
      setIsRunning(false);
      setCurrentTest('');
    }
  };

  const runAllTests = async () => {
    setResults([]);
    for (const test of performanceTests) {
      await runPerformanceTest(test.iterations, test.name);
      // 테스트 간 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  const formatTime = (ms: number) => {
    if (ms < 1) return `${(ms * 1000).toFixed(2)}μs`;
    if (ms < 1000) return `${ms.toFixed(2)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getPerformanceRating = (time: number, iterations: number) => {
    const opsPerSecond = iterations / (time / 1000);
    if (opsPerSecond > 10000000) return { rating: '매우 빠름', color: 'text-green-600' };
    if (opsPerSecond > 1000000) return { rating: '빠름', color: 'text-blue-600' };
    if (opsPerSecond > 100000) return { rating: '보통', color: 'text-yellow-600' };
    return { rating: '느림', color: 'text-red-600' };
  };

  return (
    <div className="demo-section">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ⚡ 성능 테스트 및 벤치마크
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Rust 백엔드의 성능을 실시간으로 테스트해보세요. CPU 집약적 작업에서 Tauri의 네이티브 성능을 확인할 수 있습니다.
        </p>
      </div>

      {/* 테스트 컨트롤 */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            성능 테스트 실행
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="btn-primary flex items-center space-x-2"
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span>{isRunning ? '실행 중...' : '모든 테스트 실행'}</span>
            </button>
            {results.length > 0 && (
              <button
                onClick={clearResults}
                disabled={isRunning}
                className="btn-secondary"
              >
                결과 초기화
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {performanceTests.map((test, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{test.name}</h4>
                <button
                  onClick={() => runPerformanceTest(test.iterations, test.name)}
                  disabled={isRunning}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                >
                  {isRunning && currentTest === test.name ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    '실행'
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600">{test.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 현재 실행 중인 테스트 */}
      {isRunning && (
        <div className="card mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            <div>
              <h3 className="font-semibold text-blue-900">
                {currentTest} 실행 중...
              </h3>
              <p className="text-blue-700 text-sm">
                Rust 백엔드에서 연산을 처리하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 결과 표시 */}
      {results.length > 0 && (
        <div className="card mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            📊 테스트 결과
          </h3>
          <div className="space-y-4">
            {results.map((result, index) => {
              const rating = getPerformanceRating(result.executionTime, result.iterations);
              const opsPerSecond = Math.round(result.iterations / (result.executionTime / 1000));
              
              return (
                <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-gray-900">
                        {performanceTests[index]?.name || `테스트 ${index + 1}`}
                      </h4>
                      <span className={`text-sm font-medium ${rating.color}`}>
                        {rating.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {result.iterations.toLocaleString()}회 반복
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>실행 시간: {formatTime(result.executionTime)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span>초당 연산: {opsPerSecond.toLocaleString()}회</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-purple-600" />
                      <span>결과 값: {result.result.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 성능 특징 설명 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <span>Rust 백엔드의 장점</span>
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>제로코스트 추상화:</strong> 고수준 코드가 저수준 최적화된 코드로 컴파일</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>메모리 안전성:</strong> 가비지 컬렉터 없이도 메모리 누수 방지</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>동시성:</strong> 안전한 멀티스레딩과 비동기 처리</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>컴파일 최적화:</strong> 릴리즈 빌드에서 aggressive 최적화</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <MemoryStick className="w-5 h-5 text-purple-600" />
            <span>메모리 효율성</span>
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>낮은 메모리 사용량:</strong> Electron 대비 50-70% 적은 RAM 사용</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>예측 가능한 성능:</strong> 가비지 컬렉션 일시정지 없음</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>스택 기반 메모리:</strong> 빠른 할당과 해제</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>소유권 시스템:</strong> 컴파일 타임 메모리 관리</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDemo;
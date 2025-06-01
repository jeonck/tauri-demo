import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open, save } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { sendNotification } from '@tauri-apps/api/notification';
import { 
  Monitor, 
  HardDrive, 
  Bell, 
  FileText, 
  Folder,
  Download,
  Upload,
  Cpu,
  MemoryStick,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface SystemInfo {
  os: string;
  arch: string;
  version: string;
  total_memory: number;
  used_memory: number;
}

const SystemIntegration: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSystemInfo();
  }, []);

  const loadSystemInfo = async () => {
    try {
      const info = await invoke<SystemInfo>('get_system_info');
      setSystemInfo(info);
    } catch (error) {
      console.error('시스템 정보 로드 실패:', error);
      showMessage('error', '시스템 정보를 불러올 수 없습니다.');
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleOpenFile = async () => {
    try {
      setIsLoading(true);
      const selected = await open({
        multiple: false,
        filters: [{
          name: '텍스트 파일',
          extensions: ['txt', 'md', 'json', 'js', 'ts', 'jsx', 'tsx']
        }]
      });

      if (selected && typeof selected === 'string') {
        const content = await readTextFile(selected);
        setFileContent(content);
        showMessage('success', `파일을 성공적으로 불러왔습니다: ${selected.split('/').pop()}`);
      }
    } catch (error) {
      console.error('파일 열기 실패:', error);
      showMessage('error', '파일을 열 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFile = async () => {
    if (!fileContent.trim()) {
      showMessage('error', '저장할 내용이 없습니다.');
      return;
    }

    try {
      setIsLoading(true);
      const filePath = await save({
        filters: [{
          name: '텍스트 파일',
          extensions: ['txt']
        }]
      });

      if (filePath) {
        await writeTextFile(filePath, fileContent);
        showMessage('success', `파일이 저장되었습니다: ${filePath.split('/').pop()}`);
      }
    } catch (error) {
      console.error('파일 저장 실패:', error);
      showMessage('error', '파일을 저장할 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendNotification = async () => {
    try {
      await sendNotification({
        title: 'Tauri 알림',
        body: '시스템 통합 기능이 정상적으로 작동 중입니다! 🚀',
        icon: 'icons/icon.png'
      });
      showMessage('success', '알림이 전송되었습니다.');
    } catch (error) {
      console.error('알림 전송 실패:', error);
      showMessage('error', '알림을 전송할 수 없습니다.');
    }
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const systemFeatures = [
    {
      icon: Monitor,
      title: '시스템 정보',
      description: 'OS, 아키텍처, 메모리 정보 확인',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: HardDrive,
      title: '파일 시스템',
      description: '안전한 파일 읽기/쓰기 작업',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Bell,
      title: '시스템 알림',
      description: '네이티브 알림 시스템 연동',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Folder,
      title: '다이얼로그',
      description: '파일 선택 및 저장 다이얼로그',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="demo-section">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          💻 시스템 통합 기능
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Tauri는 운영체제와 깊게 통합되어 네이티브 기능들을 안전하게 사용할 수 있습니다.
        </p>
      </div>

      {/* 메시지 표시 */}
      {message && (
        <div className={`
          card mb-6 border-l-4 transition-all duration-300
          ${message.type === 'success' 
            ? 'border-green-500 bg-green-50' 
            : 'border-red-500 bg-red-50'
          }
        `}>
          <div className="flex items-center space-x-3">
            {message.type === 'success' ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600" />
            )}
            <span className={`font-medium ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message.text}
            </span>
          </div>
        </div>
      )}

      {/* 시스템 정보 카드 */}
      {systemInfo && (
        <div className="card mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-blue-600" />
            <span>시스템 정보</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-sm text-gray-600">운영체제</div>
              <div className="text-lg font-semibold text-gray-900 capitalize">
                {systemInfo.os}
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Cpu className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm text-gray-600">아키텍처</div>
              <div className="text-lg font-semibold text-gray-900 uppercase">
                {systemInfo.arch}
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MemoryStick className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-sm text-gray-600">총 메모리</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatBytes(systemInfo.total_memory)}
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MemoryStick className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-sm text-gray-600">사용 중 메모리</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatBytes(systemInfo.used_memory)}
              </div>
            </div>
          </div>
          
          {/* 메모리 사용률 바 */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">메모리 사용률</span>
              <span className="text-sm text-gray-600">
                {Math.round((systemInfo.used_memory / systemInfo.total_memory) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(systemInfo.used_memory / systemInfo.total_memory) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* 파일 시스템 데모 */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <HardDrive className="w-5 h-5 text-green-600" />
          <span>파일 시스템 연동</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={handleOpenFile}
            disabled={isLoading}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>파일 열기</span>
          </button>
          <button
            onClick={handleSaveFile}
            disabled={isLoading || !fileContent.trim()}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>파일 저장</span>
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            파일 내용 (편집 가능)
          </label>
          <textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            placeholder="파일을 열거나 직접 내용을 입력하세요..."
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      {/* 알림 데모 */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-purple-600" />
          <span>시스템 알림</span>
        </h3>
        <p className="text-gray-600 mb-4">
          운영체제의 네이티브 알림 시스템을 사용하여 사용자에게 메시지를 전달할 수 있습니다.
        </p>
        <button
          onClick={handleSendNotification}
          className="btn-primary flex items-center space-x-2"
        >
          <Bell className="w-4 h-4" />
          <span>테스트 알림 보내기</span>
        </button>
      </div>

      {/* 시스템 통합 기능 목록 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          🔧 사용 가능한 시스템 통합 기능
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {systemFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`
                  w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} 
                  flex items-center justify-center flex-shrink-0
                `}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 추가 기능 정보 */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🌐 네트워크 & API
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>HTTP/HTTPS 요청</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>WebSocket 연결</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>REST API 통합</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>GraphQL 쿼리</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🔒 보안 & 권한
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>권한 기반 파일 접근</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>안전한 시스템 호출</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>샌드박스 환경</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>암호화 지원</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemIntegration;
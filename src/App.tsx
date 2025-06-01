import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Tauri 데모 앱
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tauri의 강력한 기능들을 체험해보세요! 
            작은 번들 크기, 빠른 성능, 강력한 보안을 갖춘 크로스 플랫폼 데스크톱 앱 프레임워크입니다.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📦</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">작은 번들 크기</h3>
            <p className="text-gray-600 text-sm">
              Electron 대비 90% 작은 크기로 빠른 다운로드와 설치가 가능합니다.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">빠른 성능</h3>
            <p className="text-gray-600 text-sm">
              Rust 백엔드로 네이티브 성능과 메모리 안전성을 제공합니다.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🛡️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">강력한 보안</h3>
            <p className="text-gray-600 text-sm">
              최소 권한 원칙과 API 화이트리스트로 보안을 강화합니다.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🌐</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">크로스 플랫폼</h3>
            <p className="text-gray-600 text-sm">
              Windows, macOS, Linux에서 동일한 코드로 실행됩니다.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">👨‍💻</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">개발자 친화적</h3>
            <p className="text-gray-600 text-sm">
              모던 웹 기술과 Rust의 조합으로 최고의 개발 경험을 제공합니다.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">활발한 커뮤니티</h3>
            <p className="text-gray-600 text-sm">
              50,000+ GitHub Stars와 성장하는 오픈소스 생태계를 자랑합니다.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚀 Tauri vs 다른 프레임워크
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">~130MB</div>
                <div className="text-sm font-medium text-gray-700">Electron</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">~10MB</div>
                <div className="text-sm font-medium text-gray-700">Tauri ⭐</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">~45MB</div>
                <div className="text-sm font-medium text-gray-700">Flutter</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              * Hello World 앱 기준 번들 크기 비교
            </p>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p className="mb-2">
            🦀 <strong>Tauri</strong>로 구축된 크로스 플랫폼 데스크톱 앱
          </p>
          <p className="text-sm">
            Rust + 웹 기술 = 미래의 데스크톱 앱 개발
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
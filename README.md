# 🚀 Tauri 데모 앱

Tauri의 강력한 기능들을 직접 체험할 수 있는 종합 데모 애플리케이션입니다.

![Tauri Demo App](https://img.shields.io/badge/Tauri-1.5-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Rust](https://img.shields.io/badge/Rust-1.70-orange)

## ✨ 주요 기능

### 🎯 핵심 기능 쇼케이스
- **작은 번들 크기**: Electron 대비 90% 작은 크기 (~10MB)
- **빠른 성능**: Rust 백엔드로 네이티브 성능 구현
- **강력한 보안**: 최소 권한 원칙과 API 화이트리스트
- **크로스 플랫폼**: Windows, macOS, Linux 지원
- **개발자 친화적**: 모던 웹 기술과 Rust의 조합

### 🔧 실제 기능 데모
- **성능 테스트**: CPU 집약적 작업의 실시간 벤치마크
- **보안 모델**: 권한 관리 및 보안 기능 시연
- **시스템 통합**: 파일 시스템, 알림, 다이얼로그 등 OS 연동
- **번들 크기 비교**: 다른 프레임워크와의 상세 비교 분석

## 🛠️ 기술 스택

### 프론트엔드
- **React 18**: 모던 React 컴포넌트와 Hooks
- **TypeScript**: 타입 안전성과 개발 경험 향상
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Lucide React**: 아름다운 아이콘 라이브러리

### 백엔드
- **Rust**: 메모리 안전성과 고성능
- **Tauri**: 웹과 네이티브의 완벽한 브릿지
- **Serde**: JSON 직렬화/역직렬화
- **Tokio**: 비동기 런타임

## 🚀 시작하기

### 필수 요구사항

1. **Node.js** (v16 이상)
2. **Rust** (최신 stable 버전)
3. **Tauri CLI**

### 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd tauri-demo-app

# 의존성 설치
npm install

# Tauri CLI 설치 (전역)
npm install -g @tauri-apps/cli

# 개발 서버 실행
npm run tauri:dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run tauri:build
```

## 📁 프로젝트 구조

```
tauri-demo-app/
├── src/                    # React 프론트엔드
│   ├── components/         # React 컴포넌트
│   │   ├── Header.tsx      # 앱 헤더
│   │   ├── Navigation.tsx  # 네비게이션 바
│   │   ├── FeatureShowcase.tsx     # 기능 소개
│   │   ├── PerformanceDemo.tsx     # 성능 테스트
│   │   ├── SecurityDemo.tsx        # 보안 기능
│   │   ├── SystemIntegration.tsx   # 시스템 연동
│   │   └── BundleSizeComparison.tsx # 크기 비교
│   ├── App.tsx             # 메인 앱 컴포넌트
│   ├── main.tsx           # 앱 진입점
│   └── index.css          # 글로벌 스타일
├── src-tauri/             # Rust 백엔드
│   ├── src/
│   │   └── main.rs        # Rust 메인 로직
│   ├── Cargo.toml         # Rust 의존성
│   └── tauri.conf.json    # Tauri 설정
├── package.json           # Node.js 의존성
└── README.md             # 이 파일
```

## 🎨 주요 컴포넌트 설명

### Header.tsx
앱의 상단 헤더로 Tauri의 핵심 강점을 한눈에 보여줍니다.

### FeatureShowcase.tsx
Tauri의 6가지 주요 특징을 인터랙티브하게 소개하며, 다른 프레임워크와의 비교를 제공합니다.

### PerformanceDemo.tsx
실제 CPU 집약적 작업을 Rust 백엔드에서 처리하여 성능을 측정하고 시각화합니다.

### SecurityDemo.tsx
Tauri의 보안 모델, API 화이트리스트, CSP 정책 등을 상세히 설명합니다.

### SystemIntegration.tsx
파일 시스템 접근, 시스템 알림, 다이얼로그 등 OS 연동 기능을 실제로 체험할 수 있습니다.

### BundleSizeComparison.tsx
애니메이션과 함께 다른 프레임워크와의 번들 크기를 비교하고 최적화 팁을 제공합니다.

## 🔒 보안 설정

이 앱은 Tauri의 보안 모델을 시연하기 위해 다음과 같은 권한을 사용합니다:

- **파일 시스템**: 읽기/쓰기 권한 (데모용)
- **다이얼로그**: 파일 선택 및 저장 다이얼로그
- **알림**: 시스템 알림 전송
- **OS 정보**: 시스템 정보 조회

모든 권한은 `src-tauri/tauri.conf.json`에서 명시적으로 관리됩니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📚 더 알아보기

- [Tauri 공식 문서](https://tauri.app/)
- [Rust 학습 자료](https://doc.rust-lang.org/book/)
- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 확인하세요.

## 🙏 감사의 말

- [Tauri 팀](https://github.com/tauri-apps/tauri)의 훌륭한 프레임워크
- [React 팀](https://github.com/facebook/react)의 지속적인 혁신
- [Rust 커뮤니티](https://www.rust-lang.org/community)의 멋진 도구들

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!

🐛 버그를 발견하거나 개선 사항이 있다면 이슈를 생성해주세요.

💬 질문이나 피드백은 언제든 환영합니다!
# tauri-demo

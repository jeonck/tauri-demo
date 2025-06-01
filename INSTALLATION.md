# 🛠️ 설치 가이드

## 사전 준비사항

### 1. Node.js 설치
- [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
- 버전 16 이상 필요

```bash
# 설치 확인
node --version
npm --version
```

### 2. Rust 설치
- [Rust 공식 사이트](https://rustup.rs/)에서 rustup 설치

```bash
# macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows
# https://forge.rust-lang.org/infra/channel-layout.html#rustup 에서 다운로드

# 설치 확인
rustc --version
cargo --version
```

### 3. 플랫폼별 추가 요구사항

#### Windows
```bash
# Microsoft C++ Build Tools 필요
# Visual Studio Installer에서 "C++ build tools" 설치
```

#### macOS
```bash
# Xcode Command Line Tools
xcode-select --install
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y \
    libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

#### Linux (Fedora)
```bash
sudo dnf install -y \
    webkit2gtk3-devel \
    openssl-devel \
    curl \
    wget \
    libappindicator-gtk3-devel \
    librsvg2-devel
```

#### Linux (Arch)
```bash
sudo pacman -S --needed \
    webkit2gtk \
    base-devel \
    curl \
    wget \
    openssl \
    appmenu-gtk-module \
    gtk3 \
    libappindicator-gtk3 \
    librsvg
```

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone <your-repo-url>
cd tauri-demo-app
```

### 2. 자동 설정 스크립트 실행
```bash
# 개발 스크립트 실행 (권장)
./dev.sh
```

### 3. 수동 설치
```bash
# 의존성 설치
npm install

# Tauri CLI 설치
npm install -g @tauri-apps/cli
# 또는
cargo install tauri-cli

# 개발 서버 실행
npm run tauri:dev
```

## 📋 사용 가능한 명령어

```bash
# 개발 모드 (Tauri 앱)
npm run tauri:dev

# 웹 개발 모드 (브라우저)
npm run dev

# 프로덕션 빌드
npm run tauri:build

# 프론트엔드만 빌드
npm run build

# 타입 체크
npx tsc --noEmit

# 린트 검사
npx eslint src/
```

## 🔧 개발 환경 설정

### VS Code 추천 확장 프로그램
- **rust-analyzer**: Rust 언어 지원
- **Tauri**: Tauri 개발 도구
- **ES7+ React/Redux/React-Native snippets**: React 스니펫
- **TypeScript Importer**: 자동 import
- **Tailwind CSS IntelliSense**: Tailwind 자동완성
- **Prettier**: 코드 포매터

### VS Code 설정 파일
`.vscode/settings.json` 파일을 생성하여 다음 설정 추가:

```json
{
  "rust-analyzer.checkOnSave.command": "clippy",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.rs": "rust"
  }
}
```

## 🎯 빌드 최적화

### 개발 빌드
```bash
# 빠른 개발 빌드 (디버그 모드)
npm run tauri:dev
```

### 프로덕션 빌드
```bash
# 최적화된 릴리즈 빌드
npm run tauri:build

# 생성된 파일 위치:
# Windows: src-tauri/target/release/bundle/msi/
# macOS: src-tauri/target/release/bundle/dmg/
# Linux: src-tauri/target/release/bundle/deb/ 또는 appimage/
```

### 크로스 컴파일 (고급)
```bash
# 다른 플랫폼용 빌드 (실험적)
rustup target add x86_64-pc-windows-gnu
cargo tauri build --target x86_64-pc-windows-gnu
```

## 🔍 문제 해결

일반적인 문제와 해결방법은 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)를 참조하세요.

## 📚 추가 자료

- [Tauri 공식 문서](https://tauri.app/v1/guides/)
- [Rust 학습 자료](https://doc.rust-lang.org/book/)
- [React + TypeScript 가이드](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

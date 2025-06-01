# 🔧 문제 해결 가이드

이 문서는 Tauri 데모 앱 개발 중 발생할 수 있는 일반적인 문제들과 해결 방법을 다룹니다.

## 🚨 일반적인 문제들

### 1. Rust 설치 관련

#### 문제: `rustc` 명령어를 찾을 수 없음
```bash
command not found: rustc
```

**해결방법:**
```bash
# Rust 설치 확인
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# PATH 환경변수 재로드
source ~/.cargo/env

# 또는 터미널 재시작
```

#### 문제: Rust 버전이 너무 오래됨
```bash
error: package `tauri v1.5.4` cannot be built because it requires rustc 1.70.0 or newer
```

**해결방법:**
```bash
# Rust 업데이트
rustup update stable
rustc --version
```

### 2. Node.js/npm 관련

#### 문제: Node.js 버전 호환성
```bash
npm ERR! engine Unsupported engine
```

**해결방법:**
```bash
# Node.js 버전 확인 (16+ 필요)
node --version

# nvm을 사용한 Node.js 버전 관리
nvm install 18
nvm use 18
```

#### 문제: npm 의존성 설치 실패
```bash
npm ERR! code EACCES
```

**해결방법:**
```bash
# npm 권한 수정
sudo chown -R $(whoami) ~/.npm

# 또는 npm 글로벌 디렉토리 변경
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### 3. Tauri 관련

#### 문제: `tauri` 명령어를 찾을 수 없음
```bash
command not found: tauri
```

**해결방법:**
```bash
# Tauri CLI 설치 (글로벌)
npm install -g @tauri-apps/cli

# 또는 Cargo로 설치
cargo install tauri-cli

# 프로젝트 로컬 설치 사용
npx tauri dev
```

#### 문제: Tauri 개발 서버 시작 실패
```bash
Error: Could not find the Tauri configuration file
```

**해결방법:**
```bash
# 올바른 디렉토리에 있는지 확인
ls -la src-tauri/tauri.conf.json

# 설정 파일 권한 확인
chmod 644 src-tauri/tauri.conf.json

# Tauri 프로젝트 초기화 (필요시)
tauri init
```

### 4. 플랫폼별 문제

#### macOS

**문제: Xcode Command Line Tools 누락**
```bash
xcrun: error: invalid active developer path
```

**해결방법:**
```bash
xcode-select --install
```

**문제: 코드 서명 오류**
```bash
error: failed to bundle project: error running codesign
```

**해결방법:**
```bash
# 개발 모드에서는 코드서명 비활성화
# src-tauri/tauri.conf.json에서:
{
  "tauri": {
    "bundle": {
      "macOS": {
        "signingIdentity": null
      }
    }
  }
}
```

#### Windows

**문제: Microsoft C++ Build Tools 누락**
```bash
error: Microsoft Visual Studio C++ is required
```

**해결방법:**
1. [Visual Studio Installer](https://visualstudio.microsoft.com/downloads/) 다운로드
2. "Build Tools for Visual Studio 2022" 설치
3. "C++ build tools" 워크로드 선택

**문제: WebView2 관련 오류**
```bash
WebView2 runtime is not installed
```

**해결방법:**
```bash
# WebView2 런타임 다운로드 및 설치
# https://developer.microsoft.com/microsoft-edge/webview2/
```

#### Linux

**문제: WebKit 의존성 누락**
```bash
error: failed to run custom build command for `webkit2gtk-sys`
```

**해결방법:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y libwebkit2gtk-4.0-dev

# Fedora
sudo dnf install webkit2gtk3-devel

# Arch
sudo pacman -S webkit2gtk
```

### 5. 빌드 관련

#### 문제: 메모리 부족으로 빌드 실패
```bash
error: could not compile `tauri-demo-app` due to previous error
```

**해결방법:**
```bash
# 빌드 병렬 작업 수 제한
export CARGO_BUILD_JOBS=2
npm run tauri:build

# 또는 스왑 파일 증가 (Linux)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### 문제: 빌드 시간이 너무 오래 걸림
**해결방법:**
```bash
# 캐시 디렉토리 정리
cargo clean
rm -rf node_modules
npm install

# 릴리즈 빌드 대신 개발 빌드 사용
npm run tauri:dev
```

### 6. 런타임 오류

#### 문제: "invoke" API 호출 실패
```bash
Error: Command not found
```

**해결방법:**
```typescript
// 1. Tauri API import 확인
import { invoke } from '@tauri-apps/api/tauri';

// 2. 백엔드 함수 등록 확인 (main.rs)
.invoke_handler(tauri::generate_handler![your_function_name])

// 3. 함수명 일치 확인
await invoke('your_function_name', { param: value });
```

#### 문제: 파일 시스템 접근 거부
```bash
Error: Permission denied
```

**해결방법:**
```json
// src-tauri/tauri.conf.json에서 권한 추가
{
  "tauri": {
    "allowlist": {
      "fs": {
        "all": true
      }
    }
  }
}
```

## 🔍 디버깅 팁

### 1. 로그 활성화
```bash
# 개발 모드에서 상세 로그
RUST_LOG=debug npm run tauri:dev

# 백엔드 로그만
RUST_LOG=tauri=debug npm run tauri:dev
```

### 2. 브라우저 개발자 도구
```typescript
// 프론트엔드 디버깅
console.log('Debug info:', data);

// Tauri 개발 모드에서는 자동으로 개발자 도구가 열림
```

### 3. Rust 디버깅
```rust
// main.rs에서 디버그 출력
println!("Debug: {:?}", variable);
eprintln!("Error: {}", error);

// 조건부 컴파일로 디버그 코드 분리
#[cfg(debug_assertions)]
println!("Development mode");
```

## 📞 도움 요청

문제가 해결되지 않는다면:

1. **공식 문서 확인**: [Tauri 공식 문서](https://tauri.app/v1/guides/)
2. **GitHub Issues**: [Tauri GitHub Issues](https://github.com/tauri-apps/tauri/issues)
3. **Discord 커뮤니티**: [Tauri Discord](https://discord.com/invite/tauri)
4. **Stack Overflow**: `tauri` 태그로 질문 작성

### 이슈 보고 시 포함할 정보
- 운영체제 및 버전
- Node.js 버전 (`node --version`)
- Rust 버전 (`rustc --version`)
- Tauri CLI 버전 (`tauri --version`)
- 정확한 에러 메시지
- 재현 단계

---

💡 **팁**: 대부분의 문제는 의존성 버전 충돌이나 권한 문제입니다. 의존성을 최신 상태로 유지하고 필요한 시스템 권한을 확인하세요.

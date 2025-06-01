#!/bin/bash

# Tauri 데모 앱 개발 스크립트

echo "🚀 Tauri 데모 앱 개발 환경 설정"
echo "=================================="

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Rust 환경 변수 설정
if [ -f "$HOME/.cargo/env" ]; then
    source "$HOME/.cargo/env"
fi

# 필수 도구 확인
check_tool() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 설치됨"
        return 0
    else
        echo -e "${RED}✗${NC} $1 설치 필요"
        return 1
    fi
}

echo -e "\n${BLUE}필수 도구 확인 중...${NC}"
check_tool "node"
check_tool "npm"
check_tool "rustc"
check_tool "cargo"

# Node.js 버전 확인
NODE_VERSION=$(node --version)
echo -e "${BLUE}Node.js 버전:${NC} $NODE_VERSION"

# Rust 버전 확인
if command -v rustc &> /dev/null; then
    RUST_VERSION=$(rustc --version)
    echo -e "${BLUE}Rust 버전:${NC} $RUST_VERSION"
else
    echo -e "${YELLOW}Rust가 설치되지 않았습니다. 설치하려면 다음 명령을 실행하세요:${NC}"
    echo "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
    echo "source ~/.cargo/env"
fi

# 의존성 설치
echo -e "\n${YELLOW}의존성 설치 중...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓${NC} npm 의존성 설치 완료"
else
    echo -e "${GREEN}✓${NC} npm 의존성 이미 설치됨"
fi

# Tauri CLI 확인
if command -v cargo &> /dev/null; then
    if ! command -v cargo-tauri &> /dev/null; then
        echo -e "${YELLOW}Tauri CLI 설치 중...${NC}"
        cargo install tauri-cli --version "^2.0.0"
        echo -e "${GREEN}✓${NC} Tauri CLI 설치 완료"
    else
        echo -e "${GREEN}✓${NC} Tauri CLI 이미 설치됨"
    fi
else
    echo -e "${RED}✗${NC} Rust/Cargo가 설치되지 않아 Tauri CLI를 설치할 수 없습니다"
fi

# 개발 서버 실행 옵션
echo -e "\n${BLUE}개발 서버 실행 옵션:${NC}"
echo "1. 웹 모드로 실행 (npm run dev) - 추천"
echo "2. 개발 모드로 실행 (npm run tauri:dev) - Rust 필요"
echo "3. 빌드 테스트 (npm run tauri:build) - Rust 필요"
echo "4. 종료"

read -p "선택하세요 (1-4): " choice

case $choice in
    1)
        echo -e "\n${GREEN}🌐 웹 개발 모드 시작...${NC}"
        echo "브라우저에서 http://localhost:1420 으로 접속하세요"
        npm run dev
        ;;
    2)
        if command -v cargo &> /dev/null; then
            echo -e "\n${GREEN}🚀 Tauri 개발 모드 시작...${NC}"
            npm run tauri:dev
        else
            echo -e "\n${RED}❌ Rust가 설치되지 않았습니다. 웹 모드를 사용하세요.${NC}"
            exit 1
        fi
        ;;
    3)
        if command -v cargo &> /dev/null; then
            echo -e "\n${GREEN}🔨 프로덕션 빌드 시작...${NC}"
            npm run tauri:build
        else
            echo -e "\n${RED}❌ Rust가 설치되지 않았습니다. 웹 모드를 사용하세요.${NC}"
            exit 1
        fi
        ;;
    4)
        echo -e "\n${YELLOW}👋 개발 스크립트를 종료합니다.${NC}"
        exit 0
        ;;
    *)
        echo -e "\n${RED}잘못된 선택입니다.${NC}"
        exit 1
        ;;
esac

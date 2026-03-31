# 프로젝트 구현 및 코드 작성 규칙 (Todo MVP)

본 지침은 React + Vite + TS + Tailwind CSS 기반의 Todo MVP 프로젝트("생산성 Todo 웹앱")에 적용되는 필수 원칙과 규칙입니다. 코드를 생성하거나 수정할 때 반드시 이 규칙을 준수하세요.

## 1. 아키텍처 및 원칙 (Architecture & Principles)
- **기술 스택**: React, Vite, TypeScript, Tailwind CSS, `@dnd-kit` (드래그 앤 드롭).
- **상태 관리**: Redux 등 대형 전역 상태 라이브러리는 사용하지 않으며, 커스텀 훅(`useTodos`, `useTheme`) 또는 경량 Store를 중심으로 상태를 관리합니다.
- **영속화**: `localStorage`를 단일 데이터 소스(Single Source of Truth)로 사용하며, 서버 동기화나 백엔드 API, 인증 로직은 포함하지 않습니다.
- **관심사 분리**: 비즈니스 로직(커스텀 훅)과 UI 레이어(컴포넌트)를 명확히 분리하여, 추후 디자인 레퍼런스 변경 시 시각적 요소만 교체 가능하도록 구조화합니다.
- **컴포넌트 분리**: 책임을 명확히 하여 컴포넌트를 분리합니다 (예: `Form`, `List`, `Item`, `Filter`, `ThemeToggle`).

## 2. 코드 스타일 및 명명 규칙 (Code Style & Naming Conventions)
- **TypeScript**: 모든 변수, 함수, 컴포넌트에 명시적인 타이핑을 적용합니다. 도메인 타입(`Todo`, `Filter`, `Priority`, `Category`)은 `src/types/todo.ts`에 정의하여 재사용합니다.
- **컴포넌트**: 함수형 컴포넌트(Functional Components)를 사용하고, 파일명과 컴포넌트명은 PascalCase를 사용합니다.
- **Hook 명명**: 상태 로직을 캡슐화한 커스텀 훅은 `use` 접두사를 사용합니다 (예: `useTodos`, `useTheme`).
- **Tailwind CSS**: 다크모드는 `class` 전략을 사용합니다. 인라인 스타일을 지양하고 Tailwind 유틸리티 클래스를 적극 활용합니다.
- **모바일 우선**: 반응형 레이아웃 구현 시 모바일 환경을 우선(Mobile-first)으로 작성합니다.

## 3. 예외 처리 및 검증 방법 (Exception Handling & Validation)
- **입력 유효성**: Todo 추가 및 수정 시 빈 제목 입력을 방지하는 유효성 검증을 포함해야 합니다.
- **스토리지 파싱**: `localStorage` 접근 시 안전한 파싱(Safe Parsing) 로직을 적용합니다. 데이터 손상 시 앱이 크래시되지 않도록 Fallback(초기 상태 복원) 처리를 구현해야 합니다.
- **버전 관리**: `localStorage` 키는 버전 관리를 적용하여 스키마 변경 시 안전하게 대응할 수 있도록 합니다.

## 4. 하네스 및 테스트 규칙 (Harness & Testing)
- **정적 분석 및 빌드**: 작성된 코드는 `npm run lint`, `npx tsc --noEmit`, `npm run build`를 모두 통과해야 합니다.
- **접근성(a11y)**: 드래그 앤 드롭 정렬 및 필터 조작 시 키보드 접근성을 보장하고 자연스러운 포커스 이동을 고려해야 합니다.
- **수동 검증 포인트**:
  - CRUD 및 상태 변경 시 즉시 UI에 반영되는가.
  - 새로고침 시 데이터 구조와 순서가 `localStorage`를 통해 동일하게 복원되는가.
  - 다크모드 진입 시 시스템 테마 우선 반영, 수동 토글 시 유지 여부, 그리고 테마 전환 중 깜빡임(Flicker)이 없는가. (부트스트랩 시점에 테마 클래스 사전 적용 필요)

## 5. 프로젝트 특화 디자인 및 UI 규칙 (Design System Tokens)
- **색상 및 테마**: 배경은 밝은 회색(`bg-gray-50`), 표면은 백색(`bg-white`), 주요 텍스트는 짙은 회색(`text-gray-900`)을 기본으로 하며, 관련 다크모드 대응 클래스를 명시합니다.
- **형태 및 곡률**: 매우 둥글고 부드러운 형태를 지향합니다.
  - 카드/모달: `rounded-3xl` (또는 `rounded-[32px]`)
  - 버튼/탭: `rounded-full`
- **입체감**: 테두리(border)보다는 넓고 부드러운 커스텀 그림자(`shadow-[0_8px_30px_rgb(0,0,0,0.04)]`)로 컨텐츠 구분을 구현합니다.
- **여백**: 항목 간 `gap-3` 또는 `gap-4`를 사용하고, 패딩은 `p-6` 이상을 사용하여 여유로운 공간감을 둡니다.
- **시각적 보완**: 카테고리(업무/개인/공부) 등 항목 구분을 위해 이모지(Emoji)를 적극적으로 활용합니다.

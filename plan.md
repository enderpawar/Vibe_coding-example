## Plan: 생산성 Todo 웹앱 MVP 구현

React + Vite + TypeScript + Tailwind CSS 기반으로, 할 일을 자주 잊는 직장인/학생을 위한 다크모드 지원 Todo 앱을 MVP 범위로 구현한다. 핵심은 CRUD, 우선순위, 카테고리/태그, localStorage 영속화, 직관적인 드래그 앤 드롭 정렬이며, 추후 제공될 디자인 레퍼런스를 기능 로직과 분리된 UI 레이어에 반영할 수 있도록 설계한다.

**Steps**
1. Phase 0 - 요구사항 고정 및 UX 시나리오 확정: 사용자 시나리오(추가/수정/삭제/완료/필터/정렬), 데이터 규칙(우선순위 3단계, 카테고리 기본값, 태그 자유 입력), MVP 포함/제외 범위를 확정한다.
2. Phase 1 - 프로젝트 초기 세팅: Vite React TS 프로젝트 생성, Tailwind 적용, 기본 lint/typecheck/build 명령을 정리한다. 다크모드는 class 전략으로 고정한다. depends on 1
3. Phase 2 - 도메인 모델/상태 설계: Todo 타입(id, title, completed, priority, category, tags, order, createdAt, updatedAt)과 필터 타입을 정의하고, 상태 관리 진입점(useTodos 또는 store)을 단일화한다. depends on 2
4. Phase 3 - CRUD + 완료 토글 구현: 추가/수정/삭제/완료 토글 액션을 구현하고, 유효성(빈 제목 방지)과 편집 모드를 포함한 기본 UX를 완성한다. depends on 3
5. Phase 4 - localStorage 영속화 구현: 저장 키 버전, 안전 파싱, 손상 데이터 fallback, 앱 초기 복원 로직을 구현한다. 상태 변경 시 자동 저장되도록 연결한다. depends on 3, parallel with 4
6. Phase 5 - 분류/필터 기능 구현: 우선순위(높음/중간/낮음), 카테고리(업무/개인/공부), 태그 입력/표시, 필터(우선순위/카테고리/완료/검색 선택 시) 동작을 구현한다. depends on 4
7. Phase 6 - 드래그 앤 드롭 정렬 구현: @dnd-kit 기반 정렬을 도입하고 드래그 핸들, 충돌 전략, 정렬 후 order 재계산 및 즉시 저장을 구현한다. 키보드 접근 정렬까지 포함한다. depends on 4
8. Phase 7 - 다크모드 UX 완성: 시스템 테마 감지 + 사용자 토글 + 테마 영속화를 구현한다. 초기 진입 시 깜빡임을 줄이기 위해 부트스트랩 시점에 테마 클래스를 먼저 적용한다. depends on 2, parallel with 6,7
9. Phase 8 - UI 정리 및 디자인 레퍼런스 흡수 준비: 컴포넌트 책임 분리(Form/List/Item/Filter/ThemeToggle), spacing/color/radius/shadow 토큰 정리, 반응형 레이아웃(모바일 우선)을 고정한다. 추후 레퍼런스 반영 시 시각 요소만 교체 가능하게 구조화한다. depends on 5,6,7,8
10. Phase 9 - 검증 및 마감: lint/typecheck/build, 핵심 사용자 플로우 수동 테스트, 접근성/반응형/영속화 회귀 테스트 후 잔여 리스크를 문서화한다. depends on 9 ! fix : 

**Relevant files**
- c:/Users/user/Desktop/바이브코딩 예시/plan.md - 사용자 요청 산출물(최종 구현 계획 문서)
- c:/Users/user/Desktop/바이브코딩 예시/package.json - 스크립트 및 의존성(@dnd-kit, tailwind) 관리
- c:/Users/user/Desktop/바이브코딩 예시/tailwind.config.ts - 다크모드 class 전략 및 토큰 설정
- c:/Users/user/Desktop/바이브코딩 예시/src/types/todo.ts - Todo/Filter/Priority/Category 타입 정의
- c:/Users/user/Desktop/바이브코딩 예시/src/hooks/useTodos.ts - CRUD, 필터, 정렬, 저장 연동 핵심 상태 로직
- c:/Users/user/Desktop/바이브코딩 예시/src/hooks/useTheme.ts - 테마 감지/토글/영속화
- c:/Users/user/Desktop/바이브코딩 예시/src/utils/storage.ts - localStorage 안전 접근 및 복구 유틸
- c:/Users/user/Desktop/바이브코딩 예시/src/components/TodoForm.tsx - 할 일 생성/수정 폼
- c:/Users/user/Desktop/바이브코딩 예시/src/components/TodoList.tsx - 목록 렌더링 및 DnD 컨테이너 
- c:/Users/user/Desktop/바이브코딩 예시/src/components/TodoItem.tsx - 개별 항목 상호작용(완료/편집/삭제/드래그 핸들)
- c:/Users/user/Desktop/바이브코딩 예시/src/components/FilterBar.tsx - 우선순위/카테고리/태그/상태 필터 UI
- c:/Users/user/Desktop/바이브코딩 예시/src/App.tsx - 화면 조립 및 상태 연결

**Verification**
1. 자동 검증: npm run lint, npx tsc --noEmit, npm run build가 모두 통과해야 한다.
2. CRUD 검증: 할 일 추가/수정/삭제/완료가 즉시 UI에 반영되고, 새로고침 후 동일 상태가 유지된다.
3. 분류 검증: 우선순위/카테고리/태그 저장 및 표시가 정확하고 필터 조합 결과가 일관된다. 
4. 정렬 검증: 드래그 앤 드롭 후 순서가 유지되며 재방문 시 동일 순서가 복원된다. 접근성 검증: 키보드 기반 정렬/조작이 가능하고 포커스 이동이 자연스럽다.
6. 테마 검증: 시스템 테마 반영, 수동 토글 우선 적용, 재방문 시 마지막 테마 유지.
7. 반응형 검증: 모바일/데스크톱에서 입력, 편집, 필터, 정렬 동선이 깨지지 않는다.

**Decisions**
- 상태 관리는 MVP에서 커스텀 훅(또는 경량 store) 중심으로 유지하고 대형 전역 상태 라이브러리는 제외한다.
- DnD 라이브러리는 접근성과 확장성을 고려해 @dnd-kit을 채택한다.
- 데이터 저장은 localStorage 단일 소스로 두며 서버 동기화/인증은 제외한다.
- 포함 범위: 단일 사용자 Todo 생산성 기능(CRUD, 분류, 정렬, 다크모드, 영속화).
- 제외 범위: 로그인, 협업, 알림, 백엔드 API, 캘린더 연동.

**Further Considerations**
1. 태그 UX 확장: MVP는 자유 입력으로 시작하고, 이후 사용 빈도 기반 자동완성 추가를 고려한다.
2. 완료 항목 정렬 정책: 현재는 사용자 수동 정렬 우선, 필요 시 완료 항목 하단 고정 옵션을 추가한다.
3. 디자인 레퍼런스 반영 방식: 기능 완료 후 일괄 반영을 기본으로 하되 일정 여유가 있으면 단계 병행 반영으로 전환 가능. 

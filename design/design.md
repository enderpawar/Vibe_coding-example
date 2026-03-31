# Design System & Tokens Reference

첨부된 "DailyLoop" 레퍼런스 이미지를 바탕으로 추출한 디자인 특징 및 제안하는 Tailwind CSS 토큰입니다.

## 1. 색상 (Colors)
- **앱 배경 (Background)**: 매우 밝은 회색 (`bg-gray-50` 또는 `#F5F6F8`)
- **카드/표면 (Surface)**: 순백색 (`bg-white` 또는 `#FFFFFF`)
- **주요 텍스트 (Text Primary)**: 매우 어두운 회색/검정 (`text-gray-900`)
- **보조 텍스트 (Text Secondary)**: 날짜, 설명 등을 위한 부드러운 회색 (`text-gray-400` 또는 `text-gray-500`)
- **주요 액션/강조 (Primary Action)**: 솔리드 블랙 (`bg-black text-white`)
- **탭 상태 (Tab States)**:
  - 활성(Active): 검정색 알약 형태 (`bg-black text-white`)
  - 비활성(Inactive): 회색 텍스트 (`text-gray-400`)

## 2. 타이포그래피 (Typography)
- **폰트 패밀리**: 깔끔하고 모던한 산세리프 (Inter, SF Pro Display 느낌 - `font-sans`)
- **제목 (Headings)**:
  - 메인 타이틀 (예: Welcome, 9:41 등): 굵고 큼직한 텍스트 (`text-2xl` 또는 `text-3xl`, `font-bold`)
  - 섹션/그룹 (예: Morning, Workload): 작고 단단한 텍스트 (`text-sm`, `font-semibold`)
- **본문 (Body)**: 일반 할 일 텍스트 (`text-base` 또는 `text-sm`, `font-normal`)
- **마이크로 카피**: 날짜 표시기 등 (`text-xs`, `font-medium`)

## 3. 곡률 (Border Radius / Roundness)
전체적으로 매우 둥글고 부드러운 인상을 줍니다.
- **카드 및 모달 (Cards)**: 매우 큰 곡률 적용 (`rounded-[32px]` 또는 `rounded-3xl` 이상)
- **버튼 및 탭 (Buttons)**: 완전한 둥근 형태 (`rounded-full`)
- **체크박스 (Checkboxes)**: 모서리가 둥근 사각형 (`rounded-md`, 약 6~8px)

## 4. 그림자 및 깊이감 (Shadows & Elevation)
테두리 선(border)보다는 그림자로 컨텐츠를 구분합니다.
- **기본 카드 그림자**: 넓게 퍼지는 부드러운 그림자 (커스텀 shadow 권장: Y축 이동이 약간 있고 blur가 큰 형태, 예: `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`)

## 5. 여백 및 레이아웃 (Layout & Spacing)
- **여유로운 패딩**: 카드 내부에 넉넉한 여백 적용 (`p-6` 또는 `p-8`)
- **항목 간 간격 (Gaps)**: 목록 사이의 쾌적한 간격 (`gap-3` 또는 `gap-4`)
- **정렬**: Flex를 활용한 수직 중앙 정렬 (`items-center`)이 수평 레이아웃에 많이 쓰임.

## 6. 기타 특징
- 카테고리나 항목 강조를 위해 **이모지(Emoji)**를 적극적으로 활용 (UI 아이콘을 대체/보완하는 역할).
- 하단 네비게이션(Bottom Nav), 플로팅 액션 버튼(FAB) 등 모바일 친화적인 컴포넌트 구조.

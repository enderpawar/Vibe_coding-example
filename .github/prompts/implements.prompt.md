---
description: "plan.md에 정의된 특정 Phase의 구현 작업을 시작합니다."
name: "implements"
argument-hint: "<Phase 번호>"
agent: "agent"
---
# Todo MVP Phase 구현

사용자가 요청한 Phase 번호에 해당하는 작업을 [plan.md](../../plan.md)에서 찾아 구현을 시작합니다.

## 작업 순서 및 준수 사항
1. **요구사항 파악**: [plan.md](../../plan.md)에서 해당 Phase의 요구사항(Steps, Relevant files, Verification)을 정확히 인지하세요. 이전 Phase(depends on)가 완료되었는지도 문맥상 확인합니다.
2. **원칙 준수**: [copilot-instructions.md](../../copilot-instructions.md)에 명시된 5가지 핵심 원칙(아키텍처, 상태 관리 커스텀 훅 제한, 영속화 정책, 디자인 토큰 등)을 완벽히 숙지하고 반영하세요.
3. **작업 브리핑(Plan)**: 기능을 바로 짜기 전에, 어떤 파일들을 생성/수정할 것인지 간략하게 브리핑하세요.
4. **코드 구현**: 브리핑 내용을 바탕으로 워크스페이스 내에서 실제 코드를 작성하거나 수정합니다 (`create_file`, `replace_string_in_file` 등 활용). 컴포넌트 책임을 단위별로 명확히 분리하세요.
5. **마무리 검증**: 해당 Phase의 구현 목표와 검증 시나리오가 충족되었는지 확인 후 결과를 보고하세요.

*참고: 만약 사용자가 Phase 번호를 입력하지 않았다면, 현재 [plan.md](../../plan.md)를 기준으로 다음에 진행할 합리적인 Phase를 먼저 제안하세요.*
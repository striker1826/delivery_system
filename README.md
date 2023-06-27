# deliverySystem

작은 규모의 배달 시스템 백엔드 프로젝트 입니다.

# Prettier

signleQuote: true,

semi: true,

tabWidth: 4,

printWidth: 180,

arrowParens : always,

bracketSpacing:true,

# Git Convention

**Branch** (hotfix ⇒ main / feature ⇒ develop)

main

develop

feature

hotfix

PR → title 정책

feat: issue_numbering: Added click button from xxx

fix: issue_numbering: Added click button from xxx

docs: issue_numbering: Added click button from xxx

ci: issue_numbering: Added click button from xxx

# Commit Message Type

feat : 새로운 기능에 대한 커밋

fix : 버그 수정에 대한 커밋

ci : CI 관련 설정 수정에 대한 커밋

docs : 문서 수정에 대한 커밋

# Forder Structure

src

- common
  - middleware
  - decorators
- modules
  - auth
    - dto
      - in
      - out
    - auth.module.ts
    - auth.controller.ts
    - auth.service.ts
    - auth.IRepository.ts
    - auth.repository.ts
- entities
- app.controller.ts
- app.service.ts
- app.module.ts
- test
  - auth
    - auth.controller.spec.ts
    - auth.service.spec.ts

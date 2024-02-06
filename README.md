# Orridle-Frontend

## Branch Naming Convention

`이슈 태그(ex. chore, feat, fix)`+`/`+`이슈 번호`+`짧은 설명(영문)` \
ex. `feat/4-make-login-page`

## 폴더명, 파일명 Convention

폴더명: `camelCase` 사용

- ex) `loginPage`, `userAuth` 등

파일명: 페이지 = `camelCase`, 컴포넌트 = `PascalCase`

## .gitmessage 적용법

```bash
git config commit.template .gitmessage.txt
```

## 폴더 구조 템플릿

📦pages -> 이 내부에 형식 맞추어 제작(ex. `AuthPage.vue` 라면 `Auth`라고 만들기)
┗ 📂Auth
┃ ┣ 📂api -> 재사용되지않는 api
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂components -> 재사용되지않는 모듈화된 vue파일
┃ ┃ ┣ 📜LoginForm.vue
┃ ┃ ┗ 📜SignupForm.vue
┃ ┣ 📂types -> 재사용되지않는 관련 type들
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂utils -> 재사용되지않는 함수 모음
┃ ┃ ┗ 📜index.ts
┃ ┗ 📜AuthPage.vue

# windforce-sample-app

windforce 콘솔에 연결해 바로 실행해 볼 수 있는 **샘플 앱**(Application Project)이다.
git 저장소 하나 = 앱 하나 — 루트의 `windforce.json` manifest가 앱과 액션을 선언하고,
sync가 이 트리를 카탈로그로 만든다.

## 연결하기

1. 콘솔에서 **Apps → Create app**.
2. Repository URL에 이 저장소 주소, branch `main` 입력 → 연결과 초기 sync가 진행된다.
3. Ready 단계에서 발견된 액션 3개를 확인하고 **Open app**.

## 액션

| 액션 | 보여주는 것 |
|---|---|
| `greet.hello` | **스키마 기반 실행 폼** — `name`(필수)·`shout` 필드가 콘솔에 자동 생성된다. 멀티파일(공통 모듈 `lib/greeting.ts` import)도 함께 시연. |
| `greet.echo` | 스키마 없는 액션의 **raw JSON 입력 폴백**. 잡이 받는 실행 컨텍스트(app·action·workspace·trigger)를 그대로 돌려준다. |
| `counter.bump` | **영속 상태(`ctx.state`)** — 실행할 때마다 카운터가 누적된다. Triggers 탭에서 `@every 1m` 스케줄을 걸어 보면 좋다(상태 키는 액션별 `{app}/{action}`). |

## 레이아웃 (계약의 정석 형태)

```
windforce.json            # manifest — app/entrypoint/기본값 + 액션별 companion schema
main.ts                   # entrypoint = 조립(import + createApp) — 앱당 1개
actions/
  greet/hello.ts          # 액션 핸들러는 액션별 파일
  greet/echo.ts
  counter/bump.ts
lib/greeting.ts           # 공통 모듈(멀티파일 — 같은 commit 트리 내 상대 import)
schemas/                  # 액션별 companion JSON Schema (TS 파싱 없음)
```

- `windforce-client` SDK(`createApp`, `WindforceContext`)는 **워커가 런타임에 주입**한다 —
  package.json에 선언하지 않는다. 외부 npm 의존성을 쓰려면 그때 `package.json` + `bun.lock`을
  루트에 커밋한다(lockfile 없으면 sync가 그 커밋을 거부).
- 실패는 throw로 신호하고, 결과는 JSON 직렬화 가능한 값을 return한다.
- 전체 계약: windforce 레포의 `docs/specs/script-contract.md`.

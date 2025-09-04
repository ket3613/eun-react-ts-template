```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

project-root/
├─ src/ # 소스코드 루트
│ ├─ app/ # App Router (페이지, 레이아웃, 서버컴포넌트)
│ │ ├─ layout.tsx # 공통 레이아웃
│ │ ├─ page.tsx # 홈 페이지 (/)
│ │ ├─ not-found.tsx # 404 페이지
│ │ ├─ about/page.tsx # 예시: /about
│ │ └─ projects/page.tsx # 예시: /projects
│ │
│ ├─ components/ # 재사용 컴포넌트 모음
│ │ ├─ ui/ # 버튼, 카드, 인풋 등 작은 단위
│ │ └─ layout/ # 헤더, 푸터 등 레이아웃 단위
│ │
│ ├─ lib/ # 유틸리티 함수, 헬퍼, API 클라이언트
│ │ ├─ api.ts # fetch wrapper
│ │ └─ auth.ts # 인증 관련 함수
│ │
│ ├─ providers/ # Context Provider (AuthProvider 등)
│ ├─ hooks/ # 커스텀 훅
│ ├─ styles/ # 글로벌/모듈 CSS (globals.css 포함)
│ └─ types/ # 타입 정의 (DTO, ContextType 등)
│
├─ public/ # 정적 리소스 (이미지, 폰트 등)
│ └─ favicon.ico
│
├─ .gitignore
├─ next.config.mjs
├─ package.json
├─ tailwind.config.ts # Tailwind 설정
├─ tsconfig.json
└─ README.md

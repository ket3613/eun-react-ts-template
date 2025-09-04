"use client";
// 이 컴포넌트는 브라우저에서 실행되는 클라이언트 컴포넌트라는 선언

import Link from "next/link";            // Next.js의 클라이언트 라우팅을 위한 링크 컴포넌트
import { usePathname } from "next/navigation"; // 현재 URL 경로를 가져오는 훅
import { useState } from "react";        // 리액트 상태 관리 훅

// 내비게이션 항목 타입 정의
type NavItem = { href: string; label: string; private?: boolean };

// 내비게이션 항목 배열: URL, 라벨, 보호 여부
const NAV: NavItem[] = [
    { href: "/", label: "홈" },
    { href: "/public/profile", label: "프로필" },
    { href: "/public/video", label: "영상" },
    { href: "/public/photo", label: "사진" },
    { href: "/private/files", label: "파일(로그인 필요)", private: true },
];

// 메인 페이지 컴포넌트
export default function Page() {
    const [open, setOpen] = useState(false);   // 모바일 메뉴 열림/닫힘 상태
    const pathname = usePathname();            // 현재 경로

    console.log(pathname);
    // 공통 스타일 정의
    const baseItem = "block rounded px-3 py-2 text-sm transition-colors";
    const active = "bg-gray-900 text-white dark:bg-white dark:text-gray-900"; // 현재 경로일 때 스타일
    const hover = "hover:bg-gray-100 dark:hover:bg-gray-800"; // 호버 시 스타일

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* 헤더 */}
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 backdrop-blur-sm animate-[fade-in-up_.4s_ease-out_both]">
                {/* 모바일 메뉴 버튼 (햄버거 아이콘) */}
                <button
                    className="md:hidden rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Open navigation"
                    onClick={() => setOpen(true)}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* 로고/사이트명 */}
                <a href="/" className="font-semibold">Euntaek</a>

                {/* 오른쪽 설명 텍스트 (데스크톱에서만 표시) */}
                <div className="hidden md:block text-xs opacity-60">Next.js + Tailwind</div>
            </header>

            <div className="mx-auto flex max-w-6xl">
                {/* 사이드바 (데스크톱 전용) */}
                <aside className="sticky top-14 hidden h-[calc(100vh-56px)] w-60 shrink-0 border-r p-4 md:block animate-[fade-in-up_.5s_.05s_both]">
                    <Nav pathname={pathname} baseItem={baseItem} active={active} hover={hover} />
                </aside>

                {/* 모바일 메뉴 (오버레이) */}
                {open && (
                    <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
                        {/* 배경 (검은 반투명) */}
                        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
                        {/* 왼쪽 슬라이드 메뉴 */}
                        <div className="absolute left-0 top-0 h-full w-72 bg-[var(--background)] p-4 shadow-xl animate-[slide-in-left_.25s_ease-out_both]">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-semibold">메뉴</span>
                                {/* 닫기 버튼 (X 아이콘) */}
                                <button
                                    className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    aria-label="Close navigation"
                                    onClick={() => setOpen(false)}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                            {/* 모바일 내비게이션 항목 */}
                            <Nav pathname={pathname} baseItem={baseItem} active={active} hover={hover} onNavigate={() => setOpen(false)} />
                        </div>
                    </div>
                )}

                {/* 메인 콘텐츠 */}
                <main className="flex-1 p-6 space-y-6">
                    {/* Hero 섹션 */}
                    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white animate-[zoom-in_.35s_ease-out_both]">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold">Euntaek Portfolio</h1>
                            <p className="mt-2 text-white/90">Java · Spring Boot · React · AWS. 프로젝트와 작업물을 한곳에서.</p>
                            <div className="mt-6 flex gap-3">
                                {/* 주요 CTA 버튼 */}
                                <Link href="/public/profile" className="rounded-lg bg-white px-4 py-2 font-medium text-blue-700 hover:bg-white/90">
                                    프로필
                                </Link>
                                <Link href="/public/photo" className="rounded-lg border border-white/40 px-4 py-2 hover:bg-white/10">
                                    사진
                                </Link>
                            </div>
                        </div>
                        {/* 배경 장식 원 */}
                        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                    </section>

                    {/* 퀵 링크 카드 */}
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card title="프로필" desc="경력 요약과 기술 스택" href="/public/profile" delay={0.05} />
                        <Card title="영상" desc="데모 및 발표 영상" href="/public/video" delay={0.12} />
                        <Card title="사진" desc="스크린샷, 이미지 갤러리" href="/public/photo" delay={0.19} />
                    </section>

                    {/* 최근 작업 리스트 */}
                    <section className="overflow-hidden rounded-2xl border animate-[fade-in-up_.4s_.1s_both]">
                        <div className="flex items-center justify-between border-b px-5 py-3">
                            <h2 className="text-lg font-semibold">최근 작업</h2>
                            <Link href="/public/video" className="text-sm text-blue-600 hover:underline">더 보기</Link>
                        </div>
                        <ul className="divide-y">
                            <Item title="항공 ERP 모듈 리팩터링" sub="Spring Boot · JPA · Query Optimization" />
                            <Item title="React 대시보드 성능개선" sub="React · TanStack Query · Code Splitting" />
                            <Item title="CI/CD 파이프라인 구축" sub="GitHub Actions · AWS" />
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}

/* ===== 재사용 컴포넌트 ===== */

// 내비게이션 항목 렌더링 컴포넌트
function Nav({
    pathname, baseItem, active, hover, onNavigate,
}: { pathname: string; baseItem: string; active: string; hover: string; onNavigate?: () => void; }) {
    return (
        <nav className="space-y-1">
            {NAV.map((n) => {
                const isActive = pathname === n.href; // 현재 경로와 비교해 활성 여부 체크
                return (
                    <Link
                        key={n.href}
                        href={n.href}
                        onClick={onNavigate} // 모바일에서 클릭 시 메뉴 닫기
                        className={`${baseItem} ${isActive ? active : hover} flex items-center gap-2 animate-[fade-in-up_.35s_ease-out_both]`}
                        style={{ animationDelay: `${NAV.indexOf(n) * 60}ms` }} // 순차 애니메이션 딜레이
                    >
                        <Dot private={n.private} /> {/* 보호 라우트 여부 아이콘 */}
                        <span>{n.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

// 보호 라우트 표시 점 아이콘 (빨강: private, 파랑: public)
function Dot({ private: isPrivate }: { private?: boolean }) {
    return <span aria-hidden className={`h-2 w-2 rounded-full ${isPrivate ? "bg-red-500" : "bg-blue-500"}`} />;
}

// 카드 컴포넌트 (퀵 링크)
function Card({ title, desc, href, delay = 0 }: { title: string; desc: string; href: string; delay?: number; }) {
    return (
        <Link href={href}
            className="group rounded-xl border bg-[var(--background)] p-5 transition hover:shadow-sm animate-[fade-in-up_.35s_ease-out_both]"
            style={{ animationDelay: `${delay}s` }} // 순차 등장 애니메이션 딜레이
        >
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm opacity-70">{desc}</p>
            <span className="mt-3 inline-block text-sm text-blue-600 group-hover:underline">바로가기 →</span>
        </Link>
    );
}

// 최근 작업 아이템
function Item({ title, sub }: { title: string; sub: string }) {
    return (
        <li className="px-5 py-4 animate-[fade-in-up_.35s_ease-out_both]">
            <p className="font-medium">{title}</p>
            <p className="text-sm opacity-70">{sub}</p>
        </li>
    );
}
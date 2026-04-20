import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'

const features = [
  {
    number: '01',
    title: '빠르게 찾기',
    description: '운동, 스터디, 취미 모임을 한눈에 살피고 지금 내 시간에 맞는 모임부터 바로 고를 수 있습니다.',
  },
  {
    number: '02',
    title: '부담 없이 참여',
    description: '신청 방식과 참여 흐름이 단순해서 망설이는 시간이 줄어듭니다. 복잡한 오픈채팅 입장은 여기서 끝납니다.',
  },
  {
    number: '03',
    title: '한 곳에서 관리',
    description: '들어간 모임의 공지와 일정, 참여 상태를 한 화면에서 이어서 확인할 수 있습니다.',
  },
]

const trustSteps = [
  {
    title: '모임 정보를 먼저 이해합니다',
    description: '카테고리, 활동 분위기, 참여 방식이 처음부터 분명하게 보여서 들어가기 전 판단이 쉽습니다.',
  },
  {
    title: '참여 흐름이 짧고 자연스럽습니다',
    description: '관심 있는 모임을 찾고 신청하는 과정이 분절되지 않아, 어디서 무엇을 해야 하는지 헷갈리지 않습니다.',
  },
  {
    title: '들어간 뒤에도 관리가 이어집니다',
    description: '모임마다 흩어진 채널을 오가지 않아도 일정과 상태를 확인할 수 있어 참여 피로가 줄어듭니다.',
  },
]

function RevealSection({ as = 'section', children, className = '', delay = 0, style, ...props }) {
  const Component = as
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return undefined
    }

    if (isVisible) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <Component
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Component>
  )
}

function HeroScene() {
  return (
    <div className="hero-float relative mx-auto w-full max-w-[44rem]" aria-hidden="true">
      <div
        className="hero-glow absolute inset-x-[12%] top-[6%] h-[20rem] rounded-full blur-3xl md:h-[24rem]"
        style={{
          background:
            'radial-gradient(circle, rgba(242, 191, 105, 0.46) 0%, rgba(242, 191, 105, 0.14) 52%, transparent 74%)',
        }}
      />
      <svg
        viewBox="0 0 720 640"
        className="relative z-10 w-full"
      >
        <defs>
          <linearGradient id="heroSky" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#fff5e6" />
            <stop offset="100%" stopColor="#f4dcc1" />
          </linearGradient>
          <linearGradient id="heroGround" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#dba86d" />
            <stop offset="100%" stopColor="#c98758" />
          </linearGradient>
        </defs>

        <rect x="28" y="58" width="664" height="520" rx="132" fill="url(#heroSky)" />
        <circle cx="565" cy="158" r="68" fill="#f2bf69" opacity="0.9" />
        <path d="M66 414C142 338 243 304 376 304C492 304 582 340 654 414V522H66V414Z" fill="#f5eadc" />
        <path d="M66 464C157 408 266 378 394 378C517 378 603 409 654 456V548H66V464Z" fill="#dce7d2" />
        <path d="M66 520C191 482 319 464 452 464C542 464 609 476 654 494V578H66V520Z" fill="url(#heroGround)" />

        <path d="M140 268C194 224 249 204 308 204C368 204 418 224 470 268" fill="none" stroke="#d7b38b" strokeWidth="12" strokeLinecap="round" />
        <path d="M136 286H474" stroke="#d7b38b" strokeWidth="12" strokeLinecap="round" />
        <path d="M172 286V346" stroke="#d7b38b" strokeWidth="10" strokeLinecap="round" />
        <path d="M438 286V346" stroke="#d7b38b" strokeWidth="10" strokeLinecap="round" />

        <path d="M486 242C519 204 566 184 618 184" fill="none" stroke="#7f9d61" strokeWidth="12" strokeLinecap="round" />
        <path d="M512 254C548 224 596 214 634 216" fill="none" stroke="#7f9d61" strokeWidth="10" strokeLinecap="round" />
        <circle cx="488" cy="240" r="12" fill="#7f9d61" />
        <circle cx="530" cy="222" r="10" fill="#7f9d61" />
        <circle cx="598" cy="206" r="11" fill="#7f9d61" />

        <circle cx="178" cy="426" r="22" fill="#1f1813" />
        <path d="M164 454H194L200 502H158L164 454Z" fill="#ef7f56" />
        <path d="M160 468L130 498" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M197 468L225 488" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M171 505L152 548" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M190 505L212 548" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />

        <circle cx="328" cy="384" r="20" fill="#1f1813" />
        <path d="M310 408H346L354 454H303L310 408Z" fill="#f3c95a" />
        <path d="M286 434H370" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M303 453L279 498" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M350 452L372 498" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <rect x="272" y="432" width="112" height="12" rx="6" fill="#8d5e3a" />
        <rect x="294" y="440" width="10" height="66" rx="5" fill="#8d5e3a" />
        <rect x="352" y="440" width="10" height="66" rx="5" fill="#8d5e3a" />

        <circle cx="432" cy="382" r="18" fill="#1f1813" />
        <path d="M415 404H447L455 450H406L415 404Z" fill="#7f9d61" />
        <path d="M405 426L388 452" stroke="#1f1813" strokeWidth="9" strokeLinecap="round" />
        <path d="M452 424L476 450" stroke="#1f1813" strokeWidth="9" strokeLinecap="round" />
        <path d="M418 451L402 502" stroke="#1f1813" strokeWidth="9" strokeLinecap="round" />
        <path d="M446 451L470 500" stroke="#1f1813" strokeWidth="9" strokeLinecap="round" />

        <circle cx="560" cy="420" r="22" fill="#1f1813" />
        <path d="M544 448H578L584 500H540L544 448Z" fill="#ef7f56" />
        <path d="M546 468L514 494" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M579 468L614 486" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M553 502L532 548" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M574 502L596 548" stroke="#1f1813" strokeWidth="10" strokeLinecap="round" />
        <path d="M592 434C616 420 635 411 656 410" fill="none" stroke="#1f1813" strokeWidth="8" strokeLinecap="round" />
        <path d="M638 390L660 410L636 420" fill="none" stroke="#1f1813" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="96" cy="550" r="14" fill="#7f9d61" />
        <circle cx="120" cy="534" r="18" fill="#7f9d61" />
        <circle cx="152" cy="548" r="14" fill="#7f9d61" />
        <rect x="116" y="548" width="10" height="30" rx="5" fill="#7f9d61" />

        <circle cx="638" cy="546" r="14" fill="#7f9d61" />
        <circle cx="664" cy="530" r="18" fill="#7f9d61" />
        <circle cx="690" cy="548" r="14" fill="#7f9d61" />
        <rect x="660" y="546" width="10" height="32" rx="5" fill="#7f9d61" />
      </svg>
    </div>
  )
}

function SupportScene() {
  return (
    <div
      className="overflow-hidden rounded-[2.5rem]"
      style={{
        background:
          'linear-gradient(180deg, rgba(255, 248, 239, 0.94) 0%, rgba(244, 226, 206, 0.98) 100%)',
      }}
    >
      <div className="grid gap-px md:grid-cols-3" style={{ backgroundColor: 'rgba(114, 71, 42, 0.12)' }}>
        {[
          { title: '퇴근 후 러닝', caption: '가볍게 몸을 풀고 싶은 저녁', accent: '#ef7f56', sun: '#f2bf69' },
          { title: '주말 스터디', caption: '동네에서 바로 만나는 공부 모임', accent: '#7f9d61', sun: '#f0c174' },
          { title: '취미 메이트', caption: '처음 가도 어색하지 않은 참여 흐름', accent: '#b25a2f', sun: '#e7bb7c' },
        ].map((scene) => (
          <figure
            key={scene.title}
            className="relative min-h-[20rem] overflow-hidden px-6 py-8 md:min-h-[25rem] lg:px-8"
            style={{ background: '#fffaf2' }}
          >
            <div
              className="absolute right-6 top-6 h-20 w-20 rounded-full blur-2xl"
              style={{ backgroundColor: `${scene.sun}77` }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.03em]" style={{ color: 'var(--page-ink)' }}>
                  {scene.title}
                </p>
                <figcaption className="mt-2 max-w-[16rem] text-sm leading-6" style={{ color: 'var(--page-muted)' }}>
                  {scene.caption}
                </figcaption>
              </div>

              <div className="relative h-44">
                <div className="absolute inset-x-0 bottom-0 h-20 rounded-t-[3rem]" style={{ backgroundColor: '#ead9c5' }} />
                <div className="absolute inset-x-0 bottom-0 h-14 rounded-t-[2.5rem]" style={{ backgroundColor: '#d7c4ae' }} />
                <div className="absolute bottom-16 left-10 h-16 w-16 rounded-full" style={{ backgroundColor: scene.sun }} />
                <div className="absolute bottom-14 left-8 h-3 w-24 rounded-full" style={{ backgroundColor: scene.accent, transform: 'rotate(-12deg)' }} />
                <div className="absolute bottom-8 left-[4.5rem] h-20 w-6 rounded-full bg-[#1f1813]" />
                <div className="absolute bottom-8 left-28 h-24 w-6 rounded-full bg-[#1f1813]" />
                <div className="absolute bottom-28 left-16 h-12 w-12 rounded-full bg-[#1f1813]" />
                <div className="absolute bottom-28 left-[6.5rem] h-12 w-12 rounded-full bg-[#1f1813]" />
                <div className="absolute bottom-16 left-[5.5rem] h-14 w-14 rounded-[1.7rem]" style={{ backgroundColor: scene.accent }} />
                <div className="absolute bottom-16 left-[9.6rem] h-14 w-14 rounded-[1.7rem]" style={{ backgroundColor: scene.accent }} />
                <div className="absolute bottom-14 right-14 h-24 w-24 rounded-[2rem]" style={{ backgroundColor: `${scene.accent}33` }} />
                <div className="absolute bottom-8 right-8 h-28 w-12 rounded-t-full bg-[#7f9d61]" />
                <div className="absolute bottom-8 right-20 h-20 w-10 rounded-t-full bg-[#a6bc8e]" />
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  )
}

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="pb-8">
      <section
        className="landing-breakout relative isolate overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 249, 241, 0.96) 0%, rgba(247, 235, 220, 0.96) 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 18% 20%, rgba(242, 191, 105, 0.26), transparent 24%), radial-gradient(circle at 82% 26%, rgba(227, 123, 72, 0.14), transparent 22%), linear-gradient(180deg, transparent 0%, rgba(140, 178, 112, 0.08) 100%)',
          }}
        />

        <div className="landing-container relative z-10 grid min-h-[calc(100svh-81px)] items-end gap-14 py-10 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
          <div className="max-w-2xl">
            <p className="font-display hero-rise text-[clamp(3.8rem,12vw,8.4rem)] leading-[0.86] tracking-[-0.06em]" style={{ color: 'var(--page-ink)' }}>
              ModuPlan
            </p>
            <h1
              className="hero-rise mt-5 text-[clamp(2.1rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
              style={{ animationDelay: '120ms', color: 'var(--page-ink)' }}
            >
              관심 있는 모임을
              <br />
              쉽고 빠르게 찾고 참여하세요
            </h1>
            <p
              className="hero-rise mt-6 max-w-xl text-base leading-7 md:text-lg md:leading-8"
              style={{ animationDelay: '220ms', color: 'var(--page-muted)' }}
            >
              운동, 스터디, 취미 모임을 한곳에서 찾고 신청하고 일정까지 이어서 관리할 수 있습니다. 흩어진 오픈채팅과
              밴드 사이를 오가는 대신, ModuPlan에서 자연스럽게 시작하세요.
            </p>
            <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '320ms' }}>
              <Link to={isAuthenticated ? ROUTES.groups : ROUTES.signup} className="cta-primary">
                지금 시작하기
              </Link>
              <Link to={ROUTES.groups} className="cta-secondary">
                모임 둘러보기
              </Link>
            </div>
          </div>

          <div className="pb-2 lg:pb-0">
            <HeroScene />
          </div>
        </div>
      </section>

      <RevealSection
        className="landing-breakout landing-section"
        style={{ backgroundColor: 'var(--page-surface)' }}
        aria-labelledby="support-title"
      >
        <div className="landing-container grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <div className="max-w-md">
            <p className="landing-label">Life Around You</p>
            <h2 id="support-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl" style={{ color: 'var(--page-ink)' }}>
              동네의 시간을 함께 쓰는 모임,
              <br />
              더 가볍게 이어집니다
            </h2>
            <p className="landing-copy mt-5 text-base leading-7">
              퇴근 후 러닝, 주말 스터디, 새로 시작하는 취미 모임까지. 찾는 과정이 복잡하지 않아야 실제 참여로
              이어집니다. ModuPlan은 그 순간을 더 짧고 편하게 만듭니다.
            </p>
          </div>

          <SupportScene />
        </div>
      </RevealSection>

      <RevealSection
        className="landing-breakout landing-section"
        style={{ background: 'linear-gradient(180deg, #fffaf3 0%, #f8efe4 100%)' }}
        aria-labelledby="feature-title"
        delay={80}
      >
        <div className="landing-container">
          <div className="max-w-xl">
            <p className="landing-label">What You Can Do</p>
            <h2 id="feature-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl" style={{ color: 'var(--page-ink)' }}>
              필요한 기능만 또렷하게
            </h2>
          </div>

          <ol className="mt-10 border-t" style={{ borderColor: 'var(--page-line)' }}>
            {features.map((feature) => (
              <li
                key={feature.number}
                className="grid gap-4 border-b py-7 md:grid-cols-[120px_minmax(0,240px)_1fr] md:gap-8 md:py-9"
                style={{ borderColor: 'var(--page-line)' }}
              >
                <span className="text-sm font-semibold tracking-[0.22em]" style={{ color: 'var(--page-accent-strong)' }}>
                  {feature.number}
                </span>
                <p className="text-2xl font-semibold tracking-[-0.03em]" style={{ color: 'var(--page-ink)' }}>
                  {feature.title}
                </p>
                <p className="max-w-2xl text-base leading-7" style={{ color: 'var(--page-muted)' }}>
                  {feature.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </RevealSection>

      <RevealSection
        className="landing-breakout landing-section"
        style={{ backgroundColor: 'var(--page-surface)' }}
        aria-labelledby="trust-title"
        delay={120}
      >
        <div className="landing-container grid gap-12 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="max-w-md">
            <p className="landing-label">Trust The Flow</p>
            <h2 id="trust-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl" style={{ color: 'var(--page-ink)' }}>
              안심하고 들어갈 수 있는
              <br />
              참여 흐름을 만듭니다
            </h2>
            <p className="landing-copy mt-5 text-base leading-7">
              과한 숫자보다 중요한 건, 내가 들어갈 모임을 이해하고 무리 없이 참여할 수 있는 구조입니다. ModuPlan은
              그 흐름을 명확하게 보여줍니다.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute bottom-4 left-[0.35rem] top-4 w-px"
              aria-hidden="true"
              style={{ background: 'linear-gradient(180deg, rgba(207, 98, 48, 0.32), rgba(127, 157, 97, 0.38))' }}
            />
            <ol className="space-y-8 pl-8">
            {trustSteps.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  className="absolute -left-8 top-1 inline-flex h-4 w-4 rounded-full border-4"
                  aria-hidden="true"
                  style={{
                    backgroundColor: 'var(--page-surface)',
                    borderColor: index === 1 ? 'var(--page-leaf)' : 'var(--page-accent)',
                  }}
                />
                <p className="text-xl font-semibold tracking-[-0.03em]" style={{ color: 'var(--page-ink)' }}>
                  {step.title}
                </p>
                <p className="mt-3 max-w-xl text-base leading-7" style={{ color: 'var(--page-muted)' }}>
                  {step.description}
                </p>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="landing-breakout landing-section pb-20 md:pb-24" delay={160}>
        <div className="landing-container">
          <section
            className="overflow-hidden rounded-[2.75rem] px-6 py-12 text-center md:px-10 md:py-16"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 244, 231, 0.98) 0%, rgba(245, 225, 202, 0.98) 48%, rgba(237, 214, 190, 0.98) 100%)',
            }}
            aria-labelledby="cta-title"
          >
            <p className="landing-label">Join Without Pressure</p>
            <h2 id="cta-title" className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl" style={{ color: 'var(--page-ink)' }}>
              마음에 드는 모임이 보이면
              <br />
              바로 시작하면 됩니다
            </h2>
            <p className="landing-copy mx-auto mt-5 max-w-2xl text-base leading-7 md:text-lg md:leading-8">
              멀리 돌아가지 않아도 됩니다. 관심사에 맞는 모임을 찾고, 부담 없이 참여하고, 계속 이어갈 수 있는
              흐름을 ModuPlan에서 시작하세요.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to={isAuthenticated ? ROUTES.groups : ROUTES.signup} className="cta-primary">
                지금 시작하기
              </Link>
              <Link to={ROUTES.groups} className="cta-secondary">
                모임 둘러보기
              </Link>
            </div>
          </section>
        </div>
      </RevealSection>
    </div>
  )
}

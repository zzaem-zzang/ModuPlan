import { Link, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../routes/route-paths'
import './AuthLayout.css'

const modeCopy = {
  '/login': {
    eyebrow: 'Welcome Back',
    title: '다음 모임을 찾으러\n다시 돌아오셨네요',
    description:
      '관심 있던 모임을 이어서 보고, 신청 상태와 일정도 같은 흐름 안에서 확인할 수 있습니다.',
  },
  '/signup': {
    eyebrow: 'Join ModuPlan',
    title: '부담 없이 시작하는\n동네 모임 탐색',
    description:
      '회원가입만 마치면 운동, 스터디, 취미 모임을 한곳에서 찾고 바로 참여할 수 있습니다.',
  },
}

export function AuthLayout() {
  const location = useLocation()
  const currentCopy = modeCopy[location.pathname] ?? modeCopy['/login']

  return (
    <div className="auth-shell">
      <div className="auth-shell__backdrop" aria-hidden="true" />

      <div className="auth-shell__container">
        <section className="auth-visual" aria-labelledby="auth-visual-title">
          <Link to={ROUTES.home} className="auth-visual__brand">
            ModuPlan
          </Link>

          <div className="auth-visual__copy">
            <p className="auth-visual__eyebrow">{currentCopy.eyebrow}</p>
            <h1 id="auth-visual-title" className="auth-visual__title">
              {currentCopy.title}
            </h1>
            <p className="auth-visual__description">{currentCopy.description}</p>
          </div>

          <div className="auth-visual__scene" aria-hidden="true">
            <div className="auth-visual__glow auth-visual__glow--sun" />
            <div className="auth-visual__glow auth-visual__glow--accent" />

            <div className="auth-visual__hill auth-visual__hill--back" />
            <div className="auth-visual__hill auth-visual__hill--front" />

            <div className="auth-visual__group auth-visual__group--left">
              <span className="auth-visual__head" />
              <span className="auth-visual__body" />
            </div>
            <div className="auth-visual__group auth-visual__group--center">
              <span className="auth-visual__head" />
              <span className="auth-visual__body" />
            </div>
            <div className="auth-visual__group auth-visual__group--right">
              <span className="auth-visual__head" />
              <span className="auth-visual__body" />
            </div>

            <div className="auth-visual__bench" />
            <div className="auth-visual__leaf auth-visual__leaf--one" />
            <div className="auth-visual__leaf auth-visual__leaf--two" />
          </div>

          <ul className="auth-visual__points" aria-label="ModuPlan 핵심 경험">
            <li>모임 탐색이 빠릅니다</li>
            <li>참여 흐름이 자연스럽습니다</li>
            <li>들어간 뒤 관리도 이어집니다</li>
          </ul>
        </section>

        <section className="auth-panel" aria-label="인증 화면">
          <div className="auth-panel__inner">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  )
}

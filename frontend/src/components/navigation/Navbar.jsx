import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { ROUTES } from '../../routes/route-paths'
import { useAuth } from '../../store/auth/useAuth'

const navItems = [
  { label: '홈', to: ROUTES.home, private: false },
  { label: '모임 둘러보기', to: ROUTES.groups, private: false },
  { label: '내 모임', to: ROUTES.myGroups, private: true },
  { label: '모임 만들기', to: ROUTES.createGroup, private: true },
  { label: '내 정보', to: ROUTES.myInfo, private: true },
]

export function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, logoutAction, session } = useAuth()

  const handleLogout = async () => {
    await logoutAction()
    navigate(ROUTES.home)
  }

  const visibleItems = navItems.filter((item) => (item.private ? isAuthenticated : true))

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{
        borderColor: 'var(--page-line)',
        background: 'rgba(255, 249, 241, 0.82)',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <NavLink
          to={ROUTES.home}
          className="font-display text-2xl font-semibold tracking-[-0.03em]"
          style={{ color: 'var(--page-ink)' }}
        >
          ModuPlan
        </NavLink>

        <nav className="flex flex-wrap items-center gap-2" aria-label="주요 메뉴">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'text-white' : 'hover:bg-white/70'
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'var(--page-ink)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--page-muted)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated && session ? (
            <>
              <span className="hidden text-sm font-semibold sm:inline" style={{ color: 'var(--page-muted)' }}>
                {session.nickname}님
              </span>
              <Button variant="secondary" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to={ROUTES.login}
                className="rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-white/70"
                style={{ color: 'var(--page-muted)' }}
              >
                로그인
              </NavLink>
              <NavLink
                to={ROUTES.signup}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white transition"
                style={{ backgroundColor: 'var(--page-accent)' }}
              >
                지금 시작하기
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

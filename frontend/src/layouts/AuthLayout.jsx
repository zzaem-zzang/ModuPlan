import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__backdrop" />
      <div className="auth-layout__mesh" />

      <div className="auth-layout__container">
        <section className="auth-layout__hero" aria-label="서비스 소개">
          <div className="auth-layout__hero-glow auth-layout__hero-glow--top" />
          <div className="auth-layout__hero-glow auth-layout__hero-glow--bottom" />

          <div className="auth-layout__hero-copy">
            <p className="auth-layout__eyebrow">ModuPlan</p>
            <h1 className="auth-layout__title">
              모임 운영을
              <span>더 빠르고 </span>
              <span>더 신속하게</span>
            </h1>
            <p className="auth-layout__description">
              모임 운영을 더 쉽고 빠르게 시작해보세요.
              모집 현황부터 참여 신청, 일정 관리까지 한 흐름으로
              이어서 확인할 수 있습니다.
            </p>
          </div>

          <div className="auth-layout__trust">
            <span>운영 관리</span>
            <span>신청 관리</span>
            <span>일정 공유</span>
          </div>
        </section>

        <section className="auth-layout__content">
          <div className="auth-layout__mobile-intro">
            <p className="auth-layout__mobile-badge">ModuPlan</p>
            <h1>모임 운영을 시작하는 가장 빠른 방법</h1>
            <p>가입과 로그인 단계에서도 서비스의 결이 먼저 느껴지도록, 밀도와 신뢰감을 담아 구성했습니다.</p>
          </div>

          <div className="panel auth-layout__panel">
            <div className="auth-layout__panel-accent" />
            <div className="auth-layout__panel-inner">
              <Outlet />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { signup } from '../services/auth'
import './AuthPage.css'

function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!email || !nickname || !password) {
      setErrorMessage('이메일, 닉네임, 비밀번호를 모두 입력하세요.')
      return
    }

    try {
      setIsSubmitting(true)
      await signup({ email, nickname, password })
      setSuccessMessage('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      setTimeout(() => navigate('/login'), 800)
    } catch {
      setErrorMessage('회원가입에 실패했습니다. 입력값을 다시 확인하세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="auth-page" onSubmit={handleSubmit}>
      <h2 className="auth-page__title">회원가입</h2>
      <p className="auth-page__text">
        기본 정보만 입력해서 ModuPlan 계정을 만들 수 있습니다.
      </p>

      <div className="auth-page__group">
        <Input
          id="signup-email"
          label="이메일"
          type="email"
          placeholder="test@test.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="auth-page__group">
        <Input
          id="signup-nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
      </div>

      <div className="auth-page__group">
        <Input
          id="signup-password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {errorMessage ? <p className="auth-page__error">{errorMessage}</p> : null}
      {successMessage ? <p className="auth-page__success">{successMessage}</p> : null}

      <Button fullWidth type="submit" disabled={isSubmitting}>
        {isSubmitting ? '가입 중...' : '회원가입'}
      </Button>

      <p className="auth-page__hint">
        가입 후 로그인 페이지에서 인증을 진행합니다.
      </p>
    </form>
  )
}

export default SignupPage

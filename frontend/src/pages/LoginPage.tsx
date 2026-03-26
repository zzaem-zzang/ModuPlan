import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { ACCESS_TOKEN_KEY } from '../api/client'
import { login } from '../services/auth'
import './AuthPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요.')
      return
    }

    try {
      setIsSubmitting(true)
      const response = await login({ email, password })
      localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken)
      navigate('/')
    } catch {
      setErrorMessage('로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인하세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="auth-page" onSubmit={handleSubmit}>
      <h2 className="auth-page__title">로그인</h2>
      <p className="auth-page__text">
        가입한 이메일과 비밀번호를 입력해 모임 관리 화면으로 이동합니다.
      </p>

      <div className="auth-page__group">
        <Input
          id="login-email"
          label="이메일"
          type="email"
          placeholder="test@test.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="auth-page__group">
        <Input
          id="login-password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {errorMessage ? <p className="auth-page__error">{errorMessage}</p> : null}

      <Button fullWidth type="submit" disabled={isSubmitting}>
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>

      <p className="auth-page__hint">
        계정이 없다면 회원가입 페이지로 이동하세요.
      </p>
    </form>
  )
}

export default LoginPage

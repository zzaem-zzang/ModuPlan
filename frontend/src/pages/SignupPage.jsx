import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'
import { getErrorMessage } from '../utils/error'

const TEXT = {
  title: '회원가입',
  description: '간단한 정보만 입력하면 바로 모임 탐색을 시작할 수 있습니다.',
  emailLabel: '이메일',
  emailRequired: '이메일을 입력해 주세요.',
  emailInvalid: '올바른 이메일 형식을 입력해 주세요.',
  passwordLabel: '비밀번호',
  passwordRequired: '비밀번호를 입력해 주세요.',
  passwordMinLength: '비밀번호는 8자 이상이어야 합니다.',
  nicknameLabel: '닉네임',
  nicknameRequired: '닉네임을 입력해 주세요.',
  submitIdle: '회원가입',
  submitPending: '가입 중...',
  loginPrompt: '이미 계정이 있나요?',
  loginDescription: '로그인하면 이전에 보던 모임과 신청 흐름을 이어서 확인할 수 있습니다.',
  loginLink: '로그인하기',
}

export function SignupPage() {
  const navigate = useNavigate()
  const { signupAction } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const signupMutation = useMutation({
    mutationFn: signupAction,
    onSuccess: () => navigate(ROUTES.login),
    onError: (error) => setError('root', { message: getErrorMessage(error) }),
  })

  return (
    <div className="grid gap-6 p-2 sm:p-4">
      <div className="border-b pb-5" style={{ borderColor: 'var(--page-line)' }}>
        <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--page-accent-strong)' }}>
          Signup
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]" style={{ color: 'var(--page-ink)' }}>
          {TEXT.title}
        </h2>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--page-muted)' }}>
          {TEXT.description}
        </p>
      </div>

      <section
        className="rounded-[2rem] border px-5 py-5 sm:px-6 sm:py-6"
        style={{
          borderColor: 'rgba(114, 71, 42, 0.14)',
          backgroundColor: 'rgba(255, 253, 248, 0.78)',
        }}
      >
        <form className="grid gap-4" onSubmit={handleSubmit((values) => signupMutation.mutate(values))}>
          <InputField
            id="signup-email"
            label={TEXT.emailLabel}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            className="h-12 rounded-[1.35rem] border-[rgba(114,71,42,0.16)] bg-[#fffdf8] focus:border-[var(--page-accent)]"
            {...register('email', {
              required: TEXT.emailRequired,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: TEXT.emailInvalid,
              },
            })}
          />
          <InputField
            id="signup-password"
            label={TEXT.passwordLabel}
            type="password"
            autoComplete="new-password"
            error={errors.password?.message}
            className="h-12 rounded-[1.35rem] border-[rgba(114,71,42,0.16)] bg-[#fffdf8] focus:border-[var(--page-accent)]"
            {...register('password', {
              required: TEXT.passwordRequired,
              minLength: { value: 8, message: TEXT.passwordMinLength },
            })}
          />
          <InputField
            id="signup-nickname"
            label={TEXT.nicknameLabel}
            autoComplete="nickname"
            error={errors.nickname?.message}
            className="h-12 rounded-[1.35rem] border-[rgba(114,71,42,0.16)] bg-[#fffdf8] focus:border-[var(--page-accent)]"
            {...register('nickname', { required: TEXT.nicknameRequired })}
          />

          {errors.root?.message ? (
            <p
              className="rounded-[1.4rem] border px-4 py-3 text-sm"
              style={{
                borderColor: 'rgba(225, 29, 72, 0.2)',
                backgroundColor: 'rgba(255, 241, 242, 0.85)',
                color: '#be123c',
              }}
            >
              {errors.root.message}
            </p>
          ) : null}

          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-full text-base"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? TEXT.submitPending : TEXT.submitIdle}
          </Button>
        </form>
      </section>

      <div
        className="rounded-[2rem] border px-5 py-5 sm:px-6"
        style={{
          borderColor: 'rgba(114, 71, 42, 0.12)',
          backgroundColor: 'rgba(255, 249, 241, 0.9)',
        }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--page-ink)' }}>
          {TEXT.loginPrompt}
        </p>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--page-muted)' }}>
          {TEXT.loginDescription}
        </p>
        <Link
          to={ROUTES.login}
          className="mt-4 inline-flex items-center text-sm font-semibold transition"
          style={{ color: 'var(--page-accent-strong)' }}
        >
          {TEXT.loginLink}
        </Link>
      </div>
    </div>
  )
}

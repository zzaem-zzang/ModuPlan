import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { PageHeader } from '../components/ui/PageHeader'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'
import { getErrorMessage } from '../utils/error'

const TEXT = {
  title: '로그인',
  description: '이메일과 비밀번호를 입력하면 바로 모임 관리와 참여 현황을 이어서 확인할 수 있습니다.',
  redirectNotice: '로그인 후 이전에 보려던 페이지로 바로 이동합니다.',
  formTitle: '계정으로 계속하기',
  formDescription: '가입한 이메일 주소와 비밀번호를 입력해 주세요.',
  emailLabel: '이메일',
  emailRequired: '이메일을 입력해 주세요.',
  passwordLabel: '비밀번호',
  passwordPlaceholder: '비밀번호를 입력해 주세요',
  passwordRequired: '비밀번호를 입력해 주세요.',
  submitIdle: '로그인',
  submitPending: '로그인 중...',
  signupPrompt: '아직 계정이 없나요?',
  signupDescription: '회원가입 후 모임 생성, 참여 신청, 일정 확인 기능을 바로 이용할 수 있습니다.',
  signupLink: '회원가입',
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginAction } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const redirectedFromProtectedPage = Boolean(location.state?.from)

  const loginMutation = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      const nextPath = location.state?.from ?? ROUTES.home
      navigate(nextPath, { replace: true })
    },
    onError: (error) => {
      setError('root', { message: getErrorMessage(error) })
    },
  })

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Login" title={TEXT.title} description={TEXT.description} />

      {redirectedFromProtectedPage ? (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          {TEXT.redirectNotice}
        </div>
      ) : null}

      <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 md:p-7">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900">{TEXT.formTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">{TEXT.formDescription}</p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit((values) => loginMutation.mutate(values))}>
          <InputField
            id="login-email"
            label={TEXT.emailLabel}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email', { required: TEXT.emailRequired })}
          />
          <InputField
            id="login-password"
            label={TEXT.passwordLabel}
            type="password"
            placeholder={TEXT.passwordPlaceholder}
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password', { required: TEXT.passwordRequired })}
          />

          {errors.root?.message ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {errors.root.message}
            </p>
          ) : null}

          <Button type="submit" className="mt-2 h-12 w-full rounded-2xl text-base" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? TEXT.submitPending : TEXT.submitIdle}
          </Button>
        </form>

        <div className="rounded-2xl bg-slate-50 px-4 py-4">
          <p className="text-sm font-semibold text-slate-800">{TEXT.signupPrompt}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{TEXT.signupDescription}</p>
          <Link
            to={ROUTES.signup}
            className="mt-3 inline-flex items-center text-sm font-semibold text-brand-700 transition hover:text-brand-600"
          >
            {TEXT.signupLink}
          </Link>
        </div>
      </section>
    </div>
  )
}

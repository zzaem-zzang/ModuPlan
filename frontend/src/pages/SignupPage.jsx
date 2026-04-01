import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { PageHeader } from '../components/ui/PageHeader'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'
import { getErrorMessage } from '../utils/error'

const TEXT = {
  title: '회원가입',
  description: '간단한 정보만 입력하면 바로 모임을 만들고 참여할 수 있습니다.',
  emailLabel: '이메일',
  emailRequired: '이메일을 입력해 주세요.',
  emailInvalid: '올바른 이메일 형식을 입력해 주세요.',
  passwordLabel: '비밀번호',
  passwordRequired: '비밀번호를 입력해 주세요.',
  passwordMinLength: '비밀번호는 8자 이상이어야 합니다.',
  nicknameLabel: '닉네임',
  nicknameRequired: '닉네임을 입력해 주세요.',
  submitIdle: '회원가입',
  submitPending: '회원가입 중...',
  loginPrompt: '이미 계정이 있나요?',
  loginLink: '로그인',
  loginSuffix: '으로 이동하세요.',
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
    <div className="grid gap-6">
      <PageHeader eyebrow="Signup" title={TEXT.title} description={TEXT.description} />

      <form className="grid gap-4" onSubmit={handleSubmit((values) => signupMutation.mutate(values))}>
        <InputField
          id="signup-email"
          label={TEXT.emailLabel}
          type="email"
          error={errors.email?.message}
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
          error={errors.password?.message}
          {...register('password', {
            required: TEXT.passwordRequired,
            minLength: { value: 8, message: TEXT.passwordMinLength },
          })}
        />
        <InputField
          id="signup-nickname"
          label={TEXT.nicknameLabel}
          error={errors.nickname?.message}
          {...register('nickname', { required: TEXT.nicknameRequired })}
        />
        {errors.root?.message ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
        <Button type="submit" className="w-full" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? TEXT.submitPending : TEXT.submitIdle}
        </Button>
      </form>

      <p className="text-sm text-slate-500">
        {TEXT.loginPrompt}{' '}
        <Link to={ROUTES.login} className="font-semibold text-brand-700">
          {TEXT.loginLink}
        </Link>
        {TEXT.loginSuffix}
      </p>
    </div>
  )
}

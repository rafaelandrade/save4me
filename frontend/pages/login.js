import GoogleButton from '../components/googleButton'
import * as S from '../styles/home'

export default function Login({}) {
  const handleLogin = () => {}

  return (
    <S.ContainerLogin>
      <S.FlexWrapper>
        <p>Save4Me</p>
      </S.FlexWrapper>
      <p className="title">Hi there 👋</p>
      <p className="description">I’ll help you to never lose your links again. To continue, simply log in.</p>
      <div className="google-login-wrapper">
        <GoogleButton onClick={handleLogin} />
      </div>
    </S.ContainerLogin>
  )
}

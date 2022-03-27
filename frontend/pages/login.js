import { useState } from 'react'
import GoogleButton from '../components/googleButton'
import * as S from '../styles/home'

export default function Login({ setIsLogged = () => {} }) {
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (token) {
        chrome.storage.local.set({ token })
        setIsLogged(true)
      }

      setLoading(false)
    })
  }

  return (
    <S.ContainerLogin>
      <S.FlexWrapper>
        <p>Save4Me</p>
      </S.FlexWrapper>
      <p className="title">Hi there 👋</p>
      <p className="description">I’ll help you to never lose your links again. To continue, simply log in.</p>
      <div className="google-login-wrapper">
        <GoogleButton isLoading={loading} onClick={handleLogin} />
      </div>
    </S.ContainerLogin>
  )
}

import { useState } from 'react'
import * as S from '../styles/home'
import Input from '../components/input'
import Button from '../components/button'
import { useLocalStorage } from '../services/useLocalStorage'

export default function Login({ setIsLogged = () => {}, setEmail = () => {} }) {
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useLocalStorage('email', '')


  const handleLogin = () => {
    setLoading(true)
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (token) {
        chrome.storage.local.set({ token })
        chrome.identity.getProfileUserInfo({}, ({ email }) => {
          chrome.storage.local.set({ email })
          setEmail(email)
        })

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
        <Input
          id="email-input"
          value={userEmail}
          onChange={(value) => setUserEmail(value.target.value)}
          text="Email"
        />
        <Button
          isLoading={loading}
          onClick={handleAddLink}
          text={initialValue?.id ? 'Edit link' : 'Add link'}
          width="117"
          height="44"
        />
      </div>
    </S.ContainerLogin>
  )
}

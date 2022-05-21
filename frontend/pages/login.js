import { useState, useEffect } from 'react'
import Button from '../components/button'
import Input from '../components/input'
import { fetchLogin } from '../services/api'
import * as S from '../styles/home'

export default function Login({ setIsLogged = () => {}, setEmail = () => {} }) {
  const [loading, setLoading] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      setLoading(true)

      await fetchLogin({ email: emailInput, password })

      setIsLogged(true)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i

    setIsValidEmail(emailRegex.test(emailInput))
    setIsValidPassword(password.length > 8)
  }, [emailInput, password])

  return (
    <S.ContainerLogin>
      <S.FlexWrapper>
        <p>Save4Me</p>
      </S.FlexWrapper>
      <p className="title">Hi there 👋</p>
      <p className="description">I’ll help you to never lose your links again. To continue, simply log in.</p>
      <Input
        id="email-input"
        error={!isValidEmail && emailInput && 'Invalid e-mail'}
        text="Email"
        value={emailInput}
        onChange={(value) => setEmailInput(value)}
      />
      <Input
        id="password-input"
        type="password"
        error={!isValidPassword && password && 'Password must contain at least 8 characters'}
        text="Password"
        value={password}
        onChange={(value) => setPassword(value)}
      />
      <div className="buttonContainer">
        <Button onClick={handleLogin} text="Sign in" height="44" width="110" isLoading={loading} />
      </div>
    </S.ContainerLogin>
  )
}

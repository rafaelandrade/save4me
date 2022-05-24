import { useState, useEffect } from 'react'
import Button from '../components/button'
import Input from '../components/input'
import { Eye } from '../public/icons/Eye'
import { EyeCovered } from '../public/icons/EyeCovered'
import { fetchLogin } from '../services/api'
import * as S from '../styles/home'

const RightIcon = ({ setInputType }) => {
  const [coveredPassword, setCoveredPassword] = useState(true)
  const [color, setColor] = useState('#A8A8A8')

  const coverageOrUncovered = () => {
    setCoveredPassword(!coveredPassword)
    setInputType(!coveredPassword ? 'password' : 'text')
  }

  const mouseup = () => {
    const activeElement = document.activeElement

    const focused = activeElement?.id === 'password-input'

    setColor(focused ? '#374BFF' : '#A8A8A8')
  }

  useEffect(() => {
    const passwordInput = document.getElementById('password-input')
    const emailInput = document.getElementById('email-input')

    passwordInput.addEventListener('mouseup', mouseup, false)
    emailInput.addEventListener('mouseup', mouseup, false)
  }, [])

  const style = { cursor: 'pointer', paddingTop: '22px' }

  const component = coveredPassword ? <EyeCovered color={color} /> : <Eye color={color} />

  return (
    <div style={style} onClick={coverageOrUncovered}>
      {component}
    </div>
  )
}

export default function Login({ setIsLogged = () => {}, setEmail = () => {} }) {
  const [loading, setLoading] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordInputType, setPasswordInputType] = useState('password')

  const handleLogin = async () => {
    try {
      setLoading(true)

      await fetchLogin({ email: emailInput, password })

      setIsLogged(true)
      setLoading(false)
      setEmail(emailInput)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i

    setIsValidEmail(emailRegex.test(emailInput))
    setIsValidPassword(password.length >= 6)
  }, [emailInput, password])

  return (
    <S.ContainerLogin>
      <S.FlexWrapper>
        <p>Save4Me</p>
      </S.FlexWrapper>
      <p className="title">Hi there 👋</p>
      <p className="description">
        I’ll help you to never lose your links again. To continue, enter your email and password. If you don’t have an account,
        just enter your email and enter your password.
      </p>
      <Input
        id="email-input"
        error={!isValidEmail && emailInput && 'Invalid e-mail'}
        text="Email"
        value={emailInput}
        onChange={(value) => setEmailInput(value)}
      />
      <Input
        id="password-input"
        type={passwordInputType}
        error={!isValidPassword && password && 'Password must contain at least 6 characters'}
        text="Password"
        value={password}
        onChange={(value) => setPassword(value)}
        iconRight={<RightIcon setInputType={setPasswordInputType} />}
      />
      <div className="buttonContainer">
        <Button onClick={handleLogin} text="Sign in or sign up" height="44" width="192" isLoading={loading} />
      </div>
    </S.ContainerLogin>
  )
}

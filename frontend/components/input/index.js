import { useState } from 'react'
import * as S from './styles'

export default function Input({
  iconRight = null,
  iconLeft = null,
  text = '',
  shouldAnimate = true,
  subText = null,
  value,
  onChange = () => {},
  error = null,
  ...props
}) {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    document.getElementById('component-input').focus()
  }

  return (
    <>
      <S.Container
        placeholderColor={!shouldAnimate ? (focused ? '#a8a8a8' : '#000') : '#a8a8a8'}
        focused={focused || value}
        left={iconLeft ? 33 : 0}
        shouldAnimate={shouldAnimate}
      >
        {shouldAnimate ? <p onClick={handleFocus}>{text}</p> : null}
        {iconLeft}
        <input
          id="component-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={focused || !shouldAnimate ? text : ''}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {iconRight}
      </S.Container>
      {error || subText ? <S.SubText error={!!error}>{error || subText}</S.SubText> : null}
    </>
  )
}

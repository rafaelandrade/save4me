import { useState } from 'react'
import InputMask from 'react-input-mask'
import * as S from './styles'

export default function Input({
  iconRight = null,
  iconLeft = null,
  text = '',
  shouldAnimate = true,
  subText = null,
  value,
  width = '100%',
  height = '49px',
  onChange = () => {},
  error = null,
  onEnter = () => {},
  id = 'component-input',
  mask,
  ...props
}) {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    document.getElementById(id).focus()
  }

  return (
    <>
      <S.Container
        width={width}
        height={height}
        placeholderColor={!shouldAnimate ? (focused ? '#a8a8a8' : '#000') : '#a8a8a8'}
        focused={focused || value}
        left={iconLeft ? 33 : 0}
        shouldAnimate={shouldAnimate}
      >
        {shouldAnimate ? <p onClick={handleFocus}>{text}</p> : null}
        {iconLeft}
        <InputMask
          mask={mask}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnter(e.target.value)
            }
          }}
          id={id}
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

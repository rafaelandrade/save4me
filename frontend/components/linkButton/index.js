import { useState } from 'react'
import { PlusIcon } from '../../public/icons/Plus'
import * as S from './styles'

export default function LinkButton({ text, onClick = () => {} }) {
  const [hover, setHover] = useState(false)

  return (
    <S.Container onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <S.Text hover={hover}>{text}</S.Text>
      <PlusIcon color={hover ? '#0013BA' : '#374BFF'} />
    </S.Container>
  )
}

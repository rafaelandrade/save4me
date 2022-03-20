import { CloseIcon } from '../../public/icons/Close'
import * as S from './styles'

export default function Tag({ text, onRemove = () => {} }) {
  return (
    <S.Container>
      <S.Text>{text}</S.Text>
      <CloseIcon onClick={onRemove} />
    </S.Container>
  )
}

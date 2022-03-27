import { CloseIcon } from '../../public/icons/Close'
import * as S from './styles'

export default function Tag({ text, id, onRemove = () => {} }) {
  return (
    <S.Container>
      <S.Text>{text}</S.Text>
      <div onClick={() => onRemove(text, id)}>
        <CloseIcon />
      </div>
    </S.Container>
  )
}

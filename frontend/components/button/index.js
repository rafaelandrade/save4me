import { LoadingIcon } from '../../public/icons/Loading'
import * as S from './styles'

export default function Button({
  onClick = () => {},
  isLoading = false,
  text,
  width = 83,
  height = 44,
  showBackground = true,
}) {
  return (
    <S.Container onClick={onClick} showBackground={showBackground} width={width} height={height} isLoading={isLoading}>
      {isLoading ? <LoadingIcon /> : <S.Text>{text}</S.Text>}
    </S.Container>
  )
}

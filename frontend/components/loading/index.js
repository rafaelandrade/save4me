import { LoadingPointIcon } from '../../public/icons/LoadingPoint'
import * as S from './styles'

export default function Loading() {
  return (
    <S.Container>
      <div>
        <LoadingPointIcon />
      </div>
      <div>
        <LoadingPointIcon />
      </div>
      <div>
        <LoadingPointIcon />
      </div>
    </S.Container>
  )
}

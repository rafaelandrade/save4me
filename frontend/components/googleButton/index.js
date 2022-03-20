import { GoogleIcon } from '../../public/icons/Google'
import { LoadingIcon } from '../../public/icons/Loading'
import * as S from './styles'

export default function GoogleButton({ text = 'Continue with Google', onClick = () => {}, isLoading = false }) {
  return (
    <S.Container isLoading={isLoading} onClick={onClick}>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <GoogleIcon />
          <S.Text>{text}</S.Text>
        </>
      )}
    </S.Container>
  )
}

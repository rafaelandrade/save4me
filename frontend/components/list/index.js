import { SearchNotFoundIcon } from '../../public/icons/SearchNotFound'
import * as S from './styles'

export default function List({ links = [] }) {
  return (
    <>
      {links.length ? (
        links.map(({ img, title, url }, index) => (
          <S.Container onDoubleClick={() => window.open(url, '_blank')} key={index}>
            <img src={img} alt={`icon-logo-${img}`} />
            <p>{title}</p>
          </S.Container>
        ))
      ) : (
        <S.NotFoundContainer>
          <SearchNotFoundIcon />
          <p>Nothing found.</p>
        </S.NotFoundContainer>
      )}
    </>
  )
}

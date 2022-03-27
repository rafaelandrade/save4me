import { SearchNotFoundIcon } from '../../public/icons/SearchNotFound'
import Link from './link'
import * as S from './styles'

export default function List({ links = [], onDelete = () => {} }) {
  return (
    <>
      {links.length ? (
        links.map((link, index) => <Link key={index} {...link} onDelete={onDelete} />)
      ) : (
        <S.NotFoundContainer>
          <SearchNotFoundIcon />
          <p>Nothing found.</p>
        </S.NotFoundContainer>
      )}
    </>
  )
}

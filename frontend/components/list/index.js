import { SearchNotFoundIcon } from '../../public/icons/SearchNotFound'
import Link from './link'
import * as S from './styles'

export default function List({ links = [], onDelete = () => {}, onEdit = () => {} }) {
  return (
    <>
      {links?.length ? (
        links.map((link, index) => <Link onEdit={onEdit} key={index} {...link} onDelete={onDelete} />)
      ) : (
        <S.NotFoundContainer>
          <SearchNotFoundIcon />
          <p>Nothing found.</p>
        </S.NotFoundContainer>
      )}
    </>
  )
}

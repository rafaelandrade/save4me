import { useState } from 'react'
import { EditIcon } from '../../public/icons/Edit'
import { TrashIcon } from '../../public/icons/Trash'
import * as S from './styles'

export default function Link({ title, icon, index, keywords, link, id, onDelete, onEdit }) {
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringTrash, setIsHoveringTrash] = useState(false)
  const [isHoveringEdit, setIsHoveringEdit] = useState(false)
  const [image, setImage] = useState(icon)

  return (
    <>
      <S.Container
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onDoubleClick={() => window.open(link, '_blank')}
        key={index}
      >
        <img src={image} alt="icon" onError={() => setImage('https://avatars.dicebear.com/api/initials/saveforme.svg')} />
        <p>{title}</p>
        {isHovering ? (
          <>
            <div
              onClick={() => onEdit({ title, icon, link, id, keywords })}
              onMouseEnter={() => setIsHoveringEdit(true)}
              onMouseLeave={() => setIsHoveringEdit(false)}
              className="edit-wrapper"
            >
              <EditIcon color={isHoveringEdit ? '#0013BA' : '#575757'} />
            </div>
            <div
              onClick={() => onDelete({ title, icon, link, id })}
              onMouseEnter={() => setIsHoveringTrash(true)}
              onMouseLeave={() => setIsHoveringTrash(false)}
              className="trash-wrapper"
            >
              <TrashIcon color={isHoveringTrash ? '#EF6C6C' : '#575757'} />
            </div>
          </>
        ) : null}
      </S.Container>
    </>
  )
}

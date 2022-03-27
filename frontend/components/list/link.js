import { useState } from 'react'
import { TrashIcon } from '../../public/icons/Trash'
import * as S from './styles'

export default function Link({ title, img, index, url, onDelete }) {
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringTrash, setIsHoveringTrash] = useState(false)

  return (
    <>
      <S.Container
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onDoubleClick={() => window.open(url, '_blank')}
        key={index}
      >
        <img src={img} alt={`icon-logo-${img}`} />
        <p>{title}</p>
        {isHovering ? (
          <div
            onClick={() => onDelete(url)}
            onMouseEnter={() => setIsHoveringTrash(true)}
            onMouseLeave={() => setIsHoveringTrash(false)}
            className="trash-wrapper"
          >
            <TrashIcon color={isHoveringTrash ? '#EF6C6C' : '#575757'} />
          </div>
        ) : null}
      </S.Container>
    </>
  )
}

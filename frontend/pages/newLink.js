import { useState } from 'react'
import Button from '../components/button'
import Input from '../components/input'
import Tag from '../components/tags'
import { ArrowLeftIcon } from '../public/icons/ArrowLeft'
import { HelpIcon } from '../public/icons/Help'
import * as S from '../styles/home'
import validator from 'validator'

export default function NewLink({ setShowAddLink = () => {} }) {
  const [link, setLink] = useState({ value: '', isValid: true })
  const [title, setTitle] = useState({ value: '', isValid: true })
  const [tagsString, setTagsString] = useState({ value: '', isValid: true })
  const [tags, setTags] = useState([])

  const rightIcon = () => {
    return (
      <div className="tooltip">
        <span className="tooltiptext">
          Tags help you find what you want in case you need it in the future, so choose tags that make sense.
        </span>
        <HelpIcon />
      </div>
    )
  }

  const validateLink = () => {
    try {
      return validator.isURL(link.value)
    } catch {
      return false
    }
  }

  const validateTitle = () => {
    return title.value.length > 0
  }

  const handleNext = () => {
    const activeId = document.activeElement.id

    const inputs = {
      'link-input': 'title-input',
      'title-input': 'tags-input',
    }

    const validators = {
      'link-input': validateLink,
      'title-input': validateTitle,
    }

    const setters = {
      'link-input': setLink,
      'title-input': setTitle,
    }

    const values = {
      'link-input': link,
      'title-input': title,
    }

    const isValid = validators[activeId]?.()

    setters[activeId]?.({ ...values[activeId], isValid: isValid })

    const input = document.getElementById(inputs[activeId])

    if (input) {
      input.focus()
    }
  }

  const handleAddLink = async () => {
    const [isValidLink, isValidTitle] = await Promise.all([validateLink(), validateTitle()])

    setLink({ ...link, isValid: isValidLink })
    setTitle({ ...title, isValid: isValidTitle })

    if (isValidLink && isValidTitle) {
      // send to backend
    }
  }

  const handleTag = (value) => {
    if (value.includes(',')) {
      return handleAddTag(value)
    }

    setTagsString({ ...tags, value })
  }

  const handleAddTag = (value) => {
    if (tags.length === 3) return

    setTags([...tags, { text: value.split(',')[0], id: Math.random() }])
    return setTagsString({ ...tags, value: '' })
  }

  const onRemove = (_text, id) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  return (
    <S.Container>
      <S.FlexWrapper>
        <div onClick={() => setShowAddLink(false)} className="back">
          <ArrowLeftIcon />
        </div>
        <p onClick={() => setShowAddLink(false)}>Save4Me</p>
      </S.FlexWrapper>
      <div className="forms-wrapper">
        <Input
          id="link-input"
          onEnter={handleNext}
          value={link.value}
          onChange={(value) => setLink({ ...link, value })}
          text="Link"
          error={!link.isValid && 'Invalid link'}
        />
        <Input
          id="title-input"
          onEnter={handleNext}
          value={title.value}
          onChange={(value) => setTitle({ ...title, value })}
          text="Site name"
          error={!title.isValid && 'Name is mandatory'}
        />
        <Input
          value={tagsString.value}
          onChange={handleTag}
          id="tags-input"
          onEnter={handleAddTag}
          text="Tags"
          iconRight={rightIcon()}
          subText="Separate tags with commas (,). Until three tags."
        />
        <div className="tags-wrapper">
          {tags.map((tag) => (
            <Tag onRemove={onRemove} {...tag} key={tag.text + Math.random()} />
          ))}
        </div>
      </div>
      <div className="buttons-wrapper-add-link">
        <Button onClick={() => setShowAddLink(false)} text="Cancel" showBackground={false} width="105" height="44" />
        <Button onClick={handleAddLink} text="Add link" width="117" height="44" />
      </div>
    </S.Container>
  )
}

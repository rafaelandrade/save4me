import { useState } from 'react'
import Button from '../components/button'
import Input from '../components/input'
import Tag from '../components/tags'
import { ArrowLeftIcon } from '../public/icons/ArrowLeft'
import { HelpIcon } from '../public/icons/Help'
import * as S from '../styles/home'
import validator from 'validator'
import { postLinks, updateLinks } from '../services/api'

export default function NewLink({
  initialValue = {},
  email = '',
  setLinks = () => {},
  setShowAddLink = () => {},
  setInitialValue = () => {},
}) {
  const [link, setLink] = useState({ value: initialValue?.link, isValid: true })
  const [title, setTitle] = useState({ value: initialValue?.title, isValid: true })
  const [tagsString, setTagsString] = useState({ value: initialValue?.keywords, isValid: true })
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)

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

  const formattedUrl = (url) => {
    if (url.includes('http')) return url

    return `https://${url}`
  }

  const handleAddLink = async () => {
    setLoading(true)
    const [isValidLink, isValidTitle] = await Promise.all([validateLink(), validateTitle()])

    setLink({ ...link, isValid: isValidLink })
    setTitle({ ...title, isValid: isValidTitle })

    if (isValidLink && isValidTitle) {
      if (initialValue?.id) {
        const { message } = await updateLinks({
          email,
          data: {
            link: formattedUrl(link.value),
            keywords: tags.map((tag) => tag.text),
            title: title.value,
            id: initialValue?.id,
          },
        })

        setLinks(message?.data)
      } else {
        const { message } = await postLinks({
          email,
          data: {
            link: formattedUrl(link.value),
            keywords: tags.map((tag) => tag.text),
            title: title.value,
          },
        })

        setLinks(message?.data)
      }
    }

    setLoading(false)
    setShowAddLink(false)
  }

  const handleTag = (value) => {
    if (value.includes(',')) {
      return handleAddTag(value.toLowerCase())
    }

    setTagsString({ ...tags, value })
  }

  const handleAddTag = (value) => {
    if (tags.length === 3) return handleAddLink()

    setTags([...tags, { text: value.split(',')[0].toLowerCase(), id: Math.random() }])
    return setTagsString({ ...tags, value: '' })
  }

  const onRemove = (_text, id) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  return (
    <S.Container>
      <S.FlexWrapper>
        <div
          onClick={() => {
            setShowAddLink(false)
            setInitialValue(null)
          }}
          className="back"
        >
          <ArrowLeftIcon />
        </div>
        <p
          onClick={() => {
            setShowAddLink(false)
            setInitialValue(null)
          }}
        >
          Save4Me
        </p>
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
        <Button
          onClick={() => {
            setShowAddLink(false)
            setInitialValue(null)
          }}
          text="Cancel"
          showBackground={false}
          width="105"
          height="44"
        />
        <Button
          isLoading={loading}
          onClick={handleAddLink}
          text={initialValue?.id ? 'Edit link' : 'Add link'}
          width="117"
          height="44"
        />
      </div>
    </S.Container>
  )
}

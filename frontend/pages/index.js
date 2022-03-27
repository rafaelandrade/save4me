import { useState, useEffect, useCallback } from 'react'
import Input from '../components/input'
import LinkButton from '../components/linkButton'
import List from '../components/list'
import Loading from '../components/loading'
import { SearchIcon } from '../public/icons/Search'
import * as S from '../styles/home'
import Login from './login'
import NewLink from './newLink'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [showAddLink, setShowAddLink] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [links, setLinks] = useState([
    {
      img: 'https://cdn-teams-slug.flaticon.com/google.jpg',
      title: 'Google',
      url: 'https://google.com',
      tags: ['google'],
    },
    {
      img: 'https://cdn-teams-slug.flaticon.com/google.jpg',
      title: 'Twitter',
      url: 'https://google.com',
      tags: ['twitter'],
    },
    {
      img: 'https://cdn-teams-slug.flaticon.com/google.jpg',
      title: 'Facebook',
      url: 'https://google.com',
      tags: ['facebook'],
    },
  ])
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    if (!chrome.storage) return setIsLogged(true)

    chrome.storage.local.get(['token'], (result) => {
      if (result.token) setIsLogged(true)
    })
  }, [])

  const handleKeyPress = useCallback(async (event) => {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault()
      document.getElementById('component-input')?.focus?.()
    }
  }, [])

  const search = useCallback(
    (value) => {
      setLoading(true)

      const resultWithLink = links.filter((link) => link.title.toLowerCase().includes(value.toLowerCase()))
      const resultWithTag = links.filter((link) => link.tags.includes(value.toLowerCase()))
      const resultWithTitle = links.filter((link) => link.title.toLowerCase().includes(value.toLowerCase()))

      const result = [...new Set([...resultWithLink, ...resultWithTag, ...resultWithTitle])]

      setSearchResult(result)

      setTimeout(() => setLoading(false), 1000)
    },
    [links]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  if (!isLogged) return <Login setIsLogged={setIsLogged} />

  return (
    <>
      {showAddLink ? (
        <NewLink setShowAddLink={setShowAddLink} />
      ) : (
        <S.Container>
          <S.FlexWrapper onClick={() => setSearchResult(null)}>
            <p>Save4Me</p>
          </S.FlexWrapper>
          <div className="padding-wrapper">
            <Input
              text="Search"
              onEnter={search}
              onChange={(value) => setSearchValue(value)}
              value={searchValue}
              iconLeft={<SearchIcon />}
              shouldAnimate={false}
            />
            {loading && <Loading />}
            <div className="buttons-wrapper">
              <LinkButton onClick={() => setShowAddLink(true)} text="New link" />
            </div>
          </div>
          <List links={searchResult || links} />
        </S.Container>
      )}
    </>
  )
}

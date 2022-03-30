import { useState, useEffect, useCallback } from 'react'
import Input from '../components/input'
import LinkButton from '../components/linkButton'
import List from '../components/list'
import Loading from '../components/loading'
import { SearchIcon } from '../public/icons/Search'
import fetchBackend from '../services/api'
import * as S from '../styles/home'
import Login from './login'
import NewLink from './newLink'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [showAddLink, setShowAddLink] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [links, setLinks] = useState([])
  const [email, setEmail] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [initialValue, setInitialValue] = useState(undefined)

  const fetchLinks = useCallback(async () => {
    setLoading(true)

    const { message } = await fetchBackend({ email })

    setLinks(message?.data)
    setLoading(false)
  }, [email])

  useEffect(() => {
    if (!chrome?.storage?.local?.get) {
      return setIsLogged(true)
    }

    chrome.storage.local.get(['token', 'email'], (result) => {
      if (result.token) setIsLogged(true)
      if (result.email) setEmail(result.email)
    })

    fetchLinks()
  }, [fetchLinks])

  const handleKeyPress = useCallback(async (event) => {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault()
      document.getElementById('component-input')?.focus?.()
    }
  }, [])

  const search = useCallback(
    (value) => {
      setLoading(true)

      if (!links) return setTimeout(() => setLoading(false), 1000)

      const resultWithLink = links.filter((link) => link.link.toLowerCase().includes(value.toLowerCase()))
      const resultWithTag = links.filter((link) => link.keywords.includes(value.toLowerCase()))
      const resultWithTitle = links.filter((link) => link.title.toLowerCase().includes(value.toLowerCase()))

      const result = [...new Set([...resultWithLink, ...resultWithTag, ...resultWithTitle])]

      setSearchResult(result)

      setTimeout(() => setLoading(false), 1000)
    },
    [links]
  )

  const deleteLink = async (link) => {
    setLoading(true)
    const { message } = await fetchBackend({ data: link, email, service: 'remove' })

    setLinks(message?.data)
    setLoading(false)
  }

  const editLink = async (link) => {
    setShowAddLink(true)
    setInitialValue(link)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  if (!isLogged) return <Login setEmail={setEmail} setIsLogged={setIsLogged} />

  return (
    <>
      {showAddLink ? (
        <NewLink
          setInitialValue={setInitialValue}
          initialValue={initialValue}
          email={email}
          setLinks={setLinks}
          setShowAddLink={setShowAddLink}
        />
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
          <List onEdit={editLink} onDelete={deleteLink} links={searchResult || links} />
        </S.Container>
      )}
    </>
  )
}

import { useState } from 'react'
import GoogleButton from '../components/googleButton'
import Input from '../components/input'
import LinkButton from '../components/linkButton'
import Tag from '../components/tags'
import { SearchIcon } from '../public/icons/Search'
import * as S from '../styles/home'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <S.Container>
      <S.FlexWrapper>
        <p>Save4Me</p>
        <img alt="avatar" src="https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg" />
      </S.FlexWrapper>
      <Input
        text="Search"
        onChange={(value) => setSearchValue(value)}
        value={searchValue}
        iconLeft={<SearchIcon />}
        shouldAnimate={false}
        subText="Separate tags with commas (,)"
      />
      <div style={{ display: 'flex' }}>
        <Tag text="Engenharia" />
        <Tag text="Dev" />
      </div>
      <LinkButton text="New folder" />
      <GoogleButton />
    </S.Container>
  )
}

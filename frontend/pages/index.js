import Input from '../components/input'
import { PlusIcon } from '../public/icons/Plus'
import { SearchIcon } from '../public/icons/Search'
import * as S from '../styles/home'

export default function Home() {
  return (
    <S.Container>
      <S.FlexWrapper>
        <p>Save4Me</p>
        <img alt="avatar" src="https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg" />
      </S.FlexWrapper>
      <Input text="Search" iconLeft={<SearchIcon />} shouldAnimate subText="Separate tags with commas (,)" />
      <S.ButtonAdd>
        <PlusIcon />
      </S.ButtonAdd>
    </S.Container>
  )
}

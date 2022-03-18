import { PlusIcon } from '../public/icons/Plus'
import { SearchIcon } from '../public/icons/Search'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.flexWrapper}>
        <p>Save4Me</p>

        <img alt="avatar" src="https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg" />
      </div>
      <div className={styles.searchBox}>
        <SearchIcon />
        <input placeholder="Search"></input>
      </div>
      <button className={styles.buttonAdd}>
        <PlusIcon />
      </button>
    </div>
  )
}

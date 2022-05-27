import SearchBox from '../../components/SearchBox/SearchBox'
import UserList from '../../components/UserList/UserList'
import styles from './searchPage.module.css'

export default function SearchPage() {
    return (
        <div className={styles.container}>
            <SearchBox />
            <div className={styles.listContainer}>
                <UserList />
            </div>
        </div>
    )
}
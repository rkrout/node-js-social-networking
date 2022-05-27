import styles from './searchBox.module.css'

export default function SearchBox() {
    return (
        <form className={styles.container}>
            <div className={styles.searchBox}>
                <input type="search" name="query" className={styles.searchInput} placeholder="Search Here..." />
                <span className={`material-icons ${styles.searchIcon}`}>search</span>
            </div>
        </form>
    )
}
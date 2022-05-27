import Loader from '../../components/Loader/Loader'
import Post from '../../components/Post/Post'
import { posts } from '../../utils/faker'
import styles from './homePage.module.css'

export default function HomePage() {
    return (
        <div className={styles.container}>
            {posts.map(post => (
                <Post
                    key={post.postId}
                    post={post}
                    onLike={null}
                    onRemoveLike={null}
                    onBookmark={null}
                    onRemoveBookmark={null}
                />
            ))}

            <Loader/>
        </div>
    )
}
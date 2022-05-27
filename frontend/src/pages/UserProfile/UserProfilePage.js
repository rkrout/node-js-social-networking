import Post from '../../components/Post/Post'
import { posts, profileImages } from '../../utils/faker'
import Loader from '../../components/Loader/Loader'
import styles from './userProfilePage.module.css'
import {Link} from 'react-router-dom'

export default function UserProfilePage() {
    return (
        <div className={styles.container} >
            <div className={styles.upperWrapper}>
                <div className={styles.upperContainer}>
                    <img src={posts[0].image} className={styles.bannerImg} />
                    <div className={styles.profileContainer}>
                        <img src={profileImages[4]} className={styles.profileImg} />
                        <div className={styles.profileRightContainer}>
                            <div className={styles.profileInfoContainer}>
                                <div className={styles.userName}>{posts[0].name}</div>
                                <div className={styles.followInfo}>234 Followers . 345 Following . 345 Posts</div>
                            </div>
                            <div>
                                <Link to="/edit-account" className="btnSm">Follow</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.postContainer}>
                {posts.map(post => <Post post={post} />)}
                <Loader />
            </div>
        </div>
    )
}
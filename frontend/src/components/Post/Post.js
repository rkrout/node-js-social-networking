import styles from './post.module.css'
import { useState } from 'react'
import AddComment from '../AddComment/AddComment'
import Comment from '../Comment/Comment'
import CommentList from '../CommentList/CommentList'

export default function Post({ post }) {
    const { name, profileImage, description, image, createdAt, totalLikes } = post
    const [isCommentVisible, setIsCommentVisible] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <img src={profileImage} className={styles.profileImg} />
                <div>
                    <div className={styles.userName}>{name}</div>
                    <div className={styles.createdAt}>{createdAt}</div>
                </div>
            </div>

            <div className={styles.description}>{description}</div>

            <img src={image} className={styles.postImg} />

            <div className={styles.btnContainer}>
                <div className={styles.footer}>
                    <div className={styles.btnContainer}>
                        <span className={`material-icons-outlined ${styles.actionBtn}`}>favorite_border</span>
                        <span onClick={() => setIsCommentVisible(!isCommentVisible)} 
                        className={`material-icons-outlined ${styles.actionBtn}`}>forum</span>
                    </div>

                    <div className={styles.likeText}>23 likes, 23 comments</div>
                </div>
            </div>

            {isCommentVisible && <CommentList />}
        </div>
    )
}
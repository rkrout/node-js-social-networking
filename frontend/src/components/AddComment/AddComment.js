import styles from './addComment.module.css'
import { profileImages } from '../../utils/faker'

export default function AddComment() {
    return (
        <div className={styles.container}>
            <div>
                <img src={profileImages[4]} className={styles.profileImg} />
            </div>

            <div className={styles.inputContainer}>
                <input type="text" className={`formInput ${styles.input}`} placeholder="Write your comment. . ." />

                <div>
                    <button className={styles.postBtn}>POST</button>
                </div>
            </div>
        </div>
    )
}
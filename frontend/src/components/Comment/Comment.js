import styles from './comment.module.css'
import { profileImages } from '../../utils/faker'

export default function Comment() {
    return (
        <div className={styles.container}>
            <div>
                <img src={profileImages[4]} className={styles.profileImg} />
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.commentWrapper}>
                    <div className={styles.commentContainer}>
                        <div className={styles.nameContainer}>
                            <div className={styles.name}>Rajesh Kumar Rout</div>
                            <div className={styles.commentedAt}>4 hours ago</div>
                        </div>

                        <div className={styles.comment}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</div>
                    </div>
                </div>

                <div>
                    <button className={`material-icons ${styles.iconBtn}`}>delete</button>
                </div>
            </div>
        </div>
    )
}
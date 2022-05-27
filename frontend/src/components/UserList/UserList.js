import { profileImages } from "../../utils/faker";
import styles from './userList.module.css'

export default function UserList() {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>34 People Found</div>
            <div>
                <div className={styles.item}>
                    <button className={styles.infoContainer}>
                        <img src={profileImages[4]} className={styles.profileImg} />
                        <div className={styles.userName}>Rajesh Kumar Rout</div>
                    </button>
                    <button className={`material-icons ${styles.iconBtn}`}>person_add</button>
                </div>

                <div className={styles.item}>
                    <button className={styles.infoContainer}>
                        <img src={profileImages[4]} className={styles.profileImg} />
                        <div className={styles.userName}>Rajesh Kumar Rout</div>
                    </button>
                    <button className={`material-icons ${styles.iconBtn}`}>person_add</button>
                </div>
            </div>
        </div>
    )
}
import { postImages, profileImages } from '../../utils/faker'
import styles from './editAccountPage.module.css'

export default function EditAccountPage() {

    const submitForm = (event) => {
        event.preventDefault()
    }

    return (
        <form className={styles.container} onSubmit={submitForm}>
            <div className={styles.heading}>EDIT ACCOUNT</div>

            <div className="formGroup">
                <label htmlFor="fullName" className="formLabel">Full Name</label>
                <input type="text" id="fullName" name="fullName" className="formInput" required={true} minLength={2} maxLength={20}/>
            </div>

            <div className="formGroup">
                <label htmlFor="profileImage" className="formLabel">Profile Image</label>
                <div className={styles.profileImgContainer}>
                    <img src={profileImages[4]} className={styles.img}/>
                    <span className={`material-icons-outlined ${styles.pickBtn}`}>add_a_photo</span>
                </div>
            </div>

            <div className="formGroup">
                <label htmlFor="profileImage" className="formLabel">Profile Image</label>
                <div className={styles.coverImgContainer}>
                    <img src={postImages[3]} className={styles.img}/>
                    <span className={`material-icons-outlined ${styles.pickBtn}`}>add_a_photo</span>
                </div>
            </div>

            <button type="submit" className="btnFull btnPrimary">Save</button>
        </form>
    )
}
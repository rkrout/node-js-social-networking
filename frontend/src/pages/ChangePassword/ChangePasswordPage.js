import styles from './changePasswordPage.module.css'

export default function ChangePasswordPage() {
    const submitForm = (event) => {
        event.preventDefault()
    }

    return (
        <form className={styles.container} onSubmit={submitForm}>
            <div className={styles.heading}>CHANGE PASSWORD</div>

            <div className="formGroup">
                <label htmlFor="oldPassword" className="formLabel">Old Password</label>
                <input type="password" id="oldPassword" name="oldPassword" className="formInput"/>
            </div>

            <div className="formGroup">
                <label htmlFor="newPassword" className="formLabel">New Password</label>
                <input type="password" id="newPassword" name="newPassword" className="formInput"/>
            </div>

            <div className="formGroup">
                <label htmlFor="retypeNewPassword" className="formLabel">Confirm New Password</label>
                <input type="password" id="confirmNewPassword" name="confirmNewPassword" className="formInput"/>
            </div>

            <button type="submit" className="btnFull btnPrimary">Change Password</button>
        </form>
    )
}
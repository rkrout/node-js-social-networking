import styles from './changeEmailPage.module.css'

export default function ChangeEmailPage() {
    const submitForm = (event) => {
        event.preventDefault()
    }

    return (
        <form className={styles.container} onSubmit={submitForm}>
            <div className={styles.heading}>CHANGE EMAIL</div>

            <div className="formGroup">
                <label htmlFor="password" className="formLabel">Enter Password</label>
                <input type="password" id="password" name="password" className="formInput"/>
            </div>

            <div className="formGroup">
                <label htmlFor="email" className="formLabel">New Email</label>
                <input type="email" id="email" name="email" className="formInput" required={true} maxLength={20}/>
            </div>

            <button type="submit" className="btnFull btnPrimary">Change Email</button>
        </form>
    )
}
import { Link } from 'react-router-dom'
import styles from './loginPage.module.css'

export default function LoginPage() {
    const submitForm = (event) => {
        event.preventDefault()
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={submitForm}>
                <div className={styles.heading}>LOGIN</div>

                <div className="formGroup">
                    <label htmlFor="email" className="formLabel">Email</label>
                    <input type="email" id="email" name="email" className="formInput" required={true}/>
                </div>

                <div className="formGroup">
                    <label htmlFor="password" className="formLabel">Password</label>
                    <input type="password" id="password" name="password" className="formInput" required={true}/>
                </div>

                <button type="submit" className="btnFull btnPrimary">Login</button>

                <div className={styles.signUpText}>
                    Do not have an account ? 
                    <Link to="/signUp" className={styles.signUpBtn}> Sign Up</Link>
                </div>
            </form>
        </div>
    )
}
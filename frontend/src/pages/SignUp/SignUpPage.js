import { Link } from 'react-router-dom'
import styles from './signUpPage.module.css'

export default function SignUpPage() {
    const submitForm = (event) => {
        event.preventDefault()
    }

    return (
        <form className={styles.container} onSubmit={submitForm}>
            <div className={styles.heading}>SIGN UP</div>

            <div className="formGroup">
                <label htmlFor="name" className="formLabel">Name</label>
                <input type="text" id="name" name="name" className="formInput" required={true} minLength={2} maxLength={40}/>
            </div>

            <div className="formGroup">
                <label htmlFor="email" className="formLabel">Email</label>
                <input type="email" id="email" name="email" className="formInput" required={true} maxLength={20}/>
            </div>

            <div className="formGroup">
                <label htmlFor="dob" className="formLabel">Password</label>
                <input type="password" id="password" name="password" className="formInput" required={true} minLength={8} maxLength={20}/>
            </div>

            <div className="formGroup">
                <label htmlFor="confirmPassword" className="formLabel">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="formInput"/>
            </div>

            <button type="submit" className="btnFull btnPrimary">Register</button>

            <div className={styles.loginText}>
                Already have an account ? 
                <Link to="/login" className={styles.loginBtn}>Login</Link>
            </div>
        </form>
    )
}
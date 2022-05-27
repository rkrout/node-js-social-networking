import { useState } from 'react'
import { useRef } from 'react'
import styles from './addPostPage.module.css'

export default function AddPostPage() {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const imageRef = useRef()

    const submitForm = (event) => {
        event.preventDefault()

        if (!description && !image) 
        {
            alert('Either image or description is required!')
            return
        }
    }

    const cancelImg = () => {
        setImage('')
        imageRef.current.value = ''
    }

    return (
        <form className={styles.container} onSubmit={submitForm}>
            <div className={styles.heading}>ADD POST</div>

            <div className="formGroup">
                <label htmlFor="password" className="formLabel">Description</label>
                <textarea className="formInput" onChange={({ target }) => setDescription(target.value)}></textarea>
            </div>

            <div className="formGroup">
                <label htmlFor="password" className="formLabel">Description</label>
                <input type="file" ref={imageRef} className="formInput" onChange={({ target }) => setImage(target.files[0])} />

                {image && (
                    <div className={styles.imgContainer}>
                        <img src={URL.createObjectURL(image)} className={styles.img} />
                        <span onClick={cancelImg} className={`material-icons ${styles.imgCancelBtn}`}>close</span>
                    </div>
                )}
            </div>

            <button type="submit" className="btnFull btnPrimary">Upload</button>
        </form>
    )
}
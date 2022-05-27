import { useEffect, useReducer, useState } from 'react'
import Comment from '../../components/Comment/Comment'
import Post from '../../components/Post/Post'
import { posts, profileImages } from '../../utils/faker'
import styles from './commentPage.module.css'

export default function CommentPage() {
    const [showComment, setShowComment] = useState(true)

    useEffect(() => {

    }, [])

    return (
        <div style={{
        }}>
        <div className={styles.container} style={{

        }}>
           
           {showComment && (
                <div className={styles.commentContainer}  style={{
            
                }}>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
    
                    <div style={{
                        display: 'flex',
                        gap: 20
                    }}>
                        <div>
                            <img src={profileImages[4]} style={{width: 40, height: 40, borderRadius: '50%', objectFit: 'cover'}}/>
                        </div>
                        <div style={{flex: 1, textAlign: 'right'}}>
                            <input placeholder='Write your comment. . .' type="text" style={{textAlign: 'start', backgroundColor: 'var(--gray-200)', width: '100%', padding: 10}}/>
                            <button className={`btn btnPrimary`} style={{marginTop: 10}}>Post</button>
                        </div>
                    </div>
                </div>
           )}
        </div>
        </div>
    )
}
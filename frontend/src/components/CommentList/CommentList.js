import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import styles from './commentList.module.css'

export default function CommentList() {
    return (
        <div className={styles.container}>
            <AddComment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    )
}
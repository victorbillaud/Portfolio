import styles from '../styles/components.module.css';
import React, {useRef} from 'react';
import {getPostsById} from "../lib/posts";

export default class BlockFaq extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
        }
    }

    convertDate(date) {
        const newDate  = new Date(date);
        return newDate.toLocaleDateString();
    }

    componentDidMount() {
        getPostsById(this.props.data).then((res)=>{
            console.log(res)
            this.setState({answers:res})
        })
    }

    render() {
        this.state.answers.forEach((items) => console.log(items))
        return (
            <div>
                <div className={styles.questions}>
                    <div className={styles.header}>
                        <div className={styles.question}>{this.props.data.text.subject}</div>
                        <div className={styles.autor}>writted by <span>{this.props.data.autor}</span></div>
                        <div className={styles.date}>{this.convertDate(this.props.data.date)}</div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.content}>{this.props.data.text.content}</div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.answerred}>{this.props.data.answered ? this.state.answers.length+ " answers" : "no answers"}</div>
                        <div className={styles.likes}>{this.props.data.likes}</div>
                    </div>
                </div>
            </div>

        );
    }
}









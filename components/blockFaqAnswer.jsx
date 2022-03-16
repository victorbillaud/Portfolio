import styles from '../styles/components.module.css';
import React, {useRef} from 'react';
import {addLike, getPostsById} from "../lib/posts";
import Image from "next/image";
import fleche from "../assets/images/arriere-gauche.png";
import etoilePleine from "../assets/images/icons8-star-16.png";
import etoileVide from "../assets/images/etoile.png";

import ReactMarkdown from 'react-markdown'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default class BlockFaqAnswer extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            likes: this.props.data.likes,
            develop: false
        }
    }

    convertDate(date) {
        const newDate  = new Date(date);
        return newDate.toLocaleDateString();
    }

    componentDidMount() {
        this._isMounted = true;
        getPostsById(this.props.data).then((res2)=>{
            if (this._isMounted) {
                this.setState({answers: res2 })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if(this._isMounted){
            return (
                 <div className={styles.answersBlock}>
                         <div id={"flecheContainer"} className={styles.flecheContainer}>
                             <div className={styles.fleche}>
                                 <Image
                                     alt="Picture of the author"
                                     src={fleche}
                                     layout="fill"
                                     objectFit="cover"
                                 />
                             </div>
                         </div>
                         <div className={styles.answers }>
                             <div id={"mainAnswer"} className={styles.mainAnswer}>
                                 <div className={styles.header}>
                                     <div className={styles.question}>{this.props.data.text.subject}</div>
                                     <div className={styles.autor}>writted by <span>{this.props.data.autor}</span></div>
                                     <div className={styles.date}>{this.convertDate(this.props.data.date)}</div>
                                 </div>
                                 <div className={styles.body}>
                                     <ReactMarkdown>{this.props.data.text.content}</ReactMarkdown>
                                 </div>
                                 <div className={styles.footer}>
                                     <div className={styles.answerred} onClick={(e) => {
                                         e.preventDefault();
                                         this.setState({develop : !this.state.develop})
                                     }}>{this.props.data.answered ? this.state.answers.length+ " answers" : "no answers"}</div>                                <div className={styles.likes}>
                                     <div className={styles.etoileContainer}>
                                         <div>
                                             {this.state.likes}
                                         </div>
                                         <div className={styles.etoile} onClick={() => {
                                             addLike(this.props.data).then((res)=>{
                                                 if(res) this.setState({likes : this.state.likes + 1})
                                             })
                                         }}>
                                             <Image
                                                 alt="Picture of the author"
                                                 src={this.state.likes > 0 ? etoilePleine : etoileVide}
                                                 layout="fill"
                                                 objectFit="cover"
                                             />
                                         </div>
                                     </div>
                                 </div>
                             </div>
                                 <div/>
                         </div>
                             <div className={styles.childsAnswers}>
                                 <div className={this.state.develop ? styles.answersPartDevelop2 : styles.answersPart2}>
                                     {this.state.answers ? this.state.answers.map((items) => {
                                         return <BlockFaqAnswer data={items} />
                                     }) : null}
                                 </div>
                             </div>
                     </div>

                 </div>

            );
        }else{
            return <i>Chargement des éléments...</i>
        }
    }
}









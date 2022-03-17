import styles from '../styles/components.module.css';
import React, {useRef} from 'react';
import {addAnswer, addLike, addQuestion, getPostsById} from "../lib/posts";
import Image from "next/image";
import fleche from "../assets/images/arriere-gauche.png";
import etoilePleine from "../assets/images/icons8-star-16.png";
import etoileVide from "../assets/images/etoile.png";

import ReactMarkdown from 'react-markdown'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import cross from "../assets/images/close.png";
import rehypeSanitize from "rehype-sanitize";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default class BlockFaqAnswer extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            likes: this.props.data.likes,
            newAnswer : false,
            formLoading: false,
            answerContent: "",
            answerAutor: "",
            answerObject: "",
        }

        this.handleObjectChange = this.handleObjectChange.bind(this);
        this.handleAutorChange = this.handleAutorChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    convertDate(date) {
        const newDate  = new Date(date);
        return newDate.toLocaleDateString();
    }

    handleObjectChange(event){
        this.setState({answerObject: event.target.value})
    }
    handleAutorChange(event){
        this.setState({answerAutor: event.target.value})
    }
    handleContentChange(event){
        this.setState({answerContent: event})
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
                                     <div className={styles.answerred}>
                                         <div onClick={(e) => {
                                             e.preventDefault();
                                             this.setState({viewAnswers : !this.state.viewAnswers})
                                         }}>
                                             {this.props.data.answered ? this.state.answers.length+ " answers" : "no answers"}
                                         </div>
                                         <div onClick={(e) => {
                                             e.preventDefault();
                                             this.setState({newAnswer : !this.state.newAnswer})
                                         }}>
                                             Add an answer
                                         </div>
                                     </div>
                                     <div className={styles.likes}>
                                         <div className={styles.etoileContainer}>
                                             <div>
                                                 {this.state.likes}
                                             </div>
                                             <div className={styles.etoile} onClick={() => {
                                                 addLike(this.props.data).then((res)=>{
                                                     if(res) this.setState({likes : this.state.likes + 1})                                        })
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
                             <div className={this.state.newAnswer ? styles.addQuestionFormDevelop : styles.addQuestionForm}>
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
                                 <div className={styles.formDevelop}>
                                     <div className={this.state.formLoading? styles.loading : styles.loadingNone}><div className={styles.loader}/></div>
                                     <div className={styles.header}>
                                         <div className={styles.crossContainer}>
                                             <div className={styles.cross} onClick={(e) => {
                                                 e.preventDefault();
                                                 this.setState({newAnswer : false});
                                             }}>
                                                 <Image
                                                     alt="Picture of the author"
                                                     src={cross}
                                                     layout="fill"
                                                     objectFit="contain"
                                                 />
                                             </div>
                                         </div>
                                         <input value={this.state.answerObject} onChange = {this.handleObjectChange} type={"text"} placeholder={"Object"} className={styles.formQuestion}/>
                                         <input value={this.state.answerAutor} onChange = {this.handleAutorChange} type={"text"} placeholder={"Autor"} className={styles.formAutor}/>
                                         <button className={styles.sendMessage} onClick={(e) => {
                                             e.preventDefault();
                                             this.setState({formLoading : true});
                                             // addArticle({titre: this.state.title, contenu: this.state.content, date: this.state.date, categorie: this.state.cat, urlPhoto:namePhotos, urlFiles: nameFiles}).then(r =>console.log(r))
                                             addAnswer({text : {subject: this.state.answerObject, content: this.state.answerContent }, autor : this.state.answerAutor, parent: this.props.data._id}).then((res)=>{
                                                 this.setState({formLoading : false});
                                                 if(res) {
                                                     this.setState({formLoading : false});
                                                     this.setState({newAnswer : false})
                                                 }
                                                 console.log(res)
                                             })
                                         }}>Send</button>
                                     </div>
                                     <div className={styles.formBody}>
                                         <MDEditor height={150} value={this.state.answerContent} onChange={this.handleContentChange} previewOptions={{
                                             rehypePlugins: [[rehypeSanitize]],
                                         }} />
                                     </div>
                                 </div>
                             </div>

                             <div className={styles.childsAnswers}>
                                 <div className={this.state.viewAnswers ? styles.answersPartDevelop2 : styles.answersPart2}>
                                     {this.state.answers ? this.state.answers.map((items, index) => {
                                         return <BlockFaqAnswer key={index} data={items} />
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









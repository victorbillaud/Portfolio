import styles from '../styles/components.module.css';
import React, {useContext, useRef} from 'react';
import {addAnswer, addLike, addQuestion, getPostsById} from "../lib/posts";
import Image from "next/image";
import fleche from "../assets/images/arriere-gauche.png";
import etoilePleine from "../assets/images/icons8-star-16.png";
import etoileVide from "../assets/images/etoile.png";
import BlockFaqAnswer from "./blockFaqAnswer";

import ReactMarkdown from 'react-markdown'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import cross from "../assets/images/close.png";
import rehypeSanitize from "rehype-sanitize";
import {useRouter} from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styled, {css} from "styled-components";
import AppContext from "../src/context/state";
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);


export default class BlockFaq extends React.Component {



    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            likes: this.props.data.likes,
            viewAnswers: false,
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

        getPostsById(this.props.data).then((res)=>{
            if (this._isMounted) {
                console.log(res)
                this.setState({answers:res})
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const Question = styled.div`
          height: fit-content;
          border-radius: 5px ;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          border-bottom: 1px solid rgba(127,128,150,.5);
          margin: 20px;
          background-color: ${props => props.inputColor || "azure"};;
        `;

        const FormAnswer = styled.div`
          position: relative;
          overflow: hidden;
          width: 100%;
          height: fit-content;
          border-radius: 5px ;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          background-color: ${props => props.inputColor || "azure"};;
          margin: 20px;
          margin-top: 10px;
        `

        if(this._isMounted){
            return (
            <div>
                <Question inputColor={this.props.theme.state.theme === "light" ? "transparent" : "rgb(80,80,80)"} className={styles.questions}>
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
                </Question>
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
                    <FormAnswer inputColor={this.props.theme.state.theme === "light" ? "transparent" : "rgb(80,80,80)"} className={styles.formDevelop}>
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
                    </FormAnswer>
                </div>
                <div id={"answersPart"} className={this.state.viewAnswers ? styles.answersPartDevelop : styles.answersPart}>
                    {this.state.answers ? this.state.answers.map((items, index) => {
                        return items.verified ? <BlockFaqAnswer theme={this.props.theme} key={index} data={items} /> : null
                    }) : null}
                </div>
            </div>

        );
        }else{
            return <i>Chargement des éléments...</i>
        }

    }
}









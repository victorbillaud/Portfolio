import styles from '../styles/Faq.module.css'
import React, {useContext, useEffect, useRef, useState} from 'react';

import 'react-awesome-slider/dist/styles.css';

import AppContext from "../src/context/state";

import BlockFaq from "./blockFaq";
import axios from "axios";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);
import rehypeSanitize from "rehype-sanitize";
import {addLike, addMessage, addQuestion} from "../lib/posts";
import {useRouter} from "next/router";
import Rellax from "rellax";
import Image from "next/image";
import cross from "../assets/images/close.png";

export default function Faq({questions}){

    const [data, setData] = useState([])
    const [formDevelop, setFormDevelop] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [input, setInput] = React.useState("mkdStr");

    // add message form

    const [object, setObject] = useState("");
    const [autor, setAutor] = useState("");
    const [content, setContent] = useState("");

    // function

    function handleObjectChange(event){
        setObject(event.target.value);
    }
    function handleAutorChange(event){
        setAutor(event.target.value);
    }
    function handleContentChange(event){
        setContent(event);
    }

    // Build Time

    useEffect(() => {
        new Rellax(rellaxRef.current, { // <---- Via useRef element
            speed: 1,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
        });

        const axiosPost = async () => {
            const response = await axios('https://api.victorbillaud.fr/faq');
            setData(response.data);
        }
       axiosPost();
    }, []);
    const value = useContext(AppContext);

    const router = useRouter()
    const rellaxRef = useRef();

    return(
        <div className={styles.faq}>
            <div className={styles.title} ref={rellaxRef} onClick={(e) => {
                e.preventDefault();
                setFormDevelop(!formDevelop);
            }}>Let me a <i>message</i> !
            </div>
            <div className={styles.addQuestionForm}>
                <div className={formDevelop ? styles.formDevelop : styles.form}>
                    <div className={formLoading? styles.loading : styles.loadingNone}><div className={styles.loader}/></div>
                    <div className={styles.header}>
                        <div className={styles.crossContainer}>
                            <div className={styles.cross} onClick={(e) => {
                                e.preventDefault();
                                setFormDevelop(!formDevelop);
                            }}>
                                <Image
                                    alt="Picture of the author"
                                    src={cross}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        </div>
                        <input value={object} onChange = {handleObjectChange} type={"text"} placeholder={"Object"} className={styles.question}/>
                        <input value={autor} onChange = {handleAutorChange} type={"text"} placeholder={"Autor"} className={styles.autor}/>
                        <button className={styles.sendMessage} onClick={(e) => {
                            e.preventDefault();
                            setFormLoading(true)
                            // addArticle({titre: this.state.title, contenu: this.state.content, date: this.state.date, categorie: this.state.cat, urlPhoto:namePhotos, urlFiles: nameFiles}).then(r =>console.log(r))
                            addQuestion({text : {subject: object, content: content }, autor : autor}).then((res)=>{
                                setFormLoading(false)
                                if(res) {
                                    setFormLoading(false);
                                    setFormDevelop(false);
                                    router.reload();
                                }
                                console.log(res)
                            })
                        }}>Send</button>
                    </div>
                    <div className={styles.body}>
                        <MDEditor height={200} value={content} onChange={handleContentChange} previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }} />
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                {data !== [] ? data.map((question, index) => (
                    question.newSubject ? <BlockFaq key={index} data={question}/> : null
                )) : <i>Pas d'articles pour la recherche correspondante</i>}
            </div>
        </div>
    );

}

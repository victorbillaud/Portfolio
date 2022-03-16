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

export default function Faq({questions}){

    const [data, setData] = useState([])
    const [formDevelop, setFormDevelop] = useState(false)
    const [input, setInput] = React.useState("mkdStr");

    // add message form

    const [object, setObject] = useState("");
    const [autor, setAutor] = useState("");
    const [content, setContent] = useState("");

    function handleObjectChange(event){
        setObject(event.target.value);
    }
    function handleAutorChange(event){
        setAutor(event.target.value);
    }
    function handleContentChange(event){
        setContent(event);
    }

    useEffect(() => {
        const axiosPost = async () => {
            const response = await axios('https://api.victorbillaud.fr/faq');
            setData(response.data);
        }
       axiosPost();
    }, []);
    const value = useContext(AppContext);


    return(
        <div className={styles.faq}>
            <div className={styles.filter}>
                <button className={styles.newMessage} onClick={(e) => {
                    e.preventDefault();
                    setFormDevelop(!formDevelop);
                    console.log(formDevelop)
                }}>New message</button>
            </div>
            <div>
                <div className={formDevelop ? styles.formDevelop : styles.form}>
                    <div className={styles.header}>
                        <input value={object} onChange = {handleObjectChange} type={"text"} placeholder={"Object"} className={styles.question}/>
                        <input value={autor} onChange = {handleAutorChange} type={"text"} placeholder={"Autor"} className={styles.autor}/>
                        <button className={styles.sendMessage} onClick={(e) => {
                            e.preventDefault();
                            // addArticle({titre: this.state.title, contenu: this.state.content, date: this.state.date, categorie: this.state.cat, urlPhoto:namePhotos, urlFiles: nameFiles}).then(r =>console.log(r))
                            addQuestion({text : {subject: object, content: content }, autor : autor}).then((res)=>{
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

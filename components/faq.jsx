import styles from '../styles/Faq.module.css'
import React, {useContext, useEffect, useRef, useState} from 'react';

import 'react-awesome-slider/dist/styles.css';

import AppContext from "../src/context/state";

import BlockFaq from "./blockFaq";
import axios from "axios";
import {getPostsById} from "../lib/posts";

export default function Faq({questions}){

    const [data, setData] = useState([])

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
            <div className={styles.list}>
                {data !== [] ? data.map((question, index) => (
                    question.newSubject ? <BlockFaq key={index} data={question}/> : null
                )) : <i>Pas d'articles pour la recherche correspondante</i>}
            </div>
        </div>

    );

}

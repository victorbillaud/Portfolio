import styles from '../styles/Faq.module.css'
import React, {useContext, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Head from "next/head";
import Link from "next/link";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Rellax from "rellax";

import portraitWhite from '../assets/images/IMG_2855.png'
import portraitBlack from '../assets/images/LTA-black.png'
import AppContext from "../src/context/state";

import getAllPost from "../lib/posts"

export default function Faq({questions}){

    useEffect(() => {
        new Rellax(rellaxAnimate.current, { // <---- Via class name
            speed: 2,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
        });

        new Rellax(rellaxRef.current, { // <---- Via useRef element
            speed: 0,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
        });
    }, []);
    const rellaxRef = useRef();
    const rellaxAnimate = useRef();
    const value = useContext(AppContext);


    return(
        <div className={styles.faq}>
            {questions === [] ? questions.map((question, index) => (
                <div key={index} className={styles.questions}>
                    {question.question.content}
                </div>
            )) : <i>Pas d'articles pour la recherche correspondante</i>}
        </div>
    );

}

export async function getServerSideProps() {
    const questions = await getAllPost();
    return {
        props: {
            questions
        }
    }
}
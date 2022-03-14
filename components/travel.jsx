import styles from '../styles/Travel.module.css'
import React, {useContext, useEffect, useRef} from 'react';
import Image from 'next/image';
import Head from "next/head";
import Link from "next/link";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Rellax from "rellax";

import photosJungle from '../assets/images/IMG_0831.png'
import photosPonton from '../assets/images/DJI_0639.JPG'
import photosAmis from '../assets/images/15743BB0-1607-4447-AF7E-D2D32522B834.png'

import portraitBlack from '../assets/images/LTA-black.png'
import AppContext from "../src/context/state";


export default function Travel(){
    useEffect(() => {
        new Rellax(rellaxAnimate1.current, { // <---- Via class name
            speed: 3,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: true
        });
        new Rellax(rellaxAnimate2.current, { // <---- Via class name
            speed: 4,
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
    const rellaxAnimate1 = useRef();
    const rellaxAnimate2 = useRef();
    const value = useContext(AppContext);

    return(
        <div className={styles.myself}>
            <div className={styles.pictures}>
                <div className={styles.blockText} ref={rellaxRef}>
                    <h1 className={styles.textTopBlack} >lovers of adventure and travel</h1>
                </div>
                <div className={styles.blockImage1} ref={rellaxAnimate1}>
                    <Image
                        alt="Picture of the author"
                        src={value.state.theme === 'light' ? photosAmis  : photosJungle}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={styles.blockImage2} ref={rellaxAnimate2}>
                    <Image
                        alt="Picture of the author"
                        src={photosPonton}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
            <div className={styles.description}>
                <p className={styles.firstPara}>
                    I love to travel and discover new cultures around the world. During my engineering studies, I had the chance to spend 4 months in Malaysia.<br/><br/>
                </p>
                <p className={styles.secondPara}>
                    Working abroad, in a country that I love is a dream for me. I love to explore and challenge myself.                </p>
            </div>
        </div>
    );

}
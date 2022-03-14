import styles from '../styles/Myself.module.css'
import React, {useContext, useEffect, useRef} from 'react';
import Image from 'next/image';
import Head from "next/head";
import Link from "next/link";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Rellax from "rellax";

import portraitWhite from '../assets/images/IMG_2855.png'
import portraitBlack from '../assets/images/LTA-black.png'
import AppContext from "../src/context/state";

export default function Myself(){


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
            <div className={styles.myself}>
                <div className={styles.pictures}>
                            <div className={styles.blockText} ref={rellaxRef}>
                                <h1 className={styles.textTopBlack} >Let's talk</h1>
                                <h1 className={styles.textBottomBlack}>about myself</h1>
                            </div>
                        <div className={styles.blockImage} ref={rellaxAnimate}>
                            <Image
                                alt="Picture of the author"
                                src={ value.state.theme === 'light' ? portraitWhite : portraitWhite}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                </div>
                <div className={styles.description}>
                    <p>
                        I am a student in engineering school at Efrei Paris, after my IUT in Electrical Engineering and Industrial Computing, I have chosen to follow an engineering course in order to best meet my professional ambitions.<br/><br/>
                        Personally I am jovial by nature, I like to bring a good atmosphere in a team, I also like to develop a relationship of trust with my work partners.<br/><br/>
                        In my free time I like to play sports, attend cultural events, watch series, documentaries and conferences in the field of technological innovation.
                    </p>
                </div>
            </div>
        );

}
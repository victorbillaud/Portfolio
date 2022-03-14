import styles from '../styles/Studies.module.css'
import React, {useContext, useEffect, useRef} from 'react';
import Image from 'next/image';
import Head from "next/head";
import Link from "next/link";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Rellax from "rellax";

import photosJungle from '../assets/images/IMG_0831.png'
import photosSite from '../assets/images/Screenshot 2022-03-12 at 18.29.27.png'
import logoGD from '../assets/images/LogoLGD2016-page-001.png'
import AppContext from "../src/context/state";


export default function Studies(){
    useEffect(() => {
        new Rellax(rellaxAnimate1.current, { // <---- Via class name
            speed: 0,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
        });
        new Rellax(rellaxAnimate2.current, { // <---- Via class name
            speed: 1,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
        });
        new Rellax(rellaxAnimate3.current, { // <---- Via class name
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
    const rellaxAnimate1 = useRef();
    const rellaxAnimate2 = useRef();
    const rellaxAnimate3 = useRef();

    const value = useContext(AppContext);

    return(
        <div className={styles.myself}>
            <div className={styles.pictures}>
                <div className={styles.blockText} ref={rellaxRef}>
                    <h1 className={styles.textTopBlack}>Work Experience</h1>
                </div>
                <div className={styles.images}>
                    <div className={styles.blockFlex}>
                        <div className={styles.description}>
                        </div>
                        <div className={styles.blockImage1} ref={rellaxAnimate1}>
                            <Image
                                alt="Picture of the author"
                                src={photosSite}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.description}>
                            <p>During my last year of IUT I had the opportunity to realize an internship in a robotics company.</p>
                        </div>
                        <div className={styles.description}>
                            <p>The objective was to realize a HMI able to intercommunicate with all the robots of the workshop</p>
                        </div>
                    </div>
                    <div className={styles.blockFlex}>
                        <div className={styles.description}>
                            <p>Tree climbing operator</p>
                        </div>
                        <div className={styles.blockImage} ref={rellaxAnimate2}>
                            <Image
                                alt="Picture of the author"
                                src={logoGD}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

/*
<div className={styles.blockFlex}>
                        <div className={styles.blockImage3} ref={rellaxAnimate3}>
                            <Image
                                alt="Picture of the author"
                                src={photosJungle}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles.description}>
                            <p>FLEX</p>
                        </div>
                    </div>
 */
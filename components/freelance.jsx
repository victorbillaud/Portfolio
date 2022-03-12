import styles from '../styles/Freelance.module.css'
import React, {useContext, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Head from "next/head";
import Link from "next/link";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Rellax from "rellax";

import LigueFFME1 from '../assets/images/Screenshot 2022-03-12 at 13.43.47.png'
import LigueFFME2 from '../assets/images/Screenshot 2022-03-12 at 13.43.19.png'

import AppContext from "../src/context/state";


export default function Freelance(){
    const [ pictures, setPictures ] = useState(0);

    useEffect(() => {
        let scrollDelta;
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
            speed: 1,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
        });

        /*
        window.addEventListener("scroll", ()=> {
            if(window.pageYOffset >= window.innerHeight*1.9){
                console.log(scrollDelta)
                //document.getElementById('freelance').scrollBy({ top: 0, left:  scrollDelta*30, behavior: 'smooth' })
                document.getElementById('freelance').scrollLeft -= (-scrollDelta*2);
            }
        });

        window.addEventListener("wheel", (e)=> {
            scrollDelta = e.deltaY;
        });

        */

        document.getElementById('pictures').addEventListener('click', (event)=> {
            pictures === 0 ? setPictures(1) : setPictures(0)
            console.log("click", pictures)
        });
    }, []);
    const rellaxRef = useRef();
    const rellaxAnimate1 = useRef();
    const rellaxAnimate2 = useRef();
    const value = useContext(AppContext);

    return(
        <div className={styles.freelance} id={'freelance'}>
            <div className={styles.firstpage}>
                <div className={styles.description}>
                    <p>
                        I have been working as a freelancer for a few months in parallel to my studies. <br/>This work allows me to acquire many skills in my free time.                </p>
                </div>
                <div className={styles.pictures} >
                    <div className={styles.blockText} ref={rellaxRef}>
                        <h1 className={styles.textTopBlack} >Work in Freelance</h1>
                    </div>
                    <div className={styles.blockImage1} ref={rellaxAnimate1} >
                        <Image
                            alt="Picture of the author"
                            src={pictures === 0 ? LigueFFME2 : LigueFFME1}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className={styles.blockImage2} ref={rellaxAnimate2} id={"pictures"}>
                        <Image
                            alt="Picture of the author"
                            src={pictures === 0 ? LigueFFME1 : LigueFFME2}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className={styles.blockText2} ref={rellaxRef}>
                        <p>Website of <i><a href={'https://ffme-paysdelaloire.fr/'} target={'_blank'}>FFME Pays de la loire</a></i></p>
                    </div>
                </div>
            </div>
        </div>

    );

}
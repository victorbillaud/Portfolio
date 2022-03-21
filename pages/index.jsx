import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import AppContext from "../src/context/state";
import Myself from "../components/myself";
import Freelance from "../components/freelance";
import Travel from "../components/travel";
import Studies from "../components/studies";
import Faq from "../components/faq";
import {getAllPost} from "../lib/posts";


export default function Home({questions}) {
    const value = useContext(AppContext);
    const [scroll, setScroll] = useState(0);
    const stickyRef = useRef();

    useEffect(() => {
        window.addEventListener("scroll", ()=> {
            if(window.pageYOffset > 0){
                //document.getElementById("stickyRef").style.textAlign = 'right';
                if(window.pageYOffset<(((window.innerWidth-(document.getElementById('name').offsetWidth))/window.innerWidth)*95)*2){
                    document.getElementById("stickyRef").style.transform = 'translateX('+window.pageYOffset/2+'vw)'
                }else{
                    document.getElementById("stickyRef").style.transform = 'translateX('+(((window.innerWidth-document.getElementById('name').offsetWidth)/window.innerWidth)*95)+'vw)'
                }
            }else{
                //document.getElementById("stickyRef").style.textAlign = 'left';
                document.getElementById("stickyRef").style.transform = 'translateX(0vw)'
            }
        });
        document.getElementById("stickyRef").addEventListener('click', () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        });


    }, []);




  return (
    <div className={styles.container}>
      <Head>
        <title>Victor Billaud</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <html>
        <div className={styles.main}>
            <div className={styles.header} id={'stickyRef'}>
                <h1 className={styles.name} id={"name"}>Vict<span onClick={() => value.state.theme === 'light' ? value.setState('dark') : value.setState('light')  }>o</span>r</h1>
                <ul className={styles.items} id={"menu-items"}>
                    <li><h2><a onClick={() => {
                        window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' })
                    }}>Myself</a></h2></li>
                    <li><h2><a onClick={() => {
                        window.scrollBy({ top: window.innerHeight*2, left: 0, behavior: 'smooth' })
                    }}>Freelance</a></h2></li>
                    <li><h2><a onClick={() => {
                        window.scrollBy({ top: window.innerHeight*3, left: 0, behavior: 'smooth' })
                    }}>Travel</a></h2></li>
                    <li><h2><a onClick={() => {
                        window.scrollBy({ top: window.innerHeight*4, left: 0, behavior: 'smooth' })
                    }}>FAQ</a></h2></li>
                </ul>
            </div>
            <div className={styles.resume} id={"e"}>
                <h1>
                    Hello, World.<br/>
                    I'm Victor Billaud.<br/>
                    A french <span onClick={() => value.state.theme === 'light' ? value.setState('dark') : value.setState('light')  }><i>{value.state.theme === "light" ? "brilliant" : "dark"}</i></span> student in computer science.
                </h1>
            </div>
        </div>
        <div id={"myself"}></div>
        <Myself/>
        <Freelance />
        <Travel />
        <Faq />
        </html>
    </div>
  )
}

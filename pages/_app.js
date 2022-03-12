import '../styles/globals.css'
import Image from 'next/image';
import { useState, useEffect } from "react"
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themeConfig"
import AppContext from '../src/context/state'
import smoothscroll from 'smoothscroll-polyfill';



import iconLight from '../assets/icons/idea-svgrepo-com.svg'
import iconDark from '../assets/icons/idea-svgrepo-com-2.svg'


function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(() => {
          smoothscroll.polyfill();
     },[])

  //<Image src={theme == 'light' ? iconLight : iconDark} height={40} width={40} />

  return (
  <AppContext.Provider
        value={{
          state: {
            theme: theme,
          },
          setState: setTheme,
        }}
      >
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
          <GlobalStyles />
          <Component {...pageProps} />
    </ThemeProvider>
  </AppContext.Provider>
  )
}

export default MyApp

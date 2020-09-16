import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    html,body,#root{
        max-height:100vh;
        max-width:100vw;
        height:100%;
        width:100%;
        font-family:sans-serif;
    }
    *,button,input{
        background:none;
        border:none;
    }
    :root {
    --primary: #00C06B;
    --secondary: #15181C;
    --search: #202327;
    --white: #fff;
    --gray: #7A7A7A;
    --outline: #2F3336;
    --retweet: #f469a9;
    --like: #E8265E;
    --twitter: #33A1F2;
    --dark: #000;
    --twitter-light-hover: #2C8ED6;
    }
`
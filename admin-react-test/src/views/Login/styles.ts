import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    height:100vh;
    background:var(--primary);
    position: relative;
`;

export const LoginConent = styled.div`
    width:400px;
    height:400px;
    background:var(--white);
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    opacity:.9;
    border-radius:10px;
    text-align:center;
    padding:30px;
    >h1{
        text-shadow:.5;
        margin-bottom:30px;
    }
`
import React from 'react';
import { HeaderContainer, Logo } from './styles'

import Icone from '../../assets/img/caju.svg';

function Header(props) {
    return (
        <>
            <HeaderContainer>
                <Logo src={Icone} alt="Caju - Encurtador de URL"/>
                <h1>Caju</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>
    );
};

export default Header;
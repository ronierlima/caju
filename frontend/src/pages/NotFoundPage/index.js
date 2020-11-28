import React from 'react';

import { Container } from 'react-bootstrap';
import ImgFound from '../../assets/img/404.svg';
import {Found, ContentContainer} from './styles';

import vars from '../../configs/vars';
class NotFoundPage extends React.Component {
    
    constructor(props) {
        super(props);
    };
    
    render() {
        return (
            <Container className="d-flex justify-content-center align-items-center centro">

                 <ContentContainer> <h1>Página não encontrada! Voltar à <a href="/">Home</a>
                 {console.log(process.env)}
                 </h1>
                 <Found src={ImgFound} alt="Página não Encontrada"/></ContentContainer>
                
            </Container>
        );
    };
};

export default NotFoundPage;
import React from 'react';

//Componentes de estilo
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import Header from '../../components/Header';
import { ContentContainer, Form } from './styles';

import ShortenedService from '../../services/shortenerService'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMessage: ''
        };
    };


    handleSubmit = async (event) => {
        event.preventDefault();

        const { url } = this.state;
        
        this.setState({ isLoading: true, errorMessage: '' });

        if (!url) {
            this.setState({ isLoading: false, errorMessage: 'Informe uma url para encurtar.' });
        } else {
            try {
                const service = new ShortenedService();
                const result = await service.generate({ url });
                
                this.setState({ isLoading: false, code: result.code })
    
            } catch (error) {
                console.log(error);
                this.setState({ isLoading: false, errorMessage: 'Ops, aconteceu um erro ao tentar encurtar a url.' });
            }
        }
    };

    copyToClipboard = () => {
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');
    };


    render() {

        const { isLoading, errorMessage, code } = this.state;

        return (
            <Container>
                <Header>Seu novo Encurtador de URL. :)</Header>
                <ContentContainer>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Digite a url que deseja encurtar..." defaultValue="" onChange={e => this.setState({ url: e.target.value })} />
                            <InputGroup.Append>
                                <Button id="encurtar" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {isLoading ? ( <Spinner animation="border" /> ) : 
                        
                            (
                                code && (
                                    <>
                                        <InputGroup className="mb-3">
                                            <FormControl autoFocus={true} defaultValue={`https://pitu.tk/${code}`} ref={(input) => this.inputURL = input} />
                                            <InputGroup.Append>
                                                <Button className="pl-2" variant="outline-secondary" onClick={() => this.copyToClipboard()}><FontAwesomeIcon icon="copy"/> Copiar</Button>
                                            </InputGroup.Append>
                                        </InputGroup>

                                        <p>Para acompanhar as estatíscas, acesse <a>https://pitu.tk/{code}</a> </p>
                                    </>
                                )
                                    
                            )
                        }
                        

                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    </Form  >
                </ContentContainer>
            </Container>
        );
    };
};

export default HomePage;    
import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StatsContainer} from './styles';
import Header from '../../components/Header';
import ShortenedService from '../../services/shortenerService'

class RedirectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMessage: ''
        };
    };

    async componentDidMount() {
        const { code } = this.props.match.params;

        try {
            const service = new ShortenedService();

            const { url } = await service.getLink(code);
            window.location = url;
        } catch (error) {
            this.setState({ isLoading: false, errorMessage: 'Ops, essa url aí não existe!' });
        }
    };

    render() {

        const { errorMessage } = this.state;
        return (

            <Container>
                <Header>Seu encurtador de links</Header>
                {errorMessage ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f0b9b0" icon="exclamation-triangle" />
                        <p className="m-3">{errorMessage}</p>
                        <a id="encurtar" className="btn btn-primary" href="/">Encurtar uma nova URL</a>
                    </StatsContainer>
                ) : (
                        <StatsContainer className="text-center">
                            <Spinner animation="border" />
                            <p className="text-center">Redirecionando ...</p>
                        </StatsContainer>                                                                                                                                                                                                                                                                                                                                                                                                   

        )
    }
            </Container>

        )
    }

};

export default RedirectPage;
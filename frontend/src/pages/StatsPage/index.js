import React from 'react';

import vars from '../../configs/vars';

import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StatsBox, StatsBoxTitle, StatsContainer, StatsRow } from './styles'
import ShortenedService from '../../services/shortenerService';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


class StatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            shortenedURL: {},
            errorMessage: ''
        };
    };

    async componentDidMount() {
        const { code } = this.props.match.params;

        try {
            const service = new ShortenedService();
            const shortenedURL = await service.getStats(code);

            const parsedDate = parseISO(shortenedURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale: ptBR,
            });

            shortenedURL.relativeDate = relativeDate

            this.setState({ isLoading: false, shortenedURL });

        } catch (error) {
            this.setState({ isLoading: false, errorMessage: 'Ops, essa url aí ta toda torta!' });
        }
    };

    render() {
        const { errorMessage, shortenedURL } = this.state;

        return (
            <Container>
                <Header>
                    Estatísticas:
               </Header>
                {errorMessage ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f0b9b0" icon="exclamation-triangle" />
                        <p className="m-3">{errorMessage}</p>
                        <a id="encurtar" className="btn btn-primary" href="/">Encurtar uma nova URL</a>
                    </StatsContainer>
                ) : (
                        <StatsContainer className="text-center">
                            <p><b>{vars.HOST_APP + shortenedURL.code}</b></p>
                            <p>Vai te levar para:<br /><a href={shortenedURL.url}>{shortenedURL.url}</a></p>

                            <StatsRow>


                                {shortenedURL.hits !== 0 ? (
                                    <>
                                        <StatsBox>
                                            <StatsBoxTitle>Visitas</StatsBoxTitle>
                                            <b>{shortenedURL.hits}</b>

                                        </StatsBox>
                                        <StatsBox>
                                            <StatsBoxTitle>Última Visita</StatsBoxTitle>
                                            <b>{shortenedURL.relativeDate}</b>
                                        </StatsBox>
                                    </>

                                ) : (
                                        <>
                                            <StatsBox>
                                                <StatsBoxTitle><b>Ainda não foi visitado</b></StatsBoxTitle>
                                                <FontAwesomeIcon size="3x" color="#FF826E" icon="frown" />
                                            </StatsBox>

                                        </>
                                    )}

                            </StatsRow>
                            <a id="encurtar" className="btn btn-primary" href="/">Encurtar uma nova URL</a>
                        </StatsContainer>
                    )}
            </Container>
        );
    };
};

export default StatsPage;
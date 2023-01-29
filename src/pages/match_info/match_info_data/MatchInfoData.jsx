import React from "react";

const MatchInfoData = ({matchData, matchStatus, data}) => {

    const getMatchStartedStatus = (matchData) => {
        return <div className="match-info__not-started">
            <span className="result"> - </span>
            <p>{data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}</p>
            <p className="not-started__p">The match will start: <br/> {matchData.start_time.slice(0, 10)},<br/> at {matchData.start_time.slice(11, 16)} </p>
            <p>{matchData.sport_event_context.competition.name}, round {matchData.sport_event_context.round.number}</p>
        </div>;
    }

    const getEndedMatchStatus = (matchStatus, matchData) => {
        return  <div className="match-info__result">
            <span className="result">{matchStatus.home_score} - {matchStatus.away_score}</span>
            <p>{data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}</p>
            <p>{matchData.start_time.slice(0, 10)}</p>
            <p>{matchData.sport_event_context.competition.name}, round {matchData.sport_event_context.round.number}</p>
        </div>;
    }

    const getPostponedMatchStatus = (matchStatus, matchData) => {
        return <div className="match-info__postponed">
            Match {matchStatus.status}
            <span className="result"> - </span>
            <p>{data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}</p>
            <p style={{textDecoration: 'line-through', textDecorationThickness: '.2rem'}}>{matchData.start_time.slice(0, 10)}</p>
            <p>{matchData.sport_event_context.competition.name}, round {matchData.sport_event_context.round.number}</p>
        </div>;
    }

    const getCancelledMatchStatus = (matchStatus, matchData) => {
        return <div className="match-info__cancelled">
            Match {matchStatus.status}
            <span className="result"> - </span>
            <p>{data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}</p>
            <p style={{textDecoration: 'line-through', textDecorationThickness: '.2rem'}}>{matchData.start_time.slice(0, 10)}</p>
            <p>{matchData.sport_event_context.competition.name}, round {matchData.sport_event_context.round.number}</p>
        </div>;
    }

    return ( 
        <div className="data-wrapper">
            <div className='home'>
                <span>{matchData.competitors[0].name}</span>
                <p>(Home)</p>
            </div>
            {matchStatus.status === 'not_started' ? getMatchStartedStatus(matchData)
                :
                <>
                    {matchStatus.status === 'postponed' ? getPostponedMatchStatus(matchStatus, matchData)
                        :
                        matchStatus.status === 'cancelled' ? getCancelledMatchStatus(matchStatus, matchData)
                            :
                            getEndedMatchStatus(matchStatus, matchData)
                    }
                </>
            }
            <div className="away">
                <span>{matchData.competitors[1].name}</span>
                <p>(Away)</p>
            </div>
        </div>
     );
}
 
export default MatchInfoData;
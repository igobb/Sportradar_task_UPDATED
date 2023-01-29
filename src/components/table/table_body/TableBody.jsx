import React from "react";

const TableBody = ({dataSchedule, handleGoToSubpage, getResult}) => {

    const colorForEachTeam = (homeScore, awayScore) => {
        if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore)) return 0;
        if (homeScore > awayScore) return { homeTeamColor: "#367E18", awayTeamColor: "#CF0A0A" };
        if (homeScore < awayScore) return { homeTeamColor: "#CF0A0A", awayTeamColor: "#367E18" };
        if (homeScore === awayScore) return { homeTeamColor: "#EB5E0B", awayTeamColor: "#EB5E0B" };
        return 0;
    }

    return ( 
        <tbody className='table-container__tbody'>
        {dataSchedule.map((data) => {
            return (
                <tr key={data.sport_event.id}
                    onClick={() => handleGoToSubpage(data)}
                >
                    <td>
                        {data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}
                    </td>
                    <td style={{backgroundColor: colorForEachTeam(data.sport_event_status.home_score, data.sport_event_status.away_score).homeTeamColor, fontWeight: '600'}}>
                        {data.sport_event.competitors[0].name}
                    </td>
                    <td style={{backgroundColor: colorForEachTeam(data.sport_event_status.home_score, data.sport_event_status.away_score).awayTeamColor, fontWeight: '600'}}>
                        {data.sport_event.competitors[1].name}
                    </td>
                    <td style={{textAlign: 'center', fontWeight: '600'}}>
                        {getResult(data.sport_event_status)}
                    </td>
                    {data.sport_event_status.period_scores ? (
                        <td style={{textAlign: 'center'}}>
                            {data.sport_event_status.period_scores[0].home_score} - {data.sport_event_status.period_scores[1].away_score}
                        </td>
                    ): (
                        <td style={{textAlign: 'center'}}>-</td>
                    )
                    }
                    <td>
                        {data.sport_event.start_time.slice(0, 10)}, at {data.sport_event.start_time.slice(11, 16)}
                    </td>
                </tr>
            );
        })}
        </tbody>
     );
}
 
export default TableBody;
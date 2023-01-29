import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";
import './MatchInfo.scss'
import Error from '../../components/error/Error';
import MatchInfoData from "./match_info_data/MatchInfoData";
import MatchInfoTimeline from "./match_info_timeline/MatchInfoTimeline";

const MatchInfo = () => {
    const [matchData, setMatchData] = useState(null);
    const [matchStatus, setMatchStatus] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorData, setErrorData] = useState(null);
    const location = useLocation();
    const data = location.state?.data;
    const id = data.sport_event.id

    const apiMatchInfo = `https://api.sportradar.us/soccer/trial/v4/en/sport_events/${id}/timeline.json?api_key=cwy2c5a7sxaeyjspgucjtkgz`;

    useEffect(() => {
        axios
            .get(apiMatchInfo)
            .then((res) => {
                setMatchData(res.data.sport_event);
                setMatchStatus(res.data.sport_event_status)
                setTimeline(res.data.timeline)
                setLoading(false)
            })
            .catch((error) => {
                setErrorData(error)
                if(error.request.status < 600 && error.request.status > 399) {
                    console.log(`${error.message}, error code: ${error.code}`);
                } else {
                    console.log(error)
                }
            });
    }, []);

    return (
        <>
            {loading ? <h1>Loading...</h1> : <>
                {matchData ?
                    <>
                        <div className='match-info__container'>
                            <div className='match-info__link-wrapper'>
                                <Link className="match-info__link" to="/Sportradar_task"><button className='match-info__link-button'>Return to home page</button></Link>
                            </div>
                            <div className="match-info__data">
                                <MatchInfoData 
                                    matchData={matchData} 
                                    matchStatus={matchStatus}
                                    data={data} 
                                />
                                {matchStatus.status === 'closed' &&
                                    <MatchInfoTimeline timeline={timeline}/>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <Error errorData={errorData}></Error>
                }
            </>
            }
        </>
    );
};

export default MatchInfo;
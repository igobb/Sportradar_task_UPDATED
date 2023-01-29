import axios from "axios";
import {React, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import './Table.css'

import Table from 'react-bootstrap/Table';
import TableDropdown from "./table_dropdown/TableDropdown";
import Error from '../error/Error';
import TableHead from "./table_head/TableHead";
import TableBody from "./table_body/TableBody";

export default function TableWithData() {
    const [dataSchedule, setDataSchedule] = useState(null);
    const [dataSeasons, setDataSeasons] = useState(null);
    const [whichSeason, setWhichSeason] = useState('sr:season:77453')
    const [refreshData, setRefreshData] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errorData, setErrorData] = useState()

    const apiSeasonSchedule = `https://api.sportradar.us/soccer/trial/v4/en/seasons/${whichSeason}/schedules.json?api_key=cwy2c5a7sxaeyjspgucjtkgz`;

    const apiCompetitionSeasons = "https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=cwy2c5a7sxaeyjspgucjtkgz";

    useEffect(() => {
        axios
            .get(apiSeasonSchedule)
            .then((res) => {
                setDataSchedule(res.data.schedules);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setErrorData(error)
                if(error.request.status < 600 && error.request.status > 399) {
                    console.log(`${error.message}, error code: ${error.code}`);
                } else {
                    console.log(error)
                }
            });
    }, [refreshData]);

    useEffect(() => {
        axios
            .get(apiCompetitionSeasons)
            .then((res) => {
                setDataSeasons(res.data.seasons);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false);
                setErrorData(error)
                if(error.request.status < 600 && error.request.status > 399) {
                    console.log(`${error.message}, error code: ${error.code}`);
                } else {
                    console.log(error)
                }
            });
    }, [refreshData]);

    const handleGoToSubpage = (data) => {
        navigate(`/MatchInfo/`, {
            state: {
                data
            },
        });
    }

    const getResult = (sportEventStatus) => {
        const status = sportEventStatus.status;
        if (status === "not_started") return 'Not started yet!';
        if (status === "postponed") return 'Postponed';
        if (status === "cancelled") return 'Canceled';
        return `${sportEventStatus.home_score} - ${sportEventStatus.away_score}`;
    }

    return (
        <>
        {loading ? <h1>Loading...</h1> :
            <>
                { (dataSchedule) && (dataSeasons) ? <>
                    <div className="table-container">
                        <TableDropdown dataSeasons={dataSeasons} whichSeason={whichSeason} setWhichSeason={setWhichSeason} refreshData={refreshData} setRefreshData={setRefreshData} />
                        <h1>Selected season: {whichSeason === 'sr:season:77453' ? '2020/2021' : whichSeason === 'sr:season:84320' ? '2021/2022' : '2022/2023'}</h1>
                        <div className='table-container__wrapper'>
                            <Table hover responsive variant='dark' className="table-container__data">
                                <TableHead />
                                <TableBody dataSchedule={dataSchedule} handleGoToSubpage={handleGoToSubpage} getResult={getResult} />
                            </Table>
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
}
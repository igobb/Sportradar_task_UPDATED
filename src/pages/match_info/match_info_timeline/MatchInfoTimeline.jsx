import React from "react";
import Table from 'react-bootstrap/Table';

const MatchInfoTimeline = ({timeline}) => {
    return (
        <>
            <div className="match-info__timeline">
                <h2>Match minute by minute</h2>
                <div className="match-info__timeline-table">
                    <Table striped bordered hover variant='dark' className="match-info__table">
                        <thead>
                        <tr>
                            <th>Minute</th>
                            <th>Event</th>
                        </tr>
                        </thead>
                        <tbody>
                        {timeline.map((event) => {
                            return (
                                <tr key={event.id}>
                                    <td>{event.match_time ? event.match_time + '\'' : event.time.slice(11, 16)}</td>
                                    <td>{event.type[0].toUpperCase() + event.type.replace(/_/g, ' ').substring(1)}</td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
        
     );
}
 
export default MatchInfoTimeline;
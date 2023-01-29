import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const TableDropdown = ({dataSeasons, whichSeason, setWhichSeason, setRefreshData, refreshData}) => {
    return ( 
        <Dropdown className="table-container__dropdown">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Seasons
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dataSeasons.map((item) => {
                    return (
                        <Dropdown.Item
                            onClick={() => {whichSeason && setWhichSeason(item.id);
                                setRefreshData(!refreshData)}}
                            key={item.id}
                        >
                            {item.name}
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
     );
}
 
export default TableDropdown;
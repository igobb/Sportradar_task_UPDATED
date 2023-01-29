import React from "react";

const TableHead = () => {
    return ( 
        <thead style={{position: "sticky", top: '0'}}>
            <tr>
                <th>Stadium name</th>
                <th colSpan={2}>
                    <div className="justify-content-between d-flex">
                        <span>Team Home</span>
                        <span>vs</span>
                        <span>Team Away</span>
                    </div>
                </th>
                <th>Result</th>
                <th>Half time</th>
                <th>Match date</th>
            </tr>
        </thead>
     );
}

export default TableHead;
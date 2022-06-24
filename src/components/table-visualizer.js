// src/components/basic.table.js
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { getTables, getTableData} from '../services/table.service';


function TableVisualizer() {

    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(false);

    function updateSelectedTable(event){
        console.log(event.target.value);
        setLoading(true);
        setSelectedTable(event.target.value);
    }

    useEffect(()=>{
        if(!selectedTable) return;
        getTableData(selectedTable)
        .then(data=>{
            setLoading(false);
            if(data && data.length){
                setTableData(data);
                let cols = Object.keys(data[0]);
                setColumns(cols);
            }
        });
    },[selectedTable])

    useEffect(()=>{
        setLoading(true);
        async function callGetTables(){
            let tables = await getTables();
            setTables(tables);
            if(tables.length){
                setSelectedTable(tables[0]);
            }
        }
        callGetTables();
    },[]);

    return (
        <div>
            <select value={selectedTable} className="form-select" onChange={updateSelectedTable}>
                <option value={null}>--select table--</option>
                {tables.map((table, i) => {
                    return <option key={i} value={table}>{table}</option>
                })}
            </select>

            {loading && <div class="spinner-border text-danger" role="status"></div>}

            {!loading && <table className="table">
                <thead>
                    <tr>{columns.map( (column, i) => {
                        return <td key={i+'header'}>{column}</td>
                    })}</tr>
                </thead>
                <tbody>
                    {tableData.map((row, i) =>{
                        return <tr key={i+'row'}>
                            {columns.map(column=>{
                                return <td key={i+'cell'}>{row[column]}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>}
        </div>
    )
}

export default TableVisualizer;

// const base = window.location.protocol +"//"+ window.location.hostname + ":4000";

export async function getTables(){

    const response = await fetch("/api/tables",{
        method: "GET"
    });
    const tables = await response.json();
    console.log(tables);
    return tables;
}

export async function getTableData(tableName){

    const response = await fetch("/api/tables/" + tableName + "/data",{
        method: "GET"
    });
    const tableData = await response.json();
    console.log(tableData);
    return tableData;
}
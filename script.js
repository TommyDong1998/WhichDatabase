//List databases
const databases={
    "Relational":[
        {name:"MYSQL"},
        {name:"Postgres"},
        {name:"Oracle"},
        {name:"Aurora"}
    ],
    "Graph":[
        {name:"Neptune"}
    ],
    "Key Value":[
        {name:"DynamoDB"}
    ],
    "Memory":[
        {name:"Memcached"},
        {name:"Redis"}
    ],
    "Document":[
        {name:"MongoDB"},
        {name:"DocumentDB"}
    ],
    "Time Series":[
        {name:"Timeseries"}
    ],
    "Ledger":[
        {name:"QLDB"}
    ]
};

let dbElement=document.querySelector('#databases');

// Create div with class
function createDiv(c){
    let d=document.createElement("div");
    d.setAttribute('class',c);
    return d;
}

//List all databases and add element property to the database
//Ex: database["Relational"][0].element would reference the html element
Object.keys(databases).forEach(dbtype => {
    let dbtypeElement=createDiv('dbtype')
    dbElement.appendChild(dbtypeElement);

    let category=createDiv('category')
    category.innerText=dbtype;
    dbtypeElement.appendChild(category);

    let list=createDiv('list');
    dbtypeElement.appendChild(list);

    databases[dbtype].forEach((db,idx)=>{
        let dbElement=createDiv('db');
        databases[dbtype][idx].element=dbElement;
        dbElement.innerText=db.name;
        list.appendChild(dbElement);
    })
});

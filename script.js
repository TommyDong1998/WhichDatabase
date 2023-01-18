//List databases
const databases = {
  Relational: {
    tooltip:"If you need to structure data as relationships or if ACID compliant is a must",
    list: [
      {
        name: "MYSQL",
        tags: [
          "relation",
          "consistent_immediate",
          "opensource",
          "commonusecase_login",
          "cost_free"
        ],
      },
      {
        name: "SQLite",
        tags: [
          "relation",
          "consistent_immediate",
          "opensource",
          "commonusecase_login",
          "filedatabase",
          "cost_free"
        ],
      },
      {
        name: "Postgres",
        tags: [
          "relation",
          "consistent_immediate",
          "unstructured",
          "opensource",
          "commonusecase_login",
          "cost_free"
        ],
      },
      {
        name: "Oracle",
        tags: [
          "relation",
          "consistent_immediate",
          "proprietary",
          "commonusecase_login",
          "cost_notfree"
        ],
      },
      {
        name: "Aurora",
        tags: [
          "relation",
          "consistent_immediate",
          "proprietary",
          "commonusecase_login",
          "cost_free"
        ],
      },
      {
        name: "IBM Db2",
        tags: [
          "relation",
          "consistent_immediate",
          "proprietary",
          "commonusecase_login",
          "cost_free"
        ],
      },
      {
        name: "Microsoft SQL",
        tags: [
          "relation",
          "consistent_immediate",
          "proprietary",
          "commonusecase_login",
          "cost_notfree"
        ],
      },
    ],
  },
  Graph: {
    tooltip:"Use graph models to represent relationships",
    list: [
      {
        name: "Neptune",
        tags: ["graph", "proprietary", "commonusecase_visualize","cost_free"],
      },
      {
        name: "Neo4J",
        tags: ["graph", "opensource", "commonusecase_visualize","cost_free"],
      },
    ],
  },
  "Key Value": {
    tooltip:"When you need a collection of key-value pairs",
    list: [
      {
        name: "DynamoDB",
        tags: [
          "keyvalue",
          "consistent_immediate",
          "proprietary",
          "horizontal_scaling",
          "commonusecase_login",
          "cost_free"
        ],
      },
      {
        name: "CosmosDB",
        tags: [
          "document",
          "keyvalue",
          "unstructured",
          "proprietary",
          "commonusecase_login",
          "consistent_immediate",
          "cost_free"
        ],
      },
    ],
  },
  Memory: {
    tooltip:"Key-value pair database stored in memory for extremely fast access",
    list: [
      { name: "Memcached", tags: ["memory", "opensource","cost_free"] },
      { name: "Redis", tags: ["memory", "opensource","cost_free"] },
    ],
  },
  Document: {
    "tooltip":"Store data in JSON-like documents",
    list: [
      {
        name: "MongoDB",
        tags: [
          "document",
          "opensource",
          "unstructured",
          "horizontal_scaling",
          "commonusecase_login",
          "consistent_immediate",
          "cost_free"
        ],
      },
      {
        name: "DocumentDB",
        tags: [
          "document",
          "proprietary",
          "unstructured",
          "commonusecase_login",
          "consistent_immediate",
          "cost_free"
        ],
      },
      {
        name: "CosmosDB",
        tags: [
          "document",
          "keyvalue",
          "unstructured",
          "proprietary",
          "commonusecase_login",
          "consistent_immediate",
          "cost_free"
        ],
      },
    ],
  },
  "Time Series": {
    "tooltip":"Database optimized for time-stamped data.",
    list: [
      { name: "Timestream", tags: ["Timestream", "proprietary","cost_free"] },
      { name: "InfluxDB", tags: ["Timestream", "opensource", "cost_free"] },
    ],
  },
  Ledger: { 
    "tooltip":"Provides immutable, transparent, cryptographically verifiable logs for transactions.",
    list: [{ name: "QLDB", tags: ["ledger", "proprietary","cost_free"] }]
  },
};

const questions = {
  "Common use cases": [
    { name: "Any", tags: [] },
    { name: "Login/Register", tags: ["commonusecase_login"] },
    { name: "Visualize relationships", tags: ["commonusecase_visualize"] },
    { name: "Monetary transactions", tags: ["consistent_immediate"] },
    { name: "Caching applications", tags: ["memory"] },
    { name: "Lightweight file database", tags: ["filedatabase"] }
  ],
  "Database Type": [
    { name: "Any", tags: [] },
    { name: "Relation", tags: ["relation"] },
    { name: "Graph", tags: ["graph"] },
    { name: "Memory", tags: ["memory"] },
    { name: "Document", tags: ["document"] },
    { name: "Key Value", tags: ["keyvalue"] },
    { name: "Time Series", tags: ["timeseries"] },
    { name: "Ledger", tags: ["ledger"] },
  ],
  "Open Source": [
    { name: "Any", tags: [] },
    { name: "Yes", tags: ["opensource"] },
    { name: "Proprietary", tags: ["proprietary"] },
  ],
  "Cost": [
    { name: "Any", tags: [] },
    { name: "Free to start", tags: ["cost_free"] },
    { name: "Not free", tags: ["cost_notfree"] },
  ],
  Consistent: [
    { name: "Any", tags: [] },
    { name: "Immediate", tags: ["consistent_immediate"] },
  ],
  "Unstructured data": [
    { name: "Any", tags: [] },
    { name: "Yes", tags: ["unstructured"] },
  ],
  "Easy to horizontal scale": [
    { name: "Any", tags: [] },
    { name: "Yes", tags: ["horizontal_scaling"] },
  ]
};

let dbElement = document.querySelector("#databases");

// Create div with class
function createDiv(c) {
  let d = document.createElement("div");
  d.setAttribute("class", c);
  return d;
}

let filtersTags = [];

//List all databases and add element property to the database
//Ex: database["Relational"][0].element would reference the html element
function generateDatabaseOutput() {
  dbElement.innerHTML = "";
  Object.keys(databases).forEach((dbtype) => {
    let dbtypeElement = createDiv("dbtype");
    dbElement.appendChild(dbtypeElement);

    let category = createDiv("category");
    category.innerText = dbtype;

    dbtypeElement.appendChild(category);
    /*
    Create tooltip
    Uses Tippy.js
    */
    if (databases[dbtype].tooltip) {
      let q = document.createElement("div");
      q.innerText = " ?";
      q.id = "question_" + dbtype;
      category.appendChild(q);

      tippy("#question_" + dbtype, {
        content: databases[dbtype].tooltip,
      });
    }
    /*End of tooltip*/

    let list = createDiv("list");
    dbtypeElement.appendChild(list);

    databases[dbtype].list
      .filter((db) => {
        return filtersTags.every((v) => db.tags.includes(v.tag));
      })
      .forEach((db, idx) => {
        let dbElement = createDiv("db");
        databases[dbtype].list[idx].element = dbElement;
        dbElement.innerText = db.name;
        list.appendChild(dbElement);
      });
  });
}
generateDatabaseOutput();

let selectionElement = document.querySelector("#selection");
let questionID = 0;

function ToggleByQuestion(category, question) {
  //Remove all the tags with same category

  filtersTags = filtersTags.filter((filter) => {
    return filter.category != category;
  });
  //Add new tag
  question.tags.forEach((tag) =>
    filtersTags.push({ category: category, tag: tag })
  );
  generateDatabaseOutput();
}

//Generate questions
Object.keys(questions).forEach((category) => {
  let questionCategoryElement = createDiv("questionCategory");
  selectionElement.appendChild(questionCategoryElement);

  let categoryElement = createDiv("category");
  categoryElement.innerText = category;
  questionCategoryElement.appendChild(categoryElement);

  let list = createDiv("list");
  questionCategoryElement.appendChild(list);

  questions[category].forEach((question) => {
    let questionElement = createDiv("question");
    questionElement.innerHTML =
      "<input id='questionid" +
      questionID +
      "' type='radio' name='" +
      category +
      "'/>";

    questionElement.innerHTML +=
      "<label for='questionid" + questionID + "'>" + question.name + "</label>";
    questionID += 1;
    list.appendChild(questionElement);
    questionElement.querySelector("input").onclick = () => {
      ToggleByQuestion(category, question);
    };
  });
});

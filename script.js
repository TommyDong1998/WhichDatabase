//List databases
const databases = {
  Relational: [
    { name: "MYSQL", tags: ["relation", "consistent_immediate", "opensource","commonusecase_login"] },
    {
      name: "SQLite",
      tags: ["relation", "consistent_immediate", "opensource","commonusecase_login"],
    },
    {
      name: "Postgres",
      tags: ["relation", "consistent_immediate","unstructured", "opensource","commonusecase_login"],
    },
    {
      name: "Oracle",
      tags: ["relation", "consistent_immediate", "proprietary","commonusecase_login"],
    },
    {
      name: "Aurora",
      tags: ["relation", "consistent_immediate", "proprietary","commonusecase_login"],
    },
  ],
  Graph: [{ name: "Neptune", tags: ["graph", "proprietary","commonusecase_visualize"] }],
  "Key Value": [
    {
      name: "DynamoDB",
      tags: ["keyvalue", "consistent_immediate", "proprietary","horizontal_scaling","commonusecase_login"],
    },
  ],
  Memory: [
    { name: "Memcached", tags: ["memory", "opensource"] },
    { name: "Redis", tags: ["memory", "opensource"] },
  ],
  Document: [
    { name: "MongoDB", tags: ["document", "opensource", "unstructured", "horizontal_scaling","commonusecase_login","consistent_immediate"] },
    { name: "DocumentDB", tags: ["document", "proprietary","unstructured","commonusecase_login","consistent_immediate"] },
    { name: "CosmosDB", tags: ["document", "keyvalue","unstructured", "proprietary","commonusecase_login","consistent_immediate"] },
  ],
  "Time Series": [{ name: "Timeseries", tags: ["timeseries"] }],
  Ledger: [{ name: "QLDB", tags: ["ledger", "proprietary"] }],
};

const questions = {
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
  "Common use cases": [
    { name: "Any", tags: [] },
    { name: "Login/Register", tags: ["commonusecase_login"] },
    { name: "Visualize relationships", tags: ["commonusecase_visualize"] },
    { name: "Monetary transactions", tags: ["consistent_immediate"] },
  ],
  "Consistent": [
    { name: "Any", tags: [] },
    { name: "Immediate", tags: ["consistent_immediate"] },
  ],
  "Unstructured data": [
    { name: "Any", tags: [] },
    { name: "Yes", tags: ["unstructured"] },
  ],
  "Easy to horizontal scale": [
    { name: "Any", tags: [] },
    { name: "Yes", tags: ["horizontal_scaling"] }
  ],
  "Open Source": [
    { name: "Any", tags: [] },
    { name: "Yes", tags: ["opensource"] },
    { name: "Proprietary ", tags: ["proprietary"] },
  ],
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

    let list = createDiv("list");
    dbtypeElement.appendChild(list);

    databases[dbtype]
      .filter((db) => {
        return filtersTags.every((v) => db.tags.includes(v.tag));
      })
      .forEach((db, idx) => {
        let dbElement = createDiv("db");
        databases[dbtype][idx].element = dbElement;
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
    console.log(filter.category,  category)
    return filter.category != category;
  });
  console.log(filtersTags)
  //Add new tag
  question.tags.forEach((tag) =>
    filtersTags.push({ category: category, tag: tag })
  );
  console.log(category,filtersTags)
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

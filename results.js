async function resultsMain() {
  await buildResultsList();
  displayResults(results);
}

const results = [];

async function fetchResults() {
  const resp = await fetch("data/results.json");

  const data = await resp.json();
  return data;
}

async function buildResultsList() {
  const originalObjects = await fetchResults();

  for (const orgobj of originalObjects) {
    const resultsObj = constructResult(orgobj);
    results.push(resultsObj);
  }
}
async function displayResults(results) {
  //   const sortedResults = Array.from(results.values()).sort((a, b) => fromTimeToMillis(a.tid) - fromTimeToMillis(b.tid));
  const table = document.querySelector("#results tbody");
  table.innerHTML = "";

  for (const result of results) {
    const memberName = await result.getMemberName(); // Vent på, at promise bliver løst

    const html = /*html*/ `

      <td>${result.dato.toLocaleDateString("da")}</td>
      <td>${memberName}</td>
      <td>${result.translateDisciplin()}</td>
      <td>${result.resultType()}</td>
      <td>${result.time}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

function constructResult(resultdata) {
  const ResultObject = {
    dato: new Date(resultdata.date),
    id: resultdata.id,
    disciplin: resultdata.discipline,
    type: resultdata.resultType,
    time: resultdata.time,
    memberId: resultdata.memberId,
    isCompetition() {
      return this.type === "competition";
    },
    isTraining() {
      return this.type === "training";
    },
    translateDisciplin() {
      if (this.disciplin === "backstroke") {
        return "rygsvømning";
      } else if (this.disciplin === "freestyle") {
        return "fri";
      } else if (this.disciplin === "butterfly") {
        return "butterfly";
      } else if (this.disciplin === "breaststroke") {
        return "brystsvømning";
      }
    },

    resultType() {
      if (this.isCompetition()) {
        return "stævne";
      } else if (this.isTraining()) {
        return "træning";
      }
    },
    async getMemberName() {
      const resp = await fetch("data/members.json");
      const data = await resp.json();

      for (const member of data) {
        if (member.id === this.memberId) {
          return `${member.firstName} ${member.lastName}`;
        }
      }
      return "Ukendt";
    },
    render() {
      const table = document.querySelector("#members tbody");
      table.innerHTML = "";
      for (const member of members) {
        const formattedBirthday = member.birthday.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "numeric", day: "numeric" });

        const html = /*html*/ `
    <tr>
      <td>${member.getFulleName()}</td>
      <td>${member.active ? "Active" : "Not Active"}</td>
      <td>${formattedBirthday}</td>
      <td>${member.getAge()}</td>
      <td>${member.getJuniorSeniorStatus()}</td>
      <td>${member.email}</td>
    </tr>`;

        table.insertAdjacentHTML("beforeend", html);
      }
    },
  };

  Object.defineProperties(ResultObject, {
    id: {
      value: resultdata.id,
      writable: false,
    },
    isCompetition: {
      enumerable: false,
    },
    isTraining: {
      enumerable: false,
    },
    translateDisciplin: {
      enumerable: false,
    },
    fromTimeToMillis: {
      enumerable: false,
    },
    resultType: {
      enumerable: false,
    },
  });

  return ResultObject;
}

export { resultsMain };

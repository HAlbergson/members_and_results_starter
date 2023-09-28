async function membersMain() {
  await buildMembersList();
  displayMembers(members);
}

const members = [];

async function fetchMembers() {
  const resp = await fetch("./data/members.json");
  const data = await resp.json();
  return data;
}

async function buildMembersList() {
  const originalObjects = await fetchMembers();

  for (const orgobj of originalObjects) {
    const memberObj = constructMember(orgobj);
    members.push(memberObj);
  }
}

function displayMembers(members) {
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
}

function constructMember(memberdata) {
  const MemberObject = {
    name: memberdata.firstName,
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,
    id: memberdata.id,
    lastName: memberdata.lastName,
    getAge() {
      const today = new Date();
      const age = today.getFullYear() - this.birthday.getFullYear();
      return age;
    },
    isJunior() {
      const age = this.getAge();
      return age < 18;
    },
    isSenior() {
      const age = this.getAge();
      return age >= 18;
    },
    getJuniorSeniorStatus() {
      const age = this.getAge();
      if (age < 18) {
        return "junior";
      } else if (age >= 18) {
        return "senior";
      }
    },
    getFulleName() {
      const fullName = `${this.name} ${this.lastName}`;
      return fullName;
    },
  };

  Object.defineProperties(MemberObject, {
    id: {
      value: memberdata.id,
      writable: false,
    },
    name: {
      enumerable: false,
    },
    image: {
      enumerable: false,
    },
  });
  return MemberObject;
}

export { membersMain };

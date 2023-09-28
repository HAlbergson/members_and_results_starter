function construct() {
  const memberRenderer = {
    render(member) {
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

      document.querySelector("#members tbody").insertAdjacentHTML("beforeend", html);
    },
  };
  return memberRenderer;
}

export { construct };

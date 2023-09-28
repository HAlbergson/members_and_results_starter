function construct(list, container, itemRenderer) {
  const listRenderer = {
    render() {
      const table = document.querySelector("#members tbody");
      table.innerHTML = "";
      for (const member of list) {
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
  return listRenderer;
}

export { construct };

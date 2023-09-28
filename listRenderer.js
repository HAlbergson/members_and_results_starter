import * as memberRenderer from "./memberRenderer.js";
const memberHTML = memberRenderer.construct(members);
function construct(list, container, itemRenderer) {
  const listRenderer = {
    render() {
      document.querySelector("#members tbody").innerHTML = "";
      for (const member of list) {
        memberHTML.render(member);
      }
    },
  };
  return listRenderer;
}

export { construct };

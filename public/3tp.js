(() => {
  "use strict";

  let sendRequest = ({ method, url, body, targetElement, pushUrl }) =>
    fetch(url, { method, body })
      .then((res) => (res.ok ? res.text() : Promise.reject("Network error")))
      .then((html) => targetElement && (targetElement.outerHTML = html))
      .then(() => {
        if (pushUrl === null) return;

        let pushedUrl = pushUrl == "" ? url : pushUrl;
        history.replaceState({ url: location.href }, "", location.href);
        history.pushState({ url: pushedUrl }, "", pushedUrl);
      })
      .catch((err) => console.error(err));

  let submitForm = (form) => {
    let method = (form.getAttribute("method") || "GET").toUpperCase();
    let url = form.getAttribute("action") || location.href;
    let targetElement = document.getElementById(form.getAttribute("target"));
    let data = new FormData();

    form
      .querySelectorAll("input[name], select[name], textarea[name]")
      .forEach((el) => {
        if (!(el.type.match(/checkbox|radio/) && !el.checked))
          data.append(el.name, el.value);
      });

    sendRequest({
      method,
      url: method === "GET" ? `${url}?${new URLSearchParams(data)}` : url,
      body: method === "GET" ? null : data,
      targetElement,
      pushUrl: form.getAttribute("push-url"),
    });
  };

  document.addEventListener("click", (e) => {
    let elt = e.target;
    if (!elt || e.type !== "click") return;

    if (elt.tagName === "X-BUTTON") {
      let form = elt.closest("x-form");

      if (form) {
        if (
          !Array.from(form.querySelectorAll(":invalid")).some(
            (el) => !el.reportValidity()
          )
        ) {
          submitForm(form);
        }

        return;
      }

      let url = elt.getAttribute("action");
      if (!url) return;

      sendRequest({
        method: (elt.getAttribute("method") || "GET").toUpperCase(),
        url,
        targetElement: document.getElementById(elt.getAttribute("target")),
        pushUrl: elt.getAttribute("push-url"),
      });

      return;
    }

    if (elt.tagName === "X-A") {
      let url = elt.getAttribute("href") || elt.getAttribute("action");
      if (!url) return;
      sendRequest({
        method: (elt.getAttribute("method") || "GET").toUpperCase(),
        url,
        targetElement: document.getElementById(elt.getAttribute("target")),
        pushUrl: elt.getAttribute("push-url"),
      });
    }
  });

  ["x-form", "x-button", "x-a"].forEach((tag) => {
    customElements.define(tag, class extends HTMLElement {});
  });

  window.addEventListener("popstate", async ({ state }) => {
    if (!state) return;
    document.documentElement.innerHTML = await (await fetch(state.url)).text();
  });
})();

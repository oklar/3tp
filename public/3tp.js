(() => {
  "use strict";

  const sendRequest = ({ method, url, body, targetElement, pushUrl }) =>
    fetch(url, { method, body })
      .then((res) => (res.ok ? res.text() : Promise.reject("Network error")))
      .then((html) => targetElement && (targetElement.outerHTML = html))
      .then(() => {
        if (pushUrl) {
          const pushedUrl = pushUrl == "" ? url : pushUrl;
          history.replaceState({ url: location.href }, "", location.href);
          history.pushState({ url: pushedUrl }, "", pushedUrl);
        }
      })
      .catch((err) => console.error(err));

  const submitForm = (form) => {
    const method = (form.getAttribute("method") || "GET").toUpperCase();
    const url = form.getAttribute("action") || location.href;
    const targetElement = document.getElementById(form.getAttribute("target"));
    const data = new FormData();

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
    const el = e.target;
    if (!el || e.type !== "click") return;

    if (el.tagName === "X-BUTTON" || el.tagName === "BUTTON") {
      const form = el.closest("X-FORM");

      if (
        form &&
        !Array.from(form.querySelectorAll(":invalid")).some(
          (el) => !el.reportValidity()
        )
      ) {
        submitForm(form);
      }

      return;
    }

    if (el.tagName === "X-A") {
      const url = el.getAttribute("href") || el.getAttribute("action");
      if (!url) return;
      sendRequest({
        method: (el.getAttribute("method") || "GET").toUpperCase(),
        url,
        targetElement: document.getElementById(el.getAttribute("target")),
        pushUrl: el.getAttribute("push-url"),
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

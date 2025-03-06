/**
 * @jest-environment jsdom
 */

global.Response = class Response {
  constructor(body) {
    this.body = body;
    this.ok = true;
  }
  text() {
    return Promise.resolve(this.body);
  }
};
global.fetch = jest.fn();

require("../public/3tp.js");

describe("3TP Web Components", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    global.fetch.mockReset();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  const triggerClick = (element) => {
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    element.dispatchEvent(event);
  };

  const waitForPromises = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  describe("x-form", () => {
    test("should register as a custom element", () => {
      expect(customElements.get("x-form")).toBeDefined();
    });

    test("should handle PUT requests", async () => {
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve(new Response("<div>Success</div>"))
      );

      container.innerHTML = `
        <x-form method="PUT" action="/api/test" target="result">
          <input name="test" value="value" />
          <x-button>Submit</x-button>
        </x-form>
        <div id="result"></div>
      `;

      const button = container.querySelector("x-button");
      triggerClick(button);

      await waitForPromises();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/test",
        expect.objectContaining({
          method: "PUT",
          body: expect.any(FormData),
        })
      );
    });
  });

  describe("x-button", () => {
    test("should register as a custom element", () => {
      expect(customElements.get("x-button")).toBeDefined();
    });

    test("should send DELETE request when clicked", async () => {
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve(new Response("<div>Deleted</div>"))
      );

      container.innerHTML = `
        <x-button method="DELETE" action="/api/test" target="result">Delete</x-button>
        <div id="result"></div>
      `;

      const button = container.querySelector("x-button");
      triggerClick(button);

      await waitForPromises();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/test",
        expect.objectContaining({
          method: "DELETE",
        })
      );
    });
  });

  describe("x-a", () => {
    test("should register as a custom element", () => {
      expect(customElements.get("x-a")).toBeDefined();
    });

    test("should send PATCH request when clicked", async () => {
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve(new Response("<div>Patched</div>"))
      );

      container.innerHTML = `
        <x-a method="PATCH" action="/api/test" target="result">Update</x-a>
        <div id="result"></div>
      `;

      const anchor = container.querySelector("x-a");
      triggerClick(anchor);

      await waitForPromises();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/test",
        expect.objectContaining({
          method: "PATCH",
        })
      );
    });
  });

  describe("Content replacement", () => {
    test("should update target element with response content", async () => {
      const responseHTML = '<div id="result">New Content</div>';
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve(new Response(responseHTML))
      );

      container.innerHTML = `
        <x-button method="GET" action="/api/test" target="result">Load</x-button>
        <div id="result">Old Content</div>
      `;

      const button = container.querySelector("x-button");
      triggerClick(button);

      await waitForPromises();

      const newElement = container.querySelector("#result");
      expect(newElement).not.toBeNull();
      expect(newElement?.textContent).toBe("New Content");
    });
  });
});

export function renderSearchMessage(): void {
  const message = new URLSearchParams(window.location.search).get("message") ?? "";
  const output = document.querySelector("#search-message");
  if (output) {
    output.innerHTML = message;
  }
}

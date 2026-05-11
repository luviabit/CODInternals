window.addEventListener("load", () => {
  const loader = document.getElementById("loader-wrapper");
  const content = document.getElementById("content");

  loader.style.display = "none"; // hide
  content.style.display = "block"; // show main page content
});
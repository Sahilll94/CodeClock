document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(null, (data) => {
    let list = document.getElementById("timeList");
    list.innerHTML = "";
    for (let site in data) {
      let li = document.createElement("li");
      li.innerHTML = `${site}: ${Math.round(data[site] / 60)} min <button data-site="${site}">Remove</button>`;
      list.appendChild(li);
    }
    
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", (event) => {
        let siteToRemove = event.target.getAttribute("data-site");
        chrome.storage.local.remove(siteToRemove, () => {
          event.target.parentElement.remove();
        });
      });
    });
  });
});

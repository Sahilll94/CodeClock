document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(null, (data) => {
    let list = document.getElementById("timeList");
    list.innerHTML = data && Object.keys(data).length ? "" : "<p>No data yet.</p>";

    let sortedSites = Object.entries(data).sort((a, b) => b[1] - a[1]); // Sort by most time spent

    sortedSites.forEach(([site, seconds]) => {
      let li = document.createElement("li");
      li.innerHTML = `<span>${site}</span> <span>${Math.round(seconds / 60)} min</span>`;
      list.appendChild(li);
    });
  });
});

const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchStates = async (searchText) => {
  const res = await fetch("data/main.json");
  const states = await res.json();

  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.SKU.match(regex);
  });

  if (searchText.length == 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) =>
          `<div class="card card-body mb-1">
        <h4>
          ${match.SKU}
          
        </h4>
        <small>
          Sakinaka: ${match.KULT_Sakinaka_Edg_DS1} / Bandra: ${match.KULT_Bandra_Edg_DS1} / Thane: ${match.KULT_Thane_Edg_DS1} /
          LParel: ${match.KULT_LParel_Edg_ds1} / Turbhe: ${match.KULT_Turbhe_Edg_ds1} / Kandivali: ${match.KULT_Kandivali_Edg_DS1}
        </small>
      </div>
      `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));

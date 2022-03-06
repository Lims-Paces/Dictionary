const container = document.querySelector(".container"),
    searchInput = container.querySelector("input"),
    synonyms = container.querySelector(".synonyms .list"),

    infoText = container.querySelector(".info-text"),
    volumeIcon = container.querySelector(".word i"),
    removeIcon = container.querySelector(".search span");
let audio;


function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please try to search for another word`;
    } else {
        container.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
            phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio);


        if (definitions.synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";

            for (let i = 0; i < 5; i++) {
                let tag = `<span onlick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }


        }
    }
}

function search(word) {
    fetchApi(word);
    searchInput.value = word;
    container.classList.remove("active");
}

function fetchApi(word) {
    container.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
}


searchInput.addEventListener("keyup", e => {
    let word = e.target.value.replace(/\s+/g, ' ');
    if (e.key == "Enter" && word) {
        fetchApi(word);
    }
});

volumeIcon.addEventListener("click", () => {
    audio.play();
});

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    container.classList.remove("active");
    infoText.style.color = '#9a9a9a';
    infoText.innerHTML = "Type a word and press enter to get meaning, example, pronunciation and synonyms of that typed word"
});
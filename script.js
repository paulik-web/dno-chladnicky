function openTab(evt, tabId) {
    console.log("Klikla si na kartu: " + tabId); 
    let panels = document.getElementsByClassName("tab-panel");
    for (let i = 0; i < panels.length; i++) {
        panels[i].style.display = "none"; 
    }
    let tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    const selectedPanel = document.getElementById(tabId);
    if (selectedPanel) {
        selectedPanel.style.display = "block";
    } else {
        console.error("Panel s ID '" + tabId + "' neexistuje!");
    }
    evt.currentTarget.classList.add("active");
}

function switchTabFromButton (tabId){
    const tabs = document.querySelectorAll('.tab');
    let targetTab;
    tabs.forEach(tab =>{
        if (tab.getAttribute('onclick').includes(tabId)) {
            targetTab = tab;
        }
    });
    if (targetTab) {
        targetTab.click();
    }
}


const mojuRecepty = [
    { nazov: "Praženica s cibuľkou", typ: "Raňajky", ingrediencie: ["vajko", "cibula"], postup: "Na cibuľke speníme vajíčka." },
    { nazov: "Šunková omeleta so syrom", typ: "Raňajky", ingrediencie: ["vajko", "šunka", "syr"], postup: "Vajíčka rozmiešame, pridáme šunku a syr." },
    { nazov: "Rýchly vajíčkový šalát", typ: "Raňajky", ingrediencie: ["vajko", "cibula", "maslo"], postup: "Uvarené vajíčka nakrájame nadrobno, zmiešame s jemne nasekanou cibuľou, maslom a dochutíme soľou." },

    { nazov: "Kuracie s ryžou", typ: "Obed", ingrediencie: ["k-mäso", "ryža", "cibula", "mrkva"], postup: "Kurča opečieme na cibulke a podávame s ryžou a uvarenou mrkvou." },
    { nazov: "Zemiaky s pečenou rybou", typ: "Obed", ingrediencie: ["ryba", "zemiaky", "cibula"], postup: "Rybu a zemiaky pečieme spolu v rúre." },
    { nazov: "Cestoviny s paradajkovou omáčkou", typ: "Obed", ingrediencie: ["cestoviny", "paradajky", "cesnak", "syr"], postup: "Uvaríme cestoviny a pridáme omáčku z paradajok a cesnaku." },

    { nazov: "Ľahký šalát s kuracím mäsom", typ: "Večera", ingrediencie: ["šalát", "k-mäso", "paradajky", "paprika"], postup: "Zmiešame všetku zeleninu s kúskami opečeného kurčaťa." },
    { nazov: "Zapekané cestoviny so syrom", typ: "Večera", ingrediencie: ["cestoviny", "syr", "mlieko"], postup: "Cestoviny zalejeme mliekom so syrom a zapečieme." },

    { nazov: "Chrumkavé syrové čipsy", typ: "Snack", ingrediencie: ["syr"], postup: "Syr nakrájame na malé štvorčeky a pečieme na panvici alebo v rúre, kým nie sú chrumkavé." },
    { nazov: "Študentské rolky", typ: "Snack", ingrediencie: ["šunka", "syr", "šalát"], postup: "Na plátok šunky položíme syr a list šalátu, zvinieme do rolky a upevníme špáradlom." },
];

let vybraneSuroviny = [];

function toggleFood(element) {
    const meno = element.getAttribute('data-name');
    if (vybraneSuroviny.includes(meno)) {
        vybraneSuroviny = vybraneSuroviny.filter(item => item !== meno);
        element.classList.remove('active');
    } else {
        vybraneSuroviny.push(meno);
        element.classList.add('active');
    }
}

function generateRecipes() {
    const vysledok = mojuRecepty.filter(recept => 
        recept.ingrediencie.some(ing => vybraneSuroviny.includes(ing))
    );

    const receptyPanel = document.getElementById('recepty');
    let htmlObsah = `<h1>Nájdené recepty (${vysledok.length}):</h1>`;
    
    if (vysledok.length > 0) {
        vysledok.forEach(r => {
            const mas = r.ingrediencie.filter(ing => vybraneSuroviny.includes(ing));
            const chybeju = r.ingrediencie.filter(ing => !vybraneSuroviny.includes(ing));

            htmlObsah += `
                <div class="recipe-card" style="background: white; margin: 10px; padding: 15px; border-radius: 10px; border-left: 5px solid #be4b49;">
                    <span style="color: #be4b49; font-weight: bold;">${r.typ}</span>
                    <h3>${r.nazov}</h3>
                    <p><b>Máš zo svojej chladničky:</b> <span style="color: green;">${mas.join(', ')}</span></p>
                    ${chybeju.length > 0 ? `<p style="color: #888;"><b>Ešte by sa ti hodilo:</b> ${chybeju.join(', ')}</p>` : `<p style="color: green;"><b>Máš všetko potrebné! ✅</b></p>`}
                    <p><i>Postup:</i> ${r.postup}</p>
                </div>`;
        });
    } else {
        htmlObsah += "<p>Nevybral si žiadne suroviny. Skús na niečo v chladničke kliknúť!</p>";
    }

    receptyPanel.innerHTML = htmlObsah;
    switchTabFromButton('recepty');
}
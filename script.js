let aktualnyFilterTyp = "Všetko";

function openTab(evt, tabId) {
    let panels = document.getElementsByClassName("tab-panel");
    for (let i = 0; i < panels.length; i++) {
    	panels[i].style.display = "none"; 
        panels[i].classList.remove("active");
    }
    let tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    const selectedPanel = document.getElementById(tabId);
    if (selectedPanel) {
      	selectedPanel.style.display = "block";
   		selectedPanel.classList.add ("active");
    }
    evt.currentTarget.classList.add("active");
}

function switchTabFromButton (tabId){
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab =>{
        if (tab.getAttribute('onclick').includes(tabId)) {
            tab.click();
        }
    });
}

function filterByTyp(typ) {
   aktualnyFilterTyp = typ;
   if (vybraneSuroviny.length ===0) {
      const filtrat = mojuRecepty.filter( r => typ === "Všetko" || r.typ === typ);
      zobrazRecepty(filtrat, false);
   } else {
         generateRecipes();
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
    
    updateButtonCount()
}
function updateButtonCount() {
    const button = document.querySelector('.kuk-butt');
    if (button) {
      button.innerHTML = vybraneSuroviny.length > 0
      	? `🔍 Čo môžeme uvariť? (${vybraneSuroviny.length})`
         : `🔍 Čo môžeme uvariť?`;
	}
}

function generateRecipes() {
    let vysledok = mojuRecepty.filter(recept => 
        recept.ingrediencie.some(ing => vybraneSuroviny.includes(ing))
    );
	if (aktualnyFilterTyp !== "Všetko") {
      vysledok = vysledok.filter(r => r.typ===aktualnyFilterTyp);
   }
   
   zobrazRecepty(vysledok, true);
   switchTabFromButton('recepty');
}

function zobrazRecepty(zoznam, inteligentnyRezim) {
   const kontajner = document.getElementById('recepty-zoznam');
   if (!kontajner) return;
   
   let html = "";
   if (zoznam.length === 0) {
      html = `<p class = "empty-msg">Nenašli sme žiadne recepty pre kategóriu "${aktualnyFilterTyp}" a tvoj výber.</p>`;
   } else {
      zoznam.forEach(r=> {
      	const mas = r.ingrediencie.filter(ing => vybraneSuroviny.includes(ing));
         const chybaju = r.ingrediencie.filter(ing => !vybraneSuroviny.includes(ing));
         
         html += `
         	<div class = "recipe-card">
            	<span class = "recipe-tag">${r.typ}</span>
               <h3>${r.nazov}</h3>
               <div class ="recipe-ingred">
               	${inteligentnyRezim ? `
                  	<p><b>Máš:</b> <span style ="color:green">${mas.join(', ')}</span></p>
                     ${chybaju.length> 0 ? `<p style ="color: #666"><b>Chýba:</b> ${chybaju.join(', ')}</p>` : '<p style="color: green"><b>Máš všetko! ✅</b></p>'}
                  ` : `<p><b>Potrebuješ:</b> ${r.ingrediencie.join(', ')}</p>`}
               </div>
               <p class="recipe-steps"><i>Postup:</i> ${r.postup}</p>
            </div>
         `;
      });
   }
   kontajner.innerHTML = html;
}


function showExtraPage(type) {
    const overlay = document.getElementById('extra-page');
    const title = document.getElementById('extra-title');
    const body = document.getElementById('extra-body');

    if (type === 'about') {
        title.innerText = "O nás";
        body.innerHTML = `
            <p>Kto sme ?</p>
            <p>Som študentka strednej školy</p> 
            
             `;
    } 
    else if (type === 'contact') {
        title.innerText = "Kontakt";
        body.innerHTML = `
            <p>Máš nápad na skvelý recept? Alebo ti niečo nefunguje?</p>
            <p>📧 Email: <b>dno.chladničky@gmail.com</b></p>
            <p>📸 Instagram: <b>@kostkovaa.portfolio</b></p>
        `;
    }

    overlay.style.display = 'flex'; 
}

function closeExtraPage() {
    document.getElementById('extra-page').style.display = 'none';
}
    
    
const kategorie = [
	{
    	meno: "Mäso a ryby",
        potraviny:[
        	{id: "šunka", ikona: "🍖", nazov:"Šunka"},
            { id: "ryba", ikona: "🐟", nazov: "Ryba" },
            { id: "k-mäso", ikona: "🍗", nazov: "Kuracie mäso" },
            { id: "slanina", ikona: "🥓", nazov: "Slanina" }
        ]
    },
    {
    	meno: "Zelenina",
        potraviny:[
    		{ id: "cibula", ikona: "🧅", nazov: "Cibuľa" },
            { id: "cesnak", ikona: "🧄", nazov: "Cesnak" },
            { id: "šalat", ikona: "🥬", nazov: "Šalát" },
            { id: "paradajky", ikona: "🍅", nazov: "Paradajky" },
            { id: "mrkva", ikona: "🥕", nazov: "Mrkva" },
            { id: "paprika", ikona: "🫑", nazov: "Paprika" },
            { id: "avokado", ikona: "🥑", nazov: "Avokádo" },
            { id: "hrach", ikona: "🫛", nazov: "Hrach" },
            { id: "brokolica", ikona: "🥦", nazov: "Brokolica" },
            { id: "chilli", ikona: "🌶️", nazov: "Chilli" },
            { id: "kukurica", ikona: "🌽", nazov: "Kukurica" },
            { id: "olivy", ikona: "🫒", nazov: "Olivy" },
            { id: "redkovka", ikona: "🫜", nazov: "Reďkovky" },
            { id: "batat", ikona: "🍠", nazov: "Batáty" },
            { id: "fazula", ikona: "🫘", nazov: "Fazuľa" },
            { id: "uhorka", ikona: "🥒", nazov: "Uhorka" }
            
        ]
    },
    {
    	meno: "Ovocie",
        potraviny:[
    		{ id: "citron", ikona: "🍋", nazov: "Citrón" },
            { id: "limetka", ikona: "🍋‍🟩", nazov: "Limetka" },
            { id: "banan", ikona: "🍌", nazov: "Banán" },
            { id: "jahody", ikona: "🍓", nazov: "Jahody" },
            { id: "cucoriedky", ikona: "🫐", nazov: "Čučoriedky" },
            { id: "mango", ikona: "🥭", nazov: "Mango" },
            { id: "zazvor", ikona: "🫚", nazov: "Zázvor" }
        ]
    },
    {
    	meno: "Mliečne výrobky",
        potraviny:[
        	{ id: "mlieko", ikona: "🥛", nazov: "Mlieko" },
            { id: "syr", ikona: "🧀", nazov: "Syr" },
            { id: "maslo", ikona: "🧈", nazov: "Maslo" }
        ]
    },
    {
    	meno: "Prílohy",
        potraviny:[
        	{ id: "ryža", ikona: "🍚", nazov: "Ryža" },
            { id: "zemiaky", ikona: "🥔", nazov: "Zemiaky" },
            { id: "cestoviny", ikona: "🍝", nazov: "Cestoviny" },
            { id: "chlieb", ikona: "🍞", nazov: "Chlieb" },
            { id: "tortila", ikona: "🫓", nazov: "Tortily" }
        ]
    },
    {
    	meno: "Iné",
        potraviny:[
            { id: "parapretlak", ikona: "🥫", nazov: "Paradaj. pretlak" },
            { id: "vajko", ikona: "🥚", nazov: "Vajíčko" },
            { id: "čokoláda", ikona: "🍫", nazov: "Čokoláda" }
		]
    }
];

let aktualnyIndex = 0;

function renderFridge(){
    const shelf = document.getElementById('fridge-shelf');
    const title = document.getElementById('category-title');
    if(!shelf|| !title) return;
    
    const kat = kategorie[aktualnyIndex];
    title.innerText=kat.meno;
    shelf.innerHTML="";
    
    kat.potraviny.forEach(p=>{
        const div=document.createElement('div');
        const isActive = vybraneSuroviny.includes(p.id) ? ' active' :'';
        div.className=`food ${isActive}`;
        
		div.setAttribute('data-name',p.id);
        div.onclick=function(){toggleFood(this);};
        div.innerHTML=`${p.ikona}<span>${p.nazov}</span>`;
        shelf.appendChild(div);
    });
    
    updateButtonCount();
}

function moveFridge(direction){
	aktualnyIndex+=direction;
    if(aktualnyIndex<0) aktualnyIndex=kategorie.length - 1;
    if(aktualnyIndex >= kategorie.length) aktualnyIndex = 0;
    renderFridge();
}

window.onload= function(){
	renderFridge();
   document.getElementById('recepty-zoznam').innerHTML=
   	'<p class="empty-msg">Vyber si kategóriu alebo suroviny v chladničke.</p>';
};

function resetFridge (){
	vybraneSuroviny = []; 
    renderFridge();
    updateButtonCount();
    filterByTyp('Všetko');
}
import { GoogleGenerativeAI } from '@google/generative-ai';


const entryInput = document.getElementById('entryInput');
const addButton = document.getElementById('addButton');
const entriesContainer = document.getElementById('entriesContainer');
const toggleButton = document.getElementById('toggleButton');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  toggleButton.innerText = body.classList.contains('dark-mode') ? "Dark Mode : ON" : "Dark Mode : OFF";
});

let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

addButton.addEventListener('click', async function () {
    const entryText = entryInput.value.trim();
    if (!entryText) {
        alert('Please write something.');
        return;
    }

    const sentiment = await analyzeData(entryText || "I'm Good!");

    const entry = {
        id: Date.now(),
        text: entryText,
        date: new Date().toLocaleString(),
        sentiment: sentiment
    };

    entries.push(entry);
    saveEntries();
    displayEntries();
    entryInput.value = '';
});

const genAI = new GoogleGenerativeAI("AIzaSyBxmeFtXtavP8Oe-EcCpVsadDConEQcgdc");

async function analyzeData(myfeelings) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${myfeelings}! Based on the above text could you provide me my feelings in one of the word in the below 3, the answer should be in one world, 1. Positive 2. Negative 3. Natural`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let summary = response.text();
    console.log('summary - ',summary);
    return summary;
}

analyzeData();

function saveEntries() {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
}

function displayEntries() {
    entriesContainer.innerHTML = '';
    entries.forEach(function (entry) {
        createEntryElement(entry);
    });
}

function createEntryElement(entry) {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    const h = document.createElement('h3');
    h.innerText = "Your Journal Entries";
    h.classList.add('h3');
    entryDiv.appendChild(h);

    const datePara = document.createElement('p');
    datePara.innerHTML = '<strong>' + entry.date + '</strong>';
    entryDiv.appendChild(datePara);

    const textPara = document.createElement('p');
    textPara.textContent = entry.text;
    entryDiv.appendChild(textPara);

    const sentimentPara = document.createElement('p');
    sentimentPara.textContent = 'Sentiment: ' + entry.sentiment;
    sentimentPara.classList.add('sentiment');
    entryDiv.appendChild(sentimentPara);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('entry-actions');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.margin = '10px';
    editButton.classList.add('edit-button');
    editButton.onclick = function () {
        editEntry(entry.id);
    };
    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function () {
        deleteEntry(entry.id);
    };
    actionsDiv.appendChild(deleteButton);

    entryDiv.appendChild(actionsDiv);
    entriesContainer.appendChild(entryDiv);
}

function deleteEntry(id) {
    entries = entries.filter(function (entry) {
        return entry.id !== id;
    });
    saveEntries();
    displayEntries();
}

function editEntry(id) {
    const entry = entries.find(function (entry) {
        return entry.id === id;
    });
    entryInput.value = entry.text;
    deleteEntry(id);
}


displayEntries();
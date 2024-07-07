"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchCharacterInfo(6);
}));
function fetchCharacterInfo(numCharacters) {
    return __awaiter(this, void 0, void 0, function* () {
        const appDiv = document.getElementById('app');
        if (!appDiv) {
            console.error('No se pudo encontrar el elemento con ID "app". Verifica tu HTML.');
            return;
        }
        const container = document.createElement('div');
        container.className = 'characters-section';
        appDiv.appendChild(container);
        let charactersFetched = 0;
        while (charactersFetched < numCharacters) {
            const response = yield fetch('https://rickandmortyapi.com/api/character/');
            const data = yield response.json();
            if (!response.ok) {
                throw new Error('Error fetching character info');
            }
            for (const character of data.results) {
                if (charactersFetched >= numCharacters)
                    break;
                const episodeResponse = yield fetch(character.episode[0]);
                const episodeData = yield episodeResponse.json();
                if (!episodeResponse.ok) {
                    throw new Error('Error fetching episode info');
                }
                const episodeName = CharacterFirstEpisode(episodeData);
                const card = createCard(character, episodeName);
                container.appendChild(card);
                charactersFetched++;
            }
        }
    });
}
function CharacterFirstEpisode(episodeData) {
    const episodeName = episodeData.name;
    return episodeName;
}
function createCard(characterData, episodeName) {
    const card = document.createElement('div');
    card.className = 'card';
    const imageElement = document.createElement('img');
    imageElement.src = characterData.image;
    card.appendChild(imageElement);
    const characterInfoDiv = document.createElement('div');
    card.appendChild(characterInfoDiv);
    const nameElement = document.createElement('h2');
    nameElement.textContent = characterData.name;
    characterInfoDiv.appendChild(nameElement);
    const lastLocationElement = document.createElement('div');
    lastLocationElement.id = 'last-location';
    characterInfoDiv.appendChild(lastLocationElement);
    const lastLocationTitleElement = document.createElement('p');
    lastLocationTitleElement.textContent = 'Last known location:';
    lastLocationElement.appendChild(lastLocationTitleElement);
    const lastLocationNameElement = document.createElement('h3');
    lastLocationNameElement.textContent = `${characterData.location.name}`;
    lastLocationElement.appendChild(lastLocationNameElement);
    const firstSeenElement = document.createElement('div');
    firstSeenElement.id = 'first-Seen';
    characterInfoDiv.appendChild(firstSeenElement);
    const firstSeenTitleElement = document.createElement('p');
    firstSeenTitleElement.textContent = 'First seen:';
    firstSeenElement.appendChild(firstSeenTitleElement);
    const firstSeenNameElement = document.createElement('h3');
    firstSeenNameElement.textContent = `${episodeName}`;
    firstSeenElement.appendChild(firstSeenNameElement);
    return card;
}
// function renderCharacterInfo(characterData: any, episodeName: string) {
//   const appDiv = document.getElementById('app');
//   if (!appDiv) return;
//   const imageElement = document.createElement('img');
//   imageElement.src = characterData.image;
//   appDiv.appendChild(imageElement);
//   const characterInfoDiv = document.createElement('div');
//   appDiv.appendChild(characterInfoDiv);
//   const nameElement = document.createElement('h2');
//   nameElement.textContent = characterData.name;
//   characterInfoDiv.appendChild(nameElement);
//   const lastLocationElement = document.createElement('div');
//   lastLocationElement.id = 'last-location';
//   characterInfoDiv.appendChild(lastLocationElement);
//   const lastLocationTitleElement = document.createElement('p');
//   lastLocationTitleElement.textContent = 'Last known location:';
//   lastLocationElement.appendChild(lastLocationTitleElement);
//   const lastLocationNameElement = document.createElement('h3');
//   lastLocationNameElement.textContent = `${characterData.location.name}`;
//   lastLocationElement.appendChild(lastLocationNameElement);
//   const firstSeenElement = document.createElement('div');
//   firstSeenElement.id = 'first-Seen';
//   characterInfoDiv.appendChild(firstSeenElement);
//   const firstSeenTitleElement = document.createElement('p');
//   firstSeenTitleElement.textContent = 'First seen:';
//   firstSeenElement.appendChild(firstSeenTitleElement);
//   const firstSeenNameElement = document.createElement('h3');
//   firstSeenNameElement.textContent = `${episodeName}`;
//   firstSeenElement.appendChild(firstSeenNameElement);
// }

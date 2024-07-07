document.addEventListener('DOMContentLoaded', async () => {
  await fetchCharacterInfo(6);
});

async function fetchCharacterInfo(numCharacters: number) {
  const appDiv = document.getElementById('app');
  if (!appDiv) {
    console.error(
      'No se pudo encontrar el elemento con ID "app". Verifica tu HTML.'
    );
    return;
  }

  const container = document.createElement('div');
  container.className = 'characters-section';
  appDiv.appendChild(container);

  let charactersFetched = 0;
  while (charactersFetched < numCharacters) {
    const response = await fetch('https://rickandmortyapi.com/api/character/');
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Error fetching character info');
    }

    for (const character of data.results) {
      if (charactersFetched >= numCharacters) break;
      const episodeResponse = await fetch(character.episode[0]);
      const episodeData = await episodeResponse.json();

      if (!episodeResponse.ok) {
        throw new Error('Error fetching episode info');
      }

      const episodeName = CharacterFirstEpisode(episodeData);
      const card = createCard(character, episodeName);
      container.appendChild(card);
      charactersFetched++;
    }
  }
}

function CharacterFirstEpisode(episodeData: any) {
  const episodeName = episodeData.name;
  return episodeName;
}

function createCard(characterData: any, episodeName: string) {
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

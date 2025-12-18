
// Destination data (all cities and landmarks except Paris & Tokyo)
const destinations = [
  {
    name: "Howrah Bridge",
    district: "Kolkata",
    description: "The heartbeat of Kolkata, where millions cross stories every day.",
    itinerary: ['Morning walk', 'River view'],
    map: 'https://www.google.com/maps?q=Howrah+Bridge&output=embed',
    image: "01.png"
  },
  {
    name: "Victoria Memorial",
    district: "Kolkata",
    description: "A marble tale of colonial history and timeless elegance.",
    itinerary: ['Museum tour', 'Garden stroll'],
    map: 'https://www.google.com/maps?q=Victoria+Memorial+Kolkata&output=embed',
    image: "02.png"
  },
  {
    name: "Dakshineswar Temple",
    district: "North 24 Parganas",
    description: "Where faith meets the flow of the sacred Ganga.",
    itinerary: ['Temple visit', 'Ganga view'],
    map: 'https://www.google.com/maps?q=Dakshineswar+Temple&output=embed',
    image: "03.png"
  },
  {
    name: "ISKCON Mayapur",
    district: "Nadia",
    description: "A global center of devotion and spiritual peace.",
    itinerary: ['Temple darshan', 'Cultural program'],
    map: 'https://www.google.com/maps?q=ISKCON+Mayapur&output=embed',
    image: "04.png"
  },
  {
    name: "Jorasanko Thakurbari",
    district: "Kolkata",
    description: "The ancestral home of Rabindranath Tagore, steeped in cultural history.",
    itinerary: ['Museum visit', 'Heritage walk'],
    map: 'https://www.google.com/maps?q=Jorasanko+Thakurbari&output=embed',
    image: "05.png"
  },
  {
    name:"Writers' Building",
    district: "Kolkata",
    description: "A symbol of power, administration, and Kolkata's colonial past.",
    itinerary: ['Colonial architecture tour'],
    map: 'https://www.google.com/maps?q=Writers+Building+Kolkata&output=embed',
    image: "06.png"
  },
  {
    name:"Eden Garden",
    district:"Kolkata",
    description: "Where cricket becomes emotion and history roars.",
    itinerary: ['Cricket match', 'Stadium tour'],
    map: 'https://www.google.com/maps?q=Eden+Garden+Kolkata&output=embed',
    image: "07.png"
  },
  {
    name:"Sundarban",
    district:"South 24 Parganas and North 24 Parganas",
    description: "A mystical land of mangroves, tides, and the Royal Bengal Tiger.",
    itinerary: ['Boat safari', 'Tiger reserve'],
    map: 'https://www.google.com/maps?q=Sundarban&output=embed',
    image: "110.png"
  },
  {
    name:"Darjeeling",
    district:"Darjeeling",
    description: "Misty hills, tea gardens, and views of the mighty Kanchenjunga.",
    itinerary: ['Toy train ride', 'Tea garden visit'],
    map: 'https://www.google.com/maps?q=Darjeeling&output=embed',
    image: "08.png"
  },
  {
    name:"Bishnupur",
    district:"Bankura",
    description: "Terracotta temples echoing Bengal's artistic heritage.",
    itinerary: ['Temple tour', 'Handicraft shopping'],
    map: 'https://www.google.com/maps?q=Bishnupur&output=embed',
    image: "09.png"
  },
  {
    name:"Murshidabad",
    district: "Murshidabad",
    description: "Once Bengal's capital, rich with Nawabi history and legacy.",
    itinerary: ['Hazarduari Palace', 'Imambara'],
    map: 'https://www.google.com/maps?q=Murshidabad&output=embed',
    image: "10.png"
  }
];

// LOGIN
function login() {
  const user = document.getElementById('username').value.trim();
  if (!user) return alert('Enter username');
  localStorage.setItem('user', user);
  alert('Logged in as ' + user);

  document.getElementById('login').classList.add('hidden');
  document.getElementById('mainContent').classList.remove('hidden');

  const welcome = document.getElementById('welcomeUser');
  if (welcome) welcome.innerText = "Welcome, " + user + "!";

  loadSaved();
}

// RENDER DESTINATIONS
function renderDestinations(list = destinations) {
  const grid = document.getElementById('destinationGrid');
  grid.innerHTML = '';
  list.forEach((d, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${d.image}" alt="${d.name}" />
      <div class="card-content">
        <h4>${d.name}</h4>
        <small>${d.district}</small>
        <p>${d.description}</p>
        <button onclick="showDetail(${index})">Details</button>
        <button onclick="exploreDestination(${index})">Explore</button>
      </div>`;
    grid.appendChild(card);
  });
}

// DETAIL VIEW
function showDetail(index) {
  const d = destinations[index];
  const detail = document.getElementById('detail');
  detail.classList.remove('hidden');
  document.getElementById('detail-name').innerText = d.name;
  document.getElementById('detail-desc').innerText = d.description;
  document.getElementById('itinerary').innerHTML = d.itinerary.map(i => `<li>${i}</li>`).join('');
  document.getElementById('map').src = d.map;
  window.scrollTo({ top: detail.offsetTop - 80, behavior: 'smooth' });
}
function goBack() {
  document.getElementById('detail').classList.add('hidden');
}

// EXPLORE MODAL
function exploreDestination(index) {
  const d = destinations[index];
  const modal = document.getElementById("exploreModal");
  const modalDetails = document.getElementById("modalDetails");
  modalDetails.innerHTML = `
    <img src="${d.image}" alt="${d.name}" />
    <h2>${d.name}</h2>
    <h4>${d.district}</h4>
    <p>${d.description}</p>`;
  modal.style.display = "block";
}
function closeModal() {
  document.getElementById("exploreModal").style.display = "none";
}
window.onclick = function(event) {
  const modal = document.getElementById("exploreModal");
  if (event.target === modal) modal.style.display = "none";
};

// SEARCH
function filterDestinations() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.district.toLowerCase().includes(query) ||
    d.description.toLowerCase().includes(query)
  );
  renderDestinations(filtered);
}

// SAVE TRIPS
function saveTrip() {
  const user = localStorage.getItem('user');
  if (!user) return alert('Login to save trips');
  const trip = document.getElementById('detail-name').innerText;
  let saved = JSON.parse(localStorage.getItem('trips') || '[]');
  if (!saved.includes(trip)) saved.push(trip);
  localStorage.setItem('trips', JSON.stringify(saved));
  loadSaved();
  alert('Trip saved');
}

// LOAD SAVED TRIPS
function loadSaved() {
  const list = document.getElementById('saved');
  if (!list) return;
  list.innerHTML = '';
  JSON.parse(localStorage.getItem('trips') || '[]').forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    list.appendChild(li);
  });
}

// INIT
renderDestinations();
loadSaved();
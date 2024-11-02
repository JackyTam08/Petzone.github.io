document.addEventListener('DOMContentLoaded', function () {
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const nav = document.querySelector('nav ul');

    // Open menu
    menuOpen.addEventListener('click', () => {
        nav.classList.add('open');
        menuOpen.style.display = 'none'; // Hide the open (bars) icon
        menuClose.style.display = 'block'; // Show the close (x) icon
    });

    // Close menu
    menuClose.addEventListener('click', () => {
        nav.classList.remove('open');
        menuOpen.style.display = 'block'; // Show the open (bars) icon
        menuClose.style.display = 'none'; // Hide the close (x) icon
    });

    // To prevent issues: Add event listener to window resize to show/hide correctly
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1110) {
            // Reset both icons when resizing beyond mobile/tablet
            menuOpen.style.display = 'none';
            menuClose.style.display = 'none';
        } else if (!nav.classList.contains('open')) {
            menuOpen.style.display = 'block'; // Show bars icon on small screens if the menu isn't open
            menuClose.style.display = 'none'; // Ensure the close icon is hidden
        }
    });
});
// Filter Script

function filterPets() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const breedFilter = document.getElementById('breed-filter').value;
    const ageFilter = document.getElementById('age-filter').value;
    const genderFilter = document.getElementById('gender-filter').value;
    const petList = document.querySelectorAll('.pet-card');

    petList.forEach(pet => {
        const petName = pet.querySelector('h2').textContent.toLowerCase();
        const petBreed = pet.getAttribute('data-breed');
        const petAge = pet.getAttribute('data-age');
        const petGender = pet.getAttribute('data-gender');
        const petLocation = pet.getAttribute('data-location').toLowerCase(); // Get the pet's location

        // Check if the pet matches the search and filter criteria
        const matchesSearch = petName.includes(searchInput) || petLocation.includes(searchInput); // Check both name and location
        const matchesBreed = breedFilter === '' || petBreed === breedFilter;
        const matchesAge = ageFilter === '' || petAge === ageFilter;
        const matchesGender = genderFilter === '' || petGender === genderFilter;

        // Show or hide the pet card based on matching criteria
        if (matchesSearch && matchesBreed && matchesAge && matchesGender) {
            pet.style.display = ''; // Show the pet
        } else {
            pet.style.display = 'none'; // Hide the pet
        }
    });
}







function openModal(button) {
    // Fetch the pet card details as before
    const petCard = button.parentElement;
    const petImgSrc = petCard.querySelector('img').src;
    const petName = petCard.querySelector('h2').innerText;
    const petBreed = petCard.querySelector('p:nth-of-type(1)').innerText;
    const petAge = petCard.querySelector('p:nth-of-type(2)').innerText;
    const petLocation = petCard.querySelector('p:nth-of-type(3)').innerText;
    const petGender = petCard.querySelector('p:nth-of-type(4)').innerText;

    // Populate the modal content
    document.getElementById('modal-img').src = petImgSrc;
    document.getElementById('modal-title').innerText = petName;
    document.getElementById('modal-breed').innerText = petBreed;
    document.getElementById('modal-age').innerText = petAge;
    document.getElementById('modal-location').innerText = petLocation;
    document.getElementById('modal-gender').innerText = petGender;

    // Apply fade-in effect to the modal
    const modal = document.getElementById('modal');
    modal.classList.remove('fade-out');
    modal.classList.add('fade-in');
    modal.style.display = 'flex';
}


function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('fade-in');
    modal.classList.add('fade-out');

    // Wait for the animation to finish before hiding the modal
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // The timeout duration matches the CSS transition time
}


// Close modal if clicked outside of content
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function adoptPet(petName, button) {
    const heart = button.parentElement.querySelector('.heart');
    
    if (button.textContent === "Adopt Me") {
        button.textContent = "Adopted";
        heart.style.display = "block"; // Show the heart
        heart.classList.add('show'); // Add fade-in effect
    } else {
        button.textContent = "Adopt Me";
        heart.classList.remove('show'); // Remove fade effect
        heart.style.display = "none"; // Hide after fade-out
    }
}
// Function to handle mouse hover
function handleMouseOver(button) {
    if (button.textContent === "Adopted") {
        button.textContent = "Unadopted"; // Change to Unadopted on hover
    }
}

function handleMouseOut(button) {
    if (button.textContent === "Unadopted") {
        button.textContent = "Adopted"; // Change back to Adopted on mouse out
    }
}



let petList = document.getElementById('pet-list');
let loading = false;
let page = 1;
const petsPerPage = 5; // Load only 2 pets per page
let totalPets = []; // Assume this will hold the entire dataset of pets

// Simulate a larger dataset of pets (you would normally get this from an API)
totalPets = [
    {
        name: "Koda",
        breed: "Husky",
        age: 2,
        gender: "Male",
        location: "Denver, CO",
        image: "husky2.jpg"
    },
    {
        name: "Lily",
        breed: "Poodle",
        age: 3,
        gender: "Female",
        location: "Austin, TX",
        image: "poodle2.jpg"
    },
    {
        name: "Bella",
        breed: "Golden Retriever",
        age: 4,
        gender: "Female",
        location: "Seattle, WA",
        image: "golden4.jpg"
    },
    {
        name: "Max",
        breed: "Beagle",
        age: 1,
        gender: "Male",
        location: "Chicago, IL",
        image: "beagle3.jpg"
    },
    {
        name: "Bailey",
        breed: "Labrador",
        age: 3,
        gender: "Female",
        location: "Austin, TX",
        image: "labrador4.webp" //change
    },
    {
        name: "Rex",
        breed: "German Shepherd",
        age: 4,
        gender: "Male",
        location: "Seattle, WA",
        image: "german4.jpg" // change
    },
    {
        name: "Bentley",
        breed: "Beagle",
        age: 5,
        gender: "Male",
        location: "Chicago, IL",
        image: "beagle4.jpg" //change
    },
    {
        name: "Oliver",
        breed: "Labrador",
        age: 1,
        gender: "Male",
        location: "Miami, FL",
        image: "labrador3.avif" //change
    },
    {
        name: "Sophie",
        breed: "Pomeranian",
        age: 3,
        gender: "Female",
        location: "New York, NY",
        image: "pomeranian2.jpg" //change
    },
    {
        name: "Jake",
        breed: "Maltese",
        age: 5,
        gender: "Male",
        location: "San Francisco, CA",
        image: "maltese2.jpg" //change
    },
    // Add more pets here...
];

// Function to load more pets
function loadMorePets() {
    if (loading) return; // Avoid duplicate loads
    loading = true;
    
    document.getElementById('spinner').style.display = 'block'; // Show spinner

    setTimeout(() => {
        // Calculate the start and end index for the current page
        const start = (page - 1) * petsPerPage;
        const end = start + petsPerPage;
        const newPets = totalPets.slice(start, end); // Get the next set of pets
        
        // If there are no more pets to load, stop further requests
        if (newPets.length === 0) {
            document.getElementById('spinner').style.display = 'none'; // Hide spinner
            return;
        }

        // Append new pets to the pet list
        newPets.forEach(pet => {
            const petCard = `
               <div class="pet-card" data-breed="${pet.breed}" data-age="${pet.age}" data-gender="${pet.gender}" data-location="${pet.location}">
                    <div class="heart" style="display: none;"><i class="fa-solid fa-heart"></i></div>
                    <img src="${pet.image}" alt="Playful ${pet.breed}">
                    <h2>${pet.name}</h2>
                    <p>Breed: ${pet.breed}</p>
                    <p>Age: ${pet.age} years</p>
                    <p>Location: ${pet.location}</p>
                    <p>Gender: ${pet.gender}</p>
                    <button onclick="adoptPet('${pet.name}', this)">Adopt Me</button>
                    <button class="view-more-btn" onclick="openModal(this)">View More</button>
                </div>
            `;
            petList.innerHTML += petCard;
        });

        document.getElementById('spinner').style.display = 'none'; // Hide spinner
        loading = false;
        page++; // Increment the page number to load the next set
    }, 1500); // Simulate delay for fetching data
}


// Infinite scrolling logic
window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight - 50;

    if (scrollPosition >= pageHeight && !loading) {
        loadMorePets();
    }
});

// Load initial pets on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMorePets(); // Load the first set of pets when the page loads
});

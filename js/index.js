document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const formContainer = document.getElementById("create-monster");
    const loadMoreButton = document.getElementById("load-more");
    
    let page = 1; // Start from the first page
    const limit = 50; // Load 50 monsters per request

    // Function to fetch and display monsters
    function fetchMonsters(page) {
        fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => renderMonster(monster));
            })
            .catch(error => console.error("Error fetching monsters:", error));
    }

    // Function to create a monster card
    function renderMonster(monster) {
        const monsterDiv = document.createElement("div");
        monsterDiv.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Age: ${monster.age}</p>
            <p>${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterDiv);
    }

    // Function to create the monster form
    function createMonsterForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <input type="text" id="name" placeholder="Name" required>
            <input type="number" id="age" placeholder="Age" required>
            <input type="text" id="description" placeholder="Description" required>
            <button type="submit">Create Monster</button>
        `;

        form.addEventListener("submit", event => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const age = document.getElementById("age").value;
            const description = document.getElementById("description").value;

            createMonster({ name, age, description });

            // Clear the form fields after submission
            form.reset();
        });

        formContainer.appendChild(form);
    }

    // Function to POST a new monster
    function createMonster(monster) {
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(monster)
        })
        .then(response => response.json())
        .then(newMonster => {
            renderMonster(newMonster);
        })
        .catch(error => console.error("Error creating monster:", error));
    }

    // Event listener for Load More button
    loadMoreButton.addEventListener("click", () => {
        page++; // Increment the page number
        fetchMonsters(page);
    });

    // Initialize the app
    createMonsterForm();
    fetchMonsters(page);
});

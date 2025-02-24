document.addEventListener("DOMContentLoaded", () => {
    fetch("json/packages.json") // Fetch JSON file
        .then(response => response.json())
        .then(data => {
            displayTopTrendingPackages(data);
        })
        .catch(error => console.error("Error fetching package data:", error));
});

function displayTopTrendingPackages(destinations) {
    const packageContainer = document.getElementById("package-container");
    packageContainer.innerHTML = ""; // Clear existing content

    // Filter trending destinations and get the top 3
    const trendingDestinations = destinations.filter(dest => dest.trending).slice(0, 3);

    trendingDestinations.forEach(dest => {
        const packageCard = document.createElement("div");
        packageCard.classList.add("package-card");

        // Create carousel div
        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        // Create image container for carousel
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("carousel-images");

        // Populate images from JSON
        dest.images.forEach((imgSrc, index) => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = dest.name;
            img.classList.add("carousel-img");
            if (index === 0) img.classList.add("active"); // First image active by default
            imageContainer.appendChild(img);
        });

        carousel.appendChild(imageContainer);

        // Package details
        packageCard.innerHTML += `
            <h3>${dest.name}</h3>
            <p><strong>Destination:</strong> ${dest.destination}</p>
            <p><strong>Duration:</strong> ${dest.duration}</p>
            <p><strong>Price:</strong> ${dest.price}</p>
            <button class="btn">Book Now</button>
        `;

        packageCard.prepend(carousel); // Add carousel to the top of the card
        packageContainer.appendChild(packageCard);
    });

    startCarousel(); // Start the image slider
}

function startCarousel() {
    setInterval(() => {
        document.querySelectorAll(".carousel-images").forEach(imageContainer => {
            const images = imageContainer.querySelectorAll(".carousel-img");
            let activeIndex = Array.from(images).findIndex(img => img.classList.contains("active"));
            images[activeIndex].classList.remove("active");

            // Move to next image, loop back to first if at the end
            let nextIndex = (activeIndex + 1) % images.length;
            images[nextIndex].classList.add("active");
        });
    }, 3000); // Change image every 3 seconds
}

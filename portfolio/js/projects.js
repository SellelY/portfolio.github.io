"use strict";

let main = document.querySelector("main");

async function projects() {
  main.innerHTML = `
    <div id="project-container">
        <p id="message"></p>
        <div id="projects">
            <div id="loading">Loading, kindly wait...</div>
        </div>
    </div>
  `;

  let projectsContainer = main.querySelector("#projects");
  let message = main.querySelector("#message");

  try {
    let response = await fetch("/php/index.php");
    let data = await response.json();
    projectsContainer.innerHTML = "";
    console.log(data);

    if (!response.ok) {
      message.innerHTML = `Oops! Something went wrong, we got this from the server <span>${data.message}</span>.`;
    } else {
        data.projects.forEach((project) => {
            let image = document.createElement("img");
            image.src = project.images[0].url;

            let hoverName = document.createElement("div");
            hoverName.className = "hover-name";
    
            let imageName = document.createElement("p");
            imageName.className = "image-name";
            imageName.textContent = project.name;
    
            let imageContainer = document.createElement("div");
            imageContainer.classList = "image-container";
            imageContainer.appendChild(hoverName)
            imageContainer.appendChild(image);
            hoverName.appendChild(imageName);

            imageContainer.addEventListener("click", () => {
                displayImagesFromArray(project);
            })
    
            projectsContainer.appendChild(imageContainer);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

projects();

function displayImagesFromArray(project) {
    main.innerHTML = "";

    let imageContainer = document.createElement("div");
    imageContainer.classList = "image-container";

    project.images.forEach((imageData) => {
        let image = document.createElement("img");
        image.src = imageData.url;

        imageContainer.appendChild(image);
    });

    main.appendChild(imageContainer);
}
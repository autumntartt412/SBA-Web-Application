import * as Carousel from "./Carousel.js";
import axios from "axios";
import { addFooter } from './pets.js';
import  * as footer  from './pets.js';


// const footerH1 = addFooter();
// console.log(`footerH1`);

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

let dogBreedsJsonObject = [];

// const API_KEY = "live_cPWEnPCJyfN0fooH13pEYm3QaxhMxOj6rPLoRHWOiOJ4QE9OZoAJF4JHbPvgOY6t";
const API_KEY = 'api_key=live_cPWEnPCJyfN0fooH13pEYm3QaxhMxOj6rPLoRHWOiOJ4QE9OZoAJF4JHbPvgOY6t';




async function initialLoad() {
    try {
   
    // const response = await fetch(`API_KEY, ${breedId}`); 
   
     // Retrieve a list of breeds from the dog API using fetch().
       const response = await fetch(`https://www.thedogapi.com?api_key=${API_KEY}`);
       if (!response.ok) {
           throw new Error(`Network response was not ok. status: ${response.status}`);
       }
      
       // return response as a json object of dog breeds
        catBreedsJsonObject = await response.json(); 
   
       breedSelect.innerHTML = '';
     
       // Create new <options> for each of these breeds, and append them to breedSelect.
       dogBreedsJsonObject.forEach(breed => {
         const option = document.createElement('option');
   
         // Each option should have a value attribute equal to the id of the breed.
         option.value = breed.id;
         
         // Each option should display text equal to the name of the breed.
         option.textContent = breed.name;
         
         // Append option to <h2> breedSelect in html
         breedSelect.appendChild(option);
     });
   
     console.log(catBreedsJsonObject); 
   
   } catch (error) {
     console.log(error, `Error fetching dog breeds.`);
   }
   
   // infoDump.textContent = 'Failed to load breeds. Please try again later.';
   };
   
   
//    initialLoad();

   breedSelect.addEventListener("change", async ()=>{
    try {
      const breedId = breedSelect.value;
      console.log(breedId)
      const response = await fetch(
        `https://www.thedogapi.com&breed_ids=${breedId}&api_key=${API_KEY}`
      );
      const jsonData = await response.json();
      console.log(jsonData)
  
  
      Carousel.clear()
      infoDump.innerHTML ="";
  
     //creating carousel-Item
  
      
  
        images.forEach(image => {
             const imgSrc = image.url; //  api/url
             const imgAlt = 'pictures of dogs' + breedId; // alt=""
             const imgId = image.id; // #dogId
             
        
          const createCaraousel = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);
          Carousel.appendCarousel(createCaraousel);
          // console.log(jsonData[i]);
          Carousel.start();
        });   
      // }
      
  } catch (err) {
      console.log(err);
  }
  });
  
  // call function
  initialLoad();

  export async function favourite(imgId) {
    try {
  
  const responsePost = await fetch('https://www.thedogapi.com/favourites?api_key=${API_KEY}', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `API_KEY`, //
    },
    body:  JSON.stringify({image_id: imgId}),
  });
  
  
  if (responsePost.ok) {
    favourites.add(imgId); 
    console.log('Favorite image addSyntheticLeadingComment.');
  } else {
    console.error('Favorite image not added.');
    return;
  }
  
  
  const isFavourite = favourites.has(imgId);
  
  // let response;
  
  if (isFavourite) {
   const responseDelete = await fetch(`https://www.thedogapi.com/favourites/${imgId}?api_key=${API_KEY}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY,
      },
    });
  
    if (responseDelete.ok) {
      favourite.delete(imgId);
      console.log(`Removed favorite image.`);
    } else {
      console.error('error');
    }
  }
  } catch (error) {
  console.error(`Error toggling favourite:`, error);
  }
  };
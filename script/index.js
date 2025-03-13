console.log("index is connected")

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCatagoris() {
    // 1- fetch the data

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

        // 2- convert promise to json

        .then((res) => res.json()

            // 3- sent data to display 

            .then((data) => displayCategories(data.categories))

        )
}

function loadVideos(searchText = " ") {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then(data => {
            removeActiveClass()
            document.getElementById("btn=all").classList.add("active");
            displayVideos(data.videos)
        })

}
//1001
const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then((res) => res.json())
        .then(data => {
            removeActiveClass()
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");

            displayVideos(data.category)
        });
};

const loadVideoDetils = (videoId) => {
    console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideosDetails(data.video));
}

const displayVideosDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details_container");
    detailsContainer.innerHTML =
        `
<div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2>Video title: ${video.title}</h2>
    <p>Author Name: ${video.authors[0]?.profile_name||"unknown author"}</p>
    
   
  </div>
</div>
`;
};

// {
//     "category_id": "1001",
//     "category": "Music"
// }

function displayCategories(categories) {
    // get the container 
    const categoryContainer = document.getElementById("category-container");
    // loop oparation on array of object 
    for (let cat of categories) {
        // console.log(cat);
        // creat Element
        const categoriDiv = document.createElement("div")
        categoriDiv.innerHTML = `
         <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        // Append the Element
        categoryContainer.append(categoriDiv)
    }


}

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
    if (videos.length == 0) {
        videoContainer.innerHTML = `
           <div class=" col-span-full text-center flex flex-col items-center justify-center py-20 ">
        <img class="w-[120px]" src="./assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
       </div>
        `;
        return;
    }

    videos.forEach(video => {
        console.log(video);
        const videoCard = document.createElement("div")
        videoCard.innerHTML = `
        
          <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" class="rounded-xl" />
                <span class="absolute bottom-2 right-2 text-white bg-black p-2 text-sm rounded">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                        
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                    <p class="text-sm text-gray-400 flex gap-1">
                    ${video.authors[0].profile_name}
                    ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""> `: ``}
                       
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>

            </div>
            <button onclick="loadVideoDetils('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `
        //append
        videoContainer.append(videoCard);

    });

}

document.getElementById("search-input").addEventListener('keyup',(e)=>{
    const input= e.target.value;
    loadVideos(input);
})

loadCatagoris();

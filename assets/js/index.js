

const containerAppCard =  document.querySelector('.containerApp__card');
const loadingContainer =  document.querySelector('.loadingContainer');
const sipweWrapper = document.querySelector('.swiper-wrapper');
const heartIcon = document.querySelector('#heart__icon');
const postComment = document.querySelector('#postComment');
const postIput = document.querySelector('#postIput');
const commentsContainer = document.querySelector('#containerApp__tittleAndComments');



const getData = async () => {
    const url ='https://picsum.photos/v2/list?page=1&limit=4';
    const cors = {method:'GET',headers:{'Access-Control-Allow-Credentials' : true,'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET','Access-Control-Allow-Headers':'application/json'}};

    await fetch( url , cors )
    .then( response => response.json() )
        .then( data => buildCarousel( data ) )
            .catch( err => {
                loadingContainer.classList.add('hide');
                console.log(err);
            } );
};
getData();


const buildCarousel = ( data ) => {

    data.map( ( { author , download_url} ) => {
        sipweWrapper.innerHTML += `
            <div class="swiper-slide">
                <img src = "${ download_url }" alt="${  author }"/>
            </div>
        `;
    } );
    new Swiper(".mySwiper", {
        slidesPreview: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
      });
    loadingContainer.classList.add('hide');
    containerAppCard.classList.remove('hide');
} 
const HandlePostIput = ( e ) => {
    postIput.setAttribute('value',e.target.value);
}

const handlePostSubmit = ( e ) => {
    e.preventDefault();
    if( postIput.value.trim().length < 2 ) { return; }

    const newComment =  e.target.comment.value;
    
    commentsContainer.innerHTML += `
        <p>
            <strong>Comment</strong>
            <span>${ newComment }</span>
        </p>
    `;
    postIput.value = " ";
}
const handleBeatAnimation = ( e ) => {
    if ( e.target.classList.value.includes('fa-regular') ){
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
        heartIcon.classList.add('heartBeat');
    } else {
        heartIcon.classList.remove('heartBeat');
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
    }
}
heartIcon.addEventListener("click", handleBeatAnimation);
postIput.addEventListener("input" , HandlePostIput);
postComment.addEventListener("submit", handlePostSubmit );










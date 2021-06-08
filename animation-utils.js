var current_card = 0;

$(document).ready(function () {
  url = window.location.href;
  switch (url.substring(url.lastIndexOf("#") + 1)) {
    case "Dermatology-Consultation":
        openServiceCard (n)
      break;
    case "Allergy-Testing":
        openServiceCard (n)
      break;
    case "Diet-Consultation":
        openServiceCard (n)
      break;
    case "Ear-Disease":
        openServiceCard (n)
      break;
    case "Video-Otoscopy":
        openServiceCard (n)
      break;
    case "Laser-Surgery":
        openServiceCard (n)
      break;
    case "Biopsy":
        openServiceCard (n)
      break;
  }
  if(window.innerWidth > 767){
    bindAreas();
  }
});

function openServiceCard (n) {
    if(n > 0 && n < 8){
        $(".hover").removeClass("hover");
        $("#Services-Grid").removeClass().addClass(`w-layout-grid services-grid-hover-${n}`);
        $(`#Area-${n}`).addClass("hover").children().addClass("hover");
    }
    else{
        $(".hover").removeClass("hover");
        $("#Services-Grid").removeClass().addClass(`w-layout-grid services-grid`);
    }
}


function animateServiceCard(n){
    var first = [];
    var last = [];
    var invert_top = [];
    var invert_left = [];
    var invert_height = [];
    var invert_width = [];
    var invert_x = [];
    var invert_y = [];
    var scale_width = [];
    var scale_height = [];
    var player = [];

    current_card = n;
    cards = document.getElementsByClassName("service-card");
    for (let card of cards){
        first.push(card.getBoundingClientRect());
    }
    openServiceCard(n);
    for (let card of cards){
        last.push(card.getBoundingClientRect());
    }
    for (let i = 0; i < cards.length; i++){
        invert_top.push(first[i].top - last[i].top);
        invert_left.push(first[i].left - last[i].left);
        invert_height.push(first[i].height - last[i].height);
        invert_width.push(first[i].width - last[i].width);
        invert_x.push(first[i].x - last[i].x);
        invert_y.push(first[i].y - last[i].y);
        scale_width.push(first[i].width / last[i].width);
        scale_height.push(first[i].height / last[i].height);

        player.push(cards[i].animate([
            {
                transformOrigin: 'top left',
                transform: `
                translate(${invert_left[i]}px, ${invert_top[i]}px)
                scale(${scale_width[i]}, ${scale_height[i]})
                `
            },
            {
                transformOrigin: 'top left',
                transform: "none"
            }],
            {
                duration: 500,
                easing: "ease-in",
                fill: "both"
            }
        ));
    }
}

function cardClickEvent(cardIndex){
    if(cardIndex == current_card){
        animateServiceCard(0);
    }
    else{
        animateServiceCard(cardIndex);
    }
}

//Initial Binding
function bindAreas(){
    $("#Area-1").click(function (){cardClickEvent(1)});
    $("#Area-2").click(function (){cardClickEvent(2)});
    $("#Area-3").click(function (){cardClickEvent(3)});
    $("#Area-4").click(function (){cardClickEvent(4)});
    $("#Area-5").click(function (){cardClickEvent(5)});
    $("#Area-6").click(function (){cardClickEvent(6)});
    $("#Area-7").click(function (){cardClickEvent(7)});
}
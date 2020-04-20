

// render icons
var memory_game = document.querySelector('.memory-game-block');
var icons = ["fab fa-accessible-icon", "fab fa-adn", "fas fa-address-book", "fas fa-user", "fas fa-user-friends",
"fas fa-users", "fas fa-users-cog", "fas fa-user-times", "fas fa-user-tie", "fas fa-house-user",
"fab fa-adobe", "fab fa-algolia", "fab fa-android", "fas fa-angle-double-left", "fas fa-angle-double-right"];

RenderBlocks();
function RenderBlocks()
{
    icons.forEach((e, index) => {
        memory_game.innerHTML +=  '<div class="game-block" data-icon="'+index+'"><div class="face back"></div><div class="face front"><i class="'+e+'"></i></div></div>' +
        '<div class="game-block" data-icon="'+index+'"><div class="face back"></div><div class="face front"><i class="'+e+'"></i></div></div>';
    });
}



// splash screen
var PlayerName = "";
var timer;
function Splash()
{
    document.querySelector('.Bstart').addEventListener('click', () => {
        PlayerName = "";
        while(PlayerName == null || PlayerName == "" || PlayerName.includes(' '))
        {
            PlayerName = prompt("Please enter your name");
        }
        freez(0);
        document.querySelector('.player-name').innerHTML = PlayerName;
        document.querySelector('.splash').style.display = "none";
        timer = setInterval(showTime, 1000);
        document.querySelector('.header-left').style.visibility = "visible";
        document.querySelectorAll('.header-right').forEach(e => {
            e.style.visibility = "visible";
        });
    });}

// main varible
var worngTires = 0;
var wrongDom = document.querySelector('.wrong');
var block = Array.from(document.querySelectorAll('.game-block'));
var timeOfGame = document.querySelector('.timeOfGame');
var time = 120;
var score = 0;
var scoreDOM = document.querySelector('.score');

// shuffle Blocks
function Orders()
{
    var random;
    block.forEach((e, index) => {
        random = Math.floor(Math.random() * block.length);
       
        e.style.order = random;
    });
}

// make Filp Blocks
function FlipBlock(e)
{
    e = e.target.closest('.game-block');
    if(e != null && e.className === 'game-block')
    {
        
        e.classList.add("filp-active");

        var filped = Array.from(document.querySelectorAll('.filp-active'));

        if(filped.length === 2)
        {
            if(filped[0].dataset.icon === filped[1].dataset.icon)
            {
                filped[0].classList.remove("filp-active");
                filped[1].classList.remove("filp-active");

                filped[0].classList.add("filped");
                filped[1].classList.add("filped");
                score++;
                scoreDOM.innerHTML = score;
                if(score === icons.length)
                {
                    showresult(120 - time);
                    clearInterval(timer);
                    save(true);
                }
            }else{
                freez(600);
                setTimeout(() => {
                    filped[0].classList.remove("filp-active");
                    filped[1].classList.remove("filp-active");
                }, 600);

                wrongDom.innerHTML = ++worngTires;
            }
        }
    }
}

//frezz blocks
function freez(time)
{
    memory_game.classList.add('freez');
    setTimeout(() => {
        memory_game.classList.remove('freez');
    }, time)
}

// time OF game
function showTime()
{
    time--;
    timeOfGame.innerHTML = time;
    if(time == 0 ) 
    {
        clearInterval(timer);
        showresult(120 - time);
        save(true);
    }
}

// save on localstorge
function save(NEW = false)
{
    if(!localStorage.getItem('memorygame')) localStorage.setItem('memorygame', JSON.stringify(""));
    let local = Array.from(JSON.parse(localStorage.getItem('memorygame')));
    
    if(NEW)
    {
        local.push({
            Name: PlayerName,
            Score: score,
            Time: (120 - time)
        });
        localStorage.removeItem('memorygame');
        localStorage.setItem('memorygame', JSON.stringify(local));
    }
    local.sort( compare );
    renderlist(local);
}
// sort item bise on time and score
function compare(a, b)
{
    if ( a.Time < b.Time ){
        return -1;
    }
    if ( a.Time > b.Time ){
        return 1;
    }
    if ( a.Score < b.Score ){
        return 1;
    }
    if ( a.Score > b.Score ){
        return -1;
    }
    return 0;
}


//splash for result
function showresult(times)
{
    var markup = '<div class="results"><div class="result">your score is '+score+' In time: '+(times)+'</div></div>';
        document.body.innerHTML = document.body.innerHTML + markup;
        document.querySelector('.result').addEventListener('click', (e) => {
            e.target.parentNode.remove();
        });
}

function renderlist(local)
{
    var list = document.querySelector('.list-group');
    list.innerHTML = "";
    var first = "active";
    if(local.length === 0)
    {
        list.innerHTML = list.innerHTML +
        '<button type="button" class="list-group-item list-group-item-action"><span class="text-center">No Players</span></button>';
        return;
    }
    local.forEach(e => {
        list.innerHTML = list.innerHTML +
        '<button type="button" class="list-group-item list-group-item-action '+first+'"><span class="name">'+e.Name+'</span> <span class="time">'+e.Time+' s</span>Score: '+e.Score+'<span class="score">0</span></button>'
        first = "";
    });
}

// exe all function
Splash();
Orders();
window.addEventListener('click', FlipBlock);
save();
// splash screen
function Splash()
{
    document.querySelector('.Bstart').addEventListener('click', () => {
        var PlayerName = "";
        while(PlayerName == null || PlayerName == "" || PlayerName.includes(' '))
        {
            PlayerName = prompt("Please enter your name");
        }
        document.querySelector('.player-name').innerHTML = PlayerName;
        document.querySelector('.splash').style.display = "none";
    });
}

// main varible
var worngTires = 0;
var wrongDom = document.querySelector('.wrong');
var block = Array.from(document.querySelectorAll('.game-block'));
var memory_game = document.querySelector('.memory-game-block');

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
            }else{
                freez();
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
function freez()
{
    memory_game.classList.add('freez');
    setTimeout(() => {
        memory_game.classList.remove('freez');
    }, 600)
}
// exe all function
Splash();
Orders();
window.addEventListener('click', FlipBlock);
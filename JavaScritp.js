var currentApiURL = "";
var nextPage = "";
var previuspage = "";


function next() {
    currentApiURL = nextPage;
    FindRickandMorty();

}

function back() {
    currentApiURL =  previuspage;
    FindRickandMorty();

}

function search() {
    currentApiURL =  "https://rickandmortyapi.com/api/character";
    FindRickandMorty();

}


function FindRickandMorty()
{
    document.getElementById("results").innerHTML = "";
    
    var data = undefined;
    var request = new XMLHttpRequest();
    request.open('GET', currentApiURL, true);
    request.send();

    request.onreadystatechange = function ()
    {
       
        if (this.readyState == 4 && this.status == 200)
        {
            
    
            var resultRawData =  this.response;
            data =  JSON.parse(resultRawData);
            showApiData(data);

        }

    }

}

function showApiData (data)
{
         var element =  document.getElementById("results");
         var countingHtml = document.createElement('h4');
         countingHtml.style.color = "skyblue";
        countingHtml.innerHTML = "Cantidad de personajes encontrados: " + data.count;
        element.appendChild(countingHtml);

        for (var i = 0; i < data.results.length; i++)
        {

            var currentItem = data.results[i];
            var personaje = document.createElement('h5');
            personaje.style.color = "skyblue";
            var htmlStyle = "<hr/ ><strong>" +  currentItem.name + "</strong><br />";
            htmlStyle+= " Specie: " + currentItem.species + "</strong><br />";
            htmlStyle+=" Genero: " + currentItem.gender;
            personaje.innerHTML = htmlStyle;
                
            document.getElementById('results').appendChild(personaje);
            

        }

       
        if( data.next != null)
    {
        document.getElementById("buttonNext").style.display = "inline";
        nextpage = data.next;
        
    }
    else
    {
        document.getElementById("buttonNext").style.display = "none";
    }

    if(data.prev != null)
    {
        document.getElementById("buttonBack").style.display = "inline";
        previuspage = data.prev;
    }
    else
    {
        document.getElementById("buttonBack").style.display = "none";
    }

}

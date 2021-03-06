$(document).ready(function() {
    $("#atest").toggle(false);

    var name, age, gender, testType, testDuration, nColors, str1, str2, texts, hexes;
    $("#setColors").click(storeInput);
    $("#train").click(showHidden);
    $("#test").click(startTest);
    //$("#stop").click(stopTest);
    $("#back").click(goHome);

    //$("#stop").click(function(){
    //    $("#coltext").html("This Works!");
    //});
});

var storeInput = function() {

    name = $("#name").val();
    age = $("#age").val();
    gender = $("input[name=genderOptions]:checked").val();
    testType = $("input[name=typeOptions]:checked").val();
    testDuration = $("#testDuration").val();
    nColors = $("#number").val();

    /*
    console.log(name);
    console.log(age);
    console.log(gender);
    console.log(testType);
    console.log(testDuration);
    console.log(nColors);
    */

    str1 = ".color";
    var created = [false, false, false, false, false, false, false];
    for(var i = 1; i <= 6; ++i) {
        //console.log((str1+i));
        if(created[i]){
            $((str1+i)).colorpicker('destroy');
            created[i] = false;
        }
    }
    for(var i = 1; i <= nColors; ++i) {
        //console.log((str1+i));
        if(!created[i]){
            $((str1+i)).colorpicker({horizontal:true});
            created[i] = true;
        }
    }

    str2 = ".text";
    console.log(str2);
    for(var i = ++nColors ; i <= 6; ++i) {
        //console.log((str2+i));        
        $((str1+i)).toggle(false);
        $((str2+i)).toggle(false);
    }

};

var startTest = function() {

    $("#atest").toggle(true);
    $("#aform").toggle(false);

    hexes = [];
    texts = [];
    str1 = ".color";
    str2 = "#text";
    //console.log($("#text1").val());
    //console.log((str2+1));
    //console.log($((str2+1)).val());
    for(var i = 1; i < nColors; ++i) {
        hexes.push($((str1+i)).colorpicker('getValue'));
        console.log("pushed");
        texts.push($((str2+i)).val());
    }
    //console.log(hexes);
    //console.log(texts);

    for(var i = 1; i <= nColors; ++i) {
        var ctext = texts[i];
        var chex = hexes[i];
        console.log(ctext);
        console.log(chex);
        var button = '<button class="btn" style="background-color:' + chex + '">' + ctext + '</button>'
        $("#buttonArea").append(button);
    }


    var rand1 = getRandomInt(1, nColors);
    var rand2 = getRandomInt(1, nColors);
    while(rand2 == rand1){
        rand2 = getRandomInt(1, nColors);
    }

    console.log(rand1);
    console.log(rand2);

    //var textArea = document.createElement('p');
    //var text = "Hello world!";
    //textArea.textContent = text;
    //document.getElementById("textArea").appendChild(textArea);

    

}

// returns a random integer between min and max (both inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function goHome() {
    $("#atest").toggle(false);
    $("#aform").toggle(true);
}

function showHidden() {
    $("#atest").toggle();
}

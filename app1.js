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

};

var startTest = function() {

    $("#atest").toggle(true);
    $("#aform").toggle(false);

    hexes = [];
    texts = [];
    var count = 0;
    $("input[name=colorOptions]:checked").each(function(){
        hexes.push($(this).val());
        texts.push($(this).attr("id"));
        count += 1;
    });
    console.log(hexes);
    console.log(texts);
    console.log(count);
    console.log(nColors);
    if(count == nColors) {
        console.log("hi");
        for(var i = 0; i < nColors; ++i) {
            var btext = texts[i];
            var bhex = hexes[i];
            console.log(btext);
            console.log(bhex);
            var button = '<button class="btn" style="background-color:' + bhex + '" id="t' + btext +'">' + btext + '</button> &nbsp;'
            $("#buttonArea").append(button);
        }
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
    $("#buttonArea").html("");
}

function showHidden() {
    $("#atest").toggle();
}

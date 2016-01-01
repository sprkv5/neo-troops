$(document).ready(function() {
    $("#atest").toggle(false);

    var name, age, gender, testType, testDuration, nColors, str1, str2, texts, hexes, engine, dist;

    $("#setColors").click(storeInput);
    $("#train").click(showHidden);
    $("#test").click(startTest);
    $("#back").click(goHome);

    //$("#stop").click(function(){
    //    $("#coltext").html("This Works!");
    //});
    $("#stop").click(function(){
        $("#coltext").text("Time Up!").css("color", "black");
        $("div").remove(".testButton");
        $(".testButton").toggle(false);
        //$("#textArea").html("");
        $("#buttonArea").html("");
    });

    $("#textArea").html("");
    $("#buttonArea").html("");

    //$("#stop").click(testQuery("Time Up!", "#a47ae2"));
});

function storeInput() {

    name = $("#name").val();
    age = $("#age").val();
    gender = $("input[name=genderOptions]:checked").val();
    testType = $("input[name=typeOptions]:checked").val();
    testDuration = $("#testDuration").val();
    nColors = $("#number").val();
    //dist = Random.integer(0, nColors-1);
};

function startTest() {

    $("#textArea").html("");
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

    //console.log(hexes);
    //console.log(texts);
    //console.log(count);
    //console.log(nColors);

    if(count == nColors) {
        console.log("hi");
        for(var i = 0; i < nColors; ++i) {
            var btext = texts[i];
            var bhex = hexes[i];
            //console.log(btext);
            //console.log(bhex);
            var button = '<button class="btn testButton" style="background-color:' + bhex + '" id="t' + btext +'">' + btext + '</button> &nbsp;'
            $("#buttonArea").append(button) // inserting the colored buttons;
        }
    }

    // Display 3, 2, 1 and start test

    var countdown = 4;
    var countText = ["", "1", "2", "3", "Ready"];
    timeout();

    function timeout() {
        setTimeout(function() {
            //Do something
            testQuery(countText[countdown], "#000000");

            //Then call parent to set up loop
            if(countdown--){timeout();}
            else{$(".testButton:first").trigger("click");}
        }, 1000);
    }

    var rand1, rand2, orand1, orand2;
    $(".testButton").on("click", dispEvent);

    function dispEvent() {
        /*
        var checkVar1 = $("#coltext").css("color");
        var checkVar2 = $(this).css("background-color");
        if(checkVar1 == checkVar2) {alert("Correct");} else {alert("Wrong");}
        */

        do{
            rand1 = randomIntGen(0, nColors);
            rand2 = randomIntGen(0, nColors);
        }while(rand1 == rand2);
        console.log("hi");
        if(rand1 != rand2) {testQuery(texts[rand1], hexes[rand2]);}
    } 

    // ---
    // Figure out how to handle the colored buttons
    /*var start = new Date, totalTime, duration = testDuration * 1000;
    do{
        // The test

        var rand1 = getRandomInt(1, nColors);
        var rand2 = getRandomInt(1, nColors);
        while(rand2 == rand1){
            rand2 = getRandomInt(1, nColors);
        }
        console.log(rand1);
        console.log(rand2);

        var queryStart = new Date;
        testQuery(texts[rand1], hexes[rand2]);
        timeout();
        do {
            var buttons = document.getElementsByClassName("testButton");
            var buttonsCount = buttons.length;
            for(var i = 0; i <= buttonsCount; i++) {
                buttons[i].onclick = function() {
                    return(this.id);
                }
            }

            triggeredBy = $(".testButton").click(function() { return(this.id); });
            console.log(triggeredBy);
            totalTime = new Date - start;
        } while(totalTime < duration)
        
                    

        totalTime = new Date - start;
        var timeElapsed = totalTime / 1000;
        console.log(timeElapsed);
    } while (totalTime < duration);
    */
}

// returns a random integer between min and max (both inclusive)
function randomIntGen(min, max) {
        engine = Random.engines.mt19937().autoSeed();
        dist = Random.integer(min, max);
        return dist(engine);
}

function goHome() {
    $("#atest").toggle(false);
    $("#aform").toggle(true);
    $("#textArea").html("");
    $("#buttonArea").html("");
}

function showHidden() {
    $("#atest").toggle();
}

function testQuery(text, hex){
    $("#coltext").text(text).css("color", hex).css("font-size", "500%").css("font-weight", "bold");
}

// returns a random integer between min and max (both inclusive)
//function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min + 1) + min);
//}

//rand1 = randomIntGen(0, nColors);
//rand2 = randomIntGen(0, nColors);
//testQuery(texts[rand1], hexes[rand2]);


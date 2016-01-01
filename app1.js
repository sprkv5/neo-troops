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

    console.log("The Classic Stroop Test Report")
    console.log("Name: " + name);
    console.log("Age: " + age);
    console.log("Gender: " + gender);
    console.log("Test: " + testType);
    console.log("Duration: " + testDuration + " seconds");
    console.log("No. of Colors: " + nColors);

    hexes = [];
    texts = [];
    var count = 0;
    $("input[name=colorOptions]:checked").each(function(){
        hexes.push($(this).val());
        texts.push($(this).attr("id"));
        count += 1;
    });

    console.log("Color Names:\n" + texts);
    console.log("Color Codes:\n" + hexes);
    //console.log(count);
    //console.log(nColors);

    if(count == nColors) {
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
    var startTime, oldTime, endTime, timeElapsed, duration;
    if(testDuration) {
        duration = testDuration * 1000;
    } else {
        duration = null;
    }

    var countdown = 4;
    var countText = ["", "1", "2", "3", "Ready"];
    timeout();

    var rand1, rand2;
    function timeout() {
        setTimeout(function() {
            //Do something
            testQuery(countText[countdown], "#000000");

            //Then call parent to set up loop
            if(countdown--){timeout();}
            else{
                do{
                    rand1 = randomIntGen(0, nColors-1);
                    rand2 = randomIntGen(0, nColors-1);
                }while(rand1 == rand2);

                if(rand1 != rand2) {
                    console.log("\n---START---\n");
                    startTime = new Date;
                    oldTime = startTime;
                    if (duration) {
                        setTimeout( function() {
                            endTime = new Date;
                            console.log("\n----END----\n");
                            console.log("Time since start: " + (endTime - startTime) + "ms");
                            console.log("Time test started: " + startTime);
                            console.log("Time test ended: " + endTime);
                            $("#stop").trigger("click");
                        }, duration);
                    }
                    testQuery(texts[rand1], hexes[rand2]);
                }
            }
        }, 1000);
    }

    $(".testButton").on("click", dispEvent);

    function dispEvent() {
        currentTime = new Date;
        timeElapsed = currentTime - oldTime;
        var checkVar1 = $("#coltext").css("color");
        var checkVar2 = $(this).css("backgroundColor");
        console.log("Color of text: " + checkVar1 + "\nColor selected: " + checkVar2);
        if(checkVar1 == checkVar2) {
            console.log("Correct\n");
        } else {
            console.log("Wrong\n");
        }
        console.log("Time for Response: " + timeElapsed + " ms");
        console.log("Time since Start: " + (currentTime - startTime) + " ms");
        oldTime = currentTime;

        do{
            rand1 = randomIntGen(0, nColors-1);
            rand2 = randomIntGen(0, nColors-1);
        }while(rand1 == rand2);

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

/* CSS Hooks */
function _register_jquery_get_hex_color(newname,styleattr) {
    $.cssHooks[newname] = {
        get: function(elem) {
            if (elem.currentStyle)
                var bg = elem.currentStyle[styleattr];
            else if (window.getComputedStyle)
                var bg = document.defaultView.getComputedStyle(elem,
                    null).getPropertyValue(styleattr);
            if (bg.search("rgb") == -1)
                return bg;
            else {
                bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
            }
        }
    }
}
_register_jquery_get_hex_color("backgroundColor","background-color");
_register_jquery_get_hex_color("color","color");

/*
    _register_jquery_get_hex_color("borderColor","border-color");
    _register_jquery_get_hex_color("newName","old-name");
*/

/* $.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["background-color"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}
*/
// returns a random integer between min and max (both inclusive)
//function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min + 1) + min);
//}

//rand1 = randomIntGen(0, nColors);
//rand2 = randomIntGen(0, nColors);
//testQuery(texts[rand1], hexes[rand2]);


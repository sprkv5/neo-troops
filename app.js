$(document).ready(function() {
$("#setColors").click(storeInput);
//$("#train").click();
//$("#test").click();
});

var storeInput = function() {

    var name = $("#name").val();
    var age = $("#age").val();
    var gender = $("input[name=genderOptions]:checked").val();
    var testType = $("input[name=typeOptions]:checked").val();
    var testDuration = $("#testDuration").val();
    var nColors = $("#number").val();

    /*
    console.log(name);
    console.log(age);
    console.log(gender);
    console.log(testType);
    console.log(testDuration);
    console.log(nColors);
    */


    //$(".color1").colorpicker();
    var str = ".color"
    for(var i = 1; i <= nColors; ++i) {
        console.log((str+i));
        $((str+i)).colorpicker();
    }

    //$('select[name="colorpicker-modal-picker"]').simplecolorpicker({picker: true});
    //$('select[name="colorpicker-modal-picker"]').simplecolorpicker('selectColor', '#7bd148');
    //$('select[name="colorpicker-modal-picker"]').simplecolorpicker('destroy');

    
};



    //var clog = function() {
    //    console.log(name); // does not log name ??
    //}

    //e.preventDefault();
    //var x = $("#keyword").val();
    //var y = $("#location").val();
    //$("#keyword").attr("value", x);
    //$("#location").attr("value", y);

    //$("#test").click(clog);

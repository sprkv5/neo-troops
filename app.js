var name;


$(document).ready(function(){
  $("#setColors").click(function(e){
    e.preventDefault();

    name = $("#name").val();
    var age = $("#age").val();
    var gender = $("#gender input:radio:checked").val();
    var testType = $("#testType input:radio:checked").val();
    var testDuration = $("#testDuration").val();
    var nColors = $("#number").val();


    //var x = $("#keyword").val();
    //var y = $("#location").val();
    //$("#keyword").attr("value", x);
    //$("#location").attr("value", y);
  });
  $("#test").click(clog);
});

    var clog = function() {
        console.log(name); // does not log name ??
    }

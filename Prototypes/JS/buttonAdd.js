document.getElementById("addBox").onclick = function() {
    var form = document.getElementById("myForm");
    var input = document.createElement("input");
    input.type = "text";
    var br = document.createElement("br");
    form.appendChild(input);
    form.appendChild(br);
}
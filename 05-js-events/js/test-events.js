/* 
 * Test JS Event handling
 */

function init() {
    var aLink = document.getElementById("traditional");
    aLink.onclick = function() {
        this.style.background = "green";
        return false;
    };
    var aForm = document.getElementById("form1");
    aForm.onsubmit = function(event) {
        if (this.name.value && this.name.value.length > 0) {
            alert("Congratulations - the name is valid.", event.type);
            return true;
        }
        alert("Validation Error: Name should not be empty!");
        return false;
    };
}

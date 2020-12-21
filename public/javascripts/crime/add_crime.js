function add_criminalID_input() {
    const criminalID_input_div = document.getElementById("criminalIDs_input_div");
    var newChild = criminalID_input_div.lastElementChild.cloneNode(true);
    newChild.childNodes.forEach(n => {
        if (n.nodeName.toLowerCase() === 'input') {
            n.value = '';
        }
    })
    criminalID_input_div.appendChild(newChild);

    console.log('added cutomer_id input');
}
function remove_criminalID_input(element) {
    var parent = element.parentNode;
    // console.log(parent.parentNode);
    if (parent.parentNode.childElementCount > 1) {
        parent.remove();
        console.log("removed cutomer_id input field");
    }

}

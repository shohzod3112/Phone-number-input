let textContainer = document.querySelector(".Field_inputPlaceholder__k_sMH");
let allKey = document.querySelectorAll(".hg-standardBtn");
let clrbtn = document.querySelector(".hg-button-clear")
let deleteKey = document.querySelector(".hg-button-backspace");
let enterKey = document.querySelector(".hg-button-enter");
let chars = [];
let content = textContainer.innerText;
let isCaps = false;
let retrievedArrayString = localStorage.getItem('phoneNumbers');

localStorage.clear();
document.addEventListener('DOMContentLoaded', (event) =>
{   if(retrievedArrayString){
    let retrievedArray = JSON.parse(retrievedArrayString);
    textContainer.textContent = retrievedArray;

    console.log(textContainer.textContent != "00 000 00 00");
    if(retrievedArray.length == 9 && textContainer.textContent != "00 000 00 00"){
        
        enterKey.classList.remove("Keyboard_buttonDisabled__2KofX");
        enterKey.classList.add("Keyboard_buttonEnter__2QosB");
        enterKey.classList.add("Keyboard_button__RNPPS");
        enterKey.classList.add("EnterKey__enable");
    }

}
})
allKey.forEach(key =>
{    key.addEventListener('click', () => {
        if(content === "00 000 00 00"){
            textContainer.innerHTML = "";
            content = "";
            enterKey.classList.add("Keyboard_buttonDisabled__2KofX");
        }
        if(textContainer.innerText.length < 12){ 
        content += key.innerText;
        textContainer.innerHTML = content;
        
        if(textContainer.innerText.length == 12 && textContainer.innerText != "00 000 00 00"){
            enterKey.classList.remove("Keyboard_buttonDisabled__2KofX");
            enterKey.classList.add("Keyboard_buttonEnter__2QosB");
            enterKey.classList.add("Keyboard_button__RNPPS");
            enterKey.classList.add("EnterKey__enable");
            chars = content.replace(/\s+/g, ""); 
            console.log(chars);
        }
        else {
            enterKey.classList.add("Keyboard_buttonDisabled__2KofX");
            enterKey.classList.remove("Keyboard_buttonEnter__2QosB");
            enterKey.classList.remove("Keyboard_button__RNPPS");
            enterKey.classList.remove("EnterKey__enable");
        }
        if(textContainer.innerText.length == 2 || textContainer.innerText.length == 6 || textContainer.innerText.length == 9)
            {
              textContainer.innerHTML = textContainer.innerText + "&nbsp";
              content =textContainer.innerText;
              console.log("textContainer.innerText.length = " + textContainer.innerText.length);
            }
        console.log("chars " + chars);
}})
});

deleteKey.addEventListener("click",() =>
{   content = textContainer.innerText.slice(0,textContainer.innerText.length-1);
    console.log("Content" + content);
    textContainer.innerText = content;

    if(content.length != 9 && textContainer.innerText != "00 000 00 00"){
        enterKey.classList.add("Keyboard_buttonDisabled__2KofX");
        enterKey.classList.remove("Keyboard_buttonEnter__2QosB");
        enterKey.classList.remove("Keyboard_button__RNPPS");
        enterKey.classList.remove("EnterKey__enable");
    }
})


clrbtn.addEventListener("click", () =>
{   textContainer.textContent = '';
    content = "";
    chars = [];
    enterKey.classList.add("Keyboard_buttonDisabled__2KofX");
    enterKey.classList.remove("Keyboard_buttonEnter__2QosB");
    enterKey.classList.remove("Keyboard_button__RNPPS");
    enterKey.classList.remove("EnterKey__enable");
})


enterKey.addEventListener("click",function()
{   phoneNumber = JSON.stringify(chars);
    localStorage.setItem('phoneNumbers', phoneNumber)
    window.electronAPI.on_payment_pressed();
})
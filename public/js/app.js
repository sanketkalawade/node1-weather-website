const searchInput = document.querySelector('input');
const formElement = document.querySelector('form');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

messageOne.textContent = "";
messageTwo.textContent = "";

formElement.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = searchInput.value;
    messageOne.textContent = "Loading...!"
    messageTwo.textContent = "";
    fetch('/weather?address='+location).then(Response =>{
    Response.json().then(parsedData=>{
        if (parsedData.error) {
            messageOne.textContent = parsedData.error;
            messageTwo.textContent = "";
        } else {
            messageOne.textContent = parsedData.location;
            messageTwo.textContent = parsedData.forcast.summery+" & current temperature is "+parsedData.forcast.current_temp+" degree celsius";
            
        }
    })
})
    
})
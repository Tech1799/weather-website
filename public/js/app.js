
const weatherForms = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForms.addEventListener('submit', (e)=>{
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';

    e.preventDefault();
    const location = search.value;
    console.log(location);

    fetch('/weather?address=' + encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})
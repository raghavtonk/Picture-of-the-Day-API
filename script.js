const submitbtn = document.getElementById('submitbtn');

submitbtn.addEventListener("click", (e)=>{
    let submitdate = document.getElementById('search-input').value;
    getImageOfTheDay(submitdate);
    e.stopPropagation();
});
var method = "GET";
const key = 
"6X4AlvSJXea4LGedtPKx1oIA0VuL7hnEmsZUDvbA";

var url = 
"https://api.nasa.gov/planetary/apod?api_key="
+ key + "&date=";
var mode = true;


getCurrentImageOfTheDay();
function getCurrentImageOfTheDay(){
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();
    const fullcurrentdate = year+"-"+month+"-"+day;
    
    htlmRequest(method,url+fullcurrentdate,mode).then((data)=>{
        document.getElementById('data_date').innerHTML="NASA Picture of the Day"
        document.getElementById('title').innerHTML=data.title;
        document.getElementById('data-image').src =data.url;
        document.getElementById('data-information').innerHTML=data.explanation;
    });
}
function update(data){
    document.getElementById('data_date').innerHTML="Picture On " + data.date;
    document.getElementById('title').innerHTML=data.title;
    document.getElementById('data-image').src =data.url;
    document.getElementById('data-information').innerHTML=data.explanation;
    saveSearch(data);
    
}
function saveSearch(data){
    var existingEntries = JSON.parse(localStorage.getItem("date") || '[]');

    if (!existingEntries.includes(data.date)) {
        existingEntries.push(data.date);
        localStorage.setItem("date", JSON.stringify(existingEntries));
    }
     jsonarray =  JSON.parse(localStorage.getItem("date"));
    addSearchToHistory(jsonarray);
    
}
function addSearchToHistory(jsonarray){
    let arraylength = jsonarray.length;
    let previous_search = document.getElementById('previous_search');
    previous_search.innerHTML="";
    const list = document.createElement('ul');
    list.id = "search-history";
    previous_search.appendChild(list);
    for (let i =0 ; i < arraylength ; i++){
        const li = document.createElement('li');
        li.innerHTML= jsonarray[i];
        li.id= list+i;
        li.addEventListener("click", (e)=>{
            getImageOfTheDay(jsonarray[i]);
            e.stopPropagation();
        });
        list.appendChild(li);
    }
}
function getImageOfTheDay(date){
    
    
    htlmRequest(method,url+date,mode).then((data)=>{
        update(data);
    });
}
function htlmRequest(method, url, mode){
    return new Promise((resolve, reject) => {
        
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var data = JSON
                    .parse(this.response);
                   
                    resolve(data);
                }
            }
        }
        req.open(method, url, mode);
        req.send();
    });
}
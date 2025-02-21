const connection = new signalR.HubConnectionBuilder()
.withUrl("/platformHub")
.configureLogging(signalR.LogLevel.Information)
.build();

async function start() {
  
try {
    console.log("NESDSADASDaS");
    await connection.start();
    console.log("SignalR Connected.");
} catch (err) {
    console.log(err);
    setTimeout(start, 5000);
}
};

connection.onclose(async () => {
await start();
});

start();

let counter1 = 0;
let notify = document.getElementById("notification");

console.log(notify);

function makenotify(message, count) {
    if (notify.hasChildNodes()) 
    {
        while (notify.firstChild) {
            notify.removeChild(notify.firstChild);
        }
    }
    //id:2
        
    fetch("https://localhost:7051/Publisher/postojiIgrica/"+message)
    .then(response => response.json())
        .then(data => {
            if(data == true)
                {
                    fetch("https://localhost:7051/Publisher/vratiIgricu/"+message)
                    .then(response => response.text())
                        .then(result => {
                            console.log(result);
                            
                            let nesto = result;
                            let poruka = "Igra "+ nesto +" je na popustu!";
    
                            console.log(poruka);
                            
                            notify.innerHTML += makeNotification(count, poruka);
                        })
                    
                }
        })
}


let m = ""
connection.on("ReceiveMessage", (message) => {
     
    makenotify(message, counter1);
    counter1++;
    
});

//notification:0
let notification = `    <div id="notification:$counter1$" class="toastNotifikacija show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <strong class="me-auto">Obavestenje</strong>
                            <small>$time$</small>
                            <button type="button" id="button:$counter1$" class="btn-close">
                        </div>
                        <div class="toast-body">
                            $message$
                        </div>
                    </div>`

var closeBtn = document.getElementById("button:$counter1$");
closeBtn.onclick() = function () {

}

function makeNotification(counter1, message) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let result = notification.replace("$counter1$", counter1)
        .replace("$time$", time)
        .replace("$message$", message)

        
    return result;
}


let closeButton = document.getElementById(`button:${counter1}`);
if (closeButton) {
    closeButton.onclick = function() {
        removeNotification(counter1);
    };
} else {
    console.error(`Button with id button:${counter1} not found.`);
}


function removeNotification(counter1) {
    let notificationElement = document.getElementById(`notification:${counter1}`);
    if (notificationElement) {
        notificationElement.remove();
    } else {
        console.error(`Notification with id notification:${counter1} not found.`);
    }
}
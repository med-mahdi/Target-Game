




// Check if the user he win
function win(){
    var targets_num = document.getElementById("allTargets").innerHTML
    var target_now = document.getElementById("target-now").innerHTML

    if (targets_num != 0 && target_now != 0){
        if (targets_num === target_now){
            return true
        };
    }

    else{
        return false
    }
}






// This For The Time Counter
function timeCount(){
    var secValuer = parseInt(document.getElementById("timeout-sec").innerHTML)
    secValuer += 1
    return document.getElementById("timeout-sec").innerHTML = secValuer;
}




// Display The Danger Sign That THE user input above the maximum possible cible number
document.querySelector("input[type=number]").addEventListener("keyup" , function(){
    var target_count = document.getElementById("count_target");
    var targetbox = document.querySelector(".box-input");

    if (target_count.value > 25){
        targetbox.style.backgroundColor = "#FB000024";
        target_count.value = 25;
    }
})








// This Section Return The Color of The Field To White (Possibility To Be Red From The Function Above)
document.querySelector("input[type=number]").addEventListener("mouseout" , function(){
    var target_count = document.getElementById("count_target");
    var targetbox = document.querySelector(".box-input");

    targetbox.style.backgroundColor = "#f5f5f5";
})








// This Function Return random position (X & Y)
function randomPostion(){
    var x = parseInt(Math.random() * 100)
    var y = parseInt(Math.random() * 100)
    var result = []

    if (x <= 90 && y <= 90){
        result.push(x)
        result.push(y)
    }
    
    return result
}







// This check if iS tHERE a Existant Cible
function gameHasTargets(){
    var targets = document.querySelectorAll(".circle")
    if (targets.length === 0){
        return true
    }
    else{
        return false
    }
}







// function That Delete The OLd Targetes
function deleteAllTargets(){
    var boxGame = document.querySelector(".card-game")
    var targets = document.querySelectorAll(".circle");
    var i = 0;

    for (i; i < targets.length ; i++){
        boxGame.removeChild(targets[i])
    }
}



//  Check if time is start counting
function isBegTime(){
    var timeNow = document.getElementById("timeout-sec").innerHTML;
    if (timeNow == 0){
        return true
    }
    else{
        return false
    }
}





// This Function display how many target are last
function displayTargetRemain(){
    var circles = document.querySelectorAll(".circle");
    var count = 0;


    for (circle of circles){
        if (circle.style.display == "none"){
            count += 1
        };
    }

    document.getElementById("target-now").innerHTML = count;
}





// This Function Control The Click Target
function clickTarget(){
    var all_circles = document.querySelectorAll(".circle")
    all_circles.forEach(function(ele){
        ele.addEventListener("click",function(){
            ele.style.display = "none";
            displayTargetRemain()   
        })
    })
}




//  Function for display Time Logic
    






// This The Logic Of The Game
document.getElementById("btn-new-game").addEventListener("click" , function(){
    var gameBox = document.querySelector(".card-game");
    var cible_number = document.querySelector(".box-input input").value;
    var usedPos = []
    var colors = ['red','blue','black','#543BD8','#a64dff',"#ff6666",' #47d147',"#ff5050","#004080","#bf00ff","#cc6699","#ff0066"," #cc6600"," #80ff00","#ff9900","#808000","#009933","#00cccc","#6600ff","#ff33cc","#527a7a"," #990033","#4700b3","#66cc00","#00cc44"]
    var i = 0;



    animationBar()
    // display the number of target The User Choose
    document.getElementById("allTargets").innerHTML = cible_number;
    
    // display the number of target The User Choose
    if (isBegTime() == true){
        var displayTime = setInterval(timeCount,1000)
    }
    else{
        document.getElementById("timeout-sec").innerHTML = 0;
        window.clearInterval(displayTime);
        console.log("time clear out");
    }


    // Remove All The Old Target
    if (gameHasTargets() == false){
        deleteAllTargets();
    }


    // Create new Targets
    for (i;i < cible_number ; i++){
        var new_circle = document.createElement("div");
        new_circle.className = "circle";
        gameBox.appendChild(new_circle);

        var positions = randomPostion()
        

        if (positions in usedPos == false){
            usedPos.push(positions)
            
            var left_pos = positions[0]
            var top_pos = positions[1]
            new_circle.style.left = left_pos + "px";
            new_circle.style.top = top_pos + "px";
            new_circle.style.backgroundColor = colors[i];
        }
    }
    
    clickTarget();

    var check = setInterval(function(){
        var winn = win();
        if (winn == true){
            var timeNow = document.getElementById("timeout-sec");

            alert("You WIn in " + timeNow.innerHTML + " Seconds");
            
            //  Delete all records
            // Stop The Time YOU End
            window.clearInterval(displayTime)
            window.clearInterval(check)
            deleteRecords();
            
        }
    },500)
})



// This Function delete All Recordes For Time
function deleteRecords(){
    document.getElementById("timeout-sec").innerHTML = "0";
    document.getElementById("target-now").innerHTML = "0";
    document.getElementById("allTargets").innerHTML = "0";
}



//  This Function for animationBar Every Time we started New Game
function animationBar(){
    var bar = document.querySelector(".bar");
    var bar_width = bar.style.width;
    if (bar_width != "100%"){
        gsap.to(bar,1,{width:"100%"})
    }
    else{
        bar.style.width = "10%";
        gsap.to(bar,1,{width:"100%"})
    }
}













// Last Edit
//  I add span <span id="timeout-sec"></span> sec;
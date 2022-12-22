// select elemens 

let spanNmber = document.querySelector(".answernumb span")
let ballspan = document.querySelector(".number .spans")
let cardnumber = document.querySelector(".number")
let taimer = document.querySelector(".taimer")
let evaluation = document.querySelector(".result .evaluation")
let resultdiv = document.querySelector(".result")
let question_box = document.querySelector(".question-box")
let answer_area = document.querySelector(".answer-box")
let submit = document.querySelector(".submit-send")


// options 

let currentidex = 0
let rightAnsower = 0
let timedown ;

function getQustions(){

    let myRequest = new XMLHttpRequest()

    myRequest.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200){
            let qustionsob = JSON.parse(this.responseText)
            let qustionsobnumb = qustionsob.length



            // creat bull  + numqustionbell 
            creatbull(qustionsobnumb)

            addDataQustions(qustionsob[currentidex], qustionsobnumb)


            time(15, qustionsobnumb)
            

            // submitClick //
            submit.onclick = function(){

                let rightAnsower = qustionsob[currentidex].correct_answer

                currentidex++

                checkAnswer(rightAnsower, qustionsobnumb)

                question_box.innerHTML = ""
                answer_area.innerHTML = ""
                addDataQustions(qustionsob[currentidex], qustionsobnumb)

                handelcard()
                clearInterval(timedown)
                time(15, qustionsobnumb)

                showRusalt(qustionsobnumb)
            }

        }
    }

    myRequest.open("GET","HTMLQuestions.json",true)
    myRequest.send()

}
getQustions()
function creatbull(num){
    spanNmber.innerHTML = num;

    // creatspans
    for (let i=0; i <= num; i++){
        let spancard = document.createElement("span")
        
        if (i === 0){
            spancard.className = "active"
        }

        ballspan.appendChild(spancard)
    }
}

function addDataQustions (obj, count){
    // creatHtmlTitle 
    if (currentidex < count){

        let qustiontitle = document.createElement("h2")
        let qustionH2 = document.createTextNode(obj.title)
        qustiontitle.appendChild(qustionH2)
        question_box.appendChild(qustiontitle)
        
        for (let i = 1; i<= 4; i++){
            let mainDiv = document.createElement("div")
            mainDiv.className = "answer"
    
            let radioInput = document.createElement("input")
            radioInput.name = 'question'
            radioInput.type = 'radio'
            radioInput.id = `a_${i}`
            radioInput.dataset.answer = obj[`a_${i}`]   
    
            if (i === 1){
                radioInput.checked = true
            }
    
            // creat labal 
            let lAbal = document.createElement("label")
            lAbal.htmlFor = `a_${i}`
            let thelabalText = document.createTextNode(obj[`a_${i}`])
            lAbal.appendChild(thelabalText)
            mainDiv.appendChild(radioInput)
            mainDiv.appendChild(lAbal)
            answer_area.appendChild(mainDiv)
        }    
    
    }

}









function checkAnswer(Ransower, count){ 
    let answerAll = document.getElementsByName("question")
    let chooseAnswoer;

    for (let i = 0; i < answerAll.lengthl; i++ ){
        if (answerAll[i].checked){
            chooseAnswoer = answerAll[i].dataset.answer
        }
    }
    console.log(chooseAnswoer)
}


function checkAnswer(rAqus, count){
    let answers = document.getElementsByName("question")
    let checkedAnsower;

    for (let i = 0; i < answers.length; i++){
        if (answers[i].checked){
            checkedAnsower = answers[i].dataset.answer
        }
    }
   
    if  (rAqus === checkedAnsower){
        rightAnsower++
        
    }
}

function handelcard(){
    let cardspans = document.querySelectorAll(".number .spans span")
    let arrayspans = Array.from(cardspans)
    arrayspans.forEach((span, index) =>{
        if (currentidex == index){
            span.className = "active"
        }
    })
}



function showRusalt(count){
    let RusaltShow
    if (currentidex === count){
        question_box.remove()
        answer_area.remove()
        submit.remove()
        cardnumber.remove()
        taimer.remove()

        if (rightAnsower > count / 2 && rightAnsower < count){
            RusaltShow =  `  ${rightAnsower}  <span class "good" style=" padding-left: 10px " >كويس جاوبت علي </span> `
        }

        else if (rightAnsower ===  count){
            RusaltShow = `<span class "ممتاز يبني والله جاوبت كل الاجابات صحيحة الله ينور ">Prefect</span>`
        }
        else {
            RusaltShow = `   ${rightAnsower}    <span class "bad"  style=" padding-left: 10px ">سئ لقد جاوبت فقط علي </span>   `
        }

        resultdiv.innerHTML = RusaltShow
        resultdiv.style.padding = '10px'
    }
}


function time(duration, count){
    if (currentidex < count){
        let seconds;
        timedown = setInterval(function (){
            seconds = parseInt(duration / 60 * 60)
            taimer.innerHTML = `${seconds}`

            if (seconds <= 5){
                taimer.style.color= "red"
            }else{
                taimer.style.color= "cadetblue"
            }

            if (--duration < 0){
                clearInterval(timedown)
                submit.click()
            }

        },1000)
    }
}
// const getQuestions=()=>{
//     const URL='https://opentdb.com/api.php?amount=10&category=18&type=multiple'

// fetch(URL)
// .then((result=> result.json()))
// .then((resJson)=>{
//     console.log(resJson.results)
//     const result = resJson.results
//     const correct = result[0].correct_answer
//     const incorrect = result[0].incorrect_answers
//     console.log(result[0].question)
//     console.log(correct)
//     console.log()//
// })
// .catch((error)=> console.log(error));
// }
// getQuestions();
const question = document.querySelector("#question")
const answers = document.querySelector("#answers")
const next = document.querySelector("#next")
const scoreSpan = document.querySelector('.score')
const updateQuestion=()=>{
    question.innerHTML=updatedResult[index].question
    for(let i=0; i<4; i++){
     
        const div = document.createElement('div')
        // * Math.floor() rounds down, Math random gets a random number  / mult by the length of the question result
        const randomNum = Math.floor(Math.random()*updatedResult[index].incorrect_answers.length)
        
        div.innerHTML= updatedResult[index].incorrect_answers.splice(randomNum, 1)
        answers.append(div) 
      
            }   
}
let score = 0;
let updatedResult;
let index = 0; // will represent the question that we're on
//* Using Async Awaits --> only inside of asyn function
const getQuestions = async ()=>{
    const quest = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    const questJson = await quest.json()
    // console.log(questJson)
    const results = questJson.results
   
    updatedResult = results.map((quest)=>{
        quest.incorrect_answers.push(quest.correct_answer)
      return quest
    })
    console.log(updatedResult)

//     question.innerHTML=updatedResult[index].question //?to update each question starting at the specific "[index]" or that question. 
//     // looping 4 times -->? numb of choices 
//     for(let i=0; i<4; i++){
     
// const div = document.createElement('div')
// // * Math.floor() rounds down, Math random gets a random number  / mult by the length of the question result
// const randomNum = Math.floor(Math.random()*updatedResult[index].incorrect_answers.length)

// div.innerHTML= updatedResult[index].incorrect_answers.splice(randomNum, 1)
// answers.append(div) 
   updateQuestion()
//     }   
}

next.addEventListener('click', () =>{
index++
//when we reach the end
if(index===updatedResult.length){
question.innerHTML='GAMEOVER'
next.style.display='none'

const refreshBtn = document.createElement('button')
refreshBtn.innerHTML="PLay Again!" //!
refreshBtn.setAttribute('type', "submit")
answers.before(refreshBtn)
refreshBtn.addEventListener('click', () =>{
    window.location.reload("Refresh")
})
}
answers.innerHTML=''
question.innerHTML= updatedResult[index].question
answers.style.pointerEvents = 'auto'
updateQuestion()
})
 answers.addEventListener('click', (event)=>{
    // console.log(event.target.innerHTML)
    console.log(updatedResult[index].difficulty)
    if(event.target.innerHTML === updatedResult[index].correct_answer ){
        if(updatedResult[index].difficulty === "easy"){
score += 10
        }
        else if(updatedResult[index].difficulty === "medium"){
            score += 15
        }
        else if(updatedResult[index].difficulty === 'hard'){
            score += 20
        }
scoreSpan.innerHTML= score
event.target.style.backgroundColor= '#00E35F'
event.target.style.border = '2px solid green'
scoreSpan.innerText = score
    }
    else{
        event.target.style.backgroundColor= '#E30049'
        event.target.style.border = '#880000'
        score -= 2 // if wrong deduct points , -2
        scoreSpan.innerText = score
    }
    answers.style.pointerEvents = 'none'
 })

 

//! Animaion and sound

//! Harder dificulty = more points 


getQuestions()




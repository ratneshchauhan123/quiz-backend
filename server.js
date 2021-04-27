const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const PORT = 4000;
// app.use(json)
const Quiz = require('./models/Quiz')
app.get('/getQuiz', async (req, res)=>{

    const data = await Quiz.find({difficulty: req.query.difficulty});
    var question=[]
    if(data.length){
        data.map(item => {
            ri = Math.floor((Math.random() * 3));
            item.incorrect_answers.push(item.incorrect_answers[ri]);
            item.incorrect_answers[ri] = item.correct_answer
            item.option = item.incorrect_answers;
        })
        for(let i =0 ; i < data.length ; i++){
            question.push({
                question: data[i].question,
                options: data[i].incorrect_answers,
                id: data[i]._id,
                difficulty: data[i].difficulty
            })
        }
      
        return res.json({
            status: 200,
            quiz: question,
            message: 'quiz got successfully'
        })
    }
    return res.json({
        status: 404,
        message: 'quiz not found'
    })
    
})


app.get('/getCorrectAnswerById', async (req, res) =>{
    const data = await Quiz.find({_id: req.query.id});
    if(data.length){
        return res.json({
            status: 200,
            answer: data[0].correct_answer,
            message: 'correct answer found successfully'
        })
    } else{
        return res.json({
            status: 404,
            message: 'unbale to find data'
        })
    }
})


app.post('/answers', async (req, res)=>{
    var marks = 0
    for(let i=0 ; i < req.body.answers.length ; i++){
        const data = await Quiz.find({_id: req.body.answers[i].id, correct_answer: req.body.answers[i].answer});  
        if(data.length){
            marks++;
        }
    }
    return res.json({
        status: 200,
        message: 'answers found successfully',
        marks: marks
    })
})

app.listen(PORT, ()=> {
    console.log('server is running on ',PORT);
})
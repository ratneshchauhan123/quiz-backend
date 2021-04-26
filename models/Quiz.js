const db = require('../db');

const quizz = new db.Schema({
    category: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String]
  })
  const Quiz = db.model('Quiz', quizz)
  console.log(Quiz)
  module.exports = Quiz;



//   const user = new Quiz({
//     category: "General Knowledge",
//     difficulty: "easy",
//     question: "According to the nursery rhyme, what fruit did Little Jack Horner pull out of his Christmas pie?",
//     correct_answer: "Plum",
//     incorrect_answers: [
//        "Apple",
//        "Peach",
//        "Pear"
//     ]
//  })
  
//   user.save((err, user)=>{
//     if(err){
//       console.log(err)
//     } else{
//       console.log(user)
//     }
//   })

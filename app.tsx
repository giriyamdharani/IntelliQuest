import React from 'react';
import { QuizStart } from './components/QuizStart';
import { QuizHeader } from './components/QuizHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuizResults } from './components/QuizResults';
import { useQuiz } from './hooks/useQuiz';
import { sampleQuiz } from './data/quizData';

function App() {
  const { 
    quizState, 
    hasStarted, 
    currentTime, 
    startQuiz, 
    answerQuestion, 
    getQuizResult, 
    resetQuiz 
  } = useQuiz(sampleQuiz);

  const getCurrentQuestion = () => {
    return sampleQuiz.questions[quizState.currentQuestionIndex];
  };

  const getTimeRemaining = () => {
    if (!hasStarted || quizState.isComplete) return sampleQuiz.timeLimit!;
    
    const questionStartTime = quizState.startTime + (quizState.currentQuestionIndex * sampleQuiz.timeLimit! * 1000);
    const elapsed = Math.floor((currentTime - questionStartTime) / 1000);
    return Math.max(0, sampleQuiz.timeLimit! - elapsed);
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <QuizStart quiz={sampleQuiz} onStart={startQuiz} />
      </div>
    );
  }

  if (quizState.isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <QuizResults result={getQuizResult()} onRestart={resetQuiz} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="container mx-auto py-8">
        <QuizHeader
          title={sampleQuiz.title}
          currentQuestion={quizState.currentQuestionIndex + 1}
          totalQuestions={sampleQuiz.questions.length}
          timeRemaining={getTimeRemaining()}
          score={quizState.score}
        />
        
        <QuestionCard
          question={getCurrentQuestion()}
          onAnswer={answerQuestion}
          timeLimit={sampleQuiz.timeLimit!}
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={sampleQuiz.questions.length}
        />
      </div>
    </div>
  );
}

export default App;
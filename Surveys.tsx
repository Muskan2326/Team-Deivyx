import React, { useState } from 'react';
import { ClipboardList, ChevronRight, Clock, CheckCircle, Heart, Brain, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Survey {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  estimatedTime: string;
  questions: number;
  category: string;
  completed: boolean;
  gradient: string;
  color: string;
}

const surveys: Survey[] = [
  {
    id: 'phq9',
    title: 'PHQ-9 Depression Screening',
    description: 'A brief questionnaire to help identify symptoms of depression and track your mental health over time.',
    icon: Heart,
    estimatedTime: '3-5 min',
    questions: 9,
    category: 'Mental Health',
    completed: false,
    gradient: 'from-destructive/20 to-destructive/10',
    color: 'destructive'
  },
  {
    id: 'gad7',
    title: 'GAD-7 Anxiety Assessment',
    description: 'Identify symptoms of generalized anxiety disorder and measure the severity of anxiety symptoms.',
    icon: Brain,
    estimatedTime: '2-4 min',
    questions: 7,
    category: 'Mental Health',
    completed: true,
    gradient: 'from-primary/20 to-primary/10',
    color: 'primary'
  },
  {
    id: 'ghq',
    title: 'General Health Questionnaire',
    description: 'Assess overall psychological well-being and identify potential mental health concerns.',
    icon: CheckCircle,
    estimatedTime: '5-8 min',
    questions: 12,
    category: 'General Wellness',
    completed: false,
    gradient: 'from-secondary/20 to-secondary/10',
    color: 'secondary'
  },
  {
    id: 'food',
    title: 'Nutrition & Eating Habits',
    description: 'Evaluate your eating patterns, nutrition habits, and relationship with food.',
    icon: Utensils,
    estimatedTime: '4-6 min',
    questions: 15,
    category: 'Lifestyle',
    completed: false,
    gradient: 'from-accent/20 to-accent/10',
    color: 'accent'
  }
];

const completionStats = {
  totalSurveys: surveys.length,
  completedSurveys: surveys.filter(s => s.completed).length,
  lastCompleted: 'GAD-7 Assessment - 2 days ago'
};

export default function Surveys() {
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const completionPercentage = (completionStats.completedSurveys / completionStats.totalSurveys) * 100;

  if (selectedSurvey) {
    return (
      <SurveyForm 
        survey={selectedSurvey} 
        onBack={() => setSelectedSurvey(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/30 rounded-full mb-4">
            <ClipboardList className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Mental Health Assessments</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Wellness Surveys
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take evidence-based mental health assessments to better understand your well-being and track your progress over time.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="wellness-card mb-8 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Your Progress
            </CardTitle>
            <CardDescription>
              Track your assessment completion and wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {completionStats.completedSurveys}/{completionStats.totalSurveys}
                </div>
                <div className="text-sm text-muted-foreground">Surveys Completed</div>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{Math.round(completionPercentage)}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Last completed: {completionStats.lastCompleted}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Survey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {surveys.map((survey, index) => {
            const Icon = survey.icon;
            return (
              <Card 
                key={survey.id}
                className={`wellness-card cursor-pointer group hover:border-${survey.color}/30 bg-gradient-to-br ${survey.gradient}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedSurvey(survey)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${survey.color} to-${survey.color}/80 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      {survey.completed ? (
                        <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className={`border-${survey.color}/30 text-${survey.color}`}>
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {survey.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {survey.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {survey.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClipboardList className="w-3 h-3" />
                        {survey.questions} questions
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-muted/50 rounded-full">
                      {survey.category}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className={`w-full border-${survey.color}/30 text-${survey.color} hover:bg-${survey.color}/10 group-hover:bg-${survey.color}/20`}
                  >
                    {survey.completed ? 'Retake Survey' : 'Start Assessment'}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="wellness-card bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                Why Take These Assessments?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These evidence-based tools help you understand your mental health better, track changes over time, 
                and identify when you might benefit from additional support or professional help.
              </p>
            </CardContent>
          </Card>

          <Card className="wellness-card bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                Your Privacy Matters
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All survey responses are confidential and stored securely. Only aggregate, anonymous data 
                is used to improve campus mental health resources and support services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface SurveyFormProps {
  survey: Survey;
  onBack: () => void;
}

function SurveyForm({ survey, onBack }: SurveyFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  // Mock questions for demo - in real implementation, these would come from a database
  const questions = [
    "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    "Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?",
    "Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?",
    "Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?"
  ];

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    return (
      <div className="min-h-screen pt-20 pb-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">Survey Complete!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for taking the {survey.title}. Your responses have been saved securely.
            </p>
            <div className="space-y-4">
              <Button onClick={onBack} className="bg-primary hover:bg-primary-glow">
                View All Surveys
              </Button>
              <p className="text-sm text-muted-foreground">
                Your results will be available in your dashboard within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-primary"
          >
            ← Back to Surveys
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
              {survey.title}
            </h1>
            <p className="text-muted-foreground mb-6">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round(progress)}% Complete
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="wellness-card max-w-3xl mx-auto animate-fade-in-up">
          <CardContent className="pt-8">
            <div className="space-y-8">
              <h2 className="text-xl font-medium text-foreground leading-relaxed text-center">
                {questions[currentQuestion]}
              </h2>
              
              <div className="grid gap-3">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`
                      p-4 rounded-xl border-2 text-left transition-all
                      ${answers[currentQuestion] === option.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-4 h-4 rounded-full border-2 flex items-center justify-center
                        ${answers[currentQuestion] === option.value
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                        }
                      `}>
                        {answers[currentQuestion] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-3xl mx-auto mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className="bg-primary hover:bg-primary-glow"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Survey' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
}
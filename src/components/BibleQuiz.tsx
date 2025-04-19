import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Divider,
  Stack,
  Chip,
  IconButton,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { QuizItem, QuizAnswer, QuizResultStats } from '../types/quiz';
import quizData from '../data/bibleQuiz.json';
import { FontSizeContext } from '../App';

export const BibleQuiz: React.FC = () => {
  const { fontSize } = useContext(FontSizeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 퀴즈 데이터
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStats, setQuizStats] = useState<QuizResultStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    skippedAnswers: 0
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');

  // 퀴즈 데이터 로드
  useEffect(() => {
    setQuizzes(quizData as QuizItem[]);
    initializeUserAnswers(quizData as QuizItem[]);
  }, []);

  // 사용자 응답 초기화
  const initializeUserAnswers = (quizItems: QuizItem[]) => {
    const initialAnswers: QuizAnswer[] = quizItems.map(quiz => ({
      quizId: quiz.id,
      userAnswer: null,
      isCorrect: false,
      attempted: false
    }));
    setUserAnswers(initialAnswers);
    setQuizStats({
      totalQuestions: quizItems.length,
      correctAnswers: 0,
      incorrectAnswers: 0,
      skippedAnswers: quizItems.length
    });
  };

  // 현재 퀴즈
  const currentQuiz = quizzes[currentQuizIndex];
  const currentAnswer = userAnswers.find(answer => 
    currentQuiz && answer.quizId === currentQuiz.id
  );

  // 다음 퀴즈로 이동
  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setShowExplanation(false);
      setTextAnswer('');
    } else {
      calculateResults();
      setShowResults(true);
    }
  };

  // 이전 퀴즈로 이동
  const handlePrevQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setShowExplanation(false);
      setTextAnswer('');
    }
  };

  // 퀴즈 응답 처리
  const handleAnswerSubmit = () => {
    if (!currentQuiz) return;

    let userAnswer: string | boolean | null = null;
    let isCorrect = false;

    // 퀴즈 유형에 따른 답변 처리
    if (currentQuiz.type === 'multiple-choice') {
      userAnswer = currentAnswer?.userAnswer || null;
      isCorrect = userAnswer === currentQuiz.answer;
    } else if (currentQuiz.type === 'fill-blank') {
      userAnswer = textAnswer.trim();
      isCorrect = userAnswer.toLowerCase() === (currentQuiz.answer as string).toLowerCase();
    } else if (currentQuiz.type === 'true-false') {
      userAnswer = currentAnswer?.userAnswer || null;
      isCorrect = userAnswer === currentQuiz.answer;
    }

    // 사용자 응답 업데이트
    const updatedAnswers = userAnswers.map(answer => {
      if (answer.quizId === currentQuiz.id) {
        return {
          ...answer,
          userAnswer,
          isCorrect,
          attempted: true
        };
      }
      return answer;
    });

    setUserAnswers(updatedAnswers);
    setShowExplanation(true);
  };

  // 다중 선택 응답 처리
  const handleMultipleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    
    const updatedAnswers = userAnswers.map(answer => {
      if (currentQuiz && answer.quizId === currentQuiz.id) {
        return {
          ...answer,
          userAnswer: selectedValue,
          attempted: false,
          isCorrect: false
        };
      }
      return answer;
    });
    
    setUserAnswers(updatedAnswers);
  };

  // 참/거짓 응답 처리
  const handleTrueFalseChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue === null) return;
    
    const boolValue = newValue === 'true';
    
    const updatedAnswers = userAnswers.map(answer => {
      if (currentQuiz && answer.quizId === currentQuiz.id) {
        return {
          ...answer,
          userAnswer: boolValue,
          attempted: false,
          isCorrect: false
        };
      }
      return answer;
    });
    
    setUserAnswers(updatedAnswers);
  };

  // 텍스트 입력 처리 (빈칸 채우기)
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextAnswer(event.target.value);
  };

  // 퀴즈 결과 계산
  const calculateResults = () => {
    const correct = userAnswers.filter(answer => answer.isCorrect).length;
    const attempted = userAnswers.filter(answer => answer.attempted).length;
    
    setQuizStats({
      totalQuestions: quizzes.length,
      correctAnswers: correct,
      incorrectAnswers: attempted - correct,
      skippedAnswers: quizzes.length - attempted
    });
  };

  // 퀴즈 재시작
  const handleRestartQuiz = () => {
    initializeUserAnswers(quizzes);
    setCurrentQuizIndex(0);
    setShowResults(false);
    setShowExplanation(false);
    setTextAnswer('');
  };

  // 정답률 계산
  const calculatePercentage = () => {
    if (quizStats.totalQuestions === 0) return 0;
    return Math.round((quizStats.correctAnswers / quizStats.totalQuestions) * 100);
  };

  // 결과 메시지
  const getResultMessage = () => {
    const percentage = calculatePercentage();
    if (percentage >= 90) return '대단해요! 성경 지식이 뛰어납니다!';
    if (percentage >= 70) return '좋은 성적이네요! 성경에 대해 잘 알고 있습니다.';
    if (percentage >= 50) return '괜찮은 결과입니다. 조금 더 공부해 보세요.';
    return '더 많은 성경 공부가 필요합니다. 화이팅!';
  };

  if (showResults) {
    return (
      <Box sx={{ p: 2, maxWidth: '100%' }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: fontSize + 8 }}>
            퀴즈 결과
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <LinearProgress 
              variant="determinate" 
              value={calculatePercentage()} 
              color={calculatePercentage() >= 70 ? "success" : calculatePercentage() >= 50 ? "info" : "error"}
              sx={{ height: 10, borderRadius: 5, mb: 1 }}
            />
            <Typography variant="h6" align="center" sx={{ mt: 1, fontSize: fontSize + 2 }}>
              {calculatePercentage()}% 정답
            </Typography>
          </Box>
          
          <Alert severity={calculatePercentage() >= 70 ? "success" : calculatePercentage() >= 50 ? "info" : "warning"} sx={{ mb: 3 }}>
            {getResultMessage()}
          </Alert>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 1 }}>
                <Typography variant="h4" color="success.main" sx={{ fontSize: fontSize + 8 }}>
                  {quizStats.correctAnswers}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: fontSize - 1 }}>정답</Typography>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 1 }}>
                <Typography variant="h4" color="error.main" sx={{ fontSize: fontSize + 8 }}>
                  {quizStats.incorrectAnswers}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: fontSize - 1 }}>오답</Typography>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 1 }}>
                <Typography variant="h4" color="text.secondary" sx={{ fontSize: fontSize + 8 }}>
                  {quizStats.skippedAnswers}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: fontSize - 1 }}>건너뜀</Typography>
              </Card>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            startIcon={<RestartAltIcon />}
            onClick={handleRestartQuiz}
            sx={{ mt: 2 }}
          >
            다시 도전하기
          </Button>
        </Paper>
      </Box>
    );
  }

  if (!currentQuiz) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>퀴즈를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 2, maxWidth: '100%' }}>
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, borderRadius: 2 }}>
        {/* 진행 상황 표시 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ fontSize: fontSize - 1 }}>
            퀴즈 {currentQuizIndex + 1} / {quizzes.length}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(currentQuizIndex / (quizzes.length - 1)) * 100} 
            sx={{ width: '70%', height: 8, borderRadius: 5 }}
          />
        </Box>

        <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip 
                label={
                  currentQuiz.type === 'multiple-choice' ? '객관식' : 
                  currentQuiz.type === 'fill-blank' ? '빈칸 채우기' : 
                  '참/거짓'
                }
                color="primary"
                size="small"
              />
              <Chip 
                label={currentQuiz.reference}
                variant="outlined"
                size="small"
              />
            </Stack>
            
            <Typography 
              variant="h6" 
              component="div" 
              gutterBottom
              sx={{ 
                fontSize: fontSize + 2,
                whiteSpace: 'pre-line',
                wordBreak: 'break-word'
              }}
            >
              {currentQuiz.question}
            </Typography>

            {/* 퀴즈 유형에 따른 답변 UI */}
            {currentQuiz.type === 'multiple-choice' && (
              <RadioGroup
                value={currentAnswer?.userAnswer || ''}
                onChange={handleMultipleChoiceChange}
              >
                {(currentQuiz.options).map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={
                      <Typography sx={{ fontSize: fontSize }}>
                        {option}
                      </Typography>
                    }
                    disabled={showExplanation}
                    sx={{
                      backgroundColor: showExplanation ? 
                        (option === currentQuiz.answer ? 'rgba(76, 175, 80, 0.1)' : 
                          (option === currentAnswer?.userAnswer ? 'rgba(244, 67, 54, 0.1)' : 'transparent')) 
                        : 'transparent',
                      borderRadius: 1,
                      px: 1,
                      mx: 0,
                      my: 0.5
                    }}
                  />
                ))}
              </RadioGroup>
            )}

            {currentQuiz.type === 'fill-blank' && (
              <TextField
                fullWidth
                variant="outlined"
                placeholder="정답 입력"
                value={textAnswer}
                onChange={handleTextChange}
                disabled={showExplanation}
                sx={{ mt: 2 }}
                inputProps={{ 
                  style: { fontSize: fontSize } 
                }}
              />
            )}

            {currentQuiz.type === 'true-false' && (
              <ToggleButtonGroup
                value={currentAnswer?.userAnswer !== null && currentAnswer?.userAnswer !== undefined ? String(currentAnswer.userAnswer) : ''}
                exclusive
                onChange={handleTrueFalseChange}
                disabled={showExplanation}
                sx={{ mt: 2, display: 'flex' }}
              >
                <ToggleButton 
                  value="true" 
                  sx={{ 
                    flex: 1,
                    fontSize: fontSize,
                    backgroundColor: showExplanation && currentQuiz.answer === true ? 
                      'rgba(76, 175, 80, 0.1)' : 
                      (showExplanation && currentAnswer?.userAnswer === true ? 
                        'rgba(244, 67, 54, 0.1)' : 'inherit')
                  }}
                >
                  참
                </ToggleButton>
                <ToggleButton 
                  value="false" 
                  sx={{ 
                    flex: 1,
                    fontSize: fontSize,
                    backgroundColor: showExplanation && currentQuiz.answer === false ? 
                      'rgba(76, 175, 80, 0.1)' : 
                      (showExplanation && currentAnswer?.userAnswer === false ? 
                        'rgba(244, 67, 54, 0.1)' : 'inherit')
                  }}
                >
                  거짓
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          </CardContent>

          {showExplanation && (
            <Box sx={{ px: 2, pb: 2 }}>
              <Divider sx={{ my: 1 }} />
              <Alert 
                severity={currentAnswer?.isCorrect ? "success" : "error"}
                icon={currentAnswer?.isCorrect ? <CheckCircleOutlineIcon /> : <InfoOutlinedIcon />}
              >
                <Typography sx={{ fontSize: fontSize - 1, fontWeight: 'bold' }}>
                  {currentAnswer?.isCorrect ? '정답입니다!' : '틀렸습니다!'}
                </Typography>
                <Typography sx={{ fontSize: fontSize - 1 }}>
                  정답: {typeof currentQuiz.answer === 'boolean' ? 
                    (currentQuiz.answer ? '참' : '거짓') : 
                    currentQuiz.answer
                  }
                </Typography>
                <Typography sx={{ fontSize: fontSize - 1, mt: 1 }}>
                  {currentQuiz.explanation}
                </Typography>
              </Alert>
            </Box>
          )}

          <CardActions>
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                width: '100%', 
                justifyContent: 'space-between' 
              }}
            >
              <Button
                variant="outlined"
                startIcon={<NavigateBeforeIcon />}
                onClick={handlePrevQuiz}
                disabled={currentQuizIndex === 0}
              >
                이전
              </Button>
              
              {!showExplanation ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAnswerSubmit}
                  disabled={
                    (currentQuiz.type === 'multiple-choice' || currentQuiz.type === 'true-false') && currentAnswer?.userAnswer === null ||
                    (currentQuiz.type === 'fill-blank' && textAnswer.trim() === '')
                  }
                >
                  정답 확인
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<NavigateNextIcon />}
                  onClick={handleNextQuiz}
                >
                  {currentQuizIndex < quizzes.length - 1 ? '다음' : '결과 보기'}
                </Button>
              )}
            </Stack>
          </CardActions>
        </Card>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="text"
            startIcon={<RestartAltIcon />}
            onClick={handleRestartQuiz}
            size="small"
          >
            처음부터 다시 시작
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}; 
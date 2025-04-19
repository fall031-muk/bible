import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';

interface TextToSpeechButtonProps {
  text: string;
}

const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechInstance, setSpeechInstance] = useState<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // 사용 가능한 음성 목록 로드
  useEffect(() => {
    const loadVoices = () => {
      if (window.speechSynthesis) {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      }
    };

    // 즉시 로드 시도
    loadVoices();

    // Chrome의 경우 비동기로 음성 목록이 로드될 수 있음
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // 음성 재생 또는 정지 처리
  const handleSpeak = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      speak();
    }
  };

  const speak = () => {
    if (!window.speechSynthesis) {
      alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }

    // 이미 재생 중인 음성이 있으면 정지
    window.speechSynthesis.cancel();

    // 새 음성 인스턴스 생성
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 한국어 음성으로 설정
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9; // 속도 조절 (기본값은 1)
    
    // 사용 가능한 한국어 음성이 있으면 설정
    const koreanVoice = voices.find(voice => voice.lang.includes('ko'));
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }
    
    // 이벤트 리스너 등록
    utterance.onend = () => {
      setIsPlaying(false);
      setSpeechInstance(null);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setSpeechInstance(null);
    };
    
    // 음성 재생 시작
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setSpeechInstance(utterance);
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setSpeechInstance(null);
    }
  };

  return (
    <Tooltip title={isPlaying ? "읽기 중지" : "음성으로 읽기"}>
      <IconButton onClick={handleSpeak} size="small">
        {isPlaying ? <StopIcon /> : <VolumeUpIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default TextToSpeechButton;

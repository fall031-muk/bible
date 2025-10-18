import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';

interface Props {
  open: boolean;
  isIOS: boolean;
  canInstall: boolean;
  onClose: () => void;
  onInstall: () => void;
}

export function PWAInstallPrompt({ open, isIOS, canInstall, onClose, onInstall }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>홈 화면에 추가하시겠습니까?</DialogTitle>
      <DialogContent>
        {isIOS ? (
          <Box>
            <Typography variant="body2" gutterBottom>
              iOS(Safari)에서는 시스템 설치 팝업이 없어 아래 절차로 홈 화면에 추가해야 합니다:
            </Typography>
            <Box component="ol" sx={{ pl: 2, mb: 0.5 }}>
              <Typography component="li" variant="body2">하단의 공유 버튼(위로 화살표) 터치</Typography>
              <Typography component="li" variant="body2">아래로 스크롤하여 "홈 화면에 추가" 선택</Typography>
              <Typography component="li" variant="body2">이름 확인 후 "추가"</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              참고: iOS에서는 앱이 아닌 브라우저에서 위 과정을 수행합니다.
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2">
            홈 화면에 추가하여 앱처럼 빠르게 실행하고 오프라인에서도 사용할 수 있습니다.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
        {!isIOS && canInstall && (
          <Button onClick={onInstall} variant="contained" autoFocus>
            설치
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default PWAInstallPrompt;



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
              iOS에서는 사파리 하단의 공유 버튼을 눌러 "홈 화면에 추가"를 선택하면 앱처럼 사용할 수 있습니다.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              공유 아이콘: 위로 화살표가 있는 사각형 모양
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2">
            홈 화면에 추가하여 앱처럼 빠르게 실행하고 오프라인에서도 사용할 수 있습니다.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>나중에</Button>
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



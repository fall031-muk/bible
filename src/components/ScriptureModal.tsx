import React, { useEffect, useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getVerses, formatReference } from '../utils/BibleAPI';
import { FontSizeContext } from '../App';

interface ScriptureModalProps {
  open: boolean;
  onClose: () => void;
  reference: string;
}

interface BibleVerse {
  book: string;
  chapter: string;
  verse: string;
  text: string;
}

export const ScriptureModal: React.FC<ScriptureModalProps> = ({ open, onClose, reference }) => {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fontSize } = useContext(FontSizeContext);

  useEffect(() => {
    if (open && reference) {
      setLoading(true);
      setError(null);
      
      try {
        const result = getVerses(reference);
        if (result.length === 0) {
          setError('성경 구절을 찾을 수 없습니다.');
        } else {
          setVerses(result);
        }
      } catch (err) {
        setError('성경 구절을 가져오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [open, reference]);

  const formattedReference = formatReference(reference);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: fontSize + 4,
          pb: 1,
        }}
      >
        {formattedReference}
        <IconButton
          aria-label="닫기"
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress size={40} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ p: 2 }}>
            {error}
          </Typography>
        ) : (
          <Box sx={{ mt: 1 }}>
            {verses.map((verse) => (
              <Box key={verse.verse} sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: fontSize,
                    lineHeight: 1.6,
                    display: 'flex',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 'bold',
                      color: 'primary.main',
                      mr: 1,
                      minWidth: '24px',
                    }}
                  >
                    {verse.verse}
                  </Box>
                  {verse.text}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 
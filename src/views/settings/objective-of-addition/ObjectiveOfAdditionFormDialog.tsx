/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { ObjectiveOfAddition } from "./ObjectiveOfAdditionPage";

interface Props {
  open: boolean;
  intention: ObjectiveOfAddition | null;
  onClose: () => void;
  onSave: (data: Partial<ObjectiveOfAddition>) => void;
}

const ObjectiveOfAdditionFormDialog: FC<Props> = ({
  open,
  intention,
  onClose,
  onSave,
}) => {
  const [description, setDescription] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (intention) {
      setDescription(intention.description);
      setIsEnabled(intention.isEnabled);
    } else {
      setDescription("");
      setIsEnabled(false);
    }
  }, [intention]);

  const handleSubmit = () => {
    if (!description.trim()) {
      alert("กรุณากรอกความประสงค์");
      return;
    }
    onSave({ description, isEnabled });
    handleClose();
  };

  const handleClose = () => {
    setDescription("");
    setIsEnabled(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {intention ? "แก้ไขความประสงค์" : "เพิ่มความประสงค์"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="ความประสงค์ที่ต้องการจะต่อเติม"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={3}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
              />
            }
            label="เปิดใช้งาน"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          ยกเลิก
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          บันทึก
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ObjectiveOfAdditionFormDialog;

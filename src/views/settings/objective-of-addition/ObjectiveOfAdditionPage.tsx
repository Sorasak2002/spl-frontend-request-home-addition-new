"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import ObjectiveOfAdditionHeader from "./ObjectiveOfAdditionHeader";
import ObjectiveOfAdditionFormDialog from "./ObjectiveOfAdditionFormDialog";
import ObjectiveOfAdditionTable from "./ObjectiveOfAdditionTable";
import { createAlert, useAlert } from "@/components/alert";

export interface ObjectiveOfAddition {
  id: string;
  description: string;
  isEnabled: boolean;
}

const mockData: ObjectiveOfAddition[] = [
  { id: "1", description: "ต่อเติมห้องนอน", isEnabled: false },
  { id: "2", description: "ต่อเติมห้องครัว", isEnabled: true },
  { id: "3", description: "ต่อเติมห้องน้ำ", isEnabled: false },
  { id: "4", description: "ต่อเติมที่จอดรถ", isEnabled: true },
  { id: "5", description: "ต่อเติมระเบียง", isEnabled: true },
];

const ObjectiveOfAdditionPage = () => {
  const [intentions, setIntentions] = useState<ObjectiveOfAddition[]>(mockData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIntention, setEditingIntention] =
    useState<ObjectiveOfAddition | null>(null);

  const { showAlert } = useAlert();

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreate = () => {
    setEditingIntention(null);
    setDialogOpen(true);
  };

  const handleEdit = (intention: ObjectiveOfAddition) => {
    setEditingIntention(intention);
    setDialogOpen(true);
  };

  // FIXME: delete function
  const handleDelete = (data: ObjectiveOfAddition) => {
    showAlert(
      createAlert.confirm("ลบข้อมูลหรือไม่?", "", () =>
        setIntentions(intentions.filter((i) => i.id !== data.id))
      )
    );
  };

  const handleToggle = (intention: ObjectiveOfAddition) => {
    setIntentions(
      intentions.map((i) =>
        i.id === intention.id ? { ...i, isEnabled: !i.isEnabled } : i
      )
    );
  };

  const handleSave = (data: Partial<ObjectiveOfAddition>) => {
    if (editingIntention) {
      // Update existing
      setIntentions(
        intentions.map((i) =>
          i.id === editingIntention.id ? { ...i, ...data } : i
        )
      );
    } else {
      // Create new
      const newIntention: ObjectiveOfAddition = {
        id: Date.now().toString(),
        description: data.description || "",
        isEnabled: data.isEnabled ?? false,
      };
      setIntentions([...intentions, newIntention]);
    }
    setDialogOpen(false);
  };

  // row data
  const row = intentions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <ObjectiveOfAdditionHeader onCreate={handleCreate} />

      {/* FIXME: Table */}
      <Box sx={{ mt: 3 }}>
        <ObjectiveOfAdditionTable
          row={row}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={intentions.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </Box>

      <ObjectiveOfAdditionFormDialog
        open={dialogOpen}
        intention={editingIntention}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default ObjectiveOfAdditionPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import DocumentFilter from "./DocumentFilter";
import DocumentDataTable, { Document } from "./DocumentDataTable";

const mockDocuments: any[] = Array.from({ length: 25 }, (_, i) => ({
  id: `DOC-${String(i + 1).padStart(4, "0")}`,
  documentNumber: `DOC-2024-${String(i + 1).padStart(4, "0")}`,
  daysUntilExpiry: Math.floor(Math.random() * 90) + 1,
  projectName: `Project ${String.fromCharCode(65 + (i % 10))}`,
  plotNumber: `${Math.floor(Math.random() * 100) + 1}-${Math.floor(Math.random() * 20) + 1
    }`,
  creator: `User ${Math.floor(Math.random() * 10) + 1}`,
  updater: `User ${Math.floor(Math.random() * 10) + 1}`,
  refundDate: new Date(
    2024,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  )
    .toISOString()
    .split("T")[0],
  status: ["Pending", "Approved", "In Progress", "Completed", "Rejected"][
    Math.floor(Math.random() * 5)
  ],
}));

const DocumentTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documentNumberFilter, setDocumentNumberFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    console.log("[v0] Filtering with:", { documentNumberFilter, statusFilter });
    setPage(0);
  };

  const handleReset = () => {
    setDocumentNumberFilter("");
    setStatusFilter("");
    setPage(0);
  };

  const handleView = (doc: Document) => {
    console.log("[v0] View document:", doc.id);
  };

  const handleEdit = (doc: Document) => {
    console.log("[v0] Edit document:", doc.id);
  };

  const handleDelete = (doc: Document) => {
    console.log("[v0] Delete document:", doc.id);
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesDocNumber = documentNumberFilter
      ? doc.documentNumber
        .toLowerCase()
        .includes(documentNumberFilter.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? doc.status === statusFilter : true;
    return matchesDocNumber && matchesStatus;
  });

  const paginatedDocuments = filteredDocuments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      {/* TODO: Filter Section */}
      <DocumentFilter
        documentNumberFilter={documentNumberFilter}
        statusFilter={statusFilter}
        onDocumentNumberChange={setDocumentNumberFilter}
        onStatusChange={setStatusFilter}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* TODO: Table Section */}
      <DocumentDataTable
        documents={paginatedDocuments}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={filteredDocuments.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default DocumentTable;

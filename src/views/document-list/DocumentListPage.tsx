"use client";

import { Box } from "@mui/material";
import DocumentsHeader from "./DocumentHeader";
import DocumentTable from "./DocumentTable";
import { useRouter } from "next/navigation";

const DocumentListPage = () => {
  const router = useRouter();

  const handleCreateDocument = () => {
    router.push("/document-list/form");
    // TODO: Implement create document logic
  };
  return (
    <Box>
      <DocumentsHeader onCreateDocument={handleCreateDocument} />

      <DocumentTable />
    </Box>
  );
};

export default DocumentListPage;

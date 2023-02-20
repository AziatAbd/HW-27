import React from "react";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";

const Snackbar = ({ isOpen, onClose, message, severity, autoHideDuration }) => {
  return (
    <div>
      <MuiSnackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        message="Note archived"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        // action={action}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MuiSnackbar>
    </div>
  );
};

export default Snackbar;

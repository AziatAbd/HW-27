import React from "react";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/system";

const Button = ({
  children,
  variant = "contained",
  borderStyle = "rounded",
  ...props
}) => {
  return (
    <StyledMuiButton {...props} borderStyle={borderStyle} variant={variant}>
      {children}
    </StyledMuiButton>
  );
};

export default Button;

const getBackgroundColor = (variant) => {
  return variant === "contained" ? "#8a2b06" : "#fff";
};

const getBorder = (variant) => {
  return variant === "contained" ? "none" : "1px solid #8a2b06";
};

const getColor = (variant) => {
  return variant === "contained" ? "#fff" : " #8a2b06";
};

const getBorderRadius = (borderStyle) => {
  return borderStyle === "rounded" ? "20px" : " 6px";
};

const getPadding = (borderStyle) => {
  return borderStyle === "rounded" ? "10px 32px" : "8px 14px";
};

const StyledMuiButton = styled(MuiButton)((variant, borderStyle) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.3125rem",
  background: getBackgroundColor(variant),
  color: getColor(variant),
  borderRadius: getBorderRadius(borderStyle),
  padding: getPadding(borderStyle),
  fontWeight: "600",
  lineHeight: "1.5rem",
  border: getBorder(variant),
  cursor: "pointer",

  "&:hover": {
    background: "#7e2a0a",
    color: "#fff",

    "&:path ": {
      stroke: "#fff",
    },
  },
}));

// const StyledButton = styledComponents.button`
//   display: flex;
//   align-items: center;
//   gap: 0.3125rem;
//   background: ${getBackgroundColor};
//   color: ${getColor};
//   border-radius: ${getBorderRadius};
//   padding: ${getPadding};
//   font-weight: 600;
//   line-height: 1.5rem;
//   border: ${getBorder};
//   cursor: pointer;

//   :hover {
//     background: #7e2a0a;
//     color: #fff;
//     path {
//       stroke: #fff;
//     }
//   }

//   :active {
//     background: #993108;
//   }
// `;

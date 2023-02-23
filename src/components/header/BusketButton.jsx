import React from "react";
import styledComponent from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const BusketButton = ({ count, ...props }) => {
  return (
    <StyledMuiButton {...props}>
      <ShoppingCartIcon />
      <StyledTitle>You Cart</StyledTitle>
      <StyledCounter id="counter">{count}</StyledCounter>
    </StyledMuiButton>
  );
};

export default BusketButton;

const StyledMuiButton = styled(Button)(() => ({
  background: "#5a1f08",
  color: "#fff",
  borderRadius: "1.25rem",
  padding: " 0.75rem 2rem",
  fontWeight: "600",
  fontSize: "1rem",
  lineHeight: "1.5rem",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",

  "&:hover": {
    backgroundColor: "#2c0d00",
  },

  "&:hover > #counter": {
    background: "#662207",
  },

  "&.bump": {
    animation: "bump 300ms ease-out",
  },

  "@keyframes bump": {
    "0%": {
      transform: "scale(1)",
    },
    "10% ": {
      transform: "scale(0.9)",
    },
    "30%": {
      transform: "scale(1.1)",
    },
    "50%": {
      transform: "scale(1.15)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
}));

const StyledTitle = styledComponent.span`
  margin: 0 1.5rem 0 0.75rem;
`;

const StyledCounter = styledComponent.span`
  background: #8a2b06;
  border-radius: 1.875rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.6875rem;
  padding: 0.25rem 1.25rem;
`;

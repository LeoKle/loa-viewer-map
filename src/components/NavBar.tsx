import React from "react";

interface NavbarProps {
  onSelectOption: (option: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectOption }) => {
  return (
    <nav>
      <button
        onClick={() => onSelectOption("EDGG")}
        style={{ marginRight: "10px" }}
      >
        EDGG
      </button>
      <button
        onClick={() => onSelectOption("EDWW")}
        style={{ marginRight: "10px" }}
      >
        EDWW
      </button>
      <button onClick={() => onSelectOption("EDMM")}>EDMM</button>
    </nav>
  );
};

function getButtons(handlePrevious, handleNext) {
  const baseBtnStyle = {
    textColor: "#fff",
    bgColor: "#7950f2",
  };

  return [
    { ...baseBtnStyle, text: "Previous", onClick: handlePrevious },
    { ...baseBtnStyle, text: "Next", onClick: handleNext },
  ];
}

export default getButtons;

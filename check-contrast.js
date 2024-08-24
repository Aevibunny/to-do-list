
export const checkContrast = (hexColor) => {
  hexColor = hexColor.replace("#", "");
  let red = parseInt(hexColor.substring(0, 2), 16);
  let green = parseInt(hexColor.substring(2, 4), 16);
  let blue = parseInt(hexColor.substring(4, 6), 16);
  if ((red*0.299 + green*0.587 + blue*0.114) > 186) {
    return '#000000';
  } else {
    return '#ffffff';
  }
}
 const validateImage = (file) => {
  if (!file) return "File is required";

  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return "Only JPG or PNG allowed";
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return "File size must be under 5MB";
  }

  return null;
};

const validateField = (name, value, idType) => {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Full name is required";
      if (value.trim().length < 3) return "Name too short";
      return "";

    case "idType":
      if (!value) return "Select ID type";
      return "";

    case "idNumber":
      if (!value.trim()) return "ID number is required";
      if (idType === "PAN" && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value))
        return "Invalid PAN format";
      return "";

    default:
      return "";
  }
};

export  {validateImage,validateField}
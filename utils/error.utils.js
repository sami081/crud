module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" , };
  
    if (err.message.includes("email")) errors.email = "Email inconnu";
  
    if (err.message.includes("password"))
      errors.password = "Ce mot de passe ne correspond pas";
  
    return errors;
  };
  module.exports.signUpErrors = (err) => {
  let errors = {  email: "", password: "" , birthday:"", name:"", phone:""};

  if (err.message.includes("email")) errors.email = "Email incorrect ";
  if (err.message.includes("phone")) errors.phone = "numéro de téléphone incorrect ";
  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractère minimum";
if(err.message.includes("birthday"))
    errors.birthday = "La date de naissance est obligatoire";

if(err.message.includes("name"))
    errors.name = "Le nom est obligatoire";

 
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà pris";
  
  return errors;
};
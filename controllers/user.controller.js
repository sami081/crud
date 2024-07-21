const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

//see all users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};
//see one user
module.exports.getOneUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu : " + req.params.id);
    try {
      const users = await UserModel.findById(req.params.id).select("-password");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).send({ err });
      console.log("erreur server");
    }
  };
// modify one user
  module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    const { id } = req.params;
  const { phone } = req.body;
  try {
    // Recherche de l'utilisateur par ID
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Modification du téléphone
    user.phone = phone;

    // Enregistrement des modifications
    await user.save();

    return res
      .status(200)
      .json({ message: "numéro de tél  mise à jour avec succès.", })
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message:
          "Une erreur s'est produite lors de la mise à jour du numéro de tél de l'utilisateur.",
      });
  }
    
  }

  //delete one user

  module.exports.deleteOneUser = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu : " + req.params.id);
  
    UserModel.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ Utilisateur: "supprimer" });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  };

const router = require ("express").Router();

const authController = require ("../controllers/auth.controller")
const userController = require ("../controllers/user.controller")

//auth
router.post("/register", authController.signUp)
router.post("/login", authController.signIn)
router.get("/logout", authController.logout)



//user routes

router.get('/', userController.getAllUsers)
router.get("/:id", userController.getOneUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteOneUser)
router.get("/logout", authController.logout);
module.exports= router
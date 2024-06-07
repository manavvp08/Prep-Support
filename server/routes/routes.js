const Route = require("express").Router();
const userController = require("../controllers/userController.js");
const expController = require("../controllers/expController.js");
const adminController = require("../controllers/adminController.js");
require("../middleware/authMiddleware.js");
const contactController = require("../controllers/contactController.js");
const changepassController = require("../controllers/changepassController.js");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = file.mimetype.split("/");
    if (
      file.originalname.includes(".jpg") ||
      file.originalname.includes(".jpeg") ||
      file.originalname.includes(".png")
    ) {
      cb(null, file.originalname);
    } else {
      cb(null, file.originalname + "-" + Date.now() + "." + uniqueSuffix[1]);
    }
  },
  destination: (req, file, cb) => {
    cb(null, "./profileUploads/");
  },
});
const upload = multer({ storage: storage });

Route.get("/", userController.Func);
Route.get("/get-contact-list", contactController.getContactList);
Route.post("/signup", userController.signup);
Route.post("/login", userController.login);
Route.post("/experience", expController.expData);
Route.get("/get-experience", expController.getExp);
Route.post("/adminlogin", userController.adminlogin);
Route.get("/get-experience-question", expController.getQues);
Route.get("/admin-users", adminController.getUsers);
Route.put("/admin-update-approved", adminController.updateApproved);
Route.put("/admin-update-allfield", adminController.updateField);
Route.post("/contact", contactController.storeContact);
Route.post("/verifyEmail", userController.generateOtpFunc);
Route.post("/getUserDetails", userController.getUserDetails);
Route.post("/changePassword", changepassController.changePass);
Route.post("/checkUserExists", userController.checkUserExists);
Route.post("/compareotp", userController.compareotp);
Route.post(
  "/changePassword-afterlogin",
  changepassController.passChangeAfterLogin
);
Route.put("/add-admin", userController.addadmin);
Route.post("/check-email", userController.checkEmail);
Route.put("/edit-name", userController.changeName);
Route.post("/profile-image", upload.any(), userController.profileImage);
Route.get(
  "/send-profile-image/profileUploads/:imgName",
  userController.sendProfileImage
);
Route.post("/get-exp", userController.getExp);
Route.put("/update-user-exp", userController.editExpUser);

module.exports = Route;

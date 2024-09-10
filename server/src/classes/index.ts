
import Admin from "./admin"

let admin = new Admin("Guilherme", "guilherme.yokota20@gmail.com", "123", true)
admin.setName = "Samuel";
admin.setEmail = "algumacoisa123@gmail.com";
admin.setPasswrod = "1234";
console.log(admin.getName)
console.log(admin.getEmail)
console.log(admin.getPassword)

import ConnectionDB from "./connectionDB";
import Liderado from "./liderado";

const a = new ConnectionDB();

const liderado = new Liderado("Samuel","123","s@gmail.com");



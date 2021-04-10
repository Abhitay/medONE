const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require('express-session');


const app = express();
const saltRounds = 10;

// app.set('trust proxy', 1); // trust first proxy

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

// SQL Middleware
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    user: 'root',
    password: 'ABCDabcd@123',
    database: 'medone'
};

const sessionStore = new MySQLStore(options);
// SQL Middleware end

app.use(session({
    store: sessionStore,
    secret: '&D8A8vtB2Dc7+W](MY_KEY)',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 90000000 }
}));

app.use(cookieParser("&D8A8vtB2Dc7+W](MY_KEY)"));


const db = mysql.createConnection({
    user: 'root',
    host: "localhost",
    password: "ABCDabcd@123",
    database: "medone",
    insecureAuth: true,
});

// Middleware End

let Email;

app.post("/create", (req, res) => {
    console.log(req.body);
    const Pharmacy_name = req.body.Pharmacy_name;
    Email = req.body.Email;
    const salt = bcrypt.genSaltSync(saltRounds);
    const Password = bcrypt.hashSync(req.body.Password, salt);
    const Address = req.body.Address;
    const Phone_no = req.body.Phone_no;

    db.query(
        "INSERT INTO users (Pharmacy_name, Email, Password, Address, Phone_no) VALUES (?,?,?,?,?)",
        [Pharmacy_name, Email, Password, Address, Phone_no],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                req.session.userName = Email;
                res.send("Values Inserted!");
            }
        }
    );
});

app.post("/changePass", (req, res) => {
    const myEmail = req.session.userName;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const confirmPass = req.body.confirmPass;

    if (oldPass == undefined || newPass == undefined || confirmPass == undefined) {
        res.send("Are you sure you answered all field?");
    }
    else if (newPass != confirmPass) {
        res.send("Confirm password doesn't match");
    }
    else {
        db.query(
            "SELECT Password FROM users WHERE Email = ?",
            [myEmail],
            (err, result) => {
                if (result.length > 0) {
                    var string = JSON.stringify(result);
                    var json = JSON.parse(string);
                    var Pass = json[0].Password;

                    if (bcrypt.compareSync(oldPass, Pass)) {
                        const salt = bcrypt.genSaltSync(saltRounds);
                        const myNewPassword = bcrypt.hashSync(newPass, salt);
                        db.query("UPDATE users set Password = ? WHERE Email = ?",
                            [myNewPassword, myEmail],
                            (err, result) => {
                                res.send("password changed");
                            }
                        )
                    } else {
                        res.send("Previous password doesn't match");
                    }
                    // res.end();
                } else {
                    res.send("Email id not found");
                }
            }
        );
    }
});

app.get('/checkUser', (req, res) => {
    // res.header('Access-Control-Allow-Credentials', true);
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.session);

    // console.log(Email);
    // console.log(req.session.userName);

    // req.session.userName = Email;

    // console.log("MyEmail: " + Email);
    console.log("MySession: " + req.session.userName);

    // if (delUser == "true") {
    //     console.log("no session");
    //     delete req.session.userName;
    //     delete req.session;
    //     res.send("none");
    // }

    if (!req.session.userName) {
        res.send(JSON.stringify("none"))
    }
    else {
        res.send(JSON.stringify(req.session.userName));
    }
})

app.post('/deleteResUser', (req, res) => {
    req.session.cookie.expires = new Date();
    req.session.destroy();
    Email = null;
    console.log("END");
    
    // console.log("User deleted"+delUser);
})

app.post("/login", (req, res) => {
    Email = req.body.email;
    const password = req.body.password;

    if (Email == "") {
        res.send("Enter valid email id")
    } else if (password == "") {
        res.send("Enter valid password")
    } else {
        db.query(
            "SELECT Password FROM users WHERE Email = ?",
            [Email],
            (err, result) => {
                if (result.length > 0) {
                    var string = JSON.stringify(result);
                    var json = JSON.parse(string);
                    var Pass = json[0].Password;

                    if (bcrypt.compareSync(password, Pass)) {
                        //new change here
                        req.session.userName = Email;
                        res.send("Successful");
                    } else {
                        res.send("Incorect email / password");
                    } res.end();
                } else {
                    res.send("Email id not found")
                }
            }
        );
    }

});

app.post("/resetCheck", (req, res) => {
    const myEmail = req.body.email;
    let checkEmail = "SELECT email from users where email = ?";

    let checkDate = "SELECT expDate from users where email = ?";

    if (myEmail == "" || myEmail == undefined) {
        res.send("Enter valid Email id");
    }
    else {
        db.query(checkEmail, [myEmail], (err, result) => {
            if (err) {
                console.log(err);
            }
            else if (result.length <= 0) {
                res.send("Looking for sign up?");
            }
            else {
                db.query(checkDate, [myEmail], (err, result2)=>{
                    let dbDate = result2[0].expDate;
                    let currDate = new Date();

                    let diffDate = currDate - dbDate;
                    console.log(diffDate);

                    if (diffDate >= 900000) {
                        res.send("Please check your mail!");
                    }
                    else {
                        res.send("Can't send so many request");
                    }
                })
            }
        });
    }
});

app.post("/reset", (req, res) => {
    const myEmail = req.body.email;
    const key = req.body.key;
    const expDate = new Date();

    console.log(myEmail);
    console.log(key);
    console.log(expDate);

    let resetKey = "UPDATE users set expDate = ?, myKey = ? WHERE email = ?";

    db.query(resetKey, [expDate, key, myEmail], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Key updated");
        }
    });
});

app.post("/checkEmailReset", (req, res) => {
    const myKey = req.body.myKey;
    let checkKey = "SELECT myKey from users where myKey = ?";
    let checkDate = "SELECT expDate from users where myKey = ?";

    db.query(checkKey, [myKey], (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.length <= 0) {
            res.send("No such link found!");
        }
        else {
            db.query(checkDate, [myKey], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let dbDate = result[0].expDate;
                    let currDate = new Date();

                    let diffDate = currDate - dbDate;
                    console.log(diffDate);

                    if (diffDate >= 900000) {
                        res.send("oops... link expired!");
                    }
                    else {
                        res.send("reset");
                    }
                }
            });
        }
    });
});

app.post("/emailReset", (req, res) => {
    const myKey = req.body.myKey;
    let resetPassEmail = "SELECT email from users where myKey = ?";

    const salt = bcrypt.genSaltSync(saltRounds);
    const Password = bcrypt.hashSync(req.body.Password, salt);
    let restPass = "UPDATE users set password = ? where email = ?";

    let afterResetPass = "UPDATE users set expDate = ?, myKey = ? where email = ?";

    if (Password == undefined || Password == "" || myKey == undefined || myKey == ""){
        res.send("There was some problem");
    }
    else{
        db.query(resetPassEmail, [myKey], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    let myDBEMail = (result[0].email);
                    db.query(restPass, [Password, result[0].email], (err, result2) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            db.query(afterResetPass, [null, null, myDBEMail], (err, reult3)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    res.send("Password changed");
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});

//--------------------------------------------------------------

var testvar;
var jtBrandname
var jtManufacturer
let getBrandandManufacturersql1 = `SELECT Manufacturer FROM medicinedatabase where Brandname=? `;
app.post("/getBrandandManufacturer1", (req, res) => {
    jtBrandname = req.body.Brandname;
    // console.log("jtbdmae", jtBrandname)
    db.query(getBrandandManufacturersql1, [jtBrandname], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            jtManufacturer = json[0].Manufacturer
            testvar = result
            res.send(testvar)
            //res.send(result)
            // console.log("Post", testvar)
        }

    });
});

app.get("/getBrandandManufacturer", (req, res) => {


    res.send(testvar)
    // console.log("Get", testvar)

});
app.get("/getBrandname2", (req, res) => {


    res.send(jtBrandname)
    // console.log("Get", testvar)
    //console.log("getBrandandManufacturersql",result)

});
app.get("/getBrandname3", (req, res) => {

    res.send(jtManufacturer)
    // console.log("Get", testvar)
    //console.log("getBrandandManufacturersql",result)

});
let getBrandandManufacturersql = `SELECT * FROM medicinedatabase `;


app.get("/getBrandandManufacturerOg", (req, res) => {

    db.query(getBrandandManufacturersql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
            // console.log("getBrandandManufacturersql",result)
        }

    });
});
let getinventorysql = `SELECT * FROM inventory where EmailID=?`;
var idMedicineDatabase;

app.get("/getinventory", (req, res) => {
    var EmailID = req.session.userName;

    db.query(getinventorysql, [EmailID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(resEmail);
            // console.log("Email:" + EmailID);
            let getinventorysql2 = `SELECT * FROM medicinedatabase where idMedicineDatabase IN (${result.map(r => r.idMedicineDatabase).join(',')})`;
            db.query(getinventorysql2, [idMedicineDatabase], (err, resultnew) => {
                if (err) {
                    // console.log(err);
                } else {
                    //console.log(resultnew)
                    res.json(resultnew)
                }

            });

        }
    });

});


var addBrandname1 = "";
var getmanufacsql = "Select * from medicinedatabase where Brandname=?"
app.get("/getmanufac", (req, res) => {

    addBrandname1 = "A&D";
    // console.log("brandnameNODE", addBrandname1)
    db.query(getmanufacsql, [addBrandname1], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            // console.log("getmanufac", json)
            res.send(json)
        }
    });

});



let FetchMedicineDBsql = `SELECT * FROM medicinedatabase where Brandname=? AND Manufacturer=?`;
let addSql = `INSERT into inventory (idMedicineDatabase,Stock,minStock,EmailID,Price,ExpDate) VALUES (?,?,?,?,?,?)`;
let addSqlMedicineDBsql = `INSERT into medicinedatabase (Brandname,ChemicalName,Manufacturer,Category) VALUES (?,?,?,?)`;
let addCheck = `SELECT * from inventory where idMedicineDatabase =? AND EmailID = ?`;

app.post("/add", (req, res) => {
    // console.log(req.body);

    var addBrandname = req.body.Brandname;
    var addManufacturer = req.body.Manufacturer;
    var addStock = req.body.Stock;
    var addminStock = req.body.minStock;
    var addEmailID = req.session.userName;
    var addPrice = req.body.Price;
    var addExpDate = req.body.ExpDate;

    // console.log(addBrandname);
    // console.log(addManufacturer);
    // console.log(addStock);
    // console.log(addminStock);
    // console.log(addPrice);
    // console.log(addExpDate);

    if (addBrandname == [] || addManufacturer == [] || addStock == 0 || addminStock == 0 || addPrice == 0 || addExpDate == null) {
        console.log("Are you sure you answered all field?");
        res.send("Are you sure you answered all field?");
    }
    else if (isNaN(addStock) || isNaN(addminStock) || isNaN(addPrice)) {
        console.log("Oops");
        res.send("Are you sure those are numbers?");
    } else if (parseInt(addStock) < parseInt(addminStock)) {
        console.log("Hmmmm... minimum stock is more then available stock?");
        res.send("Hmmmm... minimum stock is more then available stock?");
    }
    else {
        db.query(FetchMedicineDBsql, [addBrandname, addManufacturer], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                // console.log(json)

                // console.log("First print of result",result)
                // console.log("First check if data exists in med db")

                if (result.length === 0) {
                    console.log("Does not exist in the Database!")
                }

                if (result.length > 0) {
                    // console.log("Value exists")

                    var idMedicineDatabase = json[0].idMedicineDatabase;
                    db.query(addCheck, [idMedicineDatabase, req.session.userName], (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (result.length == 0) {
                                db.query(addSql, [idMedicineDatabase, addStock, addminStock, addEmailID, addPrice, addExpDate], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.send("Values Inserted!")
                                        // console.log("Values Inserted!")
                                    }
                                });
                            }
                            else {
                                res.send("Hmmmm... are you sure you don't want to update");
                            }

                        }
                    });
                }
            }

        });
    }
});


let updateSql1 = `UPDATE inventory SET stock= ?,minStock=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql2 = `UPDATE inventory SET stock= ? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql4 = `UPDATE inventory SET stock= ?,minStock=?,Price=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql5 = `UPDATE inventory SET stock= ?,Price=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql3 = `UPDATE inventory SET minStock= ? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql6 = `UPDATE inventory SET minStock= ?,Price=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql7 = `UPDATE inventory SET Price=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql8 = `UPDATE inventory SET ExpDate=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql9 = `UPDATE inventory SET stock= ?,minStock=?,Price=?,ExpDate=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql10 = `UPDATE inventory SET ExpDate=?,minStock=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql11 = `UPDATE inventory SET ExpDate=?,Stock=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql12 = `UPDATE inventory SET ExpDate=?Price=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql13 = `UPDATE inventory SET ExpDate=?,minStock=?,Stock=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql14 = `UPDATE inventory SET ExpDate=?,minStock=?,Price=? WHERE idMedicineDatabase=? AND EmailID =?`;
let updateSql15 = `UPDATE inventory SET ExpDate=?,Stock=?,Price=? WHERE idMedicineDatabase=? AND EmailID =?`;
app.post("/update", (req, res) => {
    //console.log(req.body);
    const updateBrandname = req.body.Brandname;
    const updateManufacturer = req.body.Manufacturer;
    const updateStock = req.body.Stock;
    const updateminStock = req.body.minStock;
    const updateEmailID = req.session.userName;
    var updatePrice = req.body.Price;
    var updateExpDate = req.body.ExpDate;

    console.log(updateBrandname);
    console.log(updateManufacturer);
    // console.log(updateStock);
    // console.log(updateminStock);
    // console.log(updateEmailID);
    // console.log(updatePrice);
    // console.log(updateExpDate);

    if (updateBrandname == [] || updateBrandname == undefined || updateBrandname == "" || updateManufacturer == "" || updateManufacturer == [] || updateManufacturer == undefined || updateStock == 0 && updateminStock == 0 && updatePrice == 0 && updateExpDate == undefined) {
        console.log("Are you sure you answered all field?");
        res.send("Are you sure you answered all field?");
    }
    else if (isNaN(updateStock) || isNaN(updateminStock) || isNaN(updatePrice)) {
        console.log("Oops");
        res.send("Are you sure those are numbers?");
    } else {
        db.query(FetchMedicineDBsql, [updateBrandname, updateManufacturer], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                //  console.log(json)

                // console.log("First print of result",result)
                var updateidMedicineDatabase = json[0].idMedicineDatabase;
                if (updateminStock == 0 && updateStock == 0 && updatePrice == 0 && updateExpDate != null) {
                    console.log("update date")
                    db.query(updateSql8, [updateExpDate, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock > 0 && updateStock == 0 && updatePrice == 0 && updateExpDate != null) {
                    console.log("update date and minstock")
                    db.query(updateSql10, [updateExpDate, updateminStock, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock == 0 && updateStock > 0 && updatePrice == 0 && updateExpDate != null) {
                    console.log("update date and stock")
                    db.query(updateSql11, [updateExpDate, updateStock, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock == 0 && updateStock == 0 && updatePrice > 0 && updateExpDate != null) {
                    console.log("update date and price")
                    db.query(updateSql12, [updateExpDate, updatePrice, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock > 0 && updateStock > 0 && updatePrice == 0 && updateExpDate != null) {
                    console.log("update date and minstock and stock")
                    db.query(updateSql13, [updateExpDate, updateminStock, updateStock, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock > 0 && updateStock == 0 && updatePrice > 0 && updateExpDate != null) {
                    console.log("update date and minstock and price")
                    db.query(updateSql14, [updateExpDate, updateminStock, updatePrice, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock == 0 && updateStock > 0 && updatePrice > 0 && updateExpDate != null) {
                    console.log("update date and stock and price")
                    db.query(updateSql15, [updateExpDate, updateStock, updatePrice, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock > 0 && updateStock > 0 && updatePrice == 0 && updateExpDate == null) {
                    console.log("update minstock and stock")
                    db.query(updateSql1, [updateStock, updateminStock, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                else if (updateminStock == 0 && updatePrice == 0 && updateExpDate == null && updateStock > 0) {
                    console.log("update stock")
                    db.query(updateSql2, [updateStock, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                else if (updateStock == 0 && updatePrice == 0 && updateExpDate == null && updateminStock > 0) {
                    console.log("update minstock")
                    db.query(updateSql3, [updateminStock, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }

                if (updateminStock > 0 && updateStock > 0 && updatePrice > 0 && updateExpDate == null) {
                    console.log("update stock minstock price")
                    db.query(updateSql4, [updateStock, updateminStock, updatePrice, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock > 0 && updateStock > 0 && updatePrice > 0 && updateExpDate != null) {
                    console.log("update all")
                    db.query(updateSql9, [updateStock, updateminStock, updatePrice, updateExpDate, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Updated!")
                        }
                    });
                }
                if (updateminStock == 0 && updateStock > 0 && updatePrice > 0 && updateExpDate == null) {
                    console.log("update  stock and price")
                    db.query(updateSql5, [updateStock, updatePrice, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock > 0 && updateStock == 0 && updatePrice > 0 && updateExpDate == null) {
                    console.log("update min stock and price")
                    db.query(updateSql6, [updateminStock, updatePrice, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            //console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }
                if (updateminStock == 0 && updateStock == 0 && updatePrice > 0 && updateExpDate == null) {
                    console.log("update price")
                    db.query(updateSql7, [updatePrice, updateidMedicineDatabase, updateEmailID], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Values Updated!")
                        }
                    });
                }

                if (updateStock == 0 && updateminStock == 0 && updatePrice == 0 && updateExpDate == null) {
                    console.log("update none")
                    //alert("Update Something!!")
                }
            }

        });
    }

});

FetchMedicineDBsql = "SELECT * FROM medicinedatabase where Brandname=? AND Manufacturer=?";
FetchInventorysql = "SELECT * FROM inventory where idMedicineDatabase=? AND EmailID = ?";
//let sellcustSql = "UPDATE inventory set Stock=? WHERE idMedicineDatabase= ? AND EmailID =?";
let sellcustSql = "INSERT into sales (idMedicineDatabase,NumberItems,CustomerEmail,SellSession,saleDate,EmailID) values(?,?,?,?,?,?)";
let getcustSql1 = "SELECT * from sales where CustomerEmail=? and idMedicineDatabase=? AND EmailID = ?";
let getcustSql = "SELECT * from sales where CustomerEmail=? AND EmailID = ?";
let getmaxcustsql = "SELECT max(SellSession) as maxSellSession from sales";
let sellcustSql1 = "UPDATE sales set NumberItems= NumberItems+? where CustomerEmail=? and idMedicineDatabase=? and EmailID=?";
var sellEmailID1

app.post("/sellcust", (req, res) => {
    // console.log(req.body);
    const sellBrandname = req.body.Brandname;
    const sellManufacturer = req.body.Manufacturer;
    const StockUp = (req.body.Stock)
    const sellEmailID = req.session.userName;
    const customerEmail = req.body.customerEmail;
    sellEmailID1 = req.body.customerEmail;
    const SaleDate = req.body.SaleDate;

    if (sellBrandname == [] || sellManufacturer == [] || StockUp == 0 || customerEmail == 0 || SaleDate == null) {
        res.send("Are you sure you answered all field?");
    }
    else if (isNaN(StockUp)) {
        console.log("Oops");
        res.send("Are you sure those are numbers?");
    } else {
        db.query(FetchMedicineDBsql, [sellBrandname, sellManufacturer], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                var sellidMedicineDatabase = json[0].idMedicineDatabase;

                db.query(FetchInventorysql, [sellidMedicineDatabase, req.session.userName], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var string = JSON.stringify(results);
                        var json = JSON.parse(string);
                        var inventoryStock = json[0].Stock;
                        var sellStock = inventoryStock - StockUp
                        if (sellStock >= 0) {
                            //let getinventorysql2 = `SELECT * FROM medicinedatabase where CustomerEmail IN (${result.map(r => r.idMedicineDatabase).join(',')})`;
                            db.query(getcustSql, [customerEmail, req.session.userName], (err, results1) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    db.query(getmaxcustsql, (err, results2) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            var string = JSON.stringify(results2);
                                            var json = JSON.parse(string);
                                            var sellmid = json[0].maxSellSession;


                                            if (sellmid == null) {
                                                sellmid = 0
                                            }
                                            db.query(getcustSql1, [customerEmail, sellidMedicineDatabase, req.session.userName], (err, results) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    if (results.length == 0) {
                                                        db.query(sellcustSql, [sellidMedicineDatabase, StockUp, customerEmail, sellmid, SaleDate, sellEmailID], (err, results) => {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                res.send("Values Updated!")
                                                            }
                                                        });
                                                    }
                                                    else {


                                                        db.query(sellcustSql1, [StockUp, customerEmail, sellidMedicineDatabase, sellEmailID], (err, results) => {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                res.send("Values Updated!")
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                        }
                                    });
                                }
                            });


                        }
                        else {
                            console.log("Insufficient Stock")
                            res.send("Insufficient Stock")
                        }
                    }
                });



            }

        });
    }
});


let getsalessql33 = `SELECT * FROM sales where CustomerEmail=? and EmailID=?`;
var idMedicineDatabase;

app.get("/getselldatatable", (req, res) => {

    const EmailID1 = sellEmailID1;
    // const EmailID1="test@gmail.com";
    const sellEmailID = req.session.userName;

    // console.log("sellEmailID1",sellEmailID1)
    // console.log("EmailID1",EmailID1)

    db.query(getsalessql33, [EmailID1, req.session.userName], (err, result1) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("result1",result1)
            if (result1.length > 0) {
                let getsalessql2 = `SELECT m.Brandname, m.Manufacturer, s.NumberItems,i.Price,s.idSales,s.NumberItems *i.Price as 'PriceTot',s.CustomerEmail FROM medicinedatabase as m LEFT JOIN inventory as i ON m.idMedicineDatabase = i.idMedicineDatabase LEFT JOIN sales as s ON m.idMedicineDatabase = s.idMedicineDatabase where m.idMedicineDatabase IN (${result1.map(r => r.idMedicineDatabase).join(',')}) AND s.CustomerEmail=? AND s.EmailID = ? group by s.idMedicineDatabase `;
                db.query(getsalessql2, [EmailID1, req.session.userName], (err, resultnew) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log("resultnew", resultnew)
                        // console.log(resultnew)
                        res.json(resultnew)
                    }

                });
            }
            else { res.send([]); }

        }
    });

});




newfetchsql1 = `SELECT idMedicineDatabase from medicinedatabase where Brandname=? and Manufacturer=?`
newsql = `UPDATE  sales set NumberItems=? where CustomerEmail=? AND idMedicineDatabase=? AND EmailID=? `
app.post("/updateselltable", (req, res) => {
    var delBrandname = req.body.Brandname
    var delManufacturer = req.body.Manufacturer
    var noitems = req.body.Stock
    const EmailID1 = sellEmailID1;
    const sellEmailID = req.session.userName;

    if (delBrandname == [] || delManufacturer == [] || noitems == 0 || EmailID1 == 0) {
        res.send("Are you sure you answered all field?");
    }
    else if (isNaN(noitems)) {
        console.log("Oops");
        res.send("Are you sure those are numbers?");
    }
    else {
        db.query(newfetchsql1, [delBrandname, delManufacturer], (err, result1) => {
            if (err) {
                console.log(err);
            } else {
                var string = JSON.stringify(result1);
                var json = JSON.parse(string);
                // console.log("newfetchsql1", json);
                idMedicineDatabase1 = json[0].idMedicineDatabase
                db.query(newsql, [noitems, EmailID1, idMedicineDatabase1, sellEmailID], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log("newsql", result1);
                        // console.log("delted sales")
                        res.end('Updated');
                    }
                });


            }
        });
    }



});

let getinventorysql1 = `SELECT * FROM sales where CustomerEmail=? AND EmailID=?`;
var idMedicineDatabase;
var EmailID;
app.get("/getsellinventory", (req, res) => {
    const EmailID1 = sellEmailID1;
    //console.log("getsellinventory");
    const sellEmailID = req.session.userName;

    if (EmailID1 != null) {
        db.query(getinventorysql1, [EmailID1, sellEmailID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                let getinventorysql2 = `SELECT * FROM medicinedatabase where idMedicineDatabase IN (${result.map(r => r.idMedicineDatabase).join(',')})`;
                db.query(getinventorysql2, [idMedicineDatabase], (err, resultnew) => {
                    if (err) {
                        // console.log(err);
                    } else {
                        //console.log(resultnew)
                        res.json(resultnew)
                    }

                });

            }
        });

    }



});

newsql2 = `DELETE from sales where CustomerEmail=? AND idMedicineDatabase=? AND EmailID=?`
newfetchsql = `SELECT idMedicineDatabase from medicinedatabase where Brandname=? and Manufacturer=?`
app.post("/deleteselltable", (req, res) => {

    var delBrandname = req.body.Brandname
    var delManufacturer = req.body.Manufacturer
    var delcustomerEmail = req.body.customerEmail
    const sellEmailID = req.session.userName;

    const EmailID1 = sellEmailID1;

    if (delBrandname == [] || delManufacturer == []) {
        res.send("Are you sure you answered all field?");
    }
    else {
        db.query(newfetchsql, [delBrandname, delManufacturer], (err, result1) => {
            if (err) {
                console.log(err);
            } else {
                var string = JSON.stringify(result1);
                var json = JSON.parse(string);
                idMedicineDatabase1 = json[0].idMedicineDatabase
                db.query(newsql2, [EmailID1, idMedicineDatabase1, sellEmailID], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {

                        console.log("deleted sales")
                        res.end('deleted');
                    }
                });


            }
        });
    }
});

let checktablesql1 = `SELECT s.NumberItems,s.idMedicineDatabase,i.Stock-s.NumberItems as AvailableStock from sales as s inner join inventory as i ON i.idMedicineDatabase=s.idMedicineDatabase where s.CustomerEmail=? AND s.EmailID=? order by AvailableStock`;
let checktablesql2 = `INSERT into salehistory(idSales,idMedicineDatabase,NumberItems,CustomerEmail,SellSession,SaleDate,EmailID) SELECT idSales,idMedicineDatabase,NumberItems,CustomerEmail,SellSession,SaleDate,EmailID FROM sales WHERE CustomerEmail=? AND EmailID=?`;
let checktablesql3 = `SELECT * from sales where CustomerEmail=? AND EmailID=?`;
let checktablesql5 = `DELETE FROM sales where CustomerEmail=? AND EmailID=?`;

app.post('/checktable', (req, res) => {
    const EmailID1 = sellEmailID1;
    const userEmailID1 = req.session.userName;
    // console.log("EmailID1", EmailID1)
    db.query(checktablesql1, [EmailID1, userEmailID1], (err, result) => {

        if (err) {
            console.log(err);
        } else {
            // console.log("checktablesql1", result)
            if (result.length > 0) {
                if (result[0].AvailableStock >= 0) {

                    db.query(checktablesql2, [EmailID1, userEmailID1], (err, result) => {

                        if (err) {
                            console.log(err);
                        } else {
                            db.query(checktablesql3, [EmailID1, userEmailID1], (err, result) => {

                                if (err) {
                                    console.log(err);
                                } else {
                                    // console.log("checktablesql3", result)

                                    //let checktablesql4 = `SELECT i.Stock,i.Stock-s.NumberItems,s.idMedicineDatabase FROM inventory as i INNER JOIN sales as s ON s.idMedicineDatabase=i.idMedicineDatabase WHERE s.idMedicineDatabase IN (${result.map(r => r.idMedicineDatabase).join(',')}) AND s.customerEmail=? AND i.EmailID=?`;
                                    let checktablesql4 = `UPDATE inventory as i INNER JOIN sales s ON i.idMedicineDatabase=s.idMedicineDatabase SET i.Stock= i.Stock-s.NumberItems WHERE s.idMedicineDatabase IN (${result.map(r => r.idMedicineDatabase).join(',')}) AND s.customerEmail=? AND i.EmailID=?`;
                                    db.query(checktablesql4, [EmailID1, userEmailID1], (err, result) => {

                                        if (err) {
                                            console.log(err);
                                        } else {
                                            // console.log("checktablesql4", result)
                                            db.query(checktablesql5, [EmailID1, userEmailID1], (err, result) => {

                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    //console.log("check table called");
                                                    res.end('done');
                                                }
                                            })
                                        }
                                    })
                                }
                            })

                        }

                    })
                }
            }
        }
    })




})

// --------------------------------------

var day1, day2, day3, day4, day5, day6, day7, dispday1, dispday7

newsql2 = `DELETE from sales where CustomerEmail=? AND idMedicineDatabase=? AND EmailID=?`
newfetchsql = `SELECT idMedicineDatabase from medicinedatabase where Brandname=? and Manufacturer=?`
app.post("/getdate", (req, res) => {

    email1 = req.session.userName;
    day1 = req.body.day1;
    day2 = req.body.day2;
    day3 = req.body.day3;
    day4 = req.body.day4;
    day5 = req.body.day5;
    day6 = req.body.day6;
    day7 = req.body.day7;
    // console.log("Sun",day1)
    // console.log("Mon",day2)
    // console.log("Tue",day3)
    // console.log("Wed",day4)
    // console.log("Thu",day5)
    // console.log("Fri",day6)
    // console.log("Sat",day7)
    res.end('done');

});

newfetchsql1221 = `SELECT sum(NumberItems) as NoIt from salehistory WHERE SaleDate IN (?,?,?,?,?,?,?) AND EmailID=? group by SaleDate order by SaleDate`
newfetchsql12d56 = `SELECT sum(NumberItems) as NoIt from salehistory WHERE SaleDate =? AND EmailID=? group by SaleDate`
newfetchsql12dgg = `INSERT into salehistory (idSales, idMedicineDatabase, NumberItems, CustomerEmail, SellSession, SaleDate, EmailID) values (1,1,0,1,0,?,?)`

app.get("/getchartdata", (req, res) => {
    var newday1 = day1;
    var newday2 = day2;
    var newday3 = day3;
    var newday4 = day4;
    var newday5 = day5;
    var newday6 = day6;
    var newday7 = day7;
    const sellEmailID = req.session.userName;

    // console.log("Sun1", day1)
    // console.log("Mon1", day2)
    // console.log("Tue1", day3)
    // console.log("Wed1", day4)
    // console.log("Thu1", day5)
    // console.log("Fri1", day6)
    // console.log("Sat1", day7)
    db.query(newfetchsql12d56, [newday1, sellEmailID], (err, result1) => {
        if (err) {
            console.log(err);
        } else {
            if (result1.length > 0) {
                // console.log("newday1")
                db.query(newfetchsql12d56, [newday2, sellEmailID], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result1.length > 0) {
                            // console.log("newday2")
                            db.query(newfetchsql12d56, [newday3, sellEmailID], (err, result1) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (result1.length > 0) {
                                        // console.log("newday3")

                                        db.query(newfetchsql12d56, [newday4, sellEmailID], (err, result1) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                if (result1.length > 0) {
                                                    // console.log("newday4")

                                                    db.query(newfetchsql12d56, [newday5, sellEmailID], (err, result1) => {
                                                        if (err) {
                                                            console.log(err);
                                                        } else {
                                                            if (result1.length > 0) {
                                                                // console.log("newday5")

                                                                db.query(newfetchsql12d56, [newday6, sellEmailID], (err, result1) => {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    } else {
                                                                        if (result1.length > 0) {
                                                                            // console.log("newday6")

                                                                            db.query(newfetchsql12d56, [newday7, sellEmailID], (err, result1) => {
                                                                                if (err) {
                                                                                    console.log(err);
                                                                                } else {
                                                                                    if (result1.length > 0) {
                                                                                        // console.log("newday7")

                                                                                        db.query(newfetchsql1221, [newday1, newday2, newday3, newday4, newday5, newday6, newday7, sellEmailID], (err, result1) => {
                                                                                            if (err) {
                                                                                                console.log(err);
                                                                                            } else {
                                                                                                // console.log('newfetchsql1221', result1)
                                                                                                res.send(result1)

                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        db.query(newfetchsql12dgg, [newday7, sellEmailID], (err, result) => {
                                                                                            if (err) {
                                                                                                console.log(err);
                                                                                            } else {
                                                                                                db.query(newfetchsql1221, [newday1, newday2, newday3, newday4, newday5, newday6, newday7, sellEmailID], (err, result1) => {
                                                                                                    if (err) {
                                                                                                        console.log(err);
                                                                                                    } else {
                                                                                                        // console.log('newfetchsql1221', result1)
                                                                                                        res.send(result1)

                                                                                                    }
                                                                                                });
                                                                                            }

                                                                                        });
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            db.query(newfetchsql12dgg, [newday6, sellEmailID], (err, result) => {
                                                                                if (err) {
                                                                                    console.log(err);
                                                                                } else {
                                                                                    db.query(newfetchsql1221, [newday1, newday2, newday3, newday4, newday5, newday6, newday7, sellEmailID], (err, result1) => {
                                                                                        if (err) {
                                                                                            console.log(err);
                                                                                        } else {
                                                                                            // console.log('newfetchsql1221', result1)
                                                                                            res.send(result1)

                                                                                        }
                                                                                    });
                                                                                }

                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                db.query(newfetchsql12dgg, [newday5, sellEmailID], (err, result) => {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    } else {
                                                                        db.query(newfetchsql1221, [newday1, newday2, newday3, newday4, newday5, newday6, newday7, sellEmailID], (err, result1) => {
                                                                            if (err) {
                                                                                console.log(err);
                                                                            } else {
                                                                                // console.log('newfetchsql1221', result1)
                                                                                res.send(result1)

                                                                            }
                                                                        });
                                                                    }

                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                                else {
                                                    db.query(newfetchsql12dgg, [newday4, sellEmailID], (err, result) => {
                                                        if (err) {
                                                            console.log(err);
                                                        } else {
                                                            db.query(newfetchsql1221, [newday1, newday2, newday3, newday4, newday5, newday6, newday7, sellEmailID], (err, result1) => {
                                                                if (err) {
                                                                    console.log(err);
                                                                } else {
                                                                    // console.log('newfetchsql1221', result1)
                                                                    res.send(result1)

                                                                }
                                                            });
                                                        }

                                                    });
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        db.query(newfetchsql12dgg, [newday3, sellEmailID], (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                db.query(newfetchsql1221, [newday1, newday2, newday3, newday4, newday5, newday6, newday7, sellEmailID], (err, result1) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        // console.log('newfetchsql1221', result1)
                                                        res.send(result1)

                                                    }
                                                });
                                            }

                                        });
                                    }
                                }
                            });
                        }
                        else {
                            db.query(newfetchsql12dgg, [newday2, sellEmailID], (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    db.query(newfetchsql1221, [newday1, newday2, newday3, newday4, newday5, newday6, newday7, sellEmailID], (err, result1) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            // console.log('newfetchsql1221', result1)
                                            res.send(result1)

                                        }
                                    });
                                }

                            });
                        }
                    }
                });
            }
            else {
                db.query(newfetchsql12dgg, [newday1, sellEmailID], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        db.query(newfetchsql1221, [newday1, newday2, newday3, newday4, newday5, newday6, newday7, sellEmailID], (err, result1) => {
                            if (err) {
                                console.log(err);
                            } else {
                                // console.log('newfetchsql1221', result1)
                                res.send(result1)

                            }
                        });
                    }

                });
            }
        }
    });


});

// --------------------------------------



let delFetchMedicineDBsql = `SELECT * FROM medicinedatabase where Brandname=? AND Manufacturer=?`;
let deleteSql = `DELETE FROM inventory WHERE idMedicineDatabase= ? AND EmailID = ?`;
app.post("/delete", (req, res) => {
    // console.log(req.body);
    const delBrandname = req.body.Brandname;
    const delManufacturer = req.body.Manufacturer;
    const delEmailID = req.session.userName;
    // console.log("delBrandname", delBrandname)
    // console.log("delManufacturer", delManufacturer)


    if (delBrandname == [] || delManufacturer == [] || delBrandname == null || delManufacturer == null) {
        console.log("Are you sure you answered all field?");
        res.send("Are you sure you answered all field?");
    }
    else {
        db.query(delFetchMedicineDBsql, [delBrandname, delManufacturer], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                // console.log(json)
                // console.log("First print of result", result)
                var deleteidMedicineDatabase = json[0].idMedicineDatabase;
                // console.log(deleteidMedicineDatabase)
                db.query(deleteSql, [deleteidMedicineDatabase, delEmailID], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Deleted!")
                    }
                });

            }

        });
    }
});

var displaysql = "Select * from inventory where EmailID=?"
app.get("/display", (req, res) => {
    var displayEmailID = "";
    db.query(displaysql, [displayEmailID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            // console.log("getmanufac", json)
            res.send(json)
        }
    });

});

getinventorysql = `SELECT * FROM inventory where EmailID=?`;
var idMedicineDatabase;
var EmailID;
app.get("/gettable", (req, res) => {
    EmailID = req.session.userName;
    db.query(getinventorysql, [EmailID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            if(result.length > 0){
                let getinventorysql2 = `SELECT * FROM medicinedatabase as m INNER JOIN inventory as i ON m.idMedicineDatabase = i.idMedicineDatabase  where m.idMedicineDatabase IN (${result.map(r => r.idMedicineDatabase).join(',')}) AND i.EmailID=?`;
                db.query(getinventorysql2, [EmailID], (err, resultnew) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(resultnew)
                        res.json(resultnew)
                    }
                });
            }
            else{
                res.json(null)
            }

        }
    });

});

let tradeInventory = `Select * from inventory where EmailID != ?`;
app.get("/Trade", (req, res) => {
    const myEmail = req.session.userName;
    db.query(tradeInventory, [myEmail], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            let fullTradeInventory = `SELECT * FROM medicinedatabase as m INNER JOIN inventory as i ON m.idMedicineDatabase = i.idMedicineDatabase INNER JOIN users as u ON i.EmailID= u.email where m.idMedicineDatabase IN (${result.map(r => r.idMedicineDatabase).join(',')}) AND i.EmailID!=? AND u.tradeCheck=1`;
            db.query(fullTradeInventory, [myEmail], (myErr, resultnew) => {
                if (myErr) {
                    console.log(err);
                } else {
                    // console.log(resultnew)
                    res.json(resultnew)
                }
            });
        }
    })
})

app.post("/feedback", (req, res) => {
    const Email = req.session.userName;
    const Feedback = req.body.Feedback;
    const Star = req.body.Star;

    // console.log(Feedback,Star)

    if (Feedback == '' || Star == undefined) {
        res.send("Are you sure you answered all field?")
    }
    else {
        db.query(
            "INSERT INTO Feedback ( Email, Feedback, Star) VALUES (?,?,?)",
            [Email, Feedback, Star],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Thank you for your feedback")
                }
            }
        );
    }

})

let getminorderinvsql = `SELECT * from inventory as i inner join medicinedatabase as m ON i.idMedicineDatabase = m.idMedicineDatabase where i.Stock-i.minStock<=0 AND i.EmailID=?`;
app.get("/getminorderinv", (req, res) => {

    const EmailID1 = req.session.userName;

    db.query(getminorderinvsql, [EmailID1], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    });

});

let getHistory = `select * from salehistory where EmailID = ?;`
app.get("/getHistory", (req, res) => {
    const myEmail = req.session.userName;

    db.query(getHistory, [myEmail], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            let getFullHistory = `Select * from salehistory as s INNER JOIN medicinedatabase as m ON m.idMedicineDatabase = s.idMedicineDatabase where s.idMedicineDatabase IN (${result.map(r => r.idMedicineDatabase).join(',')}) AND s.EmailID=? AND s.NumberItems > 0`;
            db.query(getFullHistory, [myEmail], (err, resultnew) => {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(resultnew)
                    res.json(resultnew)
                }
            });
        }
    })
})

var testday1

app.post("/getdate1", (req, res) => {

    email1 = req.session.userName;
    testday1 = req.body.day1;
    res.end('done');


});

let getexpirydatesql = `SELECT * from inventory as i inner join medicinedatabase as m ON i.idMedicineDatabase = m.idMedicineDatabase where i.ExpDate<? AND i.EmailID=?`;
app.get("/getexpirydate", (req, res) => {

    const EmailID1 = req.session.userName;
    // console.log("testday1",testday1)
    db.query(getexpirydatesql, [testday1, EmailID1], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log('getexpirydate',result)
            res.send(result)
        }
    });

});

app.post("/getName", (req, res) => {
    const Email = req.session.userName;
    db.query(
        "select pharmacy_name from users where email = ?", [Email], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                var sellmid = json[0].pharmacy_name;
                // console.log(sellmid)
                res.json(sellmid)
            }
        }
    )
})

app.post("/getFeedback", (req, res) => {
    let getFeedback = `select star from feedback`;
    db.query(getFeedback, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(result);
            res.send(result);
        }
    })
})

app.post("/tradeCheck", (req, res) => {
    let tradeCheck = `UPDATE users set tradeCheck=1 where email=?`;
    db.query(tradeCheck, [req.session.userName], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("done");
            res.end();
        }
    })
})

app.post("/tradeGet", (req, res) => {
    let tradeCheck2 = `SELECT tradeCheck from users where email=?`;
    db.query(tradeCheck2, [req.session.userName], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            var sellmid = json[0].tradeCheck;
            // console.log(sellmid)
            res.json(sellmid)
        }
    })
})

app.post("/HistoryChart", (req, res) => {

    let newfetchsql1e112e = `SELECT sum(NumberItems) as NoIt,DATE_FORMAT(SaleDate, '%Y-%m-%d') as SaleDate from salehistory WHERE EmailID=? AND SaleDate is not null AND NumberItems > 0 group by SaleDate order by SaleDate;`

    var Email = req.session.userName
    db.query(newfetchsql1e112e, [Email], (err, result1) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(result1)
            res.send(result1)
        }
    });
});

app.post("/otherHistoryChart", (req, res) => {

    let newfetchsql1e112e = `SELECT sum(NumberItems) as NoIt,DATE_FORMAT(SaleDate, '%Y-%m-%d') as SaleDate from salehistory WHERE EmailID!=? AND SaleDate is not null AND NumberItems > 0 group by SaleDate order by SaleDate;`

    var Email = req.session.userName
    db.query(newfetchsql1e112e, [Email], (err, result1) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(result1)
            res.send(result1)
        }
    });
});

app.post("/allHistoryChart", (req, res) => {

    let newfetchsql1e112e = `SELECT sum(NumberItems) as NoIt,DATE_FORMAT(SaleDate, '%Y-%m-%d') as SaleDate from salehistory WHERE SaleDate is not null AND NumberItems > 0 group by SaleDate order by SaleDate;`

    db.query(newfetchsql1e112e, (err, result1) => {
        if (err) {
            console.log(err)
        } else {
            console.log("my"+result1)
            res.send(result1)
        }
    });
});

app.listen(3001, () => {
    console.log("Your server is running....");
});
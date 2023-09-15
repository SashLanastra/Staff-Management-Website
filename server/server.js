import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from 'multer';
import path from 'path';
import 'dotenv/config'

const app = express();
app.use(cors(
    {
        origin: ["https://precious-pegasus-a28983.netlify.app/"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    port: `${process.env.DB_PORT}`
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const claimstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/claimages')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

const claimupload = multer({
    storage: claimstorage
})

con.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to DB")
    }
})

app.get("/", (req, res) => {
    res.json("This is ther server")
})

app.get('/getemployees', (req, res) => {
    const sql = "SELECT * FROM employees";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: 'Error in getting employee data from sql' })
        return res.json({ Status: 'Success', Result: result })
    })
})

app.get('/getclaims', (req, res) => {
    const sql = "SELECT * FROM claims";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in fetching claims data"})
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/getclaims/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM claims WHERE employeeId = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Error in fetching employee claims"})
        return res.json({Status: "Success", Result:result})
    })
})

app.put('/updateclaim/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE claims SET paid = NOT paid WHERE employeeId = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Error in updating claim" })
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Error in getting employee from sql" })
        return res.json({ Status: "Success", Result: result })
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employees SET lastName = ?, role = ?, address = ?, cellphone = ?, salary = ? WHERE id = ?";
    con.query(sql, [req.body.lastName, req.body.role, req.body.address, req.body.cellphone, req.body.salary, id], (err, result) => {
        if (err) return res.json({ Error: "Error in updating employee" })
        return res.json({ Status: "Success", Result: result })
    })
})

app.put('/updateisBirthday/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employees SET isBirthday = ? WHERE id = ?";
    con.query(sql, [req.body.isBirthday, id], (err, result) => {
        if (err) return res.json({ Error: "Error in updating employee" })
        return res.json({ Status: "Success", Result: result })
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employees WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: 'Error in delete employee from employee sql' })
        return res.json({ Status: 'Success', Result: result })
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Wrong Token" });
            req.role = decoded.role;
            req.id = decoded.id;
            next()
        })
    }
}

app.get('/homepage', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })
})

app.get('/admincount', (req, res) => {
    const sql = "SELECT count(id) as admin from adminuser";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" })
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/staffcount', (req, res) => {
    const sql = "SELECT count(id) as staff from employees";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" })
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/salarycount', (req, res) => {
    const sql = "SELECT sum(salary) as salarycount from employees";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" })
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/claimsum/:id', (req, res) => {
    const employeeId = req.params.id
    const sql = "SELECT sum(claim) as claimsum from claims WHERE employeeId= ?";
    con.query(sql, [employeeId], (err, result) => {
        if (err) return res.json({ Error: "Error in running query" })
        return res.json({ Status: "Success", Result: result })
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM adminuser where email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            const id = result[0].id
            const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: "1d" });
            res.cookie("token", token);
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Wrong email or password" })
        }
    })
})

app.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM employees where email = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({ Error: 'Password error' })
                const id = result[0].id
                const token = jwt.sign({ role: "employee", id: result[0].id }, "jwt-secret-key", { expiresIn: "1d" });
                res.cookie("token", token);
                return res.json({ Status: "Success", id: result[0].id })
            })

        } else {
            return res.json({ Status: "Error", Error: "Wrong email or password" })
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
})

app.post('/create', upload.single('avatarUrl'), (req, res) => {
    const sql = "INSERT INTO employees(`firstName`, `lastName`, `email`, `password`, `idNumber`, `staffCode`, `role`, `address`, `cellphone`, `gender`, `dob`, `salary`, `doe`, `avatarUrl`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hash,
            req.body.idNumber,
            req.body.staffCode,
            req.body.role,
            req.body.address,
            req.body.cellphone,
            req.body.gender,
            req.body.dob,
            req.body.salary,
            req.body.doe,
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Error in create emp query" });
            return res.json({ Status: "Success" })
        })
    })
})

app.post('/createClaim', claimupload.single('proof'), (req, res) => {
    const sql = "INSERT INTO claims( `employeeId`, `staffCode`, `firstName`, `lastName`, `details`, `amount`, `date`, `proof`, `avatarUrl`) VALUES(?) ";
    const values = [
        req.body.employeeId, 
        req.body.staffCode, 
        req.body.firstName, 
        req.body.lastName, 
        req.body.details,
        req.body.amount, 
        req.body.date, 
        req.file.filename,
        req.body.avatarUrl,
    ]
    console.log(values)
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({Error: err})
        return res.json({Status: "Success"})
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Running on port : ${process.env.PORT}`)
})



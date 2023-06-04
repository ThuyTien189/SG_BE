const db = require("../database/connection");
const express = require("express");
const { hashPassword } = require("../helpers/hash");
const { authenticate } = require("../middleware/authenticate");
const { validateUserRegister } = require("../middleware/validateUser");

const route = express.Router();

const SECRET = "secret";
// create
route.post("/create", authenticate, validateUserRegister, async (req, res) => {
    const existedUsername = await db
        .select()
        .from("users")
        .where("username", req.body.username)
        .first();
    if (!existedUsername) {
        const { salt, hashedPassword } = hashPassword(req.body.password);
        user = {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        gender: req.body.gender,
        name: req.body.name,
        age: parseInt(req.body.age),
        salt: salt,
        createAt: new Date(Date.now()),
        createBy: req.user.id,
        isAdmin: req.body.isAdmin,
        };
        await db.insert(user).into("users");
        return res.status(201).json({ message: "created successful" });
    }
    return res.status(200).json({ message: "Username already exists" });
});
// update
route.put("/:id", authenticate, async (req, res) => {
    await db("users").where("id", req.params.id).update({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        isAdmin: req.body.isAdmin,
    });
    return res.status(200).json({ message: "update successful" });
});
// delete
route.delete("/:id", authenticate, async (req, res) => {
    await db("users").where("id", req.params.id).del();
    return res.status(200).json({ message: "delete successful" });
});
// pagination / search by name
route.get("/getUsers", async (req, res) => {
    let page_size = req.query.page_size,
        page_index = req.query.page_index,
        name = req.body.name ? req.body.name : null;
    const condition = (builder) => {
        if (name) {
        builder.where("name", "like", `%${name}%`);
        }
    };
    // console.log(condition);
    var pagination = {};
    if (page_index < 1) page_index = 1;
    var offset = (page_index - 1) * page_size;
    return Promise.all([
        db.count("* as count").from("users").where(condition).first(),
        db.select("*").from("users").where(condition).offset(offset).limit(page_size),
    ]).then(([total, rows]) => {
        var count = total.count;
        var rows = rows;
        pagination.total = count;
        pagination.per_page = page_size;
        pagination.offset = offset;
        pagination.to = offset + rows.length;
        pagination.last_page = Math.ceil(count / page_size);
        pagination.current_page = page_index;
        pagination.from = offset;
        pagination.data = rows;
        res.status(200).json({ message: pagination });
    });
});

module.exports = route;

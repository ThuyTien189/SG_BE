const connection = require('./connection')

connection.query("CREATE TABLE Users (id INT AUTO_INCREMENT, fullname VARCHAR(255) NOT NULL, gender BOOLEAN, age INT NOT NULL, PRIMARY KEY(id))", (err, result) => {
    console.log(err);
    console.log(result);
})

connection.query("INSERT INTO Users(fullname, gender, age) VALUES ('Ho Thuy Tien', true, 18), ('HEHE', false, 20)", (err, result) => {
    console.log(err);
    console.log(result);
})

connection.query("SELECT * FROM Users", (err, result) => {
    console.log(err);
    console.log(result);
})

connection.query("SELECT * FROM Users WHERE id = ?" , [1], (err, result) => {
    console.log(err);
    console.log(result);
})

connection.query("UPDATE Users SET fullname = ?, gender = ?, age = ? WHERE id = ?" , ['Nguyen Thi Tuong', true, 30, 2], (err, result) => {
    console.log(err);
    console.log(result);
})

connection.query("DELETE FROM Users WHERE id = ?" , [3], (err, result) => {
    console.log(err);
    console.log(result);
})

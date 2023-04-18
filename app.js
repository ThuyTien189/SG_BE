const express = require('express')
const app = express()
app.use(express.json())

// Require user route
const userRoute = require('./nodeapp/routes/users')
// Dùng userRoute cho tất cả các route bắt đầu bằng '/users'
app.use('/api/users', userRoute);

const port = 3000
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})
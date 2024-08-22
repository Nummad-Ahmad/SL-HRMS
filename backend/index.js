const express = require('express');
// conStr = "mongodb+srv://nummadtech:zfjektln@cluster0.l41ioic.mongodb.net/";
conStr = "mongodb://localhost:27017";
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const moment = require('moment');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(conStr).then(() => console.log("DB")).catch(e => console.log(e));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
    },
    department: {
        type: String,
    },
    position: {
        type: String,
    },
    password: {
        type: String
    },
    salary: {
        type: Number
    },
    gender: {
        type: String
    },
    birthday: {
        type: String
    }
});
const attendanceSchema = new mongoose.Schema({
    date: {
        type: String
    },

    incomingTime: {
        type: String
    },

    outgoingTime: {
        type: String,
    },

    duration: {
        type: String,
    },
    username: {
        type: String
    }

});
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
    }
});
const requestsSchema = new mongoose.Schema({
    leaveType: {
        type: String,
    },
    days: {
        type: Number,
    },
    leaveDate: {
        type: String,
    },
    leaveStatus: {
        type: String,
    },
    email: {
        type: String
    }
});
const departmentSchema = new mongoose.Schema({
    department: {
        type: String
    },
    count: {
        type: Number
    }
});
const taxSchema = new mongoose.Schema({
    month: {
        type: String
    },
    amount: {
        type: Number
    },
    status: {
        type: String
    },
    email: {
        type: String
    }
});
const loginSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

const attendanceModel = mongoose.model('attendance', attendanceSchema);
const userModel = mongoose.model('user', userSchema);
const projectModel = mongoose.model('project', projectSchema);
const requestsModel = mongoose.model('request', requestsSchema);
const departmentModel = mongoose.model('department', departmentSchema);
const taxModel = mongoose.model('tax', taxSchema);

app.get('/userdata', async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const results = {};
    const usersData = await userModel.find();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (endIndex < usersData.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    results.result = usersData.slice(startIndex, endIndex);
    res.json(results);
});
app.get('/dashboard', async (req, res) => {
    const deptData = await departmentModel.find();
    res.send(deptData);
});
app.get('/user', async (req, res) => {
    const userData = await userModel.find();
    res.send(userData);
})
app.get('/user/:email', async (req, res) => {
    const email = req.params.email;
    const userData = await userModel.findOne({ email });
    res.send(userData);
})
app.get('/attendance', async (req, res) => {
    try {
        const attendaceData = await attendanceModel.find();
        res.send(attendaceData);
    } catch (e) {
        console.log(e);
    }
})
app.get('/attendancedata', async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const results = {};
    const attendancedata = await attendanceModel.find();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (endIndex < attendancedata.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    const result = attendancedata.slice(startIndex, endIndex);
    res.json(result);
});
app.get('/projects', async (req, res) => {
    try {
        const projectsData = await projectModel.find();
        res.send(projectsData);
    } catch (e) {
        console.log(e);
    }
})
app.get('/request', async (req, res) => {
    try {
        const requestsData = await requestsModel.find();
        res.send(requestsData);
    } catch (e) {
        console.log(e);
    }
})
app.get('/tax', async (req, res) => {
    try {
        const taxData = await taxModel.find();
        res.send(taxData);
    } catch (e) {
        console.log(e);
    }
})
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ email });
        if (userData) {
            const matchPassword = await bcrypt.compare(password, userData.password);
            const isFound = (matchPassword);
            if (isFound) {
                res.send(true);
            } else {
                res.send(false);
            }
        } else {
            res.send(false);
        }
    } catch (e) {
        console.log(e);
    }
})
app.post('/request', async (req, res) => {
    try {
        const newRequest = new requestsModel(req.body);
        const result = await newRequest.save();
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})
app.post('/checkin', async (req, res) => {
    try {
        const newAttendance = new attendanceModel(req.body);
        const result = await newAttendance.save();
    } catch (e) {
        console.log(e);
    }
})
app.post('/tax', async (req, res) => {
    try {
        const newTax = new taxModel(req.body);
        const result = await newTax.save();
        if (result) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (e) {
        console.log(e);
    }
});
app.post('/newuser', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10);
        const count = await userModel.countDocuments({});
        if (existingUser == null) {
            const newUser = new userModel({
                id: count + 1,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                department: req.body.department,
                position: req.body.position,
                gender: req.body.gender,
                salary: req.body.salary,
                birthday: req.body.birthday
            });
            const savedUser = await newUser.save();
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (e) {
        console.log(e);
    }
});

app.patch('/checkout', async (req, res) => {
    try {
        const { outgoingTime, date, username } = req.body;
        const data = await attendanceModel.findOne({ date, username });
        const time1 = moment(data.incomingTime, "HH:mm");
        const time2 = moment(outgoingTime, "HH:mm");
        const diffMinutes = Math.abs(time1.diff(time2, 'minutes'));
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        const duration = hours + ' : ' + minutes;
        const newData = await attendanceModel.findOneAndUpdate({ date, username }, { outgoingTime: outgoingTime, duration: duration });
        const result = await newData.save();
    } catch (e) {
        console.log(e);
    }
});
app.patch('/changepassword', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10);
        if (existingUser) {
            const userData = await userModel.findOneAndUpdate({ email }, { password: hashedPassword });
            const savedUser = await userData.save();
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (e) {
        console.log(e);
    }
});
app.patch('/updatecount', async (req, res) => {
    try {
        const { department } = req.body;
        const existingData = await departmentModel.findOne({ department });
        const existingCount = existingData.count;
        if (existingData) {
            const departmentData = await departmentModel.findOneAndUpdate({ department }, { count: existingCount + 1 });
            await departmentData.save();
        }
    } catch (e) {
        console.log(e);
    }
});

app.listen(8000, () => {
    console.log('server started');
});


// app.post('/signup', async (req, res) => {
//     try {
//         const { email, password, name } = req.body;
//         const existingUser = await userModel.findOne({ email });
//         const count = await userModel.countDocuments({});
//         const hashedPassword = await bcrypt.hash(password, 10);
//         if (!existingUser) {
//             const userData = await userModel.create({
//                 email,
//                 password: hashedPassword,
//                 name,
//                 id: count + 1
//             });
//             const savedUser = await userData.save();
//             res.send(true);
//         } else {
//             res.send(false);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })

// app.patch('/addData/:email', async (req, res) => {
//     try {
//         const email = req.params.email;
//         const newData = await userModel.findOneAndUpdate({ email }, req.body);
//         res.send(newData);
//     } catch (e) {
//         console.log(e);
//     }
// });

// app.put('/put/:email', async (req, res) => {
//     try {
//         const email = req.params.email;
//         const newData = await userModel.findOneAndReplace({ email }, req.body);
//         res.send(newData);
//     } catch (e) {
//         console.log(e);
//     }
// });

// app.delete('/delete/:email', async (req, res) => {
//     try {
//         const email = req.params.email;
//         const deletedData = await userModel.findOneAndDelete({ email });
//         res.send(deletedData);
//     } catch (e) {
//         console.log(e);
//     }
// });
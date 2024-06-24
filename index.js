const express = require("express");
const cors = require("cors");
const app = express();
// const PhoneBook = require('./model/phonebook')
const PhoneBook = require('./modal/book.js');
app.use(express.json());
app.use(cors());
const PORT = 8000;

const mongoose = require("mongoose");

const DB = "mongodb+srv://Vguru:guru@cluster0.6zv9m4r.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB).then(() => {
  console.log("Database connected..");
});

app.post("/add-phone", async (req, res) => {
    const details = await req.body;
    console.log(details);
    const phoneNumber = new PhoneBook(req.body);
    try {
      await phoneNumber.save();
      res.status(201).json({
        status: "Success",
        data: {
          phoneNumber,
        },
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({
        status: "Failed",
        message: err,
      });
    }
  });


  app.get('/get-phone', async (req,res) => {
    const phoneNumbers = await PhoneBook.find({})
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                phoneNumbers
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})


app.patch('/update-phone/:id', async (req,res) => {
  const updatedPhone = await PhoneBook.findByIdAndUpdate(req.params.id,req.body,{
      new : true,
      runValidators : true
    })
  try{
      res.status(200).json({
          status : 'Success',
          data : {
            updatedPhone
          }
        })
  }catch(err){
      console.log(err)
  }
})


app.delete('/delete-phone/:id', async(req,res) => {
  await PhoneBook.findByIdAndDelete(req.params.id)
  
  try{
    res.status(204).json({
        status : 'Success',
        data : {}
    })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
})



app.listen(PORT, () => {
    console.log('Ready on http://localhost:' + PORT)
})
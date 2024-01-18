import express from 'express';
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.API_KEY;


const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get("/", async (req, res) => {
  try{  
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=41.878113&lon=-87.629799&appid=${apiKey}`);
    const currentWeather = response.data.current;
  console.log(currentWeather);
    res.render("index.ejs", { data: currentWeather });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
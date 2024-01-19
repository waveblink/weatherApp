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
  try {
    // Prepare URLs for API calls
    const urlChicago = `https://api.openweathermap.org/data/3.0/onecall?lat=41.878113&lon=-87.629799&appid=${apiKey}`;
    const urlDallas = `https://api.openweathermap.org/data/3.0/onecall?lat=32.7767&lon=-96.7970&appid=${apiKey}`;
    const urlIndiana = `https://api.openweathermap.org/data/3.0/onecall?lat=40.7128&lon=-74.0060&appid=${apiKey}`;

    // Using Promise.all to handle all API calls concurrently
    const [responseChicago, responseDallas, responseIndiana] = await Promise.all([
      axios.get(urlChicago),
      axios.get(urlDallas),
      axios.get(urlIndiana)
    ]);

    // Extracting current weather from each response
    const currentWeatherChicago = responseChicago.data.current;
    const currentWeatherDallas = responseDallas.data.current;
    const currentWeatherIndiana = responseIndiana.data.current;

    // Rendering the page with all the data
    res.render("index.ejs", {
      chicagoWeather: currentWeatherChicago,
      dallasWeather: currentWeatherDallas,
      indianaWeather: currentWeatherIndiana
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

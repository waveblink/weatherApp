import express from 'express';
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get("/", async (req, res) => {
  try{  
  const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=c88e3c70e2041522ce07709479f1ca4e`);
  const result = response.data;
  console.log(result);
    res.render("index.ejs", { data: result });
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
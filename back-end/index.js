const express = require("express");
const cors = require("cors");
const app = express();

const creds = require("./elephant");

const PORT = 3001;

app.use(express.json());
app.use(cors());

// user table
// sign in or user account page?
// app.post("/create_user", (req,res) => {
//     creds.connect(async() => {
//     try{
//         const data = await creds.query(`INSERT INTO users(user_name, password) VALUES ('${req.body.user_name}','${req.body.password}')`)
//         res.send(`Inserted New user with ${req.body.user_name} ${req.body.password}`);
//         // console.log(res.send);
//     }catch(err){
//         res.send(err);
//     };
// });

// });

// app.get("/read_user", (req,res) => {
//     try{
//         creds.connect(async() => {
//         const data = await creds.query(`SELECT * FROM users`);
//         res.send (data);
//             });
//     }catch(err){
// res.send(err);
//     };

// });

// manually put car in cars table WORKS
app.post("/create_car", (req, res) => {
  try {
    creds.connect(() => {
      const {
        car_name,
        car_model,
        year,
        color,
        day_price,
        week_price,
        car_seats,
        image,
      } = req.body;
      creds.query(
        `INSERT INTO cars(
      car_name,
      car_model,
      year,
      color,
      day_price,
      week_price,
      car_seats,
      image)
      VALUES(
        '${car_name}',
        '${car_model}',
        '${year}',
        '${color}',
        '${day_price}',
        '${week_price}',
        '${car_seats}',
        '${image}')`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(401).send(err);
          }
          res.send(result);
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
});

// cars table reads ALL cars WORKS
app.get("/read_cars", (req, res) => {
  const id = req.params.id;
  try {
    creds.connect(() => {
      creds.query(`SELECT * FROM cars`, function (err, result) {
        if (err) {
          console.log(err);
          res.status(401).send(err);
        }
        res.send(result);
      });
    });
  } catch (err) {
    res.send(err);
  }
});

// order/invoice add car to cart?
app.put("/update_cart/:car_name", (req, res) => {
  const car_name = req.params.car_name;
  try {
    creds.connect(async () => {
      const data = await creds.query(
        `SELECT * FROM cars WHERE car_name = ${car_name}`
      );
      for (i in data.rows) {
        await creds.query(
          `INSERT INTO cart(car_name, engine, car_seats, transmission, msrp, fuel_economy, drivetrain, horsepower, image)
           VALUES ('${data.rows[0].car_name}', '${data.rows[0].engine}', '${data.rows[0].car_seats}', '${data.rows[0].transmission}', '${data.rows[0].msrp}', '${data.rows[0].fuel_economy}', '${data.rows[0].drivetrain}', '${data.rows[0].horsepower}', '${data.rows[0].image}')`
        );
        res.send(data);
      }
    });
  } catch (err) {
    res.send(err);
  }
});

// order/invoice reading cart?
app.get("/read_cart", (req, res) => {
  try {
    creds.connect(async () => {
      const data = await creds.query(`SELECT * FROM cart`);
      res.send(data);
    });
  } catch (err) {
    res.send(err);
  }
});

// delete from cart?
app.delete("/delete_car/:car_name", (req, res) => {
  const car_name = req.params.car_name;
  try {
    creds.connect(async () => {
      const data = await creds.query(
        `DELETE FROM cart WHERE car_name = ${car_name}`
      );
      res.send(data);
    });
  } catch (err) {
    res.send(err);
  }
});
app.listen(PORT, console.log(`Listening on port ${PORT}`));

// cart table schema
// id SERIAL PRIMARY KEY,
// car_name VARCHAR NOT NULL FOREIGN KEY car_name FROM cars,
// first_name VARCHAR NOT NULL FOREIGN KEY first_name FROM login,
// last_name VARCHAR NOT NULL FOREIGN KEY last_name FROM login,
// pickup_date DATE NOT NULL,
// return_date DATE NOT NULL,
// day_price INTEGER NOT NULL,
// total_price INTEGER NOT NULL

// login table schema
// id SERIAL PRIMARY KEY,
// first_name VARCHAR NOT NULL,
// last_name VARCHAR NOT NULL,
// email VARCHAR NOT NULL,
// password VARCHAR NOT NULL

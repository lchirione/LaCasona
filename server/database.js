const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/restaurant',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (err, res) => {
    if (err) {
      console.error("Error al conectar con la base de datos: " + err.message);
    }
    console.log("Se conecto con la base de datos Mongodb");
  }
);
// import atau panggil package2 yg kita mau pakai di aplikasi kita
const express = require('express')
const path = require('path');
const { Op } = require('sequelize');

// manggil models/table disini
const { car } = require('./models');

// framework express = framework utk http server
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting view engine
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render("index", {
        title: "Ryan"
    })
})

// ini untuk page lihat semua car dari database
app.get('/admin/car', async (req, res) => {
    let cars;

    console.log(req.params)
    console.log(req.query)

    if (req.query.filter) {
        cars = await car.findAll({
            where: {
                ukuran: {
                    [Op.substring]: req.query.filter
                }
            },
            order: [['id', 'ASC']]
        });
    } else {
        // get data dari database pake sequelize method findAll
        car = await car.findAll({
            order: [['sewa', 'DESC']]
        });
    }

    // proses akhir = response yg render ejs file kalian
    res.render('cars/index', {
        cars
    })
})

// ini utk render page create car
app.get('/admin/car/create', (req, res) => {
    res.render("cars/create")
})

// ini untuk create product baru 
app.post('/cars', upload.single('image'), async (req, res) => {
    // request body => req.body.name
    const { nama, sewa_per_hari } = req.body
    const file = req.file

    console.log(file)

    // untuk dapat extension file
    // image.jpg => jpg itu extension nya
    const split = file.originalname.split('.');
    const ext = split[split.length - 1];

    // proses upload file ke imagekit
    const img = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${ext}`
    })

await product.create({
    nama,
    sewa_per_hari,
    ukuran: req.body.size,
    foto: img.url
})

// response redirect page
res.redirect(201, "/admin/car")
})

// ini utk render page edit car
app.get('/admin/car/edit/:id', async (req, res) => {
    // proses ambil detail car sesuai id yg di params
    const data = await car.findByPk(req.params.id)
    const productDetail = data.dataValues
    res.render("cars/update", {
        productDetail,
        sizeOptions: ['small', 'medium', 'large']
    })
})

// ini untuk update product 
app.post('/cars/edit/:id', (req, res) => {
    // req.params.id
    // request body => req.body.name
    const { nama, sewa_per_hari } = req.body
    const id = req.params.id

    // proses insert atau create data yg dari request body ke DB/tabel 
    // pakai sequelize method create utk proses data baru ke table/model nya
    car.update({
    nama,
    sewa_per_hari,
    ukuran: req.body.size,
    foto: img.url
    }, {
        where: {
            id
        }
    })

    // response redirect page
    res.redirect(200, "/admin/product")
})

// delete car
app.get('/cars/delete/:id', async (req, res) => {
    const id = req.params.id
    car.destroy({
        where: {
            id
        }
    })

    res.redirect(200, "/admin/car")
})

//   Ini adalah kalau memasukkan url yang salah
  app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
  })

app.listen(port, () => {
  console.log(`App Running on localhost: ${port}`)
})
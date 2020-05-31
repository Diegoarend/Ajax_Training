const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const multer = require('multer')

// dentro da pasta atual sirva os arquivos estáticos
app.use(express.static('.'))
//se vier um código através de um formulário será aplicado este código para transformar em obj
app.use(bodyParser.urlencoded({ extended: true }))
//se vier um json no body da requisicao será aplicado este código para transformar em obj
app.use(bodyParser.json())

//utilizar o multer para definir aonde os arquivos via uplaod serão armazenados
const storage = multer.diskStorage({
    //nesse caso na pasta ./upload
    destination: function(req, file, callback){
        callback(null,'./upload')
    },
    //definindo o nome da pasta com Datenow antes, para não haver nomes iguais e sobreposicao
    filename:function (req, file, callback){
        callback(null,`${Date.now()}_${file.originalname}`)
    }
})

//passou a storage paara o multer 
const upload = multer({storage}).single('arquivo')

app.post('/upload',(req,res) => {
    upload (req,res,err => {
        if(err) {
            return res.end('Ocorreu um erro')
        }

        res.end('Concluido')
    })
})

app.post('/formulario', (req,res) => {
    res.send({
        //usando o spread e inserindo o id, está retornando para a página
        ...req.body,
        id: 1
    })
})

app.listen(8080, () => console.log('Executando...'))

/*const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage }).single('arquivo')

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluído com sucesso.')
    })
})

app.post('/formulario', (req, res) => {
    res.send({
        ...req.body,
        id: 7
    })
})
*/
/*app.get('/parOuImpar', (req, res) => {
    // req.body
    // req.query
    // req.params
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

*/
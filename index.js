let express= require("express")

let app = express()
let products = []

app.use(express.json())


app.get("/",(req,res,next)=>{
    res.send(products)
})

app.post("/addproduct",(req,res)=>{
    console.log(req.body);
    // if(req.body)
    if(req.body.id && req.body.pname && req.body.price){
        products.push(req.body)
        res.send({error:false,message:"The product is added"})
    }else{
        res.send({error:true,message:"All field is neccessary"})
    }
})

app.put("/updateproduct/:pid",(req,res)=>{
    console.log(req.params);
    let updateObject = products.find((product)=>{
        return product.id === Number(req.params.pid)
    })

    if(updateObject){
        let filterProduct = products.map((product)=>{
             if(product.id === Number(req.params.pid)){
                product.price= 400;
                
             }
             return product
             
        })

        products=filterProduct;

        res.send(products) 
    }else{
        res.send({error:true,message:"This product is not found"})
    }
})

app.delete("/delete/:pid",(req,res)=>{
    console.log("enter");

    let filterProduct= products.filter((product)=>{
        return product.id !== Number(req.params.pid)
    })

    products= filterProduct;
    res.send(products)
    // res.send(filterProduct)
})

app.listen(6500,()=>{
    console.log("Server is running on port number 6500");
})
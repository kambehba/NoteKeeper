var bodyParser = require('body-parser');
const Note = require('../models/note');

module.exports = function(app){

   
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    var lastId = undefined;


    app.get("/api/notes",(req,res,next)=>{
        if(lastId)
            {
                
                Note.find({ _id: { $gt: lastId } } ).limit(5).then(doc=>{
                    if(doc.length)
                    {
                        
                        lastId = doc[doc.length-1]._id;
                        res.status(200).json({message:"****",notes:doc});
                    }
                    else lastId = undefined;
                
                });
    
            }
            else
            {
                Note.find().limit(5).then(doc=>{
                    lastId = doc[doc.length-1]._id;
                    res.status(200).json({message:"****",notes:doc});
                });
                
    
            }
      
    });


    app.get("/api/allnotes",(req,res,next)=>{
        lastId = undefined;
        
        Note.find().limit(5).then(doc=>{
        lastId = doc[doc.length-1]._id;
        res.status(200).json({message:"****",notes:doc});
        });
                
    });
    
    
    app.post("/api/notes",(req,res,next)=>{
        console.log("POST" + req.body.MP);
        const note = new Note({
            Balance: req.body.Balance,
            MP:req.body.MP,
            Interest:req.body.Interest
        });

        note.save();
        console.log("POST2");

        res.status(201).json({message:'post added successfully'});

    });


    app.put("/api/notes/:id",(req,res,next)=>{
        console.log("PUT");

        const note = new Note({
            Balance: req.body.Balance,
            MP:req.body.MP,
            Interest:req.body.Interest,
            _id: req.body.Id
        });

        Note.updateOne({_id:req.params.id},note).then(result=>{
            res.status(200).json({message:"Update Successfull.!"});
        });

        
    });


    app.delete("/api/notes/:id",(req,res,next)=>{
        console.log("DELETE");

       
        Note.remove({_id:req.params.id}).then(result=>{
            res.status(200).json({message:"Update Successfull.!"});
        });

        
    });


}
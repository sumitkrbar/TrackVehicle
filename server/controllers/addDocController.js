import Document from '../models/document.js';
export const addDocController = async (req, res) =>{
    console.log("hereeee");
    
    try{
        const {owner, phone, vehicleNumber, cf, np, auth, remarks} = req.body;
        console.log("request recieved")
        console.log(req.body);
        
        const newDocument = new Document({
            owner,
            phone,
            vehicleNumber,
            cf,
            np,
            auth,
            remarks
        });
        console.log("doc created");
        
        await newDocument.save();
        console.log("saved");
        
        res.status(201).json({ message: 'Document added successfully', document: newDocument });
    }catch(error){
        console.log(error);
        
        res.status(500).json({ message: 'Server Error' });
    }   
}
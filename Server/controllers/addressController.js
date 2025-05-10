import Address from "../models/Address.js";

//Add address : api/address/add
export const addAddress = async (req, res) => {
        
        try {
            const {address,userId} = req.body;
            await Address.create({
               ...address,
                userId
            })

            res.json({ success: true, message: "Address added successfully" });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ success: false, message: err.message });
        }
}

//Get address : api/address/get
export const getAddress = async (req, res) => {
      try {
        const {userId} = req.body;
        const addresses = await Address.find({userId});

        return res.json({ success: true, message: "Address fetched successfully", addresses });
      } catch (err) {
           console.log(err.message);
              res.status(500).json({ success: false, message: err.message });   
      }
}

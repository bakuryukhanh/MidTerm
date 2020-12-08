const { BillModel } = require("../billModel");
const saveBill = async (data) => {
    const newbill = new BillModel(data);
    await newbill.save();
};
exports = { saveBill };

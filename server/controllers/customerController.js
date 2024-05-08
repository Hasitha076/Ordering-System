const customerSchema = require('../model/customerModel')

const createCustomer = async (req, res) => {
    try {
        await customerSchema.findOne({ email: req.body.email }).then((response) => {
            customerSchema.countDocuments().then((count) => {
                if (response === null) {
                    const customer = new customerSchema({
                        id: count === 0 ? 1 : count + 1,
                        regNumber: req.body.regNumber,
                        name: req.body.name,
                        age: req.body.age,
                        phoneNumber: req.body.phoneNumber,
                        email: req.body.email,
                        address: req.body.address,
                        city: req.body.city,
                        zipcode: req.body.zipcode,
                    })

                    customer.save().then((result) => {
                        return res.status(200).json({ msg: 'Customer created successfully!', result })
                    })
                } else {
                    return res.status(404).json({ msg: 'Customer is already exist!' })
                }
            })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error!' })
    }
}

const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await customerSchema.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    id: req.body.id,
                    regNumber: req.body.regNumber,
                    name: req.body.name,
                    age: req.body.age,
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    address: req.body.address,
                    city: req.body.city,
                    zipcode: req.body.zipcode
                }
            },
            { new: true }
        )

        if (customer) {
            return res.status(200).json({ msg: 'Customer updated successfully', customer })
        } else {
            return res.status(404).json({ msg: 'Customer not found' })
        }

    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}


const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id
        await customerSchema.findOneAndDelete({ _id: id }).then((response) => {
            if (response === null) {
                return res.status(404).json({ msg: 'Customer not found' })
            }
            return res.status(200).json({ msg: 'Customer deleted successfully', response })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const getAllCustomers = async (req, res) => {
    try {
        await customerSchema.find().then((result) => {
            if (result === null) {
                return res.status(404).json({ msg: 'Customers not found' })
            }
            return res.status(200).json({ msg: 'All customers displayed successfully', result })
        })

    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const getCustomer = async (req, res) => {
    try {
        const id = req.params.id
        await customerSchema.findOne({ _id: id }).then((response) => {
            if (response == null) {
                return res.status(404).json({ msg: 'Customer not found' })
            }
            return res.status(200).json({ msg: 'Customer got successfully', response })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const countCustomers = async (req, res) => {
    try {
        await customerSchema.countDocuments().then((result) => {
            if (result < 0) {
                return res.status(404).json({ msg: 'Customer not found' })
            }
            return res.status(200).json({ msg: 'Total Customers counted successfully', result })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const serach = async (req, res) => {
    try {
        const searchName = new RegExp(req.params.name, 'i')
        await customerSchema.find({ name: { $regex: searchName } }).then((response) => {
            if (response.length > 0) {
                if (response.length === 1) {
                    return res.status(200).json({ msg: 'Customer found', response })
                }
                return res.status(200).json({ msg: 'Customers found', response })
            }
            return res.status(404).json({ msg: 'Customer not found' })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomer,
    countCustomers,
    serach
}
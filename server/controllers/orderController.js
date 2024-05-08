const orderSchema = require('../model/orderModel')
const nodemailer = require('nodemailer')
require('dotenv').config()

const createOrder = async (req, res) => {
    try {
        orderSchema.countDocuments().then((count) => {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const order = new orderSchema({
                id: count === 0 ? 1 : count + 1,
                date: `${day}-${month}-${year}`,
                customerDetails: req.body.customerDetails,
                totalCost: req.body.totalCost,
                products: req.body.products,
                status: "pending"
            })

            order.save().then((response) => {
                if (response) {
                    return res.status(200).json({ msg: 'Order placed successfully!', response })
                }
                return res.status(404).json({ msg: 'Something went wrong!' })
            })
        })


    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params
        console.log("delete order: ", id);
        await orderSchema.findOneAndDelete({ _id: id }).then((response) => {
            if (response) {
                return res.status(200).json({ msg: 'Order cancelled successfully!', response })
            }
            return res.status(404).json({ msg: 'Order not found!' })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const getAllOrders = async (req, res) => {
    try {
        await orderSchema.find().then((response) => {
            if (response.length > 0) {
                if (response.length === 1) {
                    return res.status(200).json({ msg: 'Order found successfully!', response })
                }
                return res.status(200).json({ msg: 'All orders found successfully!', response })
            } else {
                return res.status(404).json({ msg: 'There is no any order here!', response: {} })
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const getOrder = async (req, res) => {
    try {
        const { id } = req.params
        await orderSchema.findOne({ _id: id }).then((response) => {
            if (response) {
                return res.status(200).json({ msg: 'Order found successfully!', response })
            } else {
                return res.status(404).json({ msg: 'Order not found!' })
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const changeStatus = async (req, res) => {
    try {
        const _id = req.params.id
        const { status, id } = req.body
        console.log(id, status)
        await orderSchema.findByIdAndUpdate({ _id: _id }, {
            $set: {
                status: status
            }
        },
            { new: true }

        ).then((response) => {
            if (response) {
                const result = response.status

                const transpoter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.APP_PASSWORD
                    }
                })

                const mailOptions = {
                    from: process.env.EMAIL_USERNAME,
                    to: req.body.email,
                    subject: 'Current order status',
                    text: `ID no.${id} order status is ${status}`
                }

                transpoter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(500).json({ msg: 'Error sending mail' })
                    } else {
                        return res.status(200).json({ msg: 'Order status updated successfully', result })
                    }
                })

            } else {
                return res.status(404).json({ msg: 'Order not found' })
            }
        })


    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const countOrder = async (req, res) => {
    try {
        await orderSchema.countDocuments().then((result) => {
            if (result > 0) {
                return res.status(200).json({ msg: 'Order counted successfully!', result })
            }
            return res.status(404).json({ msg: 'Order not found!' })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const totalIncome = async (req, res) => {
    try {
        let totalIncome = 0
        await orderSchema.find().then((response) => {
            if (response.length > 0) {
                response.map((ele) => totalIncome = Number(totalIncome) + Number(ele.totalCost))
                return res.status(200).json({ msg: 'Total income', totalIncome })
            } else {
                return res.status(404).json({ msg: 'Total income', totalIncome })
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}


module.exports = {
    createOrder,
    cancelOrder,
    getAllOrders,
    getOrder,
    countOrder,
    totalIncome,
    changeStatus
}
const productSchema = require('../model/productModel')

const createProduct = async (req, res) => {
    try {
        await productSchema.findOne({ productName: req.body.productName }).then((response) => {
            if (response === null) {
                const product = new productSchema({
                    brandName: req.body.brandName,
                    productName: req.body.productName,
                    description: req.body.description,
                    image: req.body.imgUrl,
                    unitPrice: req.body.price,
                    qtyOnHand: req.body.qty
                })
                product.save().then((result) => {
                    return res.status(200).json({ msg: 'product created successfully', result })
                })
            }
            else {
                return res.status(404).json({ msg: 'product already exist' })
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error!' })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        await productSchema.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    brandName: req.body.brandName,
                    productName: req.body.productName,
                    description: req.body.description,
                    image: req.body.image,
                    unitPrice: req.body.unitPrice,
                    qtyOnHand: req.body.qtyOnHand
                }
            },
            { new: true }

        ).then((response) => {
            if (response === null) {
                return res.status(404).json({ msg: 'product not found' })
            }
            return res.status(200).json({ msg: 'product updated successfully', response })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error!' })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await productSchema.findOneAndDelete({ _id: id }).then((response) => {
            if (response) {
                return res.status(200).json({ msg: 'product deleted successfully', response })
            }
            return res.status(404).json({ msg: 'product not found' })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error!' })
    }
}

const getAllProducts = async (req, res) => {
    try {
        await productSchema.find().then((response) => {
            if (response.length > 0) {
                if (response.length === 1) {
                    return res.status(200).json({ msg: 'product found successfully', response })
                }
                return res.status(200).json({ msg: 'All products found successfully', response })
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error!' })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        await productSchema.findById({ _id: id }).then((response) => {
            if (response === null) {
                return res.status(404).json({ msg: 'product not found' })
            }
            return res.status(200).json({ msg: 'product found successfully', response })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error!' })
    }
}


const countProducts = async (req, res) => {
    try {
        await productSchema.countDocuments().then((result) => {
            if (result < 0) {
                return res.status(404).json({ msg: 'Product not found' })
            }
            return res.status(200).json({ msg: 'Total Products counted successfully', result })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const search = async (req, res) => {
    try {
        const searchName = new RegExp(req.params.productName, 'i')

        await productSchema.find({ productName: { $regex: searchName } }).then((response) => {
            if (response.length > 0) {
                if (response.length === 1) {
                    return res.status(200).json({ msg: 'product found successfully', response })
                }
                return res.status(200).json({ msg: 'products found successfully', response })
            } else {
                return res.status(200).json({ msg: 'product not found' })
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error!' })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    countProducts,
    search
}
const teamSchema = require('../model/teamModel')

const createTeam = async (req, res) => {
    try {
        console.log(req.body);
        await teamSchema.findOne({ email: req.body.email }).then((response) => {
            customerSchema.countDocuments().then((count) => {
                if (response === null) {
                    const team = new teamSchema({
                        id: count === 0 ? 1 : count + 1,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        age: req.body.age,
                        phoneNumber: req.body.phoneNumber,
                        email: req.body.email,
                        level: req.body.level
                    })
                    team.save().then((result) => {
                        return res.status(201).json({ msg: 'Team member created successfully!', result })
                    })
                } else {
                    return res.status(404).json({ msg: 'Team member is already exist!' })
                }
            })

        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const updateTeam = async (req, res) => {
    console.log(req.body);
    try {
        const { id } = req.params
        console.log("Edit Data:", req.params);
        await teamSchema.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    id: req.body.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    age: req.body.age,
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    level: req.body.level
                }
            },
            { new: true }
        ).then((result) => {
            if (result) {
                return res.status(201).json({ msg: 'Team member updated successfully!', result })
            }
            return res.status(404).json({ msg: 'Team member not found!' })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const getAllTeam = async (req, res) => {
    try {
        await teamSchema.find().then((result) => {
            if (result) {
                return res.status(200).json({ msg: 'Team member found successfully!', result })
            }
            return res.status(404).json({ msg: 'Team member not found!' })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const getTeam = async (req, res) => {
    try {
        const { id } = req.params
        console.log("Data requested", id);
        await teamSchema.findOne({ _id: id }).then((result) => {
            if (result) {
                return res.status(200).json({ msg: 'Team member found successfully!', result })
            }
            return res.status(404).json({ msg: 'Team member not found!' })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params
        await teamSchema.findOneAndDelete({ _id: id }).then((result) => {
            if (result) {
                return res.status(200).json({ msg: 'Team member deleted successfully!', result })
            }
            return res.status(404).json({ msg: 'Team member not found!' })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' })
    }
}

module.exports = {
    createTeam,
    updateTeam,
    getAllTeam,
    getTeam,
    deleteTeam
}
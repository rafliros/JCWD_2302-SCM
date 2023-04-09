// Import Sequelize
const { sequelize } = require('./../models')
const { Op, where } = require('sequelize');

// To generate UID
const { v4: uuidv4 } = require('uuid');

// Import models
const db = require('./../models/index')
const users = db.users

// Import Hashing
const { hashPassword, hashMatch } = require('./../lib/hash')

// Import fs
const fs = require('fs').promises

// Import Token
const { createToken } = require('./../lib/jwt');
const path = require('path');
const { request } = require('http');

module.exports = {
    register: async (req, res) => {
        // To rollback transactions
        const t = await sequelize.transaction()
        try {

            // Step-1 Ambil data dari req.body
            let { username, email, password, phonenumber } = req.body

            // Step-2 Validasi
            if (!username.length || !email.length || !password.length || !phonenumber.length) return res.status(404).send({
                isError: true,
                message: 'Data Not Found',
                data: null
            })
            console.log(username, email, password)
            // Step-3 Check ke database, name & email nya exist?
            let findPhoneAndEmail = await users.findOne({
                where: {
                    [Op.and]: [
                        { phonenumber: phonenumber },
                        { email: email }
                    ]
                }
            }, { transaction: t })

            if (findPhoneAndEmail) return res.status(404).send({
                isError: true,
                message: 'Phone number and Email already exist',
                data: null
            })

            console.log(findPhoneAndEmail)

            // Step-4 Simpan data ke dalam database
            let resCreateUsers = await users.create({ id: uuidv4(), username, email, password: await hashPassword(password), phonenumber }, { transaction: t })
            console.log(resCreateUsers)

            // Step-4.1 Kirim email verification
            const template = await fs.readFile('../template/confirmation.html', 'utf-8')
            const templateToCompile = await handlebars.compile(template)
            const newTemplate = templateToCompile({ email: 'patriciamadelinek1@gmail.com' })
            await transporter.sendMail({
                from: 'PWD Property',
                to: message,
                subject: 'Account Activation',
                html: newTemplate
            })


            // Step-5 Kirim response
            await t.commit()
            res.status(201).send({
                isError: false,
                message: 'Register Success',
                data: null
            })
        } catch (error) {
            await t.commit()
            res.status(500).send({
                isError: true,
                message: error.message,
                data: null

            })
        }
    },

    login: async (req, res) => {
        // Step-1 Ambil value dari req.body
        let { phoneOrEmail, password } = req.body
        console.log(phoneOrEmail)
        // Step-2 Cari email dan password di database
        let findEmaileAndPassword = await users.findOne({
            where: {
                [Op.or]: [
                    {
                        email: phoneOrEmail
                    },
                    {
                        phonenumber: phoneOrEmail
                    }
                ]

            }
        })

        if (!findEmaileAndPassword) return res.status(404).send({
            isError: true,
            message: 'Username Not Found',
            data: null
        })

        let matchPassword = await hashMatch(password, findEmaileAndPassword.password)

        if (matchPassword === false) return res.status(404).send({
            isError: true,
            message: 'Password Not Found',
            data: null
        })

        const token = createToken({ id: findEmaileAndPassword.id, username: findEmaileAndPassword.username })

        // Step-3 Kirim response
        res.status(201).send({
            isError: false,
            message: 'Login Success',
            data: { token, username: findEmaileAndPassword.dataValues.username }
        })
    },

    keepLogin: (req, res) => {
        try {
            console.log(req.dataToken)

            // Get data user by id 
            res.status(201).send({
                isError: false,
                message: 'Token Valid',
                data: req.dataToken.username
            })
        } catch (error) {

        }
    },
    
    personaldata: async (req, res) => {

        try {
            // Step-1 Ngambil data dari client
            let { username, phonenumber, gender, birthdate } = req.body

            let { id } = req.dataToken
            console.log(id)


            let resCreateUsers = await users.update({ username, phonenumber, gender, birthdate }, { where: { id } })


            // Step-3 Kirim response

            res.status(201).send({
                isError: false,
                message: 'update data Success',
                data: null
            })
        } catch (error) {

            // deleteFiles(req.files)
            res.status(404).send({
                isError: false,
                message: error.message,
                data: null
            })
        }
    },

    getPersonalData: async (req, res) => {
        try {

            let { id } = req.dataToken
            console.log(id)

            let findUsers = await users.findOne({
                where: {
                  id
                },

            })

            //response
            res.status(201).send({
                isError: false,
                message: 'Get Data profile Success!',
                data: findUsers
            })
        } catch (error) {
            console.log(error)

        }
    },
    



    updateUserProfile: async (req, res) => {
        try {
         //1 ambil path
         console.log(req.files.images[0].path) 
         let { id } = req.dataToken
        console.log(id)
         
         //2 simpan ke dalam database
         await users.update({profilepicture: req.files.images[0].path},{ where: {id}})
           
         res.status(201).send({
            isError: false,
            message: 'update data Success',
            data: null
        })

        } catch (error) {

            // deleteFiles(req.files)
            res.status(404).send({
                isError: false,
                message: error.message,
                data: null
            })
        }
    }


    


    // logout: ('/users/:id', (req, res) => {
    //     try {
    //         // Step-1 Ambil value dari req.body
    //         let body = req.body

    //         // Step-2 Get Data
    //         // let getData =

    //         //step 3 Manipulasi Data
    // // let dataToDelete
    // // getData.products.forEach((value, index) => {
    // //     if (value.id === id) {
    // //         dataToDelete = index
    // //     }
    // // })

    // // if(dataToDelete === undefined) return res.status(401).send({ isError: true, message: 'Id Not Found', data: null })

    // // getData.products.splice(dataToDelete,1)

    // // // Step-4 Save
    // // fs.writeFileSync('./db/db.json', JSON.stringify(getData))

    // //  // Step-5 Kirim Response
    // // res.status(201).send({
    // //     isError: false,
    // //     message: "data delete success",
    // //     data: null
    // //     })


    //     } catch (error) {
    //         res.status(500).send({
    //             isError: true, 
    //             message: error.errors[0].message, 
    //             data: null
    //         })
    //     }
    // }),

}



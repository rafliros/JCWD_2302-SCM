import { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, Input } from 'reactstrap';
import React from "react";

import axios from "axios";
import { Navigate } from 'react-router-dom';

import { AiFillFacebook, AiFillGoogleSquare, AiFillLinkedin } from "react-icons/ai";

import Usericon from '../../supports/assets/user-icon.png';

export default function Profile() {

    let username = useRef()
    let gender = useRef()
    let birthdate = useRef()
    let phonenumber = useRef()
    let profilepicture = useRef()


    const [dataProfile, setDataProfile] = useState(false)
    const [photo, setPhoto] = useState(false)
    // const [selectedImage, setSelectedImage] = useState([])
    const [image, setImage] = useState(["https://i2.wp.com/buddymantra.com/wp-content/uploads/2018/04/user-icon-png-pnglogocom.png?fit=500%2C466&ssl=1"])
    const [saveImage, setSaveImage] = useState(null)
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')


    // post profildata

    const onsubmit = async () => {
        try {

            // ambil data dari client
            let inputusername = username.current.value
            let inputphonenumber = phonenumber.current.value
            let inputgender = gender.current.value
            let inputbirthdate = birthdate.current.value



            await axios.post(`http://localhost:8000/users/personaldata`, { username: inputusername, phonenumber: inputphonenumber, gender: inputgender, birthdate: inputbirthdate }, { headers: { "token": localStorage.getItem('token') } },
            )

        } catch (error) {
            console.log(error)

        }
    }

    const picture = async (e) => {
        try {

            // ambil data client
            let files = [e.target.files[0]]
            console.log(files)
            let uploads = e.target.files[0]
            setImage(URL.createObjectURL(uploads))
            setSaveImage(uploads)

            if (files.length > 1) throw { message: 'Select only 1 Images!' }

            setMessage('')
        } catch (error) {
            console.log(error)
            

        }
    }

    const uploadImage = async () => {
         
        if(!saveImage) {
            alert("upload gambar terlebih dahulu");

        }else{

            let formData =new FormData();
            FormData.append('photo')
            await axios.patch(`http://localhost:8000/users/getpersonaldata`, {headers:formData},  { headers: { "token": localStorage.getItem('token') } },
            )  

        }
    }


    // get data

    const getData = async () => {

        try {
            let response = await axios.get(`http://localhost:8000/users/getpersonaldata `, { headers: { "token": localStorage.getItem('token') } })
            console.log(response)
            setData(response.data.data)
            

        } catch {

        }

    }

    useEffect(() => {
        getData()
        console.log(localStorage.getItem('token'))

    }, [])


    return (

        <div class=" flex mt-40 p-3 ml-6">

            <div className="bg-white border-2  border-b rounded-md h-3/4 mb-80 p-3 w-80  ">
                <div>
                    <div >
                        <div className="flex items-center justify-center ...">
                            <div>
                                < >
                                    <div className=" w-40 ">
                                        <img src={image} className="img-thumbnail" sytle={{ width: 300, height: 240 }} />

                                    </div>
{/* http://localhost:8000/users/getpersonaldata/${data.profilepicture} */}
                                    <input type="button" value="Edit photo" onClick={() => setPhoto(true)} className="btn btn-primary rounded-sm mt-2 w-full " />

                                    <Modal toggle={() => setPhoto(false)} isOpen={photo}>
                                        <ModalBody>
                                            <div className="px-3 pt-3">
                                                <h6>Select Images :</h6>
                                            </div>
                                            <div className="row border mx-3 px-3 py-3 rounded">
                                                <div className="col-12">
                                                    <div>
                                                        <input type="file" accept="image/*" onChange={(e) => picture(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>{message}</div>
                                            <div className="my-3 px-3 py-3">
                                                <input type="button" onClick={uploadImage} value="Submit Data" className="btn btn-primary w-100" />
                                            </div>
                                        </ModalBody>
                                    </Modal>
                                </>
                            </div>
                        </div>
                        {/* <input class="bg-sky-500 hover:bg-sky-700 ... rounded-md text-md w-24 h-10" type="button" value="Edit Profile" onClick={() => setModalOpen(true)} className="btn btn-primary rounded-0" /> */}

                        <div className=" px-3 pt-3">
                            <div className="col-12 flex justify-center ... mt-3">

                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b my-3' />
                <div className=" font-bold ">
                    <div>MYBILLS</div>
                    <div>MYBOOKS</div>
                </div>
                <div>
                    <div className='border-b my-3 ' />
                    <div className="border-y-2 border-blue-200 bg-blue-200 p-1 font-bold">MY ACCOUNT</div>
                    <div className="font-bold">
                        <div>PASSWORD & SECURITY</div>
                        <div>LOGOUT</div>
                    </div>
                </div>
            </div>
            <div className="flex-col ml-20 items-center  mb-24 w-3/5 rounded-md ">

                <div className="bg-white border-2 shadow-sm  rounded-md p-3 h-96 mt-16">
                    <div className="items-center ml-3 p-3">

                        <>
                            <div className="flex font-bold p-3 items-center justify-center ... text-2xl  "> PERSONAL DATA
                                <Modal toggle={() => setDataProfile(false)} isOpen={dataProfile}>
                                    <ModalBody>
                                        <div className="text-center px-3 py-3 mb-2">
                                            <h3>
                                                PERSONAL DATA
                                            </h3>
                                        </div>
                                        <div className="px-3 py-3">
                                            <h6>Full Name :</h6>
                                            <input type="text" ref={username} className="form-control" />
                                        </div>
                                        <div className="px-3 py-3">
                                            <h6>Gender :</h6>
                                            <input type="text" placeholder='male/female' ref={gender} className="form-control" />
                                        </div>
                                        <div className="px-3 py-3">
                                            <h6>Birthday :</h6>
                                            <input type="date" ref={birthdate} className="form-control" />
                                        </div>
                                        {/* <div className="px-3 py-3">
                                            <h6>Email :</h6>
                                            <input type="text" ref={email} className="form-control" />
                                        </div> */}
                                        <div className="px-3 py-3">
                                            <h6>Phone Number:</h6>
                                            <input type="text" ref={phonenumber} className="form-control" />
                                        </div>
                                        <div className="my-3 px-3 py-3">
                                            <input type="button" onClick={onsubmit} value="Submit Data" className="btn btn-primary w-100" />
                                        </div>
                                    </ModalBody>
                                </Modal>
                            </div>
                        </>
                        <div>
                            <div className='border-b my-2' /></div>
                    </div>

                    <div className="tracking-wide ... border-spacing ">

                        <div className="font-semibold text-xl table-auto flex ">Full Name
                            <div className="ml-4"> : {data.username ? data.username : null} </div>
                        </div>

                        <div className="font-semibold text-xl mt-2 flex">Gender
                            <div className="ml-4"> : {data.gender ? data.gender : null} </div>
                        </div>

                        <div className="font-semibold mt-2 text-xl flex">Birthday
                            <div className="ml-4">: {data.birthdate ? data.birthdate : null} </div>
                        </div>

                        <div className="font-semibold mt-2 text-xl flex ">Email
                            <div className="ml-4">: {data.email ? data.email : null}</div></div>


                        <div className="font-semibold mt-2 text-xl flex">Phone Number
                            <div className="ml-4">: {data.phonenumber ? data.phonenumber : null}</div>
                        </div>

                    </div>

                    <input class="bg-sky-500 hover:bg-sky-700 ... " type="button" value="Edit" onClick={() => setDataProfile(true)} className="btn btn-primary rounded-md text-md w-full h-8 mt-10 p-1" />
                </div>


                <div className="bg-white border-2 rounded-sm p-2 mt-3 flex shadow-sm">
                    <div className="flex flex-col-reverse ... font-bold p-2 text-md">
                        <div className="flex items-center">
                            <div><AiFillLinkedin width='90px' height='90px' /></div>
                            LinkedIn
                        </div>
                        <div className="flex items-center">
                            <div><AiFillFacebook width='90px' height='90px' /></div>
                            Facebook
                        </div>
                        <div className="flex items-center">
                            <div><AiFillGoogleSquare width='90px' height='80px' /></div>
                            Google
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}








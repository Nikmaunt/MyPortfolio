import React, {ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from "react-hook-form";
import {json} from "stream/consumers";
import axios from "axios";


interface FormData {
    email:string
    name:string
    message:string
    remember?:boolean

}


const Contact =  React.memo( () =>  {
    console.log("Contact rendered")
    const {register, formState: { errors }} = useForm<FormData>({mode: 'onBlur'})
    const [formStatus, setFormStatus] = useState(false);
    const [messageStatus, setMessageStatus] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const [nameStatus, setNameStatus] = useState(false);
    const [query, setQuery] = useState({
        name: "",
        email: "",
       message: ""
    });

    const handleChangeText = () => (e:ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        const name = e.target.name.trim();
        const value = e.target.value.trim();
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }))
        setFormStatus(false)
        setMessageStatus(true)
        console.log("handleChangeText rendered")
        ;
    }

    const handleChangeEmail= () => (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name = e.target.name.trim();
        const value = e.target.value.trim();
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }))
        setFormStatus(false)
        setEmailStatus(true)
        console.log("handleChangeEmail rendered")
        ;
    };
    const handleChangeName= () => (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name = e.target.name.trim();
        const value = e.target.value.trim();
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }))
        setFormStatus(false)
        setNameStatus(true)
        console.log("handleChangeName rendered")
        ;
    };
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(query).forEach(([key, value]) => {
            formData.append(key, value);
            setFormStatus(false)
            setNameStatus(false)
            setEmailStatus(false)
            setMessageStatus(false)
            console.log("handleSubmit  rendered")
        });
        axios
            .post(
                "https://getform.io/f/3101c319-7e79-4530-94da-9f00d3453158",
                formData,
                { headers: { Accept: "application/json" } }
            )
            .then(function (response) {
                setFormStatus(true);
                setQuery({
                    name: "",
                    email: "",
                    message: ""
                });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    let disabled = messageStatus === false || emailStatus === false ||  nameStatus === false ? true : false

    console.log('Disabled ', disabled)
    console.log('Message status ', messageStatus)
    return (
        <div id='contacts'  className='w-full h-screen bg-[#0a192f] flex justify-center items-center p-4'>
            <form onSubmit={handleSubmit} className='flex flex-col max-w-[600px] w-full'>
                <div className='pb-8'>
                    <p className='text-4xl font-bold inline border-b-4 border-red-600 text-gray-300'>Contact</p>
                    <p className='text-gray-300 py-4'>{ disabled &&  'Submit the form below or shoot me an email - .......'}</p>
                    <p className='text-gray-300 mt-0 py-4'>{ !disabled &&  'Waiting for your email =)'}</p>
                </div>
                <input  {...register("name", {required:true,minLength:2,maxLength:25})} onChange={handleChangeName()}   value={query.name} className='bg-[#ccd6f6]  p-2' type="text" placeholder='name' name='name'
                style={{borderColor: errors.name ?'red': ''}}/>
               <span style={{color: 'red'}}>{errors.name &&  "Please enter valid name"}</span>
                <input {...register("email", {required:true,pattern:(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)})}   value={query.email}  onChange={handleChangeEmail()}  className={ errors.email ? 'my-4 p-2 mb-0 bg-[#ccd6f6]'  : 'my-4 p-2 mb-4 bg-[#ccd6f6]' } type="email" placeholder='Email' name='email' />
                <span style={{color: 'red'}}>{errors.email &&  "Please enter valid Email"}</span>

                <textarea  {...register("message", {required:true,minLength:2})} onChange={handleChangeText()}     value={query.message} className='bg-[#ccd6f6] p-2' name="message" rows={10} placeholder='Message'></textarea>
                <span style={{color: 'red'}}>{errors.message &&  "Please enter valid Message"}</span>
                {formStatus ? (
                    <span className='bg-[#008500] p-2 mt-0.5'>
                        Your message has been sent.
                    </span>
                ) : (
                    ""
                )}
                <button disabled={disabled} className='text-white border-2 hover:bg-red-600 hover:border-red-600 px-4 py-3 my-8 mx-auto flex items-center'>Let's Collaborate</button>
            </form>
        </div>
    )
})

export default Contact;

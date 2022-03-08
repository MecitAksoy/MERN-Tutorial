import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordRepeat: ''
    })

    const { firstname, lastname, email, password, passwordRepeat } = formData

    const onChange = (e) => { 
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type="text" className='form-control' id='firstname' name='firstname' value={firstname} placeholder='Enter your firstname' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control' id='lastname' name='lastname' value={lastname} placeholder='Enter your lastname' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="password" className='form-control' id='passwordRepeat' name='passwordRepeat' value={passwordRepeat} placeholder='Confirm password' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register


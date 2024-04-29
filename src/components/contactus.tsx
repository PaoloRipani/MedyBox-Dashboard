import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [azienda, setAzienda] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('your-name', name)
    formData.append('your-surname', surname)
    formData.append('your-role', role)
    formData.append('your-email', email)
    formData.append('your-company', azienda)
    formData.append('your-phone', phone)
    formData.append('your-message', message)
    formData.append('_wpcf7_unit_tag', 'wpcf7-136-p123-o1')

    try {
      const response = await axios.post('https://www.gesiqa.it/wordpress/wp-json/contact-form-7/v1/contact-forms/6/feedback', formData)

      if (response.data.status === 'mail_sent') {
        setStatusMessage(response.data.message)
      } else {
        setStatusMessage('An error occurred.')
      }
    } catch (error) {
      setStatusMessage('An error occurred.')
    }
  }


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleAziendaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAzienda(event.target.value)
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value)
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

    return (
        <form onSubmit={handleSubmit} className='flex-grow lg:grid lg:grid-cols-2 flex flex-col items-start gap-6 mt-2'>
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="your-name" placeholder="Nome*" required onChange={handleNameChange} />
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="your-surname" placeholder="Cognome*" required onChange={handleSurnameChange} />
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="azienda*" placeholder="Azienda*" required onChange={handleAziendaChange} />
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="ruolo" placeholder="Ruolo" onChange={handleRoleChange} />
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="email" name="your-email" placeholder="Email*" required onChange={handleEmailChange}/>
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="phone" placeholder="Telefono" onChange={handlePhoneChange} />
            <textarea rows={4} className="col-span-2 items-start text-S2 nunito p-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border border-grey-1" 
            name="message" placeholder="Messaggio..." onChange={handleMessageChange}/>
            <div className='col-span-2 w-full flex justify-between'>
              <label className='flex flex-row gap-2 items-center text-S2 nunito text-grey-3'>
                  <a>*campi obbligatori</a>
              </label>
              <div className="border-0 text-white flex justify-end
                  h-10 relative">
                    <div className="border-0 text-white flex justify-start h-10 relative">
                      <button type="submit" className='w-44 pr-2 flex items-center justify-center 
                      cursor-pointer relative clip-path-buttons'>
                        <span className='z-20 leading-button secular'>Invia</span>
                      </button>
                    </div>
              </div>
            </div>
            {statusMessage && <p className='text-grey-4'>{statusMessage}</p>}
        </form>
    )
}
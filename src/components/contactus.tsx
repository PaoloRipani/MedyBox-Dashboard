import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  
  const [privacyPolicyLink, setPrivacyPolicyLink] = useState('');

  useEffect(() => {
    const fetchPrivacyPolicyLink = async () => {
      const res = await fetch('https://www.aloisiprogetti.com/wp-json/wp/v2/pages?slug=footer');
      const data = await res.json();
    
      setPrivacyPolicyLink(data[0]?.acf?.footer_privacy_link);
    };
  
    fetchPrivacyPolicyLink();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (!isChecked) {
      setStatusMessage('Please accept the Privacy Policy.')
      return
    }

    const formData = new FormData()
    formData.append('your-name', name)
    formData.append('your-email', email)
    formData.append('your-message', message)
    formData.append('_wpcf7_unit_tag', 'wpcf7-136-p123-o1')

    try {
      const response = await axios.post('https://www.aloisiprogetti.com/wp-json/contact-form-7/v1/contact-forms/145/feedback', formData)

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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked((event.target as HTMLInputElement).checked)
  }

    return (
        <form onSubmit={handleSubmit} className='flex-grow grid md:grid-cols-2 grid-cols-1 items-start gap-6'>
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="your-name" placeholder="Nome*" onChange={handleNameChange} />
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="your-surname" placeholder="Cognome*" onChange={handleNameChange} />
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="azienda*" placeholder="Azienda*" onChange={handleNameChange} />
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="ruolo" placeholder="Ruolo" onChange={handleNameChange} />
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="email" name="your-email" placeholder="Email*" onChange={handleEmailChange}/>
            <input className="text-S2 nunito px-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border rounded border-grey-1 h-12" type="text" name="phone" placeholder="Telefono" onChange={handleNameChange} />
            <textarea rows={4} className="col-span-2 items-start text-S2 nunito p-3 w-full text-grey-3 placeholder:text-grey-3 outline-none border border-grey-1" 
            name="message" placeholder="Messaggio..." onChange={handleMessageChange}/>
            <label className='flex flex-row gap-2 items-center text-S2 nunito text-grey-3'>
                <a>*campi obbligatori</a>
            </label>
            <div className="border-0 text-white flex justify-end
                h-10 relative">
              <button type="submit"  className='w-36 pr-2 flex items-center justify-center cursor-pointer '>
                  <svg width="144" height="40" className='absolute z-0 right-0'>
                    <path d="M0,0 h128 l16,20 l-16,20 h-128z" fill="#ef7923" />
                  </svg>
                  <span className='z-20 leading-button secular'>Invia</span>
              </button>
            </div>
            {statusMessage && <p>{statusMessage}</p>}
        </form>
    )
}
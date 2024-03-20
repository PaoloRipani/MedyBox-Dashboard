import { SetStateAction, useState, useEffect } from 'react'
import axios from 'axios'

import uploadicon from '../../public/upload icon 1.svg'
import uploadedicon from '../../public/file icon attach.svg'
import removeicon from '../../public/file icon remove.svg'

import Link from 'next/link'

export default function ContactForm() {
  const [file, setFile] = useState<File | null>(null)
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
    if (file) {
      formData.append('your-file', file)
    }
    formData.append('_wpcf7_unit_tag', 'wpcf7-136-p123-o1')

    try {
      const response = await axios.post('https://www.aloisiprogetti.com/wp-json/contact-form-7/v1/contact-forms/136/feedback', formData)

      if (response.data.status === 'mail_sent') {
        setStatusMessage(response.data.message)
      } else {
        setStatusMessage('An error occurred.')
      }
    } catch (error) {
      setStatusMessage('An error occurred.')
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setFile(selectedFile || null)
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

  const handleFileRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFile(null);
}

    return (
        <form onSubmit={handleSubmit} className='flex flex-col flex-grow items-start gap-4 mt-6'>
            <input className="text-m text-light-blue placeholder:text-light-blue p-4 w-full bg-off-white outline-none border-none" type="text" name="your-name" placeholder="Nome e cognome" onChange={handleNameChange} />
            <input className="text-m text-light-blue placeholder:text-light-blue p-4 w-full bg-off-white outline-none border-none" type="email" name="your-email" placeholder="Email" onChange={handleEmailChange}/>
            <div className='w-full flex items-center border-2 border-medium-blue'>
              <label className={`p-2 w-full flex items-center justify-center cursor-pointer ${file ? '' : 'bg-medium-blue text-off-white'}`}>
                <img src={file ? uploadedicon.src : uploadicon.src} />
                <input className="absolute hidden inset-0 opacity-0 cursor-pointer" type="file" onChange={handleFileChange} />
                <span className="text-l l ml-2 uppercase">{file ? (file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name) : 'Carica curriculum'}</span>
              </label>
              {file && 
                <button onClick={handleFileRemove} className='p-2'>
                  <img src={removeicon.src} />
                </button>
              }
            </div>
            <textarea className="items-start text-m p-3 flex-grow w-full text-light-blue placeholder:text-light-blue bg-off-white outline-none border-none" name="message" placeholder="Messaggio..." onChange={handleMessageChange}/>
            <label className='flex flex-row gap-2 items-center'>
                <div className="w-5 h-5 border-2 border-medium-blue flex items-center justify-center">
                {isChecked && <div className="w-3 h-3 border-2 bg-medium-blue border-medium-blue"></div>}
                </div>
                <input className="opacity-0 absolute accent-dark-blue outline-2 w-5 h-5 border-2 text-dark-blue border-medium-blue rounded-none checked:bg-dark-blue" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <a className='text-tag'>Ho letto e accetto le</a> 
                <Link href={privacyPolicyLink ? (privacyPolicyLink) : ("/")} target='_blank' className='flex justify-center'>
                  <span className='text-tag text-medium-blue'>Privacy Policy</span>
                </Link>
            </label>
            <button type="submit" className=" px-8 py-1.5 border-2 border-medium-blue text-medium-blue 
                uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40">Invia</button>
            {statusMessage && <p>{statusMessage}</p>}
        </form>
    )
}
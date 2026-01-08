import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

/* -------------------- DATA -------------------- */

const COUNTRIES = [
  { label: 'India', value: 'India', phone: '+91' },
  { label: 'UAE', value: 'UAE', phone: '+971' },
]

const INDIA_STATES = [
  // States (28)
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',

  // Union Territories (8)
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]


const UAE_EMIRATES = [
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ajman',
  'Fujairah',
  'Ras Al Khaimah',
  'Umm Al Quwain',
]


/* -------------------- INPUT -------------------- */

const InputField = ({ name, type = 'text', placeholder, value, handleChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm
               focus:ring-2 focus:ring-primary focus:border-primary
               outline-none transition"
  />
)

/* -------------------- SELECT -------------------- */

const SelectField = ({ name, value, handleChange, options, placeholder }) => (
  <select
    name={name}
    value={value}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm
               focus:ring-2 focus:ring-primary focus:border-primary
               outline-none transition bg-white"
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.value || opt} value={opt.value || opt}>
        {opt.label || opt}
      </option>
    ))}
  </select>
)

const StateAutoComplete = ({ country, value, handleChange }) => {
  const [show, setShow] = useState(false)

  const states =
    country === 'UAE' ? UAE_EMIRATES : INDIA_STATES

 const filteredStates =
  value.length > 0
    ? states.filter((state) =>
        state.toLowerCase().startsWith(value.toLowerCase())
      )
    : []


  return (
    <div className="relative">
      <input
        type="text"
        name="state"
        value={value}
        placeholder={
          country ? 'State / Emirate' : 'Select country first'
        }
        disabled={!country}
        onChange={(e) => {
          handleChange(e)
          setShow(true)
        }}
        onFocus={() => value && setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 150)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-primary focus:border-primary
                   outline-none transition disabled:bg-gray-100"
      />

      {/* Suggestions */}
      {show && filteredStates.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredStates.map((state) => (
            <li
  key={state}
  onMouseDown={() => {
    handleChange({
      target: { name: 'state', value: state },
    })
    setShow(false)
  }}
  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
>

              {state}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


/* -------------------- MAIN -------------------- */

const AddAddress = () => {
  const { axios, navigate, isUserLogin } = useAppContext()

  const [address, setAddress] = useState({
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  country: 'India',   // ✅ default
  state: '',
  zipcode: '',
  phone: '+91 ',      // ✅ default phone
})


  /* ---------- CHANGE ---------- */

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  /* ---------- COUNTRY SIDE EFFECT ---------- */

  {/*useEffect(() => {
  setAddress(prev => ({ ...prev, state: '' }))

  const selected = COUNTRIES.find(c => c.value === address.country)
  if (selected) {
    setAddress(prev => ({ ...prev, phone: `${selected.phone} ` }))
   }
  }, [address.country])*/}

  useEffect(() => {
  const selected = COUNTRIES.find(c => c.value === address.country)

  setAddress(prev => ({
    ...prev,
    state: '',
    phone: selected ? `${selected.phone} ` : prev.phone,
  }))
}, [address.country])



  /* ---------- SUBMIT ---------- */

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if(!isUserLogin){
      toast.error('Login to add Address');
      navigate("/login");  
      return;
      } 
      const { data } = await axios.post('/api/address/add', { address })
      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  /* -------------------- UI -------------------- */

   return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'>Add 
        Shipping <span className='font-semibold text-primary'>Address</span></p>
   <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
      <div className='flex-1 max-w-md'>
         <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
                <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder='First Name'/>
                <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder='Last Name'/>
            </div>
            <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Email address'/>
          
             <SelectField
              name="country"
              value={address.country}
              handleChange={handleChange}
              placeholder="Select Country"
              options={COUNTRIES}
            />
            <div className='grid grid-cols-2 gap-4'>
               <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City'/>
              {/* <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='State'/>*/}
               <StateAutoComplete
  country={address.country}
  value={address.state}
  handleChange={handleChange}
/>
            </div>  
             <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Street'/>
            <div className='grid grid-cols-2 gap-4'>
              {/* <InputField handleChange={handleChange} address={address} name='zipcode' type='number' placeholder='Zip code'/> */}
              <InputField
              name="zipcode"
              type="number"
              placeholder={address.country === 'UAE' ? 'P.O. Box' : 'PIN Code'}
              value={address.zipcode}
              handleChange={handleChange}
            />
             <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='Phone'/>
              {/* <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country'/>*/}
            </div>    
            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save address</button>
         </form>
      </div>
      <img src={assets.add_address_iamge} alt="Add_Address" />
   </div>
    </div>
  )
}

export default AddAddress

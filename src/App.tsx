
import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css'
import iconArrow from './assets/images/icon-arrow.svg';

type elapsedTypes = {
  days: number | string,
  months: number | string,
  years: number | string,
}

type errorTypes = {
  erroDD: false,
  erroMM: false,
  erroYYYY: false,
}

const initiaElapsedlState = {
  days: '',
  months: '',
  years: '',
}

const initialErrorState = {
  errorDD: false,
  errorMM: false,
  errorYYYY: false,
}

function App() {
  const [elapsed, setElapsed] = useState<elapsedTypes>(initiaElapsedlState)
  const [form, setForm] = useState(initiaElapsedlState);
  const [error, setError] = useState(initialErrorState);

  const validDays = typeof form.days !== 'number' && form.days <= 31;
  const validMonths = typeof form.months !== 'number' && form.months <= 12;
  const validYears = typeof form.years !== 'number' && form.years <= 2023;

  function validateForm() {
    if (!validDays || !validMonths || !validYears) {
      setError({
        errorDD: true,
        errorMM: true,
        errorYYYY: true,
      })
    } else {
      setError(initialErrorState);
    }
  }

  function calculateElapsedTime() {
    const { days, months, years } = form;

    const inputDate = new Date(`${years}-${months}-${days}`)
    const currentDate = new Date();

    const time = currentDate.getTime() - inputDate.getTime();
    const milissegundosByDay = 24 * 60 * 60 * 1000;

    const elapsedDays = Math.floor(time / milissegundosByDay);
    const elapsedMonths = Math.floor((elapsedDays % 365) / 30);
    const elapsedYears = Math.floor(elapsedDays / 365);
    
    const lackingDays = elapsedDays % 365 % 30;

      setElapsed({
        days: lackingDays,
        months: elapsedMonths,
        years: elapsedYears,
      })

  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className='bg-off-white font-poppins flex min-h-full flex-col items-center justify-center'>

      <main className='bg-white rounded-border-card mt-7 p-8 text-3xl w-7/12'>

        {/* ========= Form-inputs ========= */}
        <form>
          <section className='flex items-start gap-6 w-full px-4 py-2'>
            <div className='flex flex-col gap-1 items-start'>
              <label className={`${error.errorDD && 'text-red-ligth'} text-xs`}
                htmlFor="day">DAY</label>
              <input
                className={`border ${error.errorDD ? 'border-red-ligth' : 'border-light-grey'} rounded-lg w-32 pl-3 pr-8 py-3 font-bold`}
                type="text"
                name='days'
                id='days'
                placeholder='DD'
                maxLength={2}
                value={form.days}
                onChange={handleOnChange}
              />
              {!validDays && <span className='text-xs text-red-ligth'>Must be a valid day</span>}
            </div>

            <div className='flex flex-col gap-1 items-start'>
              <label className={`${error.errorDD && 'text-red-ligth'} text-xs`}
                htmlFor="month">MONTH</label>
              <input
                className={`border ${error.errorMM ? 'border-red-ligth' : 'border-light-grey'} rounded-lg w-32 pl-3 pr-8 py-3 font-bold`}
                type="text"
                name='months'
                id='months'
                placeholder='MM'
                maxLength={2}
                value={form.months}
                onChange={handleOnChange}
              />
              {!validMonths && <span className='text-xs text-red-ligth'>Must be a valid month</span>}
            </div>

            <div className='flex flex-col gap-1 items-start'>
              <label className={`${error.errorDD && 'text-red-ligth'} text-xs`}
                htmlFor="year">YEAR</label>
              <input
                className={`border ${error.errorYYYY ? 'border-red-ligth' : 'border-light-grey'} rounded-lg w-32 pl-3 pr-8 py-3 font-bold`}
                type="text"
                name='years'
                id='years'
                placeholder='YYYY'
                maxLength={4}
                value={form.years}
                onChange={handleOnChange}
              />
              {!validYears && <span className='text-xs text-red-ligth'>Must be a valid year</span>}
            </div>
          </section>

          <div className='flex items-center px-4 py-2'>
            <hr className='my-4 w-full border-b-gray-400' />
            <button className='bg-primary-purple text-white w-16 h-16 p-4 rounded-full flex items-center justify-center'
              onClick={(e) => {
                e.preventDefault();
                validateForm();
                calculateElapsedTime()
              }}>
              <img className='h-8 w-8' src={iconArrow} />
            </button>
          </div>
        </form>

        {/* ========= Years-Months-Days section ========= */}
        <section className='flex flex-col items-start gap-7 mx-11 italic font-extrabold text-6xl'>
          <div className='text-off-black flex gap-3'>
            <span className='text-primary-purple font-extrabold'>{elapsed.years ? elapsed.years : '--'}</span>
            <span>years</span>
          </div>
          <div className='text-off-black flex gap-3'>
            <span className='text-primary-purple font-extrabold'>{elapsed.months ? elapsed.months : '--'}</span>
            <span>months</span>
          </div>
          <div className='text-off-black flex gap-3'>
            <span className='text-primary-purple font-extrabold'>{elapsed.days ? elapsed.days : '--'}</span>
            <span>days </span>
          </div>
        </section>
      </main>

      <footer className="absolute bottom-0 h-10 w-full flex justify-center items-center gap-7">
        <span>
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        </span>
        <span>
          Coded by <a href="#" className='italic'>@GabrielCardiano</a>.
        </span>
      </footer>
    </div>
  )
}

export default App

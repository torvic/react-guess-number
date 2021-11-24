import { useState } from 'react'
import './App.css'

function App() {
  const [randomNumber, setRandomNumber] = useState(null)
  const [start, setStart] = useState(false)
  const [value, setValue] = useState('')
  const [db, setDb] = useState([])
  const [show, setShow] = useState({
    warningHigh: false,
    warningLow: false,
    success: false,
  })

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 11)
  }
  console.log('yep randoom number', randomNumber)
  console.log('yep value', parseInt(value))

  const handleStart = () => {
    setStart((prev) => !prev)
    setRandomNumber(getRandomNumber())
    setDb([])
    setShow({
      warningHigh: false,
      warningLow: false,
      success: false,
    })
  }
  const handleReset = () => {
    setDb([])
    setShow({
      warningHigh: false,
      warningLow: false,
      success: false,
    })
  }
  const handleChangeInput = (e) => {
    setValue(e.target.value)
    setShow({
      warningHigh: false,
      warningLow: false,
      success: false,
    })
  }
  const handleClickInput = (e) => {
    e.preventDefault()
    if (randomNumber === parseInt(value)) {
      console.log('Valido', value)
      setShow({ ...show, success: true })
    }
    if (randomNumber > parseInt(value)) {
      setShow({ ...show, warningLow: true })
    }
    if (randomNumber < parseInt(value)) {
      setShow({ ...show, warningHigh: true })
    }
    setDb([...db, { id: db.length + 1, inputValue: value }])
    setValue('')
  }
  return (
    <div className='container'>
      <div className='my-5'>
        <h1>Adivina el numero</h1>
        <p>
          Este juego consiste en adivinar un numero aleatorio entre 0 y 10.
          Ademas te muestra tus intentos en una tabla.
        </p>
        {!start ? (
          <button
            className='btn btn-outline-primary my-2'
            onClick={handleStart}
          >
            Empezar
          </button>
        ) : (
          <div className='my-1 row'>
            <div className='p-0 col-md-6'>
              <div className='card m-3 shadow bg-body rounded'>
                <div className='card-body'>
                  <form action=''>
                    <div className='mb-3'>
                      <label
                        htmlFor='exampleFormControlInput1'
                        className='form-label'
                      >
                        Ingresa el numero (0-10)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='exampleFormControlInput1'
                        onChange={handleChangeInput}
                        value={value}
                        disabled={show.success}
                      />
                    </div>
                    <button
                      className='mb-3 btn btn-outline-primary'
                      onClick={handleClickInput}
                      disabled={show.success}
                    >
                      Adivinar
                    </button>
                  </form>
                  {show.success && (
                    <div className='alert alert-success' role='alert'>
                      Felicitaciones lo adiviniste, el numero es {randomNumber}
                      !!!
                    </div>
                  )}

                  {show.warningHigh && (
                    <div className='alert alert-warning' role='alert'>
                      Intenta de nuevo, el numero es muy <strong>Alto</strong>{' '}
                      ...
                    </div>
                  )}
                  {show.warningLow && (
                    <div className='alert alert-warning' role='alert'>
                      Intenta de nuevo, el numero es muy <strong>Bajo</strong>{' '}
                      ...
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='p-0 col-md-6'>
              <div className='card m-3 shadow bg-body rounded'>
                <div className='card-body'>
                  <h3>Tus intentos: </h3>
                  <table className='table'>
                    <caption>Total de intentos: {db.length}</caption>
                    <thead>
                      <tr>
                        <th scope='col'># intentos</th>
                        <th scope='col'>Valor ingresado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {db.map((el) => (
                        <tr key={el.id}>
                          <th scope='row'>{el.id}</th>
                          <td>{el.inputValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='p-3 d-flex justify-content-end'>
                <button
                  className='btn btn-outline-primary m-2'
                  onClick={handleReset}
                >
                  Resetear
                </button>
                <button
                  className='btn btn-outline-primary m-2'
                  onClick={handleStart}
                >
                  Atras
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

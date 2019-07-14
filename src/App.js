import React, { useState, useEffect } from 'react';
import imagen from './cryptomonedas.png';
import axios from 'axios'

import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [cargando, guardarCargando] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    const cotizarCriptoMoneda = async () => {
        // Si no hay modena no ejecutar
        if(moneda === '') return;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const resultados = await axios.get(url);
        

        guardarCargando(true);

        // ocular Spinner y agregar el resultado
        setTimeout(() => {
          guardarCargando(false);
          guardarResultado(resultados.data.DISPLAY[criptomoneda][moneda]);
        }, 3000)

    }

    cotizarCriptoMoneda();
  }, [criptomoneda, moneda])

  // Mostrar Spinner O resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  


  return (
   <div className="container">
     <div className="row">
       <div className="one-half column">
         <img src={imagen} alt="Imagen Criptomonedas" className="logotipo" />
       </div>
       <div className="one-half column">
         <h1>Cotiza Criptomonedas al Instante</h1>
         <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
         />

         {componente}
       </div>
     </div>
   </div>
  );
}

export default App;

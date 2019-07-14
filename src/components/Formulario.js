import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';



function Formulario({guardarMoneda, guardarCriptomoneda}) {

    const [ criptomonedas, guardarCriptomonedas] = useState([]);
    const [ modenaCotizar, guardarMonedaCotizar] = useState('');
    const [ criptoCotizar, guardarCriptoCotizar] = useState('');
    const [ error, guardarError] = useState(false);


    useEffect(
        () => {
        const consultarAPI = async () =>{
            const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`;

            const resultado = await axios.get(url);
            // Guardar Criptomonedas en el State
            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, [])

    // Validar que el usuario llene ambos campos
    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar si el campo esta lleno
        if(modenaCotizar === '' || criptoCotizar === ''){
            guardarError(true);
            return;
        }

        // Pasar los datos al componente principal
        guardarMoneda(modenaCotizar);
        guardarCriptomoneda(criptoCotizar);
        guardarError(false);
    }

        // Mostrat el error en caso de que exista
        const componente = (error) ? <Error mensaje='Ambos campos son obligatorios' /> : null;

    return(
        <form 
        onSubmit={cotizarMoneda}
        >   
            {componente}
            <div className="row">
                <label htmlFor="">Elige Tu Moneda</label>
                <select 
                        name="" 
                        className="u-full-width"
                        onChange={ e => guardarMonedaCotizar(e.target.value)}
                >
                    <option value="">-Elige Tu Modena-</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="COP">Peso Colombiano</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>

            <div className="row">
                <label>Elige tu Criptomoneda</label>
                <select 
                        name="" 
                        className="u-full-width"
                        onChange={e => guardarCriptoCotizar(e.target.value)}
                >
                    <option value="">-Elige Tu Criptomoneda-</option>
                    {criptomonedas.map(criptomoneda => (
                        <Criptomoneda 
                        key={criptomoneda.CoinInfo.Id}
                        criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="Calcular"/>
        </form>
    )
}

export default Formulario;

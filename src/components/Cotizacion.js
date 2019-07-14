import React from 'react';

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;

    return ( 
        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio">El precio es: <span>{resultado.PRICE}</span></p>
            <p>Precio más alto del dia: <span>{resultado.HIGHDAY}</span></p>
            <p>Precio más bajo del dia: <span>{resultado.LOWDAY}</span></p>
            <p>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR} %</span></p>
            <p>Última actualización: <span>{resultado.LASTUPDATE}</span></p>
        </div>
     );
}
 
export default Cotizacion;
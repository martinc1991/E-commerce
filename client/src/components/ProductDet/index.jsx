import React from 'react';
import { Button } from 'react-bootstrap';
import s from '../../styles/ProductDet.module.css'
import Navegacion from '../Navegacion/Navegacion'
import Footer from '../Footer/Footer'
import Slider from '../Slider/Slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';


const Product = ({ name, description, dimentions, price, stock, sku, rating, thumbnail })=>{
    return(
        <div>
            {/* <Navegacion/> */}
            <div className={s.cont_prin}>
            <div className={s.cont}>
            <div className={s.cont_img}>
                <Slider/>
            </div>
            <div className={s.cont_info}>
            <h3>AUDIFONOS BLUETOOTH{name}</h3>
            <h4>$ 34.900{price}</h4>
            <h6>Referencia: SCD3456{sku}</h6>
            <div className={s.icon}>
            <FontAwesomeIcon icon={faStar} size={'1x'} />
            <FontAwesomeIcon icon={faStar} size={'1x'} />
            <FontAwesomeIcon icon={faStar} size={'1x'} />
            <FontAwesomeIcon icon={faStar} size={'1x'} />
            <FontAwesomeIcon icon={faStar} size={'1x'} />
            </div>
            <p>Diseño ergonómico y cómodos de usar. Contiene imán,
                no se caen fácilmente. Versión 4.2. Transmisión estable, sonido claro de alta calidad. Material: TPE, ABS. Encienda
                el Bluetooth y empareje con su dispositivo. Presione el botón para contestar/colgar la llamada o para reproducir/pausar la música
                {description}</p>
            <p><span className={s.dim}>Dimensiones:</span> L 7,4cm x AN 3cm x AL 18,2cm x 0,06kg{dimentions}</p>          
            <div className={s.cont_cant}>
            <label for="Cantidad" >Candidad:</label>
            <select name="Cantidad" id="Cantidad" className={s.select}>
                <option value="">...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <h6>({stock}17 Unidades disponibles)</h6>
            </div>
            <div className={s.cont_button}>
            <Button className={s.buttonCom}>Comprar ahora</Button> 
            <Button className={s.buttonCar}>Agregar al carrito</Button>
            </div>            
            </div> 
            </div>          
            </div>
            <Footer/>
            
        </div>
        


    )
}
export default Product
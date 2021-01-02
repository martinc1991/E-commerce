<h1>HBANK</h1> 
<p>
    Hbank es una billetera electronica, que te ayudara a gestionar tu dinero, podras enviar dinero, recibir y hasta ver tu movimientos y estadisticas de los ultimos dias. Todo esto en base a una cuenta que creas cuando te registras en nuestra app. Se te asignara un CVU en pesos y otro en dolares. A partir de ahi, podras disfrutar de todas las funcionalidades que te mencionamos ya. A continuacion te mostramos un resumen visual de nuestra aplicacion.

</p>

<div>
    <h1>HOME</h1> 
    <img src="./readmeAsset/Home.png"></img>
    <h1>REGISTRO Y LOGIN</h1> 
    <h2>PASO 1 - REGISTRO INICIAL</h2> 
    <p>Solo debes poner tus datos basicos para el registro.</p>
    <img src="./readmeAsset/Registro1.png"></img>
    <h2>PASO 2 - VALIDA EL CODIGO</h2> 
    <p>Una vez termines el paso uno, te enviaremos un correo electronico con el codigo correspondiente.</p>
    <img src="./readmeAsset/Registro2.png"></img>
    <h2>PASO 3 - DAR ALTA A TU CUENTA</h2> 
    <p>Una vez valides tu codigo, tendras que completar un ultimo paso. Llena el formulario con los datos complementarios.</p>
    <img src="./readmeAsset/Registro3.png"></img>
    <h2>PASO 4 - LOGIN</h2> 
    <p>Finalmente ya puedes logearte con tu email y contraseña registrados, ahora puedes disfrutar de Hbank.</p>
    <img src="./readmeAsset/Login.png"></img>
<div>

<div>
    <h1>POSCONSOLIDADA</h1>
    <p>
        Una vez inicies session, podras empezar a navegar y explorar todas las funcionalidades que tenemos para ti
    </p>
    <img src="./readmeAsset/Poscon.png"></img>
    <h2>MENU LATERAL</h2>
    <img src="./readmeAsset/Menu.png"></img>
    <h1>RECARGAR DINERO</h1> 
    <p>
        Recarga dinero a cualquiera de tus dos cuentas por medio de tarjeta credito o deboto, o atravez de un codigo QR que presentaras en cualquier punto de Todo Pago.
    </p>
    <h2>TARJETA</h2>
    <img src="./readmeAsset/Card.png"></img>
    <h2>CODIGO QR</h2>
    <img src="./readmeAsset/QR.png"></img>
    <h1>MANDAR DINERO</h1> 
    <p>
        Mandar dinero a tus contactos. Puedes hacerlo desde cualquiera de tus cuentas siempre y cuando tengas saldo disponible.
    </p>
    <img src="./readmeAsset/Mandar.png"></img>
    <h1>MOVIMIENTOS Y ESTADISTICAS</h1>
    <p>
        Puedes ver tus ultimos movimientos en los ultimos 15 y 7 dias, asi como los que realizaste el mismo dia. de igual manera tendras informacion un poco mas especifica, ya que contaras con una opcion de estadisticas, en las cuales te muestraremos como fue el comportamiento de tu dienro, en el trascurso de los ultimos 7 dias encuanto a ingreso y egresos.
    </p>
    <h2>ULTIMOS MOVIMIENTOS</h2>
    <img src="./readmeAsset/UlMov.png"></img>
    <h2>ESTADISTICAS</h2>
    <img src="./readmeAsset/Est.png"></img>
</div>
<div>
<h1>CONTACTOS</h1>
    <p>
        Podras ver todos los contactos que tienes registrados en tu cuenta.
    </p>
    <img src="./readmeAsset/Conta.png"></img>

</div>
<h1>PREGUNTAS Y RESPUESTAS</h1>
    <p>
        Si quieres conocer o tienes dudas acerca de como funciona la aplicacion, tendras un opcion para responder lo que necesites.
    </p>
    <img src="./readmeAsset/FAQ.png"></img>

</div>


<div>
    <h1> COMO CORRER EL PROYECTO ? </h1>
        <ol>
        <li>Crea una base de datos en MongDB. En este ejemplo le pondremos "henrybank". Se crea con el siguiente comando: use henrybank</li>
        <li>Crea un archivo dentro de la carpeta "api" llamado .env con el siguiente contenido:
            <pre>
                    <code>
                    DATABASE = 'mongodb://localhost/henrybank'
                    ADMIN_EMAIL = hbank.group5@gmail.com
                    PASSW_EMAIL = HenryBankHenryBank
                    BACK_URL = http://localhost:3000/
                    JWT_SECRET = lamejorappdehenryfinal
                    </code>
            </pre>
        </li>
        <li>Crea un archivo dentro de la carpeta "native" llamado en.jsv con el siguiente contenido:
            <pre>
                    <code>
                        module.exports = { BACK_URL: `http://ipv4DeTuPC:3000`}
                    </code>
            </pre>
        </li>
        <li>Posicionate en la carpeta api y ejecuta el comando npm install</li>
        <li>Posicionate en la carpeta native y ejecuta el comando install</li>
        <li>Correr los servers</li>
        <li>Abrí dos consolas</li>
        <li>En una consola posicionate en la carpeta api y ejecuta el comando npm run dev</li>
        <li>En la otra consola, posicionate en la carpeta client y ejecuta el comando expo start</li>
        <li>Abre tu app de expo de tu celular y escanea el codigo QR </li>
        </ol>
</div>
<div>
    <h1> TECNOLOGIAS USADAS </h1>
        <h2>FRONTEND</h2>
        <ul>
            <li>React Native</li>
            <li>Redux</li>
            <li>Axios</li>
        </ul>
        <h2>BACKEND</h2>
        <ul>
            <li>Nodejs</li>
            <li>MoleculerJS</li>
            <li>Mongosee (MongoDB)</li>
            <li>Nodemailer</li>
            <li>JWT</li>
            <li>CHART JS</li>
        </ul>

</div>
<div>
    <h1> EQUIPO </h1>
    <p>El equipo de desarrollo lo conforman los siguientes desarrolladores:</p>
        <ul>
            <li><a href="https://github.com/CamilolIn" rel="nofollow">Camilo Lindarte </a></li>
            <li><a href="https://github.com/quasirsg" rel="nofollow">Alexis Romano </a></li>
            <li><a href="https://github.com/nvlozano" rel="nofollow">Carlos Saballe</a></li>
            <li><a href="https://github.com/martinc1991" rel="nofollow">Martin Catala</a></li>
            <li><a href="https://github.com/JuanFernandezJubin" rel="nofollow">Juan Ignacio Fernandez</a></li>
            <li><a href="https://github.com/olivertborges" rel="nofollow">Olivert Borges </a></li>
            <li><a href="https://github.com/gabbies86" rel="nofollow">Gabriela MARCIANO </a></li>
            <li><a href="https://github.com/Ceci-Caccamo" rel="nofollow">Ceci Caccamo </a></li>
            <li><a href="https://github.com/sebasf24" rel="nofollow">Sebastian F.</a></li>
        </ul>

</div>

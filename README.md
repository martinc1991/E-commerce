# ASTRA

ASTRA es un E-commerce que comercializa productos de tecnologia y bioseguridad. Fue desarrollado en cojunto con un gran grupo de trabajo y asesorado por un equipo de profesionales como <a href="https://soyhenry.com/" rel="nofollow">Soy Henry</a>

<h1>HOMEPAGE</h1>
<p align='left'>
    <img src='./ReadmeAsset/Home.JPG' </img>
</p>

<h1>LOGIN Y REGISTER</h1>
<h3>REGISTER</h3>
<p>
    Registrase es muy facil !!. Lo puedes hacer con cualquier correo electronico o si lo prefieres hazlo con tu cuenta de Gmail.
    Solo debes llenar el fomulario y aceptar los terminos. Listo,  Bienvenido a ASTRA.
</p>
<p align='left'>
    <img src='./ReadmeAsset/Register.JPG' </img>
</p>
<h3>LOGIN</h3>
<p>
    Luego de registrate, ahora ya puedes loegarte con tu cuenta y empezar a disfrutar de los servicios de ASTRA.
</p>
<p align='left'>
    <img src='./ReadmeAsset/Login.JPG' </img>
</p>

<div>
<h1>CATALOGO</h1>
<p>
    Luego de logearte, puedes ahora disfrutar de los servicios de ASTRA. Uno de ellos es ver nuestro catalago. Para eso, debes dirigirte a la pestaña CATALOGO en la parte superior, aca podras ver todos nuestros productos, podras filtrarlos por categrias o nombres.
</p>
<p align='left'>
    <img src='./ReadmeAsset/Catalogo.JPG' </img>
</p>
</div>
<div>
<h1>DETALLE DEL PRODUCTO</h1>
<p>
    Puedes ver el detalle del producto, ac podras encontrar la informacion necesaria para qeu decidas si añadirloal carrito o comprar directamente.
</p>
<p align='left'>
    <img src='./ReadmeAsset/Detalle.JPG' </img>
</p>
</div>
<div>
<h1>CARRITO DE COMPRAS</h1>
<p>
    Como cualquier E-commerce, tambien podras tener tu carrito de compras, aca almacenaras todos los productos que quieres comprar. De igual menera tendras la posiilidad de cambiar las cantidades de cada producto o eliminarlos si lo prefieres.
</p>
<p align='left'>
    <img src='./ReadmeAsset/Cart.JPG' </img>
</p>
</div>
<div>
<h1>PROCESO DE CHECKOUT Y PAYMENT</h1>
<p>
        Una vez tengas los productos que quieres comprar en tu carrito, ya podras continuar con el proceso final de compra. Para esto, debes completar dos pasos mas. El primero sera un formulario en el que te pediremos los datos de envio para almacenar en la orden el lugar al cual debemos enviarte los productos. El segundo sera el proceso de pago, aca te brindamos la posibilidad de realizar tu pago por medio de una tarjeta de credito o debito (libreria Stripe), solo tendras que digitar la siguiente informaciion:

</p>
<h3>DATOS DE ENVIO:</h3>
<p align='left'>
    <img src='./ReadmeAsset/DatosEnv.JPG' </img>
</p>
<h3>PAYMENT:</h3>
        <ul>
            <li> 
                 Si deseas probar esta función, podes usar la siguiente información: 
                <li>Número: 4242 4242 4242 4242</li>
                <li>Fecha: 04/24</li>
                <li>FCVV: 242</li>
                <li>Ultimos digitos: 42424</li>
            </li>
        </ul>
<p align='left'>
    <img src='./ReadmeAsset/Payment.JPG' </img>
</p>
</div>
<div>
<h1>COMPRA FINALIZADA</h1>
<p>
    Te enviaremos un correo electronico con la confirmacion de la compra y el resumen de tus productos.
</p>
<p align='left'>
    <img src='./ReadmeAsset/Gracias.JPG' </img>
</p>
<p align='left'>
    <img src='./ReadmeAsset/Email.JPG' </img>
</p>
</div>

<h1> ADMINISTRADOR </h1>
<p>
    Para agregar productos, categorias, administrar ordenes y useuarios, tienes que ser Administrador. Para esto, debes regsitrar un usuarios como ADMIN. Esto lo hacemos con POSTMAN. .
</p>
<p align='left'>
    <img src='./ReadmeAsset/Postman.JPG' </img>
</p>
<p>
    Luego de esto ya puedes logearte como administrador. Con este Rol tendras acceso a todas las funciones de un usuario comun y las funciones de administratrar todas la categorias y productos principalmente.
</p>
<h3>HOME ADMIN</h3>
<p align='left'>
    <img src='./ReadmeAsset/HomeAdmin.JPG' </img>
</p>
<h3>AGREGAR CATEGORIAS</h3>
<p align='left'>
    <img src='./ReadmeAsset/AddCat.JPG' </img>
</p>
<h3>AGREGAR PRODUCTOS</h3>
<p align='left'>
    <img src='./ReadmeAsset/AddPro.JPG' </img>
</p>
</div>

<div>
    <h1> COMO CORRER EL PROYECTO ? </h1>
        <ol>
        <li>Crea una cuenta en Mailgun</li>
        <li>Buscar la Private Key y el dominio del email. Más abajo hay un ejemplo de como deberían ser</li>
        <li>Crea una base de datos en PostgreSQL. En este ejemplo le pondremos "development". Se crea con el siguiente comando: CREATE DATABASE development</li>
        <li>Crea un archivo dentro de la carpeta "api" llamado .env con el siguiente contenido:
            <pre>
                    <code>
                    DB_USER=usuariopostgres
                    DB_PASSWORD=TuContraseña12345
                    DB_HOST=localhost
                    MAILGUN_API_KEY= privatekeydemailgun
                    MAILGUN_DOMAIN= sandbox(seriedenumerosyletras).mailgun.org
                    </code>
            </pre>
        </li>
        <li>Posicionate en la carpeta api y ejecuta el comando npm install</li>
        <li>Posicionate en la carpeta client y ejecuta el comando npm install</li>
        <li>Correr los servers</li>
        <li>Abrí dos consolas</li>
        <li>En una consola posicionate en la carpeta api y ejecuta el comando npm start</li>
        <li>En la otra consola, posicionate en la carpeta client y ejecuta el comando npm start</li>
        </ol>

</div>

<div>
    <h1> TECNOLOGIAS USADAS </h1>
        <h2>FRONTEND</h2>
        <ul>
            <li>React hooks</li>
            <li>Redux</li>
            <li>react Bootstrap</li>
        </ul>
        <h2>BACKEND</h2>
        <ul>
            <li>Nodejs</li>
            <li>Express JS</li>
            <li>Sequelize (PostgreSQL)</li>
            <li>Mailgun</li>
            <li>Passport</li>
        </ul>

</div>

<div>
    <h1> EQUIPO </h1>
    <p>El equipo de desarrollo lo conforman los siguientes desarrolladores:</p>
        <ul>
            <li><a href="https://github.com/jorelmaro" rel="nofollow">Jorge Malo</a></li>
            <li><a href="https://github.com/nvlozano" rel="nofollow">Vanessa Lozano</a></li>
            <li><a href="https://github.com/martinc1991" rel="nofollow">Martin Catala</a></li>
            <li><a href="https://github.com/Cristovk" rel="nofollow">Cristobal Chile</a></li>
            <li><a href="https://github.com/miguehernaandez" rel="nofollow">Miguel Hernandez </a></li>
        </ul>

</div>

"use strict";
let config = require("config");
let supportChannel = config.get("Channels").support;
let ChannelID = config.get("Channels").spanish;
let inPrivate = require("../helpers.js").inPrivate;

exports.commands = [
    "spanish"
];

exports.spanish = {
    usage: "**[subcommand]** [tutorial, faq, info, masternode, etc. soon]",
    description: "Guías y Tutoriales.\n    Preguntas más frecuentes.\n    ¿Qué esChainCoin - CHC?\n    ¿Qué es un Masternode?\n    etc. soon\n    This command only can be use in <#" + ChannelID + ">",
    process: function(bot, msg, suffix) {
        let command = "!spanish";
        let words = suffix.trim().split(" ").filter(function(n) {
            return n !== "";
        });
        let subcommand = words[0];

        if (!inPrivate(msg) && !ChannelID.includes(msg.channel.id)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                    text: "\u00A9 CHCBot"
                },
                author: {
                    name: "Oops, Wrong Channel..."
                },
                description: "Please use <#" + ChannelID + "> or DMs bot."
            };
            msg.channel.send({
                embed
            });
            return;
        }

        if (subcommand === "faq") {
            faq(bot, msg, suffix);
            return;
        } else if (subcommand === "tutorial") {
            tutorial(bot, msg, suffix);
            return;
        } else if (subcommand === "info") {
            info(bot, msg, suffix);
            return;
        } else if (subcommand === "masternode") {
            masternode(bot, msg, suffix);
            return;
        } else {
            return;
        }

        function masternode(bot, msg, suffix) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                    text: "\u00A9 CHCBot"
                },
                author: {
                    name: "¿Qué es un Masternode?"
                },
                description: "Un masternode es un servidor de red que realiza funciones de servicio en blockchain como InstantSend y PrivateSend (mezcla de monedas) y aumenta la estabilidad de la red. A cambio de estos servicios, los nodos principales reciben una parte de cada recompensa del bloque Chaincoin extraído, actualmente el 45%, así como las tarifas de transacción de forma periódica." +
                    "\n\nCualquier persona interesada puede ejecutar un masternode y ayudar a cumplir el objetivo de proporcionar un verdadero nivel global de descentralización para todos los países, geografías, individuos, empresas y organizaciones." +
                    "\n\nLa configuración de un nodo requiere 1,000 Chaincoin (CHC) para ser enviados a la billetera del operador, una forma de POS. Los nodos maestros también recibe derechos de voto sobre las propuestas en la red para ayudar a guiar la expansión futura del proyecto." +
                    "\n\nUSTED puede convertirse en una parte integral de la comunidad yendo a través del proceso de configuración del nodo maestro y ayudándonos en nuestro camino para convertirnos en la red más grande del mundo que ofrece Transacciones instantáneas y seguras basadas en blockchain con Chaincoin."
            };
            msg.channel.send({
                embed
            });
        }

        function info(bot, msg, suffix) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                    text: "\u00A9 CHCBot"
                },
                fields: [{
                        name: "¿Qué esChainCoin - CHC?",
                        value: "[**ChainCoin**](https://www.chaincoin.org/) es un líder global para transacciones rápidas, seguras e instantáneas respaldadas por una de las redes comunitarias más grandes en moneda digital."
                    },
                    {
                        name: "Ser recompensado con Chaincoin",
                        value: "[**Los operadores nodos maestros de Chaincoin**](https://www.chaincoin.org/what-is-a-masternode/) proporcionan la funcionalidad de Envío Privado y Envío Instantáneo y son recompensados por la entrega de sus servicios. Las partes interesadas participan colectivamente en la toma de decisiones descentralizada a través del Protocolo de Gobernanza de Chaincoin. Cualquier parte interesada puede participar en el gobierno de Chaincoin."
                    },
                    {
                        name: "¿Por qué elegir ChainCoin?",
                        value: "**Sin minería previa** - Queremos que muchos chaincoins estén disponibles para nuestra comunidad para explotar, crecer y beneficiarse." +
                            "\n**Independencia financiera** - Chaincoin abarca una cadena de bloques autofinanciada que promueve el crecimiento y el desarrollo continuo." +
                            "\n**UniqueHashing Algo** - Chaincoin fue la primera moneda en usar el algoritmo de hash C11 que mantiene la minería abierta a los mineros de GPU." +
                            "\n**Masternodes / Coin-Mixing** - Aumenta la privacidad mediante la mezcla de monedas para hacer que el seguimiento de la fuente de las transacciones sea prácticamente imposible." +
                            "\n**Gobernanza descentralizada** - Permite a los usuarios de Chaincoin votar sobre la dirección estratégica de la moneda y el presupuesto de desarrollo." +
                            "\n**Banca personal** - Chaincoin se convertirá en su propio banco personal. Almacene o gaste sus monedas fácilmente."
                    },
                    {
                        name: "Únete a nuestra comunidad",
                        value: "[**Github**](https://github.com/chaincoin/chaincoin)" +
                            "\n[**Discordia**](https://discord.gg/NabdcJ7)" +
                            "\n[**Gorjeo**](https://twitter.com/chaincointeam)" +
                            "\n[**Charla de Bitcoin**](https://bitcointalk.org/index.php?topic=422149.0)"
                    },
                    {
                        name: "Hoja de ruta del proyecto",
                        value: "El plan de desarrollo es nuestra columna vertebral y es lo que hará que Chaincoin sea grandioso. Va a requerir mucho esfuerzo y mucho trabajo, pero con el apoyo de la comunidad, confiamos en que podemos ejecutar este plan y lograr nuestra misión para Chaincoin." +
                            "\n[**Ver la hoja de ruta completa**](https://www.chaincoin.org/development-roadmap/)"
                    },
                    {
                        name: "Monedero ChainCoin",
                        value: "Descargue su billetera Chaincoin. \nDisponible en Windows, Linux y Mac." +
                            "\n[**Descargar Wallet**](https://www.chaincoin.org/chaincoin-wallet/)"
                    },
                    {
                        name: "Obtener ChainCoin",
                        value: "¿Listo para comprar Chaincoin? \nPuede obtenerlo de Cryptopia usando el siguiente enlace." +
                            "\n[**Comprar CHC de Cryptopia**](https://www.cryptopia.co.nz/Exchange/?market=CHC_BTC)"
                    }
                ]
            };
            msg.channel.send({
                embed
            });
        }

        function tutorial(bot, msg, suffix) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                    text: "\u00A9 CHCBot"
                },
                author: {
                    name: "Guías y Tutoriales"
                },
                description: "[**Como comprar tus primers CHC (pdf)**](https://www.chaincoin.org/wp-content/uploads/2017/07/How-to-buy-your-first-CHC.pdf)" + "\n" +
                    "[**Como configurar tu billetera CHC (pdf)**](https://www.chaincoin.org/wp-content/uploads/2017/07/How-to-Set-Up-Your-CHC-Wallet.pdf)" + "\n" +
                    "[**Configurar un nodo maestro Chaincoin (pdf)**](https://toaster.chaincoin.org/docs/Setting%20up%20a%20Chaincoin%20Masternode%20-%20draft%20v.04.pdf)" + "\n" +
                    "[**Como convertir tu nodo ya existente de una billetera remota a un control remoto local para la billetera (pdf)**](https://toaster.chaincoin.org/docs/convert_masternode_to_controller.pdf)" + "\n" +
                    "[**Configuracion de nodo maestro con control remoto (YouTube)**](https://www.youtube.com/watch?v=KSWfXdmb48c)" + "\n" +
                    "[**Recap. Configuracion de nodo con control remoto (YouTube)**](https://www.youtube.com/watch?v=W2i311gQiEI)" + "\n" +
                    "[**Corre tu nodo maestro – Hazlo fácil – (Website)**](https://medium.com/@Crypto_Wizard/launching-a-chaincoin-masternode-made-easy-92fa2f41c195)" + "\n" +
                    "[**Como alojar un nodo maestro en Windows (Website)**](https://steemit.com/chaincoin/@jeffblogs/how-to-host-a-chaincoin-masternode-on-windows)" + "\n" +
                    "[**Guia de configuración de nodo maestro ChainCoin (Website)**](https://steemit.com/chaincoin/@usncrypto/chaincoin-masternode-setup-guide)"
            };
            msg.channel.send({
                embed
            });
        }

        function faq(bot, msg, suffix) {
            var embed = {
                color: 1741945,
                /*
				timestamp: new Date(),
				footer: {
					icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
					text: "\u00A9 CHCBot"
				}, */
                fields: [{
                        name: "1. ¿Cómo creo un nodo maestro – MN - MasterNode?",
                        value: "Un nodo maestro no solo le genera un ingreso, sino que también proporciona un servicio valioso a la red de ChainCoin. Como tal, necesita estar alojado en una computadora que está en línea 24/7 y tiene una dirección IP estática. Esta no es normalmente la computadora de tu casa. Recomendamos encarecidamente que utilice un VPS alojado como los provistos por [vultr](www.vultr.com). Hemos desarrollado una guía escrita y un conjunto de videos tutoriales para ayudarlo a implementar un nodo maestro . Deberías tener cierto nivel de habilidad con la computadora antes de intentar esto. También debe seguir la guía EXACTAMENTE, verificando que el archivo y las rutas sean correctos (por ejemplo, ~ / .chaincoin es correcto, ~. / Chaincoin es incorrecto. Chaincoin.conf tiene razón, chaincoind.conf está equivocado). Puede consultar el tutorial que se proporciona al usar el comando **!tutorial**."
                    },
                    {
                        name: "2. ¿Qué hago si me encuentro con un problema?",
                        value: "Primero, compruebe que ha seguido exactamente los pasos de configuración. Si está utilizando el PF <intente ver los videos también, y viceversa. Es posible que vea que omitió un paso o escribió algo incorrecto. - Espere. Algunas acciones en el servidor (iniciarlo, recibir monedas, etc.) pueden llevar algo de tiempo. - Únete a nuestro equipo de Discord en [**Invitacion de ChaincoinDiscord**](https://discord.gg/NabdcJ7) e ingresa al canal <#" + supportChannel + ">."
                    },
                    {
                        name: "3. ¿Puedo ejecutar múltiples nodos maestros desde un servidor?",
                        value: "Los nodos maestros están diseñados para ayudar a la red. Como tal, cada uno debe estar en un servidor separado. Intentar ejecutar más de uno en el mismo servidor puede parecer una buena idea para ti, ¡pero realmente no ayuda a Chaincoin! Habiendo dicho eso, no hemos encontrado una manera confiable de ejecutar múltiples masternodes en un servidor. Cada uno necesitaría su propia dirección IP para comenzar. Esto puede cambiar en el futuro, con nuevas versiones del código. Si es así, actualizaremos la Wiki de Chaincoin."
                    },
                    {
                        name: "4. ¿Cómo configuro un nodo maestro en Mac / Windows / Raspberry PI / Myrefrigerator?",
                        value: "Estamos trabajando con miembros del equipo y desarrolladores para crear guías para otros sistemas operativos. Su nodo maestro no debería estar realmente alojado en su escritorio; realmente necesita estar en una red rápida, 24 horas al día, 7 días a la semana, con una dirección IP estática. Dicho esto, como guías para otros sistemas operativos están desarrolladas, le haremos saber aquí y en [**ChainCoin**](www.chaincoin.org)."
                    },
                    {
                        name: "5. ¿Cuántas monedas necesito para ejecutar un nodo maestro?",
                        value: "Para poder ejecutar un nodo maestronecesitas tener exactamente 1000 CHC. Estas monedas deben transferirse en exactamente una transacción, por lo que si envía 2 x 500 monedas a su dirección, no funcionará.."
                    },
                    {
                        name: "6. ¿Qué es POS_ERROR cuando verifico mi IP en mi nodo maestro? ¿Cómo arreglar eso?",
                        value: "POS_ERROR: cómo solucionarlo, detener el servicio de nodo maestro. Eliminar mncache.dat. Inicie el servicio nodo maestro. Desbloquear nodo en la billetera, habilita de nuevo. - sliff2000."
                    },
                    {
                        name: '7. Recibo un error "Debe establecer masternode = 1 en el archivo de configuración"',
                        value: "Este error ocurre cuando no coloca masternode = 1 en el archivo chaincoin.conf o coloca el archivo chaincoin.conf en el directorio incorrecto. El problema más común es omitir. (punto) delante de chaincoin cuando sigue la guía de nodo maestro. En los sistemas UNIX, Chachain y chaincoin son dos directorios diferentes. Para verificar el contenido de su archivo chaincoin.conf escriba nano ~ / .chaincoin / chaincoin.conf y agregue las líneas faltantes para corregir el error."
                    },
                    {
                        name: "8. ¿Cómo comprobar si mi nodo maestrose está ejecutando?",
                        value: "Puede verificar el estado de su nodo maestroescribiendo el estado de masternodelist. Si el estado es Habilitado, su nodo maestrose está ejecutando."
                    },
                    {
                        name: "9. ¿Tener más monedas en el nodo maestroaumenta la recompensa?",
                        value: "No. Si tiene varios miles de monedas de CHC, puede aumentar las recompensas ejecutando múltiples nodos principales."
                    },
                    {
                        name: "10. ¿Hay alguna manera de configurar el nodo maestropara que funcione con no-ip / dynamic-ip?",
                        value: "No. Esto no es posible."
                    }
                ]
            };
            msg.channel.send({
                embed
            });

            embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                    text: "\u00A9 CHCBot"
                },
                fields: [{
                        name: "11. Empecé mi nodo maestrohace un par de días y todavía no he recibido ninguna recompensa ¿todo está bien? ¿Que debería hacer?",
                        value: "Primero compruebe el estado de su nodo maestrotipeando el estado de masternodelist. Si dice que está habilitado, está bien y recibirás tu recompensa pronto. Si dice expirado, reinicie el nodo maestro. Las recompensas son aleatorias, por lo que a veces puede tomar un par de días antes de obtener su primera recompensa. A veces obtienes múltiples recompensas el primer día y luego lleva una eternidad obtener la próxima recompensa. A medida que crece el número de nodos maestros, lleva más tiempo."
                    },
                    {
                        name: "12. ¿Dónde está mi wallet.dat?",
                        value: "Para la billetera de GUI, especificó esta ubicación la primera vez que ejecutó el programa.\n" +
                            "Por defecto:\n" +
                            "```En Windows 7+, se encuentra en C:\\Users<nombre de usuario>\\AppData\\Roaming\\Chaincoin, donde se inicia sesión en su cuenta\n" +
                            "En Linux (Ubuntu) está en ~/.chaincoin\n" +
                            "En Mac estáen ~/Library/Application Support/Chaincoin```"
                    },
                    {
                        name: "13. ¿Cómo editar chaincoin.conf en ubuntu VPS",
                        value: "Tipo```nano ~/.chaincoin/chaincoin.conf```"
                    },
                    {
                        name: "14. Envié mis monedas de cryptopia a mi VPS. Cryptopia dice que la transferencia está completa pero aún tengo 0 CHC cuando verifico el saldo con chaincoindgetinfo? ¿Se pierden mis monedas?",
                        value: "Tus monedas no están perdidas. Para poder ver el saldo en el VPS, su billetera VPS debe sincronizarse con la red. Una vez que se complete este proceso, podrá ver sus fondos. Para ver si se realizó la transacción en blockchain, copie / pegue su dirección de recepción en [**Blockchain Explorer**](http://104.238.153.140:3001/). Esto le mostrará su saldo actual de su dirección."
                    },
                    {
                        name: "15. Mi billetera no está sincronizando Tengo 0 conexiones durante horas ¿hay alguna solución?",
                        value: "Puede resolver este problema agregando nodos directamente al chaincoin.conf en listen = 1 line. Y luego reiniciar el cliente. La lista de nodos se puede encontrar escribiendo ```chaincoin-cli```lista maestra y luego agregarlos si están habilitados. Alternativamente, puede encontrar nodos en el explorador de [**Blockchain explorer**](http://104.238.153.140:3001/network) pero tenga en cuenta que algunos de ellos son equipos domésticos y pueden estar desconectados. Si eres realmente flojo solo copia algunos de los nodos de esta lista. (la lista se crea al copiar / pegar aleatoriamente 40 de los nodos de la salida de la lista maestra el 16/07/2017)."
                    },
                    {
                        name: "16. Mi nodo ha dejado de responder a los comandos. Cuando escribo chaincoindgetinfo, no pasa nada y no puedo cerrarlo con la parada de chaincoind?",
                        value: "Tendrá que matar el proceso o reiniciar el servidor."
                    },
                    {
                        name: "17. ¿Cuándo debo hacer una copia de seguridad de mi billetera?",
                        value: "Lo mejor es hacer una copia de seguridad de su wallet.dat antes de enviar las monedas a su billetera. Si siguió el tutorial, el mejor momento para hacerlo es justo después de generar una nueva dirección con chaincoind getaccoombradress 0. También puede hacer una copia de seguridad adicional después de la transacción."
                    },
                    {
                        name: "18. ¿Cómo hacer una copia de seguridad de wallet.dat?",
                        value: "La forma más fácil es usar un cliente FTP como [Filezilla](https://filezilla-project.org/download.php?show_all=1). Para conectarse a su servidor escriba en la dirección IP del servidor y en el puerto 22 y luego vaya a la carpeta .chaincoin y descargue el archivo wallet.dat."
                    },
                    {
                        name: '19. Cómo solucionar "Masternodeprivkey Inválido. Consulte documentación."?',
                        value: "Asegúrate de haber sacado el último código del repositorio de Github, esto ha sido resuelto."
                    },
                    {
                        name: "20. Parece que no puedo compilar el código, ¿qué está mal?",
                        value: "Muchas cosas podrían estar mal, necesita encontrar el error específico y corregir eso. Si sigue una guía y encuentra un error, debe detener y corregir el error antes de continuar; de lo contrario, el proceso no se completará.\n\n" +
                            "Aquí hay 5 comandos muy simples que instalarán todas las dependencias necesarias para compilar el monedero no gui en Ubuntu:\n" +
                            "```sudo add-apt-repository ppa:bitcoin/bitcoin\n" +
                            "sudo apt-get update\n" +
                            "sudo apt-get install build-essential libtool autotools-dev autoconf automake\n" +
                            "sudo apt-get install pkg-config libssl-dev libdb4.8-dev libdb4.8++-dev\n" +
                            "sudo apt-get install libevent-dev libboost-all-dev libminiupnpc-dev```\n" +
                            "Después de eso, suponiendo que ha clonado el repositorio y está en la carpeta correcta, necesita ejecutar los siguientes 4 comandos que deben completarse sin errores:\n" +
                            "```./autogen.sh \n" +
                            "./configure --without-gui --disable-tests \n" +
                            "hacer \n" +
                            "sudo make install```"
                    }
                ]
            };
            msg.channel.send({
                embed
            });
        }
    }
};
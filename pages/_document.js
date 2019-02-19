import Document, { Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
    render(){
        return(
            <html lang="es">
            <Head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet"></link>
            </Head>
            <body>
               <Main />
               <NextScript /> 
            </body>
            </html>
        )
    }
}
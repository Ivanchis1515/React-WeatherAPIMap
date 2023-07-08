const fondosinfo = (fondo) =>{
    switch(fondo){
        case 'algo de nubes':
            fondo = '../../public/Recursos/nublado.jpg'
            console.log("Fondo de algo nublado");
            break;
        case 'nubes':
            fondo = '../../public/Recursos/nublado.jpg'
            console.log("Fondo con algo de nubes");
            break;
        case 'nubes dispersas':
            fondo = '../../public/Recursos/nubes-dispersas.jpg'
            console.log("Fondo con nubes dispersas");
            break;
        case 'muy nuboso':
            fondo = '../../public/Recursos/muynuboso.jfif'
            console.log("Fondo muy nuboso");
            break;
        case 'cielo claro':
            fondo = '../../public/Recursos/cielo_claro.jpg'
            console.log("Fondo con cielo claro");
            break;
        default:
            fondo = '../../public/Recursos/Pueblita.jpg'
            console.log('LIMPIO'); 
    }
    return fondo
}
export default fondosinfo
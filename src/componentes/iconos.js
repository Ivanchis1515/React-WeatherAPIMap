const iconosmovi = (iconos) => {
  switch (iconos) {
    //cambiar esto para acceder a los iconos
    case 'cielo claro':
        iconos='iconos/clear-day.svg'
        console.log("Cielo claro")
        break;    
    case 'nubes':
        iconos='iconos/fog.svg'
        console.log('Nublado');
        break;      
    case 'algo de nubes':
        iconos='iconos/cloudy-day-1.svg'
        console.log('Algo nublado');
        break;      
    case 'nubes dispersas':
        iconos='iconos/cloudy-day-1.svg'
        console.log('Nubes dispersas');
        break;      
    case 'muy nuboso':
        iconos='iconos/cloudy-day-1.svg'
        console.log('Muy nuboso');
        break;      
    default:
        iconos='iconos/clear-day.svg'
        console.log('LIMPIO');    
  }
  return iconos
}
export default iconosmovi
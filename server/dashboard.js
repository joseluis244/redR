const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RB2', {useNewUrlParser: true});
const clientes = require('./models/clientes.js');
const math = require('mathjs');

async function precios(callback){
    let cli0 = await clientes.find( { $or: [ { "distribuye": true }, { "distribuye": false } ]});
    let registrados = cli0.length;
    var cli = await clientes.find({'distribuye':true});
    let venden = cli.length;
    let redbull=0;
    let datosprecios=[[],[],[],[],[]];
    let moda = [];
    let tipos = [0,0,0,0,0,0,0,0];
    let coolers = [0,0,0,0,0,0,0,0,0,0];
    let visi = [0,0,0,0,0,0,0,0,0,0,0,0];
    
    for(let i = 0; i<=cli.length-1;i++){
        if(cli[i].productos[0].P_precio>0){
            redbull++;
            datosprecios[0].push(cli[i].productos[0].P_precio);
        }
        if(cli[i].productos[1].P_precio>0){datosprecios[1].push(cli[i].productos[1].P_precio)}
        if(cli[i].productos[2].P_precio>0){datosprecios[2].push(cli[i].productos[2].P_precio)}
        if(cli[i].productos[3].P_precio>0){datosprecios[3].push(cli[i].productos[3].P_precio)}
        if(cli[i].productos[4].P_precio>0){datosprecios[4].push(cli[i].productos[4].P_precio)}
        switch(cli[i].tipo){
            case 'Licoreria':
            tipos[0]++;
            break;
            case 'Micromercado':
            tipos[1]++;
            break;
            case 'Tienda de Barrio':
            tipos[2]++;
            break;
            case 'Kiosko':
            tipos[3]++;
            break;
            case 'Famacia':
            tipos[4]++;
            break;
            case 'Otro Impulso':
            tipos[5]++;
            break;
            case 'Mayorista':
            tipos[6]++;
            break;
            case 'Minorista':
            tipos[7]++;
            break;
        }
        for(let j=0;j<=cli[i].materiales[0].L_material.length-1;j++){
            switch(cli[i].materiales[0].L_material[j]){
                case 'Propio':
                coolers[0]++;
                break;
                case 'Baby Cooler':
                coolers[1]++;
                break;
                case 'Slim Cooler':
                coolers[2]++;
                break;
                case 'Can Cooler':
                coolers[3]++;
                break;
                case 'Equipo de la competencia':
                coolers[4]++;
                break;
                case 'Fast Lane Open':
                coolers[5]++;
                break;
                case 'Small Open Front':
                coolers[6]++;
                break;
                case 'Mega Glass Door':
                coolers[7]++;
                break;
                case 'Slim Fast Lane':
                coolers[8]++;
                break;
                case 'Refuel Cooler':
                coolers[9]++;
                break;
            }
        }
        for(let j=0;j<=cli[i].materiales[1].L_material.length-1;j++){
            switch(cli[i].materiales[1].L_material[j]){
                case'Colgante':
                visi[0]++;
                break;
                case'Sticker de lata':
                visi[1]++;
                break;
                case'Marca Precio':
                visi[2]++;
                break;
                case'Cartoon':
                visi[3]++;
                break;
                case'Lata Aluminio':
                visi[4]++;
                break;
                case'Sticky shlef':
                visi[5]++;
                break;
                case'Carrileras':
                visi[6]++;
                break;
                case'Two Cans':
                visi[7]++;
                break;
                case'Parasite SC':
                visi[8]++;
                break;
                case'Parasite 4Pack':
                visi[9]++;
                break;
                case'Dispensador Lata':
                visi[10]++;
                break;
                case'Rack':
                visi[11]++;
                break;
            }
        }
    }
    let precencia=[datosprecios[0].length,datosprecios[1].length,datosprecios[2].length,datosprecios[3].length,datosprecios[4].length];
    moda.push(math.mode(datosprecios[0])[0]);
    moda.push(math.mode(datosprecios[1])[0]);
    moda.push(math.mode(datosprecios[2])[0]);
    moda.push(math.mode(datosprecios[3])[0]);
    moda.push(math.mode(datosprecios[4])[0]);
    let dashboard={};
    dashboard.registrados=registrados;
    dashboard.venden=venden;
    dashboard.redbull=redbull;
    dashboard.moda=moda;
    dashboard.precencia=precencia;
    dashboard.tipos = tipos;
    dashboard.coolers = coolers;
    dashboard.visi = visi; 
    callback(dashboard);
}

module.exports.precios = precios;
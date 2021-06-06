document.getElementById("cep").addEventListener('focusout', function(e){
    consultaCep();
    // converteCepLatLong();
});


function consultaCep(){
    var cep = document.getElementById('cep').value;
    var url = "https://viacep.com.br/ws/"+ cep +"/json/";
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        success: function(response){
            console.log(response);
            if(response.erro){
              alert('FAVOR VERIFICAR O CEP');
            }else{
              $("#logradouro").html(response.logradouro); // outra forma de usar o ajax ao inves do document do JS
              $("#cepTabela").html(response.cep);
              document.getElementById('bairro').innerHTML = response.bairro;
              document.getElementById('localidade').innerHTML = response.localidade;
              document.getElementById('uf').innerHTML = response.uf;
            }
         }
    })
}


function converteCepLatLong(){
  var endereco = document.getElementById('cep').value;
  console.log(endereco+" vindo do converteCepLatLong");
  var urlMapa = "https://maps.googleapis.com/maps/api/geocode/json?address="+ endereco +"&key=";

  var lat = '';
  var long = '';
  console.log(urlMapa);
  $.ajax({
    url: urlMapa,
    type: "GET",
    success: function(response){
      console.log(response);
      // const obj = JSON.parse(response);
      lat = response.results[0].geometry.location.lat;
      long = response.results[0].geometry.location.lng;
      console.log(`'${lat}'`, `'${long}'`);
      var mapa = {
        center: new google.maps.LatLng(`'${lat}'`, `'${long}'`),
        zoom: 25,
        mapTYpeId: "hybrid",
        scaleControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
      };
      var map = new google.maps.Map(document.getElementById("mapa"), mapa);
    // }
      // console.log(lat, long);
    }
  })
  // return lat, long;
  // geocoder.geocode({'address': endereco}, function(resultado, status){
  //   if(status == google.maps.GeocoderStatus.OK){
  //     lat = resultado[0].geometry.location.lat();
  //     long = resultado[0].geometry.location.lng();
  //   }else {
  //     alert("Não foi possivel obter localização: " + status);
  //   }
  // });
}


function meuMapa(){
  console.log(objLatLong.lat, objLatLong.long);
  if(objLatLong.lat == null){
    return console.log('NADA PRA EXIBIR');
  }else {
    // $('#logradouro').insertAfter("#mapa");
    var mapa = {
      center: new google.maps.LatLng(converteCepLatLong[0], converteCepLatLong[1]),
      zoom: 25,
      mapTYpeId: "hybrid",
      scaleControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
    };
    var map = new google.maps.Map(document.getElementById("mapa"), mapa);
  }
}


// var script = document.createElement('script');
// script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCysBdsXGjQt2wvb-orBPNyXKoBiaqSE0o&callback=meuMapa";
// script.async = true;
//
// window.initMap = function(){
//   meuMapa();
// };
//
// document.head.appendChild(script);

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BetterDoctorApi } from './../src/apiCalls.js';
import { GiphyApi } from './../src/apiCalls.js';


$(document).ready(function() {
  //Giphy API//
  (async () => {
    let giphyApi = new GiphyApi();
    let response2 = await giphyApi.getGiphyApiData();
    getGiphyElements(response2);
  })();

  function getGiphyElements(response2) {
    $('.image').append(`<img src="${response2.data.images.downsized.url}">`);
  }
  $('#doc-search').submit(function(event) {
    event.preventDefault();

    let concern= $("input#concern").val();
    let name= $("input#name").val();

    //BetterDoctor Api
    (async () => {
      let betterDoctorApi = new BetterDoctorApi(concern, name);
      let response = await betterDoctorApi.getApiData(concern, name);
      getElements(response);
    })();

    function getElements(response) {
      $('.showData').text("");
      if (typeof response === "string") {
        $(".showData").text(`${response}`);
      } else if (response.data.length === 0){
        $('.showData').text("There are no doctors in the Portland area that meet those search terms.");
      } else {
        for (let i = 0; i < response.data.length; i++){
          $('.showData').append(`<br>${response.data[i].profile.first_name} ${response.data[i].profile.last_name},  ${response.data[i].profile.title} <br>  ${response.data[i].practices[0].name} <br> ${response.data[i].practices[0].visit_address.street} ${response.data[i].practices[0].visit_address.city}, ${response.data[i].practices[0].visit_address.state} <br>Phone: ${response.data[i].practices[0].phones[0].number}<br> Website: <a href="${response.data[i].practices[0].website}">Click Here</a>"<br>`);
          if(response.data[i].practices[0].accepts_new_patients === true) {
            $('.showData').append(`<strong>Accepting New Patients</strong><br><br>`);
          } else {
            $('.showData').append(`<strong>Not Accepting New Patients</strong><br>`);
          }
        }
      }
    }
  });
});

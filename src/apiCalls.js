export class BetterDoctorApi {
  async getApiData(concern, name) {
    try {
      let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?query=${concern}&name=${name}&location=or-portland&user_location=45.505%2C-122.675&skip=0&limit=10&user_key=${process.env.API_KEY}`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error) {
      let errorMessage = ("There was an error handling your request: " + error.message);
      return errorMessage;
    }
  }
}

export class GiphyApi {
  async getGiphyApiData() {
    try {
      let response2 = await fetch(`https://api.giphy.com/v1/gifs/A9MftKr3J3lra?api_key=${process.env.OTHER_API_KEY}`);
      let jsonifiedResponse2 = await response2.json();
      return jsonifiedResponse2;
    } catch(error) {
      let errorMessage = ("There was an error handling your request: " + error.message);
      return errorMessage;
    }
  }
}

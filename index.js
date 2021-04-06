const zipForm = document.getElementById("zipForm");
const output = document.getElementById("output");

zipForm.addEventListener("submit", getLocationInfo);
document.querySelector("body").addEventListener("click", deleteLocation);

function getLocationInfo(e) {
  const zip = document.querySelector(".zip").value;
  /*
  fetch(`https://api.zippopotam.us/US/${zip}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
    */
  fetch(`https://api.zippopotam.us/US/${zip}`)
    // fetch(`api.zippopotam.us/IN/${zip}`)
    .then((response) => {
      if (response.status != 200) {
        showIcon("remove");
        output.innerHTML = `
                    <article class='message is-danger'>
                        <div class='message-body'>Invalid Zipcode, Please enter a valid Zipcode !</div>
                    </article>
                    `;
        throw Error(response.statusText);
      } else {
        showIcon("check");
        return response.json();
      }
    })
    .then((data) => {
      //    console.log(data);
      let output = "";
      data.places.map((place) => {
        output += `
          <article class="message is-primary">
            <div class="message-header">
            <p>Location Information</p>
            <button class="delete"></button>
            </div>
            <div class="message-body">
              <ul>
                <li><strong>City: </strong>${place["place name"]}</li>
                <li><strong>State: </strong>${place["state"]}</li>
                <li><strong>State Abbreviation: </strong>${place["state abbreviation"]}</li>
                <li><strong>Latitude: </strong>${place["latitude"]}</li>
                <li><strong>Longitude: </strong>${place["longitude"]}</li>
              </ul>
            </div>
          </article>
        `;
      });
      document.getElementById("output").innerHTML = output;
    })
    .catch((err) => console.log(err));
  e.preventDefault();
}
function showIcon(icon) {
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

function deleteLocation(e) {
  if (e.target.className == "delete") {
    document.querySelector(".message").remove();
    document.querySelector(".zip").value = "";
    document.querySelector(".icon-check").remove();
  }
}

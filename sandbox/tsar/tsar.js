setTimeout(()=> {

  console.log('Let the demo begin...', new Date());
  const MAP_MARKER_URL = 'https://maps.google.com/mapfiles/kml/pal3/icon32.png';
  //'https://crossorigin.me/https://images2.imagebam.com/e3/94/f5/8b6a651324066644.png';
  //'https://www.stickpng.com/assets/images/5888925dbc2fc2ef3a1860ad.png';
  const devices = [ 'one', 'two' ];
  const testDevices = [
    {
      name: "Legoland Park",
      location: {
        latitude: 33.1261,
        longitude: -117.3115,
      }
    },
    {
      name: 'Legoland Hotel',
      location: {
        latitude: 33.1227,
        longitude: -117.3067,
      }
    },
    {
      name : 'Hawaii',
      location: {
        latitude: 19.8968,
        longitude: -155.5828
      }
    }
  ];

  let scene;
  setTimeout(() => {
//window.addEventListener('load', () => {
    console.log('window pseudo-loaded!!!');
    scene = document.querySelector('a-scene');
    console.log('About to init...');
    init();
    console.log('About to render places...');
    renderPlaces(testDevices);
// });
  }, 5000);

// LOH: https://jeromeetienne.github.io/AR.js/aframe/examples/click-places/places.js
  function init()
  {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000
    };

    navigator.geolocation.getCurrentPosition((pos) => onGeoloc(pos), (err)=>{
      console.warn('Error getting your current position! Try reloading and granting location access. Err:', err);
      alert('Error getting your current position! ' + err);
    }, options);

    // Init the camera rotation.
    const camera = document.querySelector('a-camera');
    const cameraParent = document.getElementById('cameraParent');
    const theScene = document.querySelector('a-scene');
    cameraParent.object3D.rotation.x = -camera.object3D.rotation.x;
    cameraParent.object3D.rotation.y = -camera.object3D.rotation.y;
    cameraParent.object3D.rotation.z = -camera.object3D.rotation.z;

    AFRAME.registerComponent('rotation-reader', {
      tick: function () {
        // `this.el` is the element.
        // `object3D` is the three.js object

        //theScene.object3D.rotation.x = -camera.object3D.rotation.x;
        //theScene.object3D.rotation.y = -camera.object3D.rotation.y;
        //theScene.object3D.rotation.z = -camera.object3D.rotation.z;

        // `rotation` is a three.js Euler using radians. `quaternion` also available.
        console.log(this.el.object3D.rotation);

        // `position` is a three.js Vector3.
        console.log(this.el.object3D.position);
      }
    });
  }

  function onGeoloc(pos){
    console.log('Geolocation!', pos);
    alert('We have found you!\n\nYour location is latitude ' + pos.coords.latitude + ' longitude ' + pos.coords.longitude);

    //const myMarker = { name : 'ME!', location : { latitude : pos.coords.latitude, longitude : pos.coords.longitude }};
    //renderPlaces([ myMarker ]);

    addTestMarkers(pos.coords.latitude, pos.coords.longitude);
  }

  /*
   * Add some test markers around the input (the current) location indicating N/S/E/W
   1 degree of latitude in physical distance is 68.94 statute miles or 59.91 nautical miles (110.95 km) --
   for a spherical earth assumption. So, a change of 0.001 degrees latitude is 0.06894 statute miles or 0.05991 nautical miles.
   */
  function addTestMarkers(latitude, longitude) {
    const newMarkers = [
      { name : 'East', latitude, longitude : longitude + 0.001, icon : 'https://maps.google.com/mapfiles/kml/pal5/icon52.png' },
      { name : 'West', latitude, longitude : longitude - 0.001, icon : 'https://maps.google.com/mapfiles/kml/pal5/icon22.png' },
      { name : 'North', latitude : latitude + 0.001, longitude, icon : 'https://maps.google.com/mapfiles/kml/pal5/icon45.png' },
      { name : 'South', latitude : latitude - 0.001, longitude, icon : 'https://maps.google.com/mapfiles/kml/pal5/icon26.png' }
    ];
    renderPlaces(newMarkers);
  }

  function renderPlaces(places) {
    places.forEach((place) => {
      const latitude = place.location && place.location.latitude || place.latitude;
      const longitude = place.location && place.location.longitude || place.longitude;

      // add place icon
      const icon = document.createElement('a-image');
      icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
      icon.setAttribute('name', place.name);
      icon.setAttribute('src', place.icon || MAP_MARKER_URL);

      // increase the size of the image
      icon.setAttribute('scale', '5, 5');

      icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

// TOOD: use case of this?  Direct message?  See deets?
      const clickListener = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();

        const name = ev.target.getAttribute('name');

        const el = ev.detail.intersection && ev.detail.intersection.object.el;

        if (el && el === ev.target) {
          const label = document.createElement('span');
          const container = document.createElement('div');
          container.setAttribute('id', 'place-label');
          label.innerText = name;
          container.appendChild(label);
          document.body.appendChild(container);

          setTimeout(() => {
            container.parentElement.removeChild(container);
          }, 1500);
        }
      };

      icon.addEventListener('click', clickListener);

      console.warn('Added marker icon for', place.name, 'at lat lng', latitude, longitude);
      // alert('Added marker icon for ' + place.name + ' at lat lng ' + latitude, longitude);
      scene.appendChild(icon);
    });
  }


  console.log('End of the input!');

});
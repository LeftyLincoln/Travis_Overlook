/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolvePromises": () => (/* binding */ resolvePromises),
/* harmony export */   "getCustomerData": () => (/* binding */ getCustomerData),
/* harmony export */   "showMessage": () => (/* binding */ showMessage),
/* harmony export */   "showUserErrorMessage": () => (/* binding */ showUserErrorMessage)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _classes_Customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _classes_Rooms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _classes_Hotel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********







// Query Selectors

const futureBookingSection = document.querySelector(".future-booking-section");
const pastBookingSection = document.querySelector(".past-booking-section");
const amountSpentSection = document.querySelector(".amount-spent-section");
const showAvailableRooms = document.querySelector(".show-rooms-button");
const showAvailableSection = document.querySelector(".available-section");
const dateChosen = document.getElementById("date");
const filterRoomSection = document.getElementById("type-of-room");
const filterRoomBtn = document.querySelector(".filter-rooms-button");
const logInForm = document.querySelector(".login-form");
const signInPage = document.querySelector(".sign-in-page");
const asideSection = document.querySelector(".aside");
const topSection = document.querySelector(".top-section");
const bottomSection = document.querySelector(".bottom-section");
const usernameField = document.getElementById("userInput");
const passwordField = document.getElementById("passwordInput");
const errorMessage = document.querySelector(".error-message");
const userBookingMessage = document.querySelector(".user-booking-message")
// Global Variables

let allCustomers;
let allRooms;
let allBookings;
let hotelRepo;
let customer;
let datePicked;
let rooms;

// Event Listeners
window.addEventListener("load", () => {
  resolvePromises();
});

showAvailableRooms.addEventListener("click", showRooms);
filterRoomBtn.addEventListener("click", filterRooms);

showAvailableSection.addEventListener("click", (e) => {
  submitABooking(e);
});

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  authenticateLogin();
});

// Functions

function resolvePromises() {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_4__.fetchPromises)()
    .then((data) => {
      allCustomers = data[0].customers.map(
        (customer) => new _classes_Customer__WEBPACK_IMPORTED_MODULE_1__.default(customer)
      );
      allRooms = data[1].rooms.map((room) => new _classes_Rooms__WEBPACK_IMPORTED_MODULE_2__.default(room));
      allBookings = data[2].bookings.map((booking) => booking);
    })
    .then(() => {
      hotelRepo = new _classes_Hotel__WEBPACK_IMPORTED_MODULE_3__.default(allBookings, allRooms);
      dateChosen.setAttribute("value", new Date().toISOString().split("T")[0]);
      datePicked = dateChosen.value.replaceAll("-", "/");
      showRooms();
    })
}

function displayBookings(customerBookings) {
  let today = Date.now()

  let futureReservations = customerBookings.filter(booking => {
    return Date.parse(booking.date) > today
  })
  let pastReservations = customerBookings.filter(booking => {
    return Date.parse(booking.date) < today
  })

  futureReservations.sort((a, b) => new Date(b.date) - new Date(a.date));
  pastReservations.sort((a, b) => new Date(b.date) - new Date(a.date));

  futureBookingSection.innerHTML = "Your Future Reservations:";
  futureReservations.forEach((booking) => {
    futureBookingSection.innerHTML += `
      <div class='booking-card' tabIndex='0'>
        <p class='booking-id' id='${booking.date}'>You booked room ${booking.roomNumber} for ${booking.date}
        </p>
        </div>
      `;
  });

  pastBookingSection.innerHTML = "Your Past Reservations:";
  pastReservations.forEach((booking) => {
    pastBookingSection.innerHTML += `
      <div class='booking-card' tabIndex='0'>
        <p class='booking-id' id='${booking.date}'>On ${booking.date} you booked room ${booking.roomNumber}
        </p>
        </div>
      `;
})
}

function displayAmountSpent() {
  amountSpentSection.innerHTML = `Welcome ${customer.name}! You have spent $${customer
    .showAmountSpent(allRooms)
    .toFixed(2)} at the Atlantis`;
}

function showRooms() {
  datePicked = dateChosen.value.replaceAll("-", "/");
  rooms = hotelRepo.findAvailableRooms(datePicked);

  if (hotelRepo.availableRooms.length < 1) {
    showAvailableSection.innerHTML =
      "We are so deeply sorry there are no rooms on the date, please choose another date.";
  } else {
    showAvailableSection.innerHTML = "Here are our available rooms for you:";
    rooms.forEach((room) => {
      showAvailableSection.innerHTML += `
        <div class='room-card'>
          <button class='button-booking' id='${room.number}'>Book Room ${room.number}</button>
          <p class='room-id' id='${room.number}'>This is a ${room.roomType}<br>
          with ${room.numBeds} ${room.bedSize} bed and costs $${room.costPerNight} per night
          </p>
      </div>
    `;
    });
  }
}

function filterRooms() {
  hotelRepo.findAvailableRooms(datePicked);
  showAvailableSection.innerHTML = "";
  let filteredRoom = filterRoomSection.value;
  const filteredByType = hotelRepo.filterByRoomType(filteredRoom);

  if (hotelRepo.availableRooms.length < 1) {
    showAvailableSection.innerHTML =
      "We are so deeply sorry there are no rooms on the date, please choose another date.";
  } else {
    filteredByType.forEach((room) => {
      showAvailableSection.innerHTML += ` 
      <div class='room-card'>
      <button class='button-booking' id='${room.number}'>Book Room ${room.number}</button>
      <p class='room-id' id='${room.number}'>This is a ${room.roomType}<br>
      with ${room.numBeds} ${room.bedSize} bed and costs $${room.costPerNight} per night
      </p>
    </div>
    `;
    });
  }
}

function submitABooking(e) {
  if (e.target.tagName === "BUTTON") {
    const roomNumber = Number(e.target.id);
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_4__.postRequest)({
      userID: customer.id,
      date: datePicked,
      roomNumber: roomNumber,
    });
  }
}

const authenticateLogin = () => {
  const userName = usernameField.value;
  const passWord = passwordField.value;

  if (userName && passWord) {
    if (!userName.includes("customer")) {
      errorMessage.innerText = "No customer found with that name";
    } else if (passWord !== "overlook2021") {
      errorMessage.innerText = "Incorrect password! Perhaps try again";
    } else {
      const userID = parseInt(usernameField.value.split("customer")[1]);
      if (userID < 1 || userID > 50) {
        errorMessage.innerText = "No user found with that name";
      } else {
        getCustomerData();
        showDashboard();
      }
    }
  }
};

const getCustomerData = () => {
  const userID = parseInt(usernameField.value.split("customer")[1]);
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_4__.fetchRequest)(`customers/${userID}`).then((data) => {
    customer = new _classes_Customer__WEBPACK_IMPORTED_MODULE_1__.default(data);
    customer.showBookings(allBookings);
    customer.showAmountSpent(allRooms);
    displayBookings(customer.bookings);
    displayAmountSpent();
  });
};

const showDashboard = () => {
  signInPage.classList.add("hidden");
  asideSection.classList.remove("hidden");
  topSection.classList.remove("hidden");
  bottomSection.classList.remove("hidden");
};

const showMessage = () => {
  userBookingMessage.innerText = "Congrats on booking a room, we can't wait to see you!"
  setTimeout(clearText, 2000)
  function clearText() {
    userBookingMessage.innerText = ""
  }
}

const showUserErrorMessage = () => {
  errorMessage.innerText = "Sorry there seems to be an issue with the server, please come back another time."
}




/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: \"Roboto Mono\", monospace;\n  color:antiquewhite\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n}\n\nbody {\n  display: flex;\n  width: 95vw;\n  height: 100vh;\n  background-image: url(\"https://media.istockphoto.com/id/1220321548/photo/hotel-atlantis-at-jumeirah-palm-in-dubai.jpg?s=612x612&w=0&k=20&c=YT9D8RU5-1RZs-pbw6nlOgongBAoCWAONz7iUQ26N10=\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  min-height: 100vh;\n}\n\naside {\n  width: 20vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 10px;\n}\n\nmain {\n  width: 80vw;\n  height: 100vh;\n}\n\nh1,\nh2,\n.top-section,\n.login-form {\n  text-align: center;\n}\n\nh1, h2 {\n  font-size: 40px;\n  color: black\n}\n\n.booking-section {\n  padding-top: 10px;\n  display: flex;\n  flex-direction: column;\n  height: 70vh;\n  align-content: flex-end;\n  overflow: auto;\n}\n\n.booking-card {\n  display: flex;\n  align-items: flex-end;\n  flex-direction: row;\n  border: 2px solid black;\n  border-radius: 8px;\n  margin: 3px;\n  background-color: grey;\n}\n\n.room-id {\n  padding: 5px;\n}\n\n.show-rooms-button,\n.filter-rooms-button {\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.bottom-section {\n  display: flex;\n  justify-content: space-between;\n  overflow: auto;\n\n}\n\n.available-section {\n  display: flex;\n  padding-top: 10px;\n  overflow: auto;\n  flex-direction: column;\n  height: 70vh;\n}\n\nlabel {\n  color: black\n}\n\n.rules > p {\n  margin: 0;\n}\n\n.room-card {\n  border: 2px solid black;\n  border-radius: 8px;\n  display: flex;\n  background-color: grey;\n  margin: 3px;\n}\n\nbutton,\ninput,\nselect {\n  cursor: pointer;\n  border-radius:6px;\n  color: black\n}\n\n.button-booking:hover,\n.show-rooms-button:hover,\n.filter-rooms-button:hover {\n  scale: 1.1;\n  background-color: grey;\n  border-radius: 8px;\n}\n\n.login {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.amount-spent-section {\n  padding-bottom: 40px;\n  font-size: 22px;\n  color: black\n}\n\n.past-booking-section, .future-booking-section {\n  display:flex;\n  overflow: auto;\n  flex-direction: column;\n  height: 70vh;\n  padding-left: 10px;\n}\n\n.user-booking-message {\n  font-size: 22px;\n  font-weight: bolder;\n}\n\n.example-login {\n  display:flex;\n  flex-direction: row;\n  margin-top: 175px;\n  color: white;\n  \n}\n\nh3 {\n  margin:5px;\n  border: 3px solid white;\n  margin-left: 10px;\n  border-radius: 9px;\n}\n\n.hidden {\n  display: none;\n}\n.submit {\n  margin: 5px\n}\n\n.submit:hover {\n  scale: 1.1;\n  background-color: antiquewhite;\n}\n\n.login-input:hover {\n  background-color: antiquewhite;\n}\n\n.input {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 10px;\n  padding: 10px\n}\n\n.login-input {\n  margin: 5px\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n@media screen and (max-width: 850px) {\n  h1 {\n    font-size: 30px;\n  }\n}\n\n\n@media screen and (max-width: 750px) {\nh1 {\n  font-size: 20px;\n}\n\n\nh2 {\n  font-size: 20px;\n}\n\n.input {\n  flex-direction: column;\n  width:50vw\n}\n\n.example-login {\n  flex-direction: column;\n}\n\naside {\n  justify-content: flex-start;\n  height: 30%\n}\n\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n  background-image: url(\"https://media.istockphoto.com/id/1220321548/photo/hotel-atlantis-at-jumeirah-palm-in-dubai.jpg?s=612x612&w=0&k=20&c=YT9D8RU5-1RZs-pbw6nlOgongBAoCWAONz7iUQ26N10=\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  min-height: 100%;\n}\n\n.title-booking, .amount-spent-section {\n  color:antiquewhite\n}\n\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,qCAAqC;EACrC;AACF;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,aAAa;EACb,yLAAyL;EACzL,4BAA4B;EAC5B,sBAAsB;EACtB,2BAA2B;EAC3B,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,aAAa;AACf;;AAEA;;;;EAIE,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf;AACF;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,YAAY;AACd;;AAEA;;EAEE,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,cAAc;;AAEhB;;AAEA;EACE,aAAa;EACb,iBAAiB;EACjB,cAAc;EACd,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE;AACF;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,WAAW;AACb;;AAEA;;;EAGE,eAAe;EACf,iBAAiB;EACjB;AACF;;AAEA;;;EAGE,UAAU;EACV,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;EACpB,eAAe;EACf;AACF;;AAEA;EACE,YAAY;EACZ,cAAc;EACd,sBAAsB;EACtB,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;;AAEd;;AAEA;EACE,UAAU;EACV,uBAAuB;EACvB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;AACA;EACE;AACF;;AAEA;EACE,UAAU;EACV,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,YAAY;EACZ;AACF;;AAEA;EACE;AACF;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE;IACE,eAAe;EACjB;AACF;;;AAGA;AACA;EACE,eAAe;AACjB;;;AAGA;EACE,eAAe;AACjB;;AAEA;EACE,sBAAsB;EACtB;AACF;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,2BAA2B;EAC3B;AACF;;;AAGA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;EACZ,yLAAyL;EACzL,4BAA4B;EAC5B,sBAAsB;EACtB,2BAA2B;EAC3B,gBAAgB;AAClB;;AAEA;EACE;AACF;;AAEA","sourcesContent":["* {\n  font-family: \"Roboto Mono\", monospace;\n  color:antiquewhite\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n}\n\nbody {\n  display: flex;\n  width: 95vw;\n  height: 100vh;\n  background-image: url(\"https://media.istockphoto.com/id/1220321548/photo/hotel-atlantis-at-jumeirah-palm-in-dubai.jpg?s=612x612&w=0&k=20&c=YT9D8RU5-1RZs-pbw6nlOgongBAoCWAONz7iUQ26N10=\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  min-height: 100vh;\n}\n\naside {\n  width: 20vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 10px;\n}\n\nmain {\n  width: 80vw;\n  height: 100vh;\n}\n\nh1,\nh2,\n.top-section,\n.login-form {\n  text-align: center;\n}\n\nh1, h2 {\n  font-size: 40px;\n  color: black\n}\n\n.booking-section {\n  padding-top: 10px;\n  display: flex;\n  flex-direction: column;\n  height: 70vh;\n  align-content: flex-end;\n  overflow: auto;\n}\n\n.booking-card {\n  display: flex;\n  align-items: flex-end;\n  flex-direction: row;\n  border: 2px solid black;\n  border-radius: 8px;\n  margin: 3px;\n  background-color: grey;\n}\n\n.room-id {\n  padding: 5px;\n}\n\n.show-rooms-button,\n.filter-rooms-button {\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.bottom-section {\n  display: flex;\n  justify-content: space-between;\n  overflow: auto;\n\n}\n\n.available-section {\n  display: flex;\n  padding-top: 10px;\n  overflow: auto;\n  flex-direction: column;\n  height: 70vh;\n}\n\nlabel {\n  color: black\n}\n\n.rules > p {\n  margin: 0;\n}\n\n.room-card {\n  border: 2px solid black;\n  border-radius: 8px;\n  display: flex;\n  background-color: grey;\n  margin: 3px;\n}\n\nbutton,\ninput,\nselect {\n  cursor: pointer;\n  border-radius:6px;\n  color: black\n}\n\n.button-booking:hover,\n.show-rooms-button:hover,\n.filter-rooms-button:hover {\n  scale: 1.1;\n  background-color: grey;\n  border-radius: 8px;\n}\n\n.login {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.amount-spent-section {\n  padding-bottom: 40px;\n  font-size: 22px;\n  color: black\n}\n\n.past-booking-section, .future-booking-section {\n  display:flex;\n  overflow: auto;\n  flex-direction: column;\n  height: 70vh;\n  padding-left: 10px;\n}\n\n.user-booking-message {\n  font-size: 22px;\n  font-weight: bolder;\n}\n\n.example-login {\n  display:flex;\n  flex-direction: row;\n  margin-top: 175px;\n  color: white;\n  \n}\n\nh3 {\n  margin:5px;\n  border: 3px solid white;\n  margin-left: 10px;\n  border-radius: 9px;\n}\n\n.hidden {\n  display: none;\n}\n.submit {\n  margin: 5px\n}\n\n.submit:hover {\n  scale: 1.1;\n  background-color: antiquewhite;\n}\n\n.login-input:hover {\n  background-color: antiquewhite;\n}\n\n.input {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 10px;\n  padding: 10px\n}\n\n.login-input {\n  margin: 5px\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n@media screen and (max-width: 850px) {\n  h1 {\n    font-size: 30px;\n  }\n}\n\n\n@media screen and (max-width: 750px) {\nh1 {\n  font-size: 20px;\n}\n\n\nh2 {\n  font-size: 20px;\n}\n\n.input {\n  flex-direction: column;\n  width:50vw\n}\n\n.example-login {\n  flex-direction: column;\n}\n\naside {\n  justify-content: flex-start;\n  height: 30%\n}\n\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n  background-image: url(\"https://media.istockphoto.com/id/1220321548/photo/hotel-atlantis-at-jumeirah-palm-in-dubai.jpg?s=612x612&w=0&k=20&c=YT9D8RU5-1RZs-pbw6nlOgongBAoCWAONz7iUQ26N10=\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  min-height: 100%;\n}\n\n.title-booking, .amount-spent-section {\n  color:antiquewhite\n}\n\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings;
  }

  showBookings(allBookings) {
    this.bookings = allBookings.filter((booking) => this.id === booking.userID);
  }

  showAmountSpent(allRooms) {
    return this.bookings.reduce((acc, booking) => {
      allRooms.forEach((room) => {
        if (room.number === booking.roomNumber) {
          acc += room.costPerNight;
        }
      });
      return acc;
    }, 0);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Rooms {
  constructor(rooms) {
    this.number = rooms.number;
    this.roomType = rooms.roomType;
    this.bidet = rooms.bidet;
    this.bedSize = rooms.bedSize;
    this.numBeds = rooms.numBeds;
    this.costPerNight = rooms.costPerNight;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rooms);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Hotel {
  constructor(bookingData, roomData) {
    this.bookings = bookingData;
    this.rooms = roomData;
    this.availableRooms;
  }

  findAvailableRooms(date) {
    let noRoomAvailable = this.bookings.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking.roomNumber);
      }
      return acc;
    }, []);

    this.availableRooms = this.rooms.reduce((acc, room) => {
      if (!noRoomAvailable.includes(room.number)) {
        acc.push(room);
      }
      return acc;
    }, []);

    return this.availableRooms;
  }

  filterByRoomType(value) {
    const filteredRooms = this.availableRooms.filter(
      (room) => room.roomType == value.replaceAll("-", " ")
    );
    return filteredRooms;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchPromises": () => (/* binding */ fetchPromises),
/* harmony export */   "fetchRequest": () => (/* binding */ fetchRequest),
/* harmony export */   "postRequest": () => (/* binding */ postRequest)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


function fetchRequest(type) {
  return fetch(`https://overlook-api-jfogiato.vercel.app/api/v1/${type}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error");
      }
    })
    .catch(() => console.log('error'));
}

function postRequest(booking) {
  fetch("https://overlook-api-jfogiato.vercel.app/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.resolvePromises)();
        (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.getCustomerData)();
        (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.showMessage)();
      }
    })
    .catch((0,_scripts__WEBPACK_IMPORTED_MODULE_0__.showUserErrorMessage)());
}

function fetchPromises() {
  const allCustomers = fetchRequest("customers");
  const allRooms = fetchRequest("rooms");
  const allBookings = fetchRequest("bookings");
  return Promise.all([allCustomers, allRooms, allBookings]);
}




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map
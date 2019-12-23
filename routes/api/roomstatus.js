const express = require("express");
const router = express.Router();
const axios = require("axios");
const otplib = require("otplib");
const atob = require("atob");
const secret = require("config").get("secret");
var xmldoc = require("xmldoc");
axios.defaults.baseURL = "https://api.roomercloud.net";
axios.defaults.headers.common["Promoir-Roomer-Hotel-ApplicationId"] = "HKLAKI";
axios.defaults.headers.common["Promoir-Roomer-Hotel-Identifier"] = "2b72a454";
otplib.totp.options = {
  digits: 8,
  algorithm: "sha256",
  encoding: "hex"
};

router.post("/", async (req, res, next) => {
  const body = {
    PaymentEstimateRequest: {
      BookingRequestType: {
        NewBooking: {
          NewBooking: {
            BookingType: {
              guest: {
                GuestType: {
                  id: "000000000",
                  firstName: "Benedykt",
                  lastName: "Tyminski",
                  gender: { GenderType: "MALE" },
                  title: "Mr",
                  dateOfBirth: "1991-02-26",
                  guestAgeCategory: { GuestAgeCategoryType: "ADULT" },
                  address: {
                    AddressType: {
                      houseNumber: "2424",
                      extension: "2121",
                      postOfficeBoxNumber: "1234",
                      street: "test",
                      postalCode: "1234",
                      postalDistrict: "test",
                      municipality: "test",
                      county: "test",
                      state: "test",
                      country: "Iceland"
                    }
                  }
                  /* contactDetails: { ContactDetailsType: {} } */
                }
              },
              BaseRoomRequest: {
                guest: "IDREF",
                ratePlan: {},
                roomType: "STD",
                arrivalDateTime: "",
                departureDateTime: ""
              }
            }
          },
          channelCode: "",
          channelManagerCode: ""
        }
      }
    }
  };
  try {
    const token = otplib.totp.generate(atob(secret));
    const response = await axios.post(
      `roomer/openAPI/REST/estimates/booking`,
      JSON.stringify(body),
      /* `roomer/openAPI/REST/bookings/roomassignments?roomNumber=${req.params.room_number}`, */
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/xml",
          "Promoir-Roomer-Hotel-Secret": token
        }
      }
    );

    const xml = {
      BookingRequestType: {
        NewBooking: {
          BookingType: {
            guest: {
              GuestType: {
                id: "Stadgreitt",
                firstName: "John",
                address: {
                  street: "Unknown",
                  country: "IS"
                }
              }
            },
            BaseRoomRequest: {
              guest: "Stadgreitt",
              roomType: "STD",
              arrivalDateTime: "2019-12-15T09:00:00",
              departureDateTime: "2019-12-16T09:00:00"
            }
          }
        }
      }
    };

    req.body = json;
    /* 	const findNames = response.data.booking.map(guest =>
			guest.baseRoomRequest.map(g => ({
				name: g.value.guest.map(z => z.value.firstName).join(),
				room: g.value.room
			}))
		);
		

		res.json(findNames[0]); */
    res.json(res.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error });
  }
});

router.get("/roomkey", async (req, res, next) => {
  try {
    const token = otplib.totp.generate(atob(secret));
    const response = await axios.get(
      "roomer/openAPI/REST/bookings/bookingId=6120/roomId=30168/roomkey?withInactiveKeys=true",
      //rooom reservation 35962  #8126
      {
        headers: {
          "Promoir-Roomer-Hotel-Secret": token
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error });
  }
});

module.exports = router;

import { http, HttpResponse } from "msw";
import type { Person } from "../api/apis/api";

const baseUrl = "http://localhost:3001";

export const handlers = [
  http.get(`${baseUrl}/people`, () => {
    return HttpResponse.json(
      [
        {
          id: "1",
          forename: "John",
          surname: "Doe",
          dob: "1990-01-01",
          ssn: "123456789",
          issuedDateAndTime: new Date().toISOString(),
          friends: [],
          image: "",
          primaryLocation: {
            type: "Point",
            coordinates: [0, 0],
          },
        },
      ],
      { status: 200 }
    );
  }),

  http.get(`${baseUrl}/people/:id`, () => {
    return HttpResponse.json(
      {
        id: "1",
        forename: "John",
        surname: "Doe",
        dob: "1990-01-01",
        ssn: "123456789",
        issuedDateAndTime: new Date().toISOString(),
        friends: [],
        image: "",
        primaryLocation: {
          type: "Point",
          coordinates: [0, 0],
        },
      },
      { status: 200 }
    );
  }),

  http.put(`${baseUrl}/people/:id`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        ...(body as Person),
        id: "1",
      },
      { status: 200 }
    );
  }),
];

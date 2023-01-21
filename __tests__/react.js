import React from "React";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import regeneratorRuntime from "regenerator-runtime";
import { BrowserRouter } from "react-router-dom";
//IMPORT REACT COMPONENTS
import LandlordCard from "../frontend/src/components/LandlordCard.jsx";
import House from "../assets/rundown house.jpeg";
describe("Unit testing React components", () => {
  describe("LandlordCard", () => {
    describe("LandlordCard with average rating value", () => {
      let landlordCard;
      const props = {
        landlord: {
          name: "Sam",
          location: "California",
          averageRating: 4.8,
        },
      };
      beforeAll(() => {
        landlordCard = render(<LandlordCard {...props} />, {
          wrapper: BrowserRouter,
        });
      });

      it("Renders the passed-in landlord props, name, location, rating", () => {
        expect(landlordCard.getByText(props.landlord.name)).toBeInTheDocument();
        expect(
          landlordCard.getByText("Location:").nextSibling
        ).toHaveTextContent(props.landlord.location);
        expect(landlordCard.getByText("Rating:").nextSibling).toHaveTextContent(
          props.landlord.averageRating
        );
      });
    });

    describe("LandlordCard without average rating value", () => {
      let landlordCard;
      const props = {
        landlord: {
          name: "Sam",
          location: "California",
        },
      };
      beforeAll(() => {
        landlordCard = render(<LandlordCard {...props} />, {
          wrapper: BrowserRouter,
        });
      });

      it("Renders the passed-in landlord props, name, location, rating(without rating value)", () => {
        expect(landlordCard.getByText(props.landlord.name)).toBeInTheDocument();
        expect(
          landlordCard.getByText("Location:").nextSibling
        ).toHaveTextContent(props.landlord.location);
        expect(landlordCard.getByText("Rating:").nextSibling).toHaveTextContent(
          "N/A"
        );
      });
    });
  });
});

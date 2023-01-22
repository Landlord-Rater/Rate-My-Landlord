import React from "React";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import regeneratorRuntime from "regenerator-runtime";
import { BrowserRouter } from "react-router-dom";
//IMPORT REACT COMPONENTS
import LandlordCard from "../frontend/src/components/LandlordCard.jsx";

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
      beforeEach(() => {
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
      // CHECK OUT THIS LINK FOR POSSIBLE SOLUTION TO TEST BELOW - https://stackoverflow.com/questions/69878146/how-can-i-test-react-router-with-jest
      it("Displays AddReview component on click", async () => {
        expect(screen.queryByText(/Search/)).toBeNull();
        await userEvent.click(screen.getByText(/about/i));
        screen.debug();
        expect(screen.getByText("Would Rent Again:")).toBeInTheDocument();
      });
    });
  });
});

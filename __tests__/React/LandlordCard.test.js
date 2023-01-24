import React from "React";
import { render, screen } from "@testing-library/react";
import regeneratorRuntime from "regenerator-runtime";
import { BrowserRouter } from "react-router-dom";

//IMPORT REACT COMPONENTS
import LandlordCard from "../../frontend/src/components/LandlordCard.jsx";

describe("Unit testing LandlordCard component", () => {
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

    it("should render the passed-in landlord props, name, location, rating, and show the landlord reviews button", () => {
      expect(landlordCard.getByText(props.landlord.name)).toBeInTheDocument();
      expect(
        landlordCard.getByText(/location:/i).nextSibling
      ).toHaveTextContent(props.landlord.location);
      expect(landlordCard.getByText(/rating:/i).nextSibling).toHaveTextContent(
        props.landlord.averageRating
      );
      expect(
        landlordCard.getByRole("button", {
          name: /see landlord reviews/i,
        })
      ).toBeInTheDocument();
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

    it("should render the passed-in landlord props, name, location, rating(without rating value), and show the landlord reviews button", () => {
      expect(landlordCard.getByText(props.landlord.name)).toBeInTheDocument();
      expect(
        landlordCard.getByText(/location:/i).nextSibling
      ).toHaveTextContent(props.landlord.location);
      expect(landlordCard.getByText(/rating:/i).nextSibling).toHaveTextContent(
        /n\/a/i
      );
      expect(
        landlordCard.getByRole("button", {
          name: /see landlord reviews/i,
        })
      ).toBeInTheDocument();
    });
  });
});

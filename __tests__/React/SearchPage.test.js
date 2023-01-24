import React from "React";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";
import regeneratorRuntime from "regenerator-runtime";
import { BrowserRouter, useNavigate } from "react-router-dom";

//IMPORT REACT COMPONENT
import SearchPage from "../../frontend/src/components/SearchPage";

describe("Search page", () => {
  describe("successful mock api calls", () => {
    let searchPage;
    const fakeLandlordCards = [
      { name: "John", location: "New York", averageRating: 4.8, id: 1 },
      { name: "Jack", location: "California", averageRating: 5, id: 2 },
    ];

    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResolvedValue({
        status: 200,
        json: jest.fn(() => fakeLandlordCards),
      });
      searchPage = render(<SearchPage />, {
        wrapper: BrowserRouter,
      });
    });

    it("should render the inputted text into the search input", async () => {
      const searchInput = searchPage.getByPlaceholderText(/search/i);
      const search = "John Thompson";
      expect(searchInput.value).toBe("");
      await userEvent.type(searchInput, search);
      expect(searchInput.value).toBe(search);
    });

    it("should display loading text while landlord cards are being fetched", async () => {
      expect(searchPage.getByText(/content loading/i)).toBeVisible();
      expect(
        await searchPage.findByText(fakeLandlordCards[0].name)
      ).toBeVisible();
      expect(searchPage.queryByText(/content loading/i)).toBeNull();
    });

    it("should populate landlord cards upon page load", async () => {
      expect(
        await searchPage.findByText(fakeLandlordCards[0].name)
      ).toBeVisible();
      expect(
        await searchPage.findByText(fakeLandlordCards[0].location)
      ).toBeVisible();
      expect(
        await searchPage.findByText(fakeLandlordCards[0].averageRating)
      ).toBeVisible();
      expect(
        await searchPage.findByText(fakeLandlordCards[1].name)
      ).toBeVisible();
      expect(
        await searchPage.findByText(fakeLandlordCards[1].location)
      ).toBeVisible();
      expect(
        await searchPage.findByText(fakeLandlordCards[1].averageRating)
      ).toBeVisible();
    });

    it("should filter landlord cards when particular input values are typed into the search input", async () => {
      expect(
        await searchPage.findByText(fakeLandlordCards[0].name)
      ).toBeVisible();
      expect(
        await searchPage.findByText(fakeLandlordCards[1].name)
      ).toBeVisible();

      const searchInput = searchPage.getByPlaceholderText(/search/i);
      const search = "John";

      await userEvent.type(searchInput, search);

      expect(searchPage.getByText(fakeLandlordCards[0].name)).toBeVisible();
      expect(searchPage.queryByText(fakeLandlordCards[1].name)).toBeNull();
    });

    it("should display add landlord button", () => {
      expect(
        searchPage.getByRole("button", { name: /add new landlord/i })
      ).toBeVisible();
    });
  });

  describe("unsuccessful mock api calls", () => {
    let searchPage;

    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockReject(() => Promise.reject("API error"));
      searchPage = render(<SearchPage />, {
        wrapper: BrowserRouter,
      });
    });

    it("should render error when API call fails", async () => {
      expect(
        await searchPage.findByText(/Something went wrong!/i)
      ).toBeVisible();
      expect(await searchPage.findByText(/No landlords found/i)).toBeVisible();
    });
  });
});

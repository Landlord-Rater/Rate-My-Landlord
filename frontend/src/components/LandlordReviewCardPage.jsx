import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandlordCard from "./LandlordCard.jsx";
import Container from "./Container.jsx";

const LandlorReviewCardPage = () => {
  return (
    <section class="search-page h-full p-4 bg-cover">
      <h4 className="text-center mb-40 text-3xl text-light-subtle">
        Rate My Landlord
      </h4>
      <Container>
        <div className="flex flex-row items-center justify-center"></div>
        <div id="search-status">
          {isLoading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
          <div className="results-status"></div>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10 p-5">
          {landlords.map((landlord) => (
            <LandlordCard key={landlord.id} landlord={landlord} />
          ))}
        </div>
      </Container>
    </section>
  );
};

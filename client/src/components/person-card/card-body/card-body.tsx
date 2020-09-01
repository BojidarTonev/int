import React from "react";
import styled from "styled-components";
import "./card-body.css";

const StyledCardBody = styled.div`
  background: rgba(${props => props.color}, 0.8);
`;

export const CardBody = (props: any) => {
  let { label, company, bio, color } = props;
  if (!bio || bio.length === 1) {
    bio = "No bio available !";
  } else {
    const regex = /(<([^>]+)>)/gi;
    bio = bio.replace(regex, "");
  }
  if (!company) {
    company = "No company information given !";
  }

  return (
    <StyledCardBody color={color} className="card-body">
      <b>LABEL: {label}</b>
      <p>{company}</p>
      <p>{bio}</p>
    </StyledCardBody>
  );
};

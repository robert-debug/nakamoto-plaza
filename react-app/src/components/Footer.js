import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Footer() {


  return (
    <>
      <a>Robert George</a>
      <a className='nomics-link' target="_blank" href="https://nomics.com">{'Crypto Market Cap & Pricing Data Provided By Nomics'}</a>
    </>)
}

export default Footer;
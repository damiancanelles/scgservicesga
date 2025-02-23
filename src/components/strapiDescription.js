'use client'

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";

const RichTextRenderer = ({ content }) => {
  if (!content) return null;
  

  return (
    <BlocksRenderer content={content}></BlocksRenderer>
  );
};

export default RichTextRenderer;


"use client";

import { Card } from "flowbite-react";

interface CardProps {
    image: string;
    title: string;
    content: string;
  }

export function CardS( {image, title, content} : CardProps ) {
  return (
    <Card
      className="w-full max-w-sm m-1 sm:m-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={image}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {content}
      </p>
    </Card>
  );
}

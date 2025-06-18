
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../../carousel';
import { Button } from '../../button';

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer"
];

const Categories = () => {
  return (
    <div>
    <div>
        <h1 className="text-2xl font-bold text-center text-blue-600">Categories</h1>

        <p className="text-center text-gray-600">
            Explore our extensive job market.
        </p>
    </div>
    <div className="w-full max-w-xl mx-auto my-20">
      <Carousel>
        <CarouselContent>
          {Category.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button className="m-2">{category}</Button> {/* <-- gap added here */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    </div>
  );
};

export default Categories;

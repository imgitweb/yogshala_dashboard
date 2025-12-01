import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SearchInput from "../../../components/common/SearchInput";
import { use } from "react";
import { useState } from "react";
import { getActiveTrainers } from "../../../apis/authApi";
import { useEffect } from "react";


const Trainers = () => {
  const [trainersList, setTrainersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const trainersData = async()=>{
   const activeTrainers =await getActiveTrainers();
    setTrainersList(activeTrainers);
  }

  useEffect(() => {
    trainersData();
  }, []);

  const modifyTrainersList = trainersList.map((trainer, index) => ({
    id: trainer._id,
    name: trainer.fullName,
    specialization: trainer.specialization || "Yoga Trainer",
    rating: trainer.rating || (Math.random() * (5 - 4) + 4).toFixed(1), 
    location: trainer.location.city || "Bhopal",
    imageUrl: trainer.profilePicture || `https://i.pravatar.cc/300?img=${index + 1}`, 
  }));
  // Derived list (filtered + formatted)
const filteredTrainers = trainersList
  .filter((trainer) => {
    const term = searchTerm.toLowerCase();
    return (
      trainer.fullName?.toLowerCase().includes(term) 
      // trainer.specialization?.toLowerCase().includes(term) ||
      // trainer.location?.city?.toLowerCase().includes(term)
    );
  })
  .map((trainer, index) => ({
    id: trainer._id,
    name: trainer.fullName,
    specialization: trainer.specialization || "Yoga Trainer",
    rating: trainer.rating || (Math.random() * (5 - 4) + 4).toFixed(1),
    location: trainer.location.city || "Bhopal",
    imageUrl: trainer.profilePicture || `https://i.pravatar.cc/300?img=${index + 1}`,
  }));





 

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 100 },
    }),
  };

  return (
    <div className="bg-offwhite min-h-screen pb-10">
      {/* Hero Search Section */}
      {/* <section className="pt-14 bg-light text-start"> */}
        {/* <h1 className="text-3xl md:text-4xl font-extrabold text-dark">
          Find Your Perfect <span className="text-primary">Yoga Trainer</span>
        </h1>
        <p className="text-muted mt-3 text-base md:text-lg max-w-2xl mx-auto">
          Search by location, specialization, or name.
        </p> */}
       <SearchInput onChange={(value) => setSearchTerm(value)} />
      {/* </section> */}

      {/* Filters & Trainers */}
      <section className="py-6 max-w-7xl mx-auto px-6  ">

        {/* Trainers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              onClick={
                ()=>{
                    navigate(`/trainers/profile/${trainer.id}`)
                }
              }
              className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img
                  src={trainer.imageUrl}
                  alt={trainer.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-dark">{trainer.name}</h3>
                  <div className="flex items-center bg-yellow-400 text-dark px-2 py-1 rounded-md text-xs md:text-sm font-semibold">
                    ⭐ {trainer.rating}
                  </div>
                </div>
                <p className="text-primary font-semibold">{trainer.specialization}</p>
                <p className="text-muted mt-1 text-sm">{trainer.location}</p>

                <Link
                  to={`/trainers/profile/${trainer.id}`}
                  className="mt-5 inline-block w-full text-center btn btn-primary text-white font-semibold py-2 rounded-lg hover:bg-dark transition-all duration-200"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Trainers;

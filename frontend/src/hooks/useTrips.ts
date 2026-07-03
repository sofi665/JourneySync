"use client";


import { useEffect, useState } from "react";
import { Trip } from "@/types/trip";
import { getTrips } from "@/services/trip.service";


export function useTrips(){


    const [trips,setTrips] = useState<Trip[]>([]);


    const [loading,setLoading] = useState(true);


    const [error,setError] = useState<string | null>(null);



    useEffect(()=>{


        const fetchTrips = async()=>{


            try {


                const data = await getTrips();


                setTrips(data);


            } catch(error){


                setError(
                    "No se pudieron cargar los viajes"
                );


            } finally {


                setLoading(false);


            }


        };



        fetchTrips();



    },[]);



    return {

        trips,

        loading,

        error

    };


}

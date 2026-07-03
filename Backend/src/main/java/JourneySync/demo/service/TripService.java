package JourneySync.demo.service;

import JourneySync.demo.dto.CreateTripRequest;
import JourneySync.demo.dto.TripResponse;
import JourneySync.demo.entity.Trip;
import JourneySync.demo.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;

    public TripResponse createTrip(CreateTripRequest request) {

        Trip trip = Trip.builder()
                .title(request.title())
                .description(request.description())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .build();

        Trip savedTrip = tripRepository.save(trip);

        return new TripResponse(
                savedTrip.getId(),
                savedTrip.getTitle(),
                savedTrip.getDescription(),
                savedTrip.getStartDate(),
                savedTrip.getEndDate()
        );
    }
    public List<TripResponse> getAllTrips(){

        return tripRepository.findAll()
                .stream()
                .map(trip -> new TripResponse(
                        trip.getId(),
                        trip.getTitle(),
                        trip.getDescription(),
                        trip.getStartDate(),
                        trip.getEndDate()
                ))
                .toList();
    }
    public TripResponse getTripById(UUID id){

        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));


        return new TripResponse(
                trip.getId(),
                trip.getTitle(),
                trip.getDescription(),
                trip.getStartDate(),
                trip.getEndDate()
        );
    }
}

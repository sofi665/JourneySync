package JourneySync.demo.service.impl;

import JourneySync.demo.dto.request.CreateParticipantRequest;
import JourneySync.demo.entity.Participant;
import JourneySync.demo.entity.Trip;
import JourneySync.demo.entity.User;
import JourneySync.demo.repository.ParticipantRepository;
import JourneySync.demo.repository.TripRepository;
import JourneySync.demo.repository.UserRepository;
import JourneySync.demo.service.ParticipantService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
@RequiredArgsConstructor
public class ParticipantServiceImpl implements ParticipantService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;


    @Transactional
    @Override
    public Participant addParticipant(
            UUID tripId,
            CreateParticipantRequest request
    ) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() ->
                        new RuntimeException("Trip not found")
                );


        User user = userRepository.findById(request.userId())
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );


        boolean exists = trip.getParticipants()
                .stream()
                .anyMatch(participant ->
                        participant.getUser()
                                .getId()
                                .equals(request.userId())
                );


        if (exists) {
            throw new RuntimeException(
                    "User already is a participant in this trip"
            );
        }


        Participant participant = Participant.builder()
                .trip(trip)
                .user(user)
                .role(request.role())
                .build();


        trip.getParticipants().add(participant);


        return participantRepository.save(participant);
    }
}
